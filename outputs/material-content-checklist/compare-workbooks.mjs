import fs from "node:fs/promises";
import { SpreadsheetFile } from "@oai/artifact-tool";

const originalPath = "D:/Work/resume/transkaik.github.io/outputs/material-content-checklist/Eleanor_Zhang_website_content_material_checklist.xlsx";
const editedPath = "D:/Work/resume/transkaik.github.io/assets/home/Eleanor_Zhang_website_content_material_checklist.xlsx";

async function load(file) {
  const bytes = await fs.readFile(file);
  const wb = await SpreadsheetFile.importXlsx(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
  const sheet = wb.worksheets.getItem("内容与素材清单");
  return sheet.getRange("A7:O40").values;
}

const [before, after] = await Promise.all([load(originalPath), load(editedPath)]);
const headers = after[0];
const diffs = [];
for (let r = 1; r < after.length; r++) {
  const id = after[r]?.[0] ?? before[r]?.[0];
  if (id === null || id === undefined || id === "") continue;
  const changes = [];
  for (let c = 0; c < headers.length; c++) {
    const oldVal = before[r]?.[c] ?? "";
    const newVal = after[r]?.[c] ?? "";
    if (String(oldVal) !== String(newVal)) changes.push({column: headers[c], before: oldVal, after: newVal});
  }
  if (changes.length) diffs.push({id, module: after[r]?.[1], submodule: after[r]?.[2], changes});
}
console.log(JSON.stringify({headers, diffs}, null, 2));
