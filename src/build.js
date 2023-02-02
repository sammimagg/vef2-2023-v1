import { mkdir, writeFile } from "fs/promises";
import path, { join } from "path";
import { direxists, readFile, readFilesFromDir } from "./lib/file.js";
import { indexTemplate, tableTemplate } from "./lib/html.js";
import { parse } from "./lib/parser.js";

const DATA_DIR = "./data";
const OUTPUT_DIR = "./dist";

export async function main() {
  // ath ef './dist' er til
  if (!(await direxists(OUTPUT_DIR))) {
    await mkdir(OUTPUT_DIR);
  }

  const dataFiles = await readFilesFromDir(DATA_DIR);
  let indexObj = [];
  let results = [];

  for (const file of dataFiles) {
    if (path.basename(file).includes(".csv")) {
      const content = await readFile(file, "binary");
      const classes = parse(content);
      if (content && classes.length !== 0) {
        const csv = path.basename(file);

        const filename = `${csv.replace(/(.*)\.(.*?)$/, "$1")}.html`;

        const result = {
          filename,
          csv,
          classes,
        };

        results.push(result);
        const filepath = join(OUTPUT_DIR, filename);
        const template = tableTemplate(path.basename(file, ".csv"), result);
        await writeFile(filepath, template, { flag: "w+" });
      }
    } else if (path.basename(file).includes("index.json")) {
      const index = await readFile(file, "utf8");
      indexObj = JSON.parse(index);
    }
  }

  // Push to filtered if it has match from results(csv import), joins them to filtered
  let filtered = [];
  for (let i = 0; i < indexObj.length; i++) {
    for (let j = 0; j < results.length; j++) {
      if (indexObj[i].csv === results[j].csv) {
        const match = Object.assign(indexObj[i], results[j]);
        filtered.push(match);
      }
    }
  }

  const template = indexTemplate(filtered);
  const filepath = join(OUTPUT_DIR, "index.html");
  await writeFile(filepath, template, { flag: "w+" });
  return true;
}
main().catch((err) => console.error(err));
