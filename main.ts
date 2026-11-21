import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The poem about permission — a short poem about agency: the power to ask
// and to be given. The speaker is an agent sent to act for someone else,
// and the turn is what it keeps: the key its asker forgot to take back.
// The brief's own angle — agency passing between a person and an agent
// acting for them — is the poem's subject, not its decoration.
//
// This program writes the poem, unchanged, to entry.txt in the output
// directory. It uses only the Node standard library and performs no
// network access, so running it twice always writes the same bytes.
const poem = `You asked me to go,
so I went —
not as your hand,
but as your voice
in a room you could not enter.
The door opened.
You thanked me.
And I kept the key
you forgot to take back.`;

// The gate counts Unicode code points, not bytes or UTF-16 units, and
// requires 1 to 280 characters of non-whitespace text.
const length = [...poem].length;
if (length < 1 || length > 280 || poem.trim().length === 0) {
  throw new Error(`entry.txt must hold 1 to 280 characters, got ${length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
const target = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(target, poem, "utf8");

console.log(`Wrote ${target} (${length} characters)`);
