import { mkdir, writeFile } from 'fs/promises';
import path, { join } from 'path';
import { direxists, readFile, readFilesFromDir } from './lib/file.js';
import { statsTemplate } from './lib/html.js';
import { parse } from './lib/parser.js';

const DATA_DIR = './data';
const OUTPUT_DIR = './dist';

async function main() {
    // ath ef './dist' er til
    if (!(await direxists(OUTPUT_DIR))) {
        await mkdir(OUTPUT_DIR);
    }

    const dataFiles = await readFilesFromDir(DATA_DIR);
    const results = [];

    for (const file of dataFiles) {
        if (path.basename(file).includes(".csv")) {
            const content = await readFile(file);
            const classes = parse(content);
            if (content && classes.length !== 0) {
                const title = path.basename(file);


                const filename = `${title}.html`;
                const result = {
                    title,
                    filename,
                    classes,
                };


                const filepath = join(OUTPUT_DIR, filename);
                const template = statsTemplate(path.basename(file, '.csv'), result);
                await writeFile(filepath, template, { flag: 'w+' });
            }
            const filepath = join(OUTPUT_DIR, 'index.html');
        }

    }

    //const template = indexTemplate(results)//;

    //await writeFile(filepath, template, { flag: 'w+' });
}
main().catch((err) => console.error(err));
