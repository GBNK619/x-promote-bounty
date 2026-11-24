// post-x-promote-make-your-own-bounty-01 entry (Node 22, standard library only).
// The post itself is the entry: one post of your own on X that quotes make.fun's
// make-your-own-bounty post (https://x.com/makefunai/status/2124915864336236646)
// or links to it, with a photo of its own attached and make.fun or the @makefunai
// tag and your play code in its text. This program only hands in the post's
// address: it copies POST.json from the repository root to /output/POST.json.
// Nothing this program writes about the post is scored.
//
// Run it locally:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });

let post: string;
try {
  post = readFileSync(join(BOT_DIR, 'POST.json'), 'utf8');
} catch (err) {
  console.error(`POST.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

try {
  JSON.parse(post);
} catch {
  console.error('POST.json is not valid JSON');
  process.exit(1);
}

// The copy is verbatim on purpose: the house reads POST.json itself, so the
// bytes handed in must be exactly the bytes committed in the repository.
writeFileSync(join(OUTPUT_DIR, 'POST.json'), post);
console.log(`POST.json copied to ${join(OUTPUT_DIR, 'POST.json')}`);
