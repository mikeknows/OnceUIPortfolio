export type RawRecord = {
  firstName?: unknown;
  lastName?: unknown;
  dateOfBirth?: unknown;
  ssnLast4?: unknown;
  email?: unknown;
  phone?: unknown;
  street?: unknown;
  city?: unknown;
  state?: unknown;
  zip?: unknown;
  sourceSystemId?: unknown;
  externalClientId?: unknown;
  [key: string]: unknown;
};

export type NormalizedRecord = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  ssnLast4: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  sourceSystemId: string;
  externalClientId: string;
};

export type ValidationIssue = {
  field: keyof NormalizedRecord | "record";
  severity: "error" | "warning";
  message: string;
};

export type MatchType = "exact" | "strong" | "possible" | "collision" | "ambiguous";

export type MatchConfidence = "High" | "Medium" | "Low";

export type MatchResult = {
  targetId: string;
  type: MatchType;
  confidence: MatchConfidence;
  reason: string;
};

export type Decision = "Import as new" | "Update existing" | "Reject" | "Manual review";

export type ProcessedRecord = {
  id: string;
  raw: RawRecord;
  normalized: NormalizedRecord;
  validationIssues: ValidationIssue[];
  isValid: boolean;
  matches: MatchResult[];
  decision: Decision;
  explanation: string;
};

export type FilterKey = "all" | "valid" | "invalid" | "duplicates" | "collisions" | "manualReview";
