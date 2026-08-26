const RESERVED = new Set([
  "primary",
  "foreign",
  "constraint",
  "key",
  "unique",
  "index",
  "check",
]);

const IDENTIFIER_PATTERN = "(?:\\[[^\\]]+\\]|`[^`]+`|\"[^\"]+\"|[A-Za-z_][A-Za-z0-9_$]*)";

const cleanIdentifier = (identifier: string): string =>
  identifier.replace(/^\[|\]$/g, "").replace(/^[`\"]|[`\"]$/g, "").toLowerCase();

const findCreateTableBody = (sql: string): string | null => {
  const createTable = /\bcreate\s+table\b/i.exec(sql);
  if (!createTable) return null;

  const openIndex = sql.indexOf("(", createTable.index + createTable[0].length);
  if (openIndex === -1) return null;

  let depth = 0;
  let quote: "'" | '"' | "`" | "]" | null = null;

  for (let index = openIndex; index < sql.length; index += 1) {
    const character = sql[index];

    if (quote) {
      if (character === quote || (quote === "]" && character === "]")) {
        quote = null;
      }
      continue;
    }

    if (character === "'" || character === '"' || character === "`") {
      quote = character;
      continue;
    }
    if (character === "[") {
      quote = "]";
      continue;
    }
    if (character === "(") depth += 1;
    if (character === ")") {
      depth -= 1;
      if (depth === 0) return sql.slice(openIndex + 1, index);
    }
  }

  return null;
};

const splitDefinitions = (body: string): string[] => {
  const definitions: string[] = [];
  let current = "";
  let depth = 0;
  let quote: "'" | '"' | "`" | "]" | null = null;

  for (const character of body) {
    if (quote) {
      current += character;
      if (character === quote || (quote === "]" && character === "]")) quote = null;
      continue;
    }

    if (character === "'" || character === '"' || character === "`") quote = character;
    if (character === "[") quote = "]";
    if (character === "(") depth += 1;
    if (character === ")") depth = Math.max(0, depth - 1);

    if (character === "," && depth === 0) {
      definitions.push(current.trim());
      current = "";
      continue;
    }

    current += character;
  }

  if (current.trim()) definitions.push(current.trim());
  return definitions;
};

const readLeadingIdentifier = (definition: string): string | null => {
  const match = new RegExp(`^\\s*(${IDENTIFIER_PATTERN})`, "i").exec(definition);
  if (!match) return null;

  const identifier = cleanIdentifier(match[1]);
  return RESERVED.has(identifier) ? null : identifier;
};

export const parseColumns = (sql: string): string[] => {
  const columns: string[] = [];
  const body = findCreateTableBody(sql);

  if (body) {
    splitDefinitions(body).forEach((definition) => {
      const identifier = readLeadingIdentifier(definition);
      if (identifier) columns.push(identifier);
    });
  }

  const alterPattern = new RegExp(
    `\\balter\\s+table\\s+${IDENTIFIER_PATTERN}\\s+add\\s+(?:column\\s+)?(${IDENTIFIER_PATTERN})`,
    "gi",
  );

  for (const match of sql.matchAll(alterPattern)) {
    const identifier = cleanIdentifier(match[1]);
    if (!RESERVED.has(identifier)) columns.push(identifier);
  }

  return [...new Set(columns)];
};

export const isValidColumnIdentifier = (value: string): boolean =>
  /^[A-Za-z_][A-Za-z0-9_]*$/.test(value);
