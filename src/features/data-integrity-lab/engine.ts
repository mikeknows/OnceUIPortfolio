import { DEMO_DATASET, REQUIRED_FIELDS, STREET_MAP, US_STATE_CODES } from "./constants";
import {
  Decision,
  MatchConfidence,
  MatchResult,
  MatchType,
  NormalizedRecord,
  ProcessedRecord,
  RawRecord,
  ValidationIssue,
} from "./types";

const csvSplit = (line: string): string[] => {
  const parts: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      parts.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  parts.push(current);
  return parts.map((part) => part.trim());
};

export const parseInput = (value: string): { records: RawRecord[]; error?: string } => {
  const trimmed = value.trim();
  if (!trimmed) {
    return { records: [], error: "Input is empty." };
  }

  try {
    if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return { records: parsed as RawRecord[] };
      }
      return { records: [parsed as RawRecord] };
    }
  } catch {
    // fall through to CSV parser
  }

  const lines = trimmed.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) {
    return { records: [], error: "Unable to parse. Provide valid JSON or CSV with a header row." };
  }

  const headers = csvSplit(lines[0]);
  const records = lines.slice(1).map((line) => {
    const row = csvSplit(line);
    return headers.reduce<RawRecord>((acc, header, index) => {
      acc[header] = row[index] ?? "";
      return acc;
    }, {});
  });

  return { records };
};

const cleanText = (value?: string): string => (value ?? "").replace(/\s+/g, " ").trim();

const titleCase = (value?: string): string =>
  cleanText(value)
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

const normalizeStreet = (street?: string): string => {
  const words = cleanText(street).split(" ").filter(Boolean);
  return words
    .map((word) => {
      const key = word.toLowerCase().replace(/\./g, "");
      return STREET_MAP[key] ?? word;
    })
    .join(" ");
};

export const normalizeRecord = (raw: RawRecord): NormalizedRecord => {
  const phoneDigits = cleanText(raw.phone).replace(/\D/g, "");

  return {
    firstName: titleCase(raw.firstName as string),
    lastName: titleCase(raw.lastName as string),
    dateOfBirth: cleanText(raw.dateOfBirth as string),
    ssnLast4: cleanText(raw.ssnLast4 as string).replace(/\D/g, ""),
    email: cleanText(raw.email as string).toLowerCase(),
    phone: phoneDigits,
    street: normalizeStreet(raw.street as string),
    city: titleCase(raw.city as string),
    state: cleanText(raw.state as string).toUpperCase(),
    zip: cleanText(raw.zip as string),
    sourceSystemId: cleanText(raw.sourceSystemId as string),
    externalClientId: cleanText(raw.externalClientId as string),
  };
};

const isValidDate = (value: string): boolean => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

export const validateRecord = (record: NormalizedRecord): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];

  REQUIRED_FIELDS.forEach((field) => {
    if (!cleanText(record[field as keyof NormalizedRecord])) {
      issues.push({ field: field as keyof NormalizedRecord, severity: "error", message: `${field} is required.` });
    }
  });

  if (record.dateOfBirth && !isValidDate(record.dateOfBirth)) {
    issues.push({ field: "dateOfBirth", severity: "error", message: "dateOfBirth must be a valid YYYY-MM-DD date." });
  }
  if (record.state && !US_STATE_CODES.has(record.state)) {
    issues.push({ field: "state", severity: "error", message: "state must be a valid 2-letter US code." });
  }
  if (record.zip && !/^\d{5}$/.test(record.zip)) {
    issues.push({ field: "zip", severity: "error", message: "zip must be 5 digits." });
  }
  if (record.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(record.email)) {
    issues.push({ field: "email", severity: "error", message: "email format is invalid." });
  }
  if (record.phone && record.phone.length !== 10) {
    issues.push({ field: "phone", severity: "error", message: "phone must normalize to exactly 10 digits." });
  }
  if (record.ssnLast4 && !/^\d{4}$/.test(record.ssnLast4)) {
    issues.push({ field: "ssnLast4", severity: "error", message: "ssnLast4 must be 4 digits." });
  }

  return issues;
};

const confidenceForType = (type: MatchType): MatchConfidence => {
  if (type === "exact" || type === "strong") return "High";
  if (type === "possible" || type === "collision") return "Medium";
  return "Low";
};

const materialPersonDiff = (a: NormalizedRecord, b: NormalizedRecord): boolean =>
  a.lastName !== b.lastName || a.dateOfBirth !== b.dateOfBirth || (!!a.ssnLast4 && !!b.ssnLast4 && a.ssnLast4 !== b.ssnLast4);

const detectMatch = (current: NormalizedRecord, existing: NormalizedRecord): MatchResult | null => {
  if (current.externalClientId && current.externalClientId === existing.externalClientId && current.sourceSystemId === existing.sourceSystemId) {
    return {
      targetId: `${existing.sourceSystemId}:${existing.externalClientId}`,
      type: "exact",
      confidence: confidenceForType("exact"),
      reason: "Same externalClientId and sourceSystemId.",
    };
  }

  if (current.externalClientId && current.externalClientId === existing.externalClientId && materialPersonDiff(current, existing)) {
    return {
      targetId: `${existing.sourceSystemId}:${existing.externalClientId}`,
      type: "collision",
      confidence: confidenceForType("collision"),
      reason: "Same externalClientId but materially different identity details.",
    };
  }

  if (
    current.firstName === existing.firstName &&
    current.lastName === existing.lastName &&
    current.dateOfBirth === existing.dateOfBirth &&
    current.ssnLast4 &&
    current.ssnLast4 === existing.ssnLast4
  ) {
    return {
      targetId: `${existing.sourceSystemId}:${existing.externalClientId}`,
      type: "strong",
      confidence: confidenceForType("strong"),
      reason: "Name, DOB, and ssnLast4 strongly match.",
    };
  }

  if (current.firstName === existing.firstName && current.lastName === existing.lastName && current.dateOfBirth === existing.dateOfBirth) {
    const mismatchedSignals = [
      current.email && existing.email && current.email !== existing.email,
      current.phone && existing.phone && current.phone !== existing.phone,
      current.street && existing.street && current.street !== existing.street,
    ].filter(Boolean).length;

    if (mismatchedSignals > 0) {
      return {
        targetId: `${existing.sourceSystemId}:${existing.externalClientId}`,
        type: "possible",
        confidence: confidenceForType("possible"),
        reason: "Name and DOB match, but contact/address fields differ.",
      };
    }
  }

  const similarityScore = [
    current.firstName[0] && current.firstName[0] === existing.firstName[0],
    current.lastName[0] && current.lastName[0] === existing.lastName[0],
    current.dateOfBirth && current.dateOfBirth === existing.dateOfBirth,
    current.city && current.city === existing.city,
  ].filter(Boolean).length;

  if (similarityScore >= 3) {
    return {
      targetId: `${existing.sourceSystemId}:${existing.externalClientId}`,
      type: "ambiguous",
      confidence: confidenceForType("ambiguous"),
      reason: "Partial demographic overlap indicates a potential but uncertain match.",
    };
  }

  return null;
};

const getDecision = (issues: ValidationIssue[], matches: MatchResult[]): Decision => {
  if (issues.some((issue) => issue.severity === "error")) return "Reject";
  if (matches.some((match) => match.type === "collision" || match.type === "ambiguous")) return "Manual review";
  if (matches.some((match) => match.type === "exact" || match.type === "strong")) return "Update existing";
  if (matches.some((match) => match.type === "possible")) return "Manual review";
  return "Import as new";
};

const buildExplanation = (decision: Decision, issues: ValidationIssue[], matches: MatchResult[]): string => {
  if (decision === "Reject") {
    return `Rejected because ${issues.map((issue) => issue.message.replace(/\.$/, "")).join(" and ")}.`;
  }

  if (decision === "Manual review") {
    const topMatch = matches[0];
    return `Manual review because ${topMatch ? topMatch.reason.toLowerCase() : "matching confidence is insufficient for automatic import"}.`;
  }

  if (decision === "Update existing") {
    const top = matches.find((match) => match.type === "exact" || match.type === "strong");
    return `Update existing because ${top ? top.reason.toLowerCase() : "a high-confidence match was found"}.`;
  }

  return "Import as new because no duplicate candidates were found.";
};

export const runDataIntegrityPipeline = (records: RawRecord[]): ProcessedRecord[] => {
  const processed: ProcessedRecord[] = [];

  records.forEach((raw, index) => {
    const normalized = normalizeRecord(raw);
    const validationIssues = validateRecord(normalized);

    const matches = processed
      .map((item) => detectMatch(normalized, item.normalized))
      .filter((match): match is MatchResult => Boolean(match))
      .sort((a, b) => {
        const rank: Record<MatchType, number> = { exact: 0, strong: 1, collision: 2, possible: 3, ambiguous: 4 };
        return rank[a.type] - rank[b.type];
      });

    const decision = getDecision(validationIssues, matches);
    const explanation = buildExplanation(decision, validationIssues, matches);

    processed.push({
      id: `R-${index + 1}`,
      raw,
      normalized,
      validationIssues,
      isValid: validationIssues.length === 0,
      matches,
      decision,
      explanation,
    });
  });

  return processed;
};

export const demoDatasetText = JSON.stringify(DEMO_DATASET, null, 2);

