"use client";

import { useMemo, useState } from "react";

const DEFAULT_SQL = `CREATE TABLE employees (
  id INT PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  department VARCHAR(50),
  salary DECIMAL(10,2)
);`;

const RESERVED = new Set(["primary", "foreign", "constraint", "key", "unique", "index", "check"]);

type Row = Record<string, string>;

function parseColumns(sql: string): string[] {
  const match = sql.match(/\(([^]*)\)/m);
  if (!match) return [];

  return match[1]
    .split("\n")
    .map((line) => line.trim().replace(/,$/, ""))
    .filter(Boolean)
    .map((line) => line.split(/\s+/)[0]?.replace(/[`"']/g, "").toLowerCase())
    .filter((column): column is string => Boolean(column && !RESERVED.has(column)));
}

function createEmptyRow(columns: string[]): Row {
  return columns.reduce<Row>((acc, column) => {
    acc[column] = "";
    return acc;
  }, {});
}

export function DynamicSqlSandbox() {
  const [sql, setSql] = useState(DEFAULT_SQL);
  const [columns, setColumns] = useState<string[]>(() => parseColumns(DEFAULT_SQL));
  const [rows, setRows] = useState<Row[]>([
    { id: "1", first_name: "Avery", last_name: "Nguyen", department: "Data", salary: "92000" },
  ]);

  const parseError = useMemo(() => (columns.length ? "" : "Could not detect columns. Add SQL fields inside CREATE TABLE (...)."), [columns]);

  const syncRowsToColumns = (nextColumns: string[]) => {
    setRows((prev) => {
      if (!nextColumns.length) return prev;
      return prev.map((row) => {
        const next = createEmptyRow(nextColumns);
        nextColumns.forEach((column) => {
          if (row[column] !== undefined) next[column] = row[column];
        });
        return next;
      });
    });
  };

  const handleApplySql = () => {
    const nextColumns = parseColumns(sql);
    setColumns(nextColumns);
    syncRowsToColumns(nextColumns);
  };

  const handleAddColumn = () => {
    const name = window.prompt("New column name (snake_case recommended):", "new_column")?.trim().toLowerCase();
    if (!name || columns.includes(name)) return;

    const nextColumns = [...columns, name];
    setColumns(nextColumns);
    setRows((prev) => prev.map((row) => ({ ...row, [name]: "" })));

    const insert = `\nALTER TABLE employees ADD COLUMN ${name} VARCHAR(255);`;
    setSql((prev) => prev.trimEnd() + insert);
  };

  const handleAddRow = () => {
    if (!columns.length) return;
    setRows((prev) => [...prev, createEmptyRow(columns)]);
  };

  return (
    <div style={{ border: "1px solid var(--neutral-alpha-medium)", borderRadius: 12, overflow: "hidden", marginTop: 12, marginBottom: 20 }}>
      <div style={{ padding: 16, background: "var(--neutral-alpha-weak)", borderBottom: "1px solid var(--neutral-alpha-medium)" }}>
        <p style={{ margin: "0 0 8px", fontWeight: 600 }}>Interactive Dynamic SQL Sandbox</p>
        <p style={{ margin: "0 0 12px", opacity: 0.8, fontSize: 14 }}>Edit SQL or use quick actions, then apply changes to re-map the grid schema.</p>
        <textarea
          value={sql}
          onChange={(event) => setSql(event.target.value)}
          spellCheck={false}
          style={{ width: "100%", minHeight: 150, fontFamily: "monospace", fontSize: 13, padding: 10, borderRadius: 8, border: "1px solid var(--neutral-alpha-medium)" }}
        />
        <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
          <button onClick={handleApplySql} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid var(--neutral-alpha-medium)" }}>Apply SQL Schema</button>
          <button onClick={handleAddColumn} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid var(--neutral-alpha-medium)" }}>+ Add Column</button>
          <button onClick={handleAddRow} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid var(--neutral-alpha-medium)" }}>+ Add Row</button>
        </div>
        {parseError && <p style={{ color: "#d14343", marginTop: 8, marginBottom: 0, fontSize: 13 }}>{parseError}</p>}
      </div>

      <div style={{ overflowX: "auto", padding: 12 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column} style={{ textAlign: "left", padding: 10, borderBottom: "1px solid var(--neutral-alpha-medium)", textTransform: "capitalize" }}>
                  {column.replace(/_/g, " ")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td key={column} style={{ padding: 8, borderBottom: "1px solid var(--neutral-alpha-weak)" }}>
                    <input
                      value={row[column] ?? ""}
                      onChange={(event) => {
                        const value = event.target.value;
                        setRows((prev) => prev.map((item, index) => (index === rowIndex ? { ...item, [column]: value } : item)));
                      }}
                      placeholder={`Enter ${column}`}
                      style={{ width: "100%", padding: "6px 8px", borderRadius: 6, border: "1px solid var(--neutral-alpha-medium)" }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
