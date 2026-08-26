import assert from "node:assert/strict";
import test from "node:test";

import { normalizeRecord, parseInput, runDataIntegrityPipeline } from "./engine";
import type { RawRecord } from "./types";

const identity = (overrides: RawRecord = {}): RawRecord => ({
  firstName: "Alice",
  lastName: "Nguyen",
  dateOfBirth: "1989-03-14",
  ssnLast4: "1122",
  sourceSystemId: "CRM_A",
  externalClientId: "A-1001",
  ...overrides,
});

test("routes a composite-ID identity conflict to manual review", () => {
  const [original, conflicting] = runDataIntegrityPipeline([
    identity(),
    identity({ firstName: "Alicia" }),
  ]);

  assert.equal(original.decision, "Import as new");
  assert.equal(conflicting.matches[0]?.type, "collision");
  assert.equal(conflicting.matches[0]?.targetId, "CRM_A:A-1001");
  assert.equal(conflicting.decision, "Manual review");
  assert.match(conflicting.explanation, /materially different identity details/i);
});

test("keeps a composite-ID match exact when material identity agrees", () => {
  const [, duplicate] = runDataIntegrityPipeline([
    identity({ email: "alice@example.com" }),
    identity({ email: "alice+new@example.com" }),
  ]);

  assert.equal(duplicate.matches[0]?.type, "exact");
  assert.equal(duplicate.decision, "Update existing");
});

test("normalizes non-string JSON scalar fields without throwing", () => {
  const parsed = parseInput(JSON.stringify({
    firstName: 101,
    lastName: true,
    dateOfBirth: 19890314,
    ssnLast4: 1122,
    email: false,
    phone: 5551112222,
    street: 123,
    city: null,
    state: 12,
    zip: 80203,
    sourceSystemId: 7,
    externalClientId: 1001,
  }));

  assert.equal(parsed.error, undefined);
  assert.equal(parsed.records.length, 1);
  assert.deepEqual(normalizeRecord(parsed.records[0]), {
    firstName: "101",
    lastName: "True",
    dateOfBirth: "19890314",
    ssnLast4: "1122",
    email: "false",
    phone: "5551112222",
    street: "123",
    city: "",
    state: "12",
    zip: "80203",
    sourceSystemId: "7",
    externalClientId: "1001",
  });
});
