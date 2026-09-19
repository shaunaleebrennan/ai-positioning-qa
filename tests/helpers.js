import { readFile } from "node:fs/promises";

export async function readFixture(name) {
  const url = new URL(`../examples/${name}`, import.meta.url);
  return JSON.parse(await readFile(url, "utf8"));
}

export function clone(value) {
  return JSON.parse(JSON.stringify(value));
}
