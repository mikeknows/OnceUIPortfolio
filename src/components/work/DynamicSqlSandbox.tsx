"use client";

import { CSSProperties, useMemo, useState } from "react";

const DEFAULT_SQL = `CREATE TABLE employees (
  id INT PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  department VARCHAR(50),
  salary DECIMAL(10,2)
);`;

const DEFAULT_ROWS = [
  { id: "1", first_name: "Avery", last_name: "Nguyen", department: "Data", salary: "92000" },
];

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

const buttonStyle: CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid var(--neutral-alpha-medium)",
  background: "var(--neutral-alpha-weak)",
  color: "inherit",
  fontWeight: 600,
  cursor: "pointer",
};

export function DynamicSqlSandbox() {
  const initialColumns = useMemo(() => parseColumns(DEFAULT_SQL), []);

  const [sql, setSql] = useState(DEFAULT_SQL);
  const [columns, setColumns] = useState<string[]>(initialColumns);
  const [rows, setRows] = useState<Row[]>(DEFAULT_ROWS);
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [newColumn, setNewColumn] = useState("new_column");

  const parseError = useMemo(
    () => (columns.length ? "" : "Could not detect columns. Add SQL fields inside CREATE TABLE (...)."),
    [columns],
  );

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

  const handleReset = () => {
    setSql(DEFAULT_SQL);
    setColumns(initialColumns);
    setRows(DEFAULT_ROWS);
    setNewColumn("new_column");
    setShowColumnModal(false);
  };

  const handleConfirmAddColumn = () => {
    const name = newColumn.trim().toLowerCase();
    if (!name || columns.includes(name)) return;

    const nextColumns = [...columns, name];
    setColumns(nextColumns);
    setRows((prev) => prev.map((row) => ({ ...row, [name]: "" })));

    const insert = `\nALTER TABLE employees ADD COLUMN ${name} VARCHAR(255);`;
    setSql((prev) => prev.trimEnd() + insert);
    setShowColumnModal(false);
    setNewColumn("new_column");
  };

  const handleAddRow = () => {
    if (!columns.length) return;
    setRows((prev) => [...prev, createEmptyRow(columns)]);
  };

  return (
    <div
      style={{
        border: "1px solid var(--neutral-alpha-medium)",
        borderRadius: 16,
        overflow: "hidden",
        marginTop: 12,
        marginBottom: 20,
        boxShadow: "0 10px 26px rgba(14,17,33,0.10)",
        background: "var(--page-background)",
      }}
    >
      <div style={{ padding: 18, borderBottom: "1px solid var(--neutral-alpha-medium)" }}>
        <p style={{ margin: "0 0 8px", fontWeight: 700, fontSize: 16 }}>Interactive Dynamic SQL Sandbox</p>
        <p style={{ margin: "0 0 12px", opacity: 0.85, fontSize: 14 }}>
          Edit SQL or use quick actions, then apply changes to re-map the grid schema.
        </p>
        <textarea
          value={sql}
          onChange={(event) => setSql(event.target.value)}
          spellCheck={false}
          style={{
            width: "100%",
            minHeight: 160,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            fontSize: 13,
            lineHeight: 1.5,
            padding: 12,
            borderRadius: 12,
            border: "1px solid var(--neutral-alpha-medium)",
            background: "var(--page-background)",
            color: "inherit",
          }}
        />
        <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
          <button onClick={handleApplySql} style={buttonStyle}>
            Apply SQL Schema
          </button>
          <button onClick={() => setShowColumnModal(true)} style={buttonStyle}>
            + Add Column
          </button>
          <button onClick={handleAddRow} style={buttonStyle}>
            + Add Row
          </button>
          <button
            onClick={handleReset}
            style={{
              ...buttonStyle,
              background: "var(--neutral-alpha-weak)",
            }}
          >
            Reset Sandbox
          </button>
        </div>
        {parseError && <p style={{ color: "#ff7171", marginTop: 8, marginBottom: 0, fontSize: 13 }}>{parseError}</p>}
      </div>

      <div style={{ overflowX: "auto", padding: 12 }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, minWidth: 560 }}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  style={{
                    textAlign: "left",
                    padding: "10px 12px",
                    borderBottom: "1px solid var(--neutral-alpha-medium)",
                    textTransform: "capitalize",
                    background: "var(--neutral-alpha-weak)",
                  }}
                >
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
                        setRows((prev) =>
                          prev.map((item, index) => (index === rowIndex ? { ...item, [column]: value } : item)),
                        );
                      }}
                      placeholder={`Enter ${column}`}
                      style={{
                        width: "100%",
                        padding: "8px 10px",
                        borderRadius: 10,
                        border: "1px solid var(--neutral-alpha-medium)",
                        background: "var(--page-background)",
                        color: "inherit",
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showColumnModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(17, 20, 30, 0.35)",
            backdropFilter: "blur(5px)",
            display: "grid",
            placeItems: "center",
            padding: 16,
          }}
        >
          <div
            style={{
              width: "min(440px, 100%)",
              borderRadius: 14,
              border: "1px solid var(--neutral-alpha-medium)",
              background: "var(--page-background)",
              boxShadow: "0 18px 44px rgba(8, 10, 20, 0.20)",
              padding: 16,
            }}
          >
            <p style={{ margin: "0 0 8px", fontWeight: 700 }}>Add a new SQL column</p>
            <p style={{ margin: "0 0 12px", fontSize: 13, opacity: 0.82 }}>
              Choose a column name and it will be appended to the schema and mapped into the grid.
            </p>
            <input
              value={newColumn}
              onChange={(event) => setNewColumn(event.target.value)}
              placeholder="new_column"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid var(--neutral-alpha-medium)",
                background: "var(--page-background)",
                color: "inherit",
              }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
              <button
                onClick={() => setShowColumnModal(false)}
                style={{
                  ...buttonStyle,
                  background: "var(--neutral-alpha-weak)",
                }}
              >
                Cancel
              </button>
              <button onClick={handleConfirmAddColumn} style={buttonStyle}>
                Add Column
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
