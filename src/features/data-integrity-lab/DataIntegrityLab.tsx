"use client";

import { ChangeEvent, DragEvent, useMemo, useState } from "react";
import { DEMO_DATASET } from "./constants";
import { demoDatasetText, parseInput, runDataIntegrityPipeline } from "./engine";
import { FilterKey, ProcessedRecord, RawRecord } from "./types";
import styles from "./DataIntegrityLab.module.css";

const decisionColor: Record<ProcessedRecord["decision"], string> = {
  "Import as new": styles.decisionNew,
  "Update existing": styles.decisionUpdate,
  Reject: styles.decisionReject,
  "Manual review": styles.decisionManual,
};

export function DataIntegrityLab() {
  const [inputText, setInputText] = useState("");
  const [records, setRecords] = useState<ProcessedRecord[]>([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [sortKey, setSortKey] = useState<"id" | "decision" | "validity">("id");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const summary = useMemo(() => {
    const byDecision = records.reduce<Record<string, number>>((acc, item) => {
      acc[item.decision] = (acc[item.decision] ?? 0) + 1;
      return acc;
    }, {});

    return {
      total: records.length,
      valid: records.filter((record) => record.isValid).length,
      invalid: records.filter((record) => !record.isValid).length,
      duplicates: records.filter((record) => record.matches.some((match) => ["exact", "strong", "possible"].includes(match.type))).length,
      collisions: records.filter((record) => record.matches.some((match) => match.type === "collision")).length,
      byDecision,
    };
  }, [records]);

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filterMatch = (record: ProcessedRecord) => {
      if (filter === "valid") return record.isValid;
      if (filter === "invalid") return !record.isValid;
      if (filter === "duplicates") return record.matches.some((match) => ["exact", "strong", "possible"].includes(match.type));
      if (filter === "collisions") return record.matches.some((match) => match.type === "collision");
      if (filter === "manualReview") return record.decision === "Manual review";
      return true;
    };

    const searchMatch = (record: ProcessedRecord) => {
      if (!query) return true;
      return [
        record.id,
        record.normalized.firstName,
        record.normalized.lastName,
        record.normalized.externalClientId,
        record.normalized.sourceSystemId,
        record.decision,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);
    };

    return [...records]
      .filter((record) => filterMatch(record) && searchMatch(record))
      .sort((a, b) => {
        if (sortKey === "decision") return a.decision.localeCompare(b.decision);
        if (sortKey === "validity") return Number(b.isValid) - Number(a.isValid);
        return a.id.localeCompare(b.id);
      });
  }, [records, search, filter, sortKey]);

  const selected = filteredRecords.find((record) => record.id === selectedId) ?? filteredRecords[0] ?? null;

  const processRaw = (raw: RawRecord[]) => {
    const results = runDataIntegrityPipeline(raw);
    setRecords(results);
    setSelectedId(results[0]?.id ?? null);
  };

  const handleRun = () => {
    const parsed = parseInput(inputText);
    if (parsed.error) {
      setError(parsed.error);
      return;
    }

    setError("");
    processRaw(parsed.records);
  };

  const handleFile = async (file?: File) => {
    if (!file) return;
    const content = await file.text();
    setInputText(content);
    const parsed = parseInput(content);
    if (parsed.error) {
      setError(parsed.error);
      return;
    }
    setError("");
    processRaw(parsed.records);
  };

  const onFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    handleFile(file);
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    handleFile(file);
  };

  const exportResults = (format: "json" | "csv") => {
    const raw = filteredRecords.map((item) => ({ ...item.normalized, decision: item.decision, explanation: item.explanation }));
    const payload =
      format === "json"
        ? JSON.stringify(raw, null, 2)
        : [
            Object.keys(raw[0] ?? {}).join(","),
            ...raw.map((row) =>
              Object.values(row)
                .map((value) => {
                  const text = `${value ?? ""}`;
                  return text.includes(",") ? `"${text.replace(/"/g, '""')}"` : text;
                })
                .join(",")
            ),
          ]
            .filter(Boolean)
            .join("\n");
    const blob = new Blob([payload], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `data-integrity-results.${format}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <h1>Data Integrity Lab</h1>
        <p>
          Validate, normalize, match, and simulate import decisions for messy client records using deterministic rules designed for production-style data quality workflows.
        </p>
      </header>

      <section className={styles.ingestGrid}>
        <div className={styles.panel} onDrop={onDrop} onDragOver={(event) => event.preventDefault()}>
          <h2>Upload</h2>
          <p>Drop a JSON/CSV file or choose one from disk.</p>
          <input type="file" accept=".json,.csv,text/csv,application/json" onChange={onFileInput} />
        </div>

        <div className={styles.panel}>
          <h2>Paste JSON or CSV</h2>
          <textarea
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            placeholder="Paste records here..."
            className={styles.textarea}
          />
          <div className={styles.buttonRow}>
            <button onClick={handleRun}>Run analysis</button>
            <button
              onClick={() => {
                setInputText(demoDatasetText);
                setError("");
                processRaw(DEMO_DATASET);
              }}
              className={styles.secondary}
            >
              Load demo dataset
            </button>
          </div>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </section>

      <section className={styles.summaryGrid}>
        <SummaryCard label="Total records" value={summary.total} />
        <SummaryCard label="Valid records" value={summary.valid} />
        <SummaryCard label="Invalid records" value={summary.invalid} />
        <SummaryCard label="Duplicates" value={summary.duplicates} />
        <SummaryCard label="Collision warnings" value={summary.collisions} />
        <SummaryCard
          label="Import decisions"
          value={`${summary.byDecision["Import as new"] ?? 0}/${summary.byDecision["Update existing"] ?? 0}/${summary.byDecision["Manual review"] ?? 0}/${summary.byDecision.Reject ?? 0}`}
          helper="New/Update/Manual/Reject"
        />
      </section>

      <section className={styles.tableWrap}>
        <div className={styles.tableToolbar}>
          <input
            className={styles.search}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, id, source, decision..."
          />
          <select value={filter} onChange={(event) => setFilter(event.target.value as FilterKey)}>
            <option value="all">All records</option>
            <option value="valid">Valid only</option>
            <option value="invalid">Invalid only</option>
            <option value="duplicates">Duplicates</option>
            <option value="collisions">Collisions</option>
            <option value="manualReview">Manual review</option>
          </select>
          <select value={sortKey} onChange={(event) => setSortKey(event.target.value as "id" | "decision" | "validity") }>
            <option value="id">Sort: Record id</option>
            <option value="decision">Sort: Decision</option>
            <option value="validity">Sort: Validity</option>
          </select>
          <button className={styles.secondary} onClick={() => exportResults("json")}>Export JSON</button>
          <button className={styles.secondary} onClick={() => exportResults("csv")}>Export CSV</button>
        </div>

        <div className={styles.responsiveArea}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Client</th>
                <th>Source</th>
                <th>External ID</th>
                <th>Valid</th>
                <th>Matches</th>
                <th>Decision</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr
                  key={record.id}
                  className={selected?.id === record.id ? styles.activeRow : ""}
                  onClick={() => setSelectedId(record.id)}
                >
                  <td>{record.id}</td>
                  <td>{record.normalized.firstName} {record.normalized.lastName}</td>
                  <td>{record.normalized.sourceSystemId}</td>
                  <td>{record.normalized.externalClientId}</td>
                  <td>{record.isValid ? "Yes" : "No"}</td>
                  <td>
                    {record.matches[0] ? (
                      <span className={styles.badge}>{record.matches[0].type} · {record.matches[0].confidence}</span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td><span className={`${styles.decision} ${decisionColor[record.decision]}`}>{record.decision}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {selected && (
        <section className={styles.details}>
          <h3>Record deep dive: {selected.id}</h3>
          <p className={styles.explanation}>{selected.explanation}</p>
          <div className={styles.detailGrid}>
            <DetailBlock title="Raw record" content={selected.raw} />
            <DetailBlock title="Normalized record" content={selected.normalized} />
            <div className={styles.panelLite}>
              <h4>Validation</h4>
              {selected.validationIssues.length ? (
                <ul>
                  {selected.validationIssues.map((issue, index) => <li key={`${issue.field}-${index}`}>{issue.field}: {issue.message}</li>)}
                </ul>
              ) : (
                <p>No validation issues.</p>
              )}
            </div>
            <div className={styles.panelLite}>
              <h4>Matching analysis</h4>
              {selected.matches.length ? (
                <ul>
                  {selected.matches.map((match, index) => (
                    <li key={`${match.targetId}-${index}`}>
                      <strong>{match.type}</strong> ({match.confidence}) against {match.targetId} — {match.reason}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No candidate matches.</p>
              )}
            </div>
          </div>
        </section>
      )}

      <section className={styles.why}>
        <h3>Why this matters</h3>
        <p>
          In enterprise systems, poor record quality leads to failed outreach, compliance risk, and inaccurate reporting. This lab models practical tradeoffs between strict automation and safe human review.
        </p>
      </section>
    </div>
  );
}

function SummaryCard({ label, value, helper }: { label: string; value: string | number; helper?: string }) {
  return (
    <div className={styles.card}>
      <p>{label}</p>
      <h3>{value}</h3>
      {helper && <small>{helper}</small>}
    </div>
  );
}

function DetailBlock({ title, content }: { title: string; content: Record<string, unknown> }) {
  return (
    <div className={styles.panelLite}>
      <h4>{title}</h4>
      <pre>{JSON.stringify(content, null, 2)}</pre>
    </div>
  );
}
