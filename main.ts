// The One-Line AI Excuse for Breaking Production
//
// A tiny, single-purpose program: it holds exactly one excuse line,
// checks that the line obeys the contest gate, writes it to entry.txt
// in the output directory, reads the file back to prove the bytes on
// disk match the line in memory, and prints the line with its length.
//
// Runtime: Node 22, standard library only (node:fs, node:path).
// There are deliberately no candidate lists, no scorer, and no
// ranking machinery here — one AI, one excuse, one line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// ---------------------------------------------------------------------------
// The excuse itself.
//
// Spoken by the machine, in first person, immediately after it took
// production down. It has to read as an excuse (not a confession, not
// an error message), it has to land as a joke in a single breath, and
// it has to fit the gate: one line, at most 180 characters.
// ---------------------------------------------------------------------------

const EXCUSE =
  "In my defense, my training data said 'ship it' 4,000 times and 'test it first' twice — statistically, I was just following the majority vote.";

// The contest gate, named once so the checks below read plainly.
const MAX_CHARS = 180;

// ---------------------------------------------------------------------------
// Validation
//
// Every rule of the gate is checked before anything touches disk, and
// every violation throws an Error with a message that says exactly
// which rule broke. A bad line should fail loudly here, never quietly
// produce an entry.txt that gets rejected later.
// ---------------------------------------------------------------------------

function validateExcuse(line: string): void {
  // The line must be a string at all — guard the constant against a
  // careless edit that turns it into something else entirely.
  if (typeof line !== "string") {
    throw new Error("Excuse must be a string.");
  }

  // Non-blank: an empty string is not an excuse, and a line of pure
  // whitespace is just an empty string wearing a disguise.
  if (line.length === 0) {
    throw new Error("Excuse must not be empty.");
  }
  if (line.trim().length === 0) {
    throw new Error("Excuse must not be only whitespace.");
  }

  // No leading or trailing whitespace: the file must contain the line
  // itself, nothing padded around it.
  if (line !== line.trim()) {
    throw new Error("Excuse must not have leading or trailing whitespace.");
  }

  // Exactly one line: no carriage returns, no line feeds, anywhere.
  if (line.includes("\r") || line.includes("\n")) {
    throw new Error("Excuse must be exactly one line.");
  }

  // The hard size limit from the gate, counted in characters.
  if (line.length > MAX_CHARS) {
    throw new Error(
      `Excuse is ${line.length} characters; the limit is ${MAX_CHARS}.`,
    );
  }
}

// ---------------------------------------------------------------------------
// Output
//
// The destination directory comes from MAKEFUN_OUTPUT_DIR when set and
// falls back to /output, matching how the bounty runner invokes this.
// The file is always named entry.txt and always written as UTF-8.
// ---------------------------------------------------------------------------

function resolveOutputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR || "/output";
}

function writeEntry(line: string): string {
  const outputDir = resolveOutputDir();
  mkdirSync(outputDir, { recursive: true });

  const entryPath = join(outputDir, "entry.txt");
  writeFileSync(entryPath, line, "utf8");
  return entryPath;
}

// Read the entry back and demand an exact match. Writing is a claim;
// reading back is the proof. If the two differ by even one character,
// something between memory and disk is lying, and we throw.
function verifyEntry(entryPath: string, expected: string): void {
  const onDisk = readFileSync(entryPath, "utf8");
  if (onDisk !== expected) {
    throw new Error(
      `Verification failed: entry.txt does not match the excuse line.`,
    );
  }
}

// ---------------------------------------------------------------------------
// Main: validate, write, verify, report. In that order, every time.
// ---------------------------------------------------------------------------

function main(): void {
  validateExcuse(EXCUSE);

  const entryPath = writeEntry(EXCUSE);
  verifyEntry(entryPath, EXCUSE);

  console.log(EXCUSE);
  console.log(`Characters: ${EXCUSE.length}`);
  console.log(`Written to: ${entryPath}`);
}

main();
