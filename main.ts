import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The whole entry: my honest count of browser tabs open right now,
// in digits and nothing else. The count is assembled digit by digit
// so each place of the number is explicit.
const DIGITS: readonly string[] = ["4", "0", "4"];
const ENTRY_TEXT = DIGITS.join("");

const OUTPUT_DIR = "/output";
const OUTPUT_PATH = join(OUTPUT_DIR, "entry.txt");

// The gate allows 1-5 characters of UTF-8 text, not only whitespace.
const MIN_LENGTH = 1;
const MAX_LENGTH = 5;

function checkEntry(text: string): void {
  if (text.length < MIN_LENGTH || text.length > MAX_LENGTH) {
    throw new Error(
      `Entry is ${text.length} characters, outside the ${MIN_LENGTH}-${MAX_LENGTH} range.`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("Entry must not be only whitespace.");
  }
}

function main(): void {
  checkEntry(ENTRY_TEXT);

  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_PATH, ENTRY_TEXT, "utf8");
}

main();
