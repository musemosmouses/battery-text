import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The battery's last text to its charger: three hours at 1% out of spite,
// and the payoff lands in the final words — the power bank treats it better.
const LAST_TEXT =
  "I held 1% for three hours out of pure spite just to tell you: the power bank treats me better than you ever did.";
const CHAR_LIMIT = 200;

if (LAST_TEXT.length < 1 || LAST_TEXT.length > CHAR_LIMIT) {
  throw new Error(
    `entry must be 1-${CHAR_LIMIT} characters, got ${LAST_TEXT.length}`,
  );
}
if (LAST_TEXT.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LAST_TEXT.includes("\n")) {
  throw new Error("entry must be a single line");
}

const destinationDir = process.env.MAKEFUN_OUTPUT_DIR || "out";
mkdirSync(destinationDir, { recursive: true });
writeFileSync(join(destinationDir, "entry.txt"), LAST_TEXT, "utf8");
