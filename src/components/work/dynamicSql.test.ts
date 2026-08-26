import assert from "node:assert/strict";
import test from "node:test";
import { isValidColumnIdentifier, parseColumns } from "./dynamicSql";

test("parses CREATE TABLE columns without treating type parentheses as the table boundary", () => {
  const sql = `CREATE TABLE employees (
    id INT PRIMARY KEY,
    salary DECIMAL(10,2),
    CONSTRAINT positive_salary CHECK (salary > 0)
  );`;

  assert.deepEqual(parseColumns(sql), ["id", "salary"]);
});

test("keeps quick-added ALTER TABLE columns when the schema is applied again", () => {
  const sql = `CREATE TABLE employees (
    id INT PRIMARY KEY,
    first_name VARCHAR(50)
  );
  ALTER TABLE employees ADD COLUMN preferred_name VARCHAR(255);`;

  assert.deepEqual(parseColumns(sql), ["id", "first_name", "preferred_name"]);
});

test("accepts only safe unquoted identifiers from the quick-add control", () => {
  assert.equal(isValidColumnIdentifier("preferred_name_2"), true);
  assert.equal(isValidColumnIdentifier("2nd_name"), false);
  assert.equal(isValidColumnIdentifier("name; DROP TABLE employees"), false);
});
