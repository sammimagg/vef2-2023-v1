import { readFile } from 'fs';
import {mkdir, writeFile} from 'fs/promises';
import path, {join} from 'path';

const DATA_DIR = './data';
const OUTPUT_DIR = './dist';

async function main() {
    // ath ef './dist' er til
    if(!(await direxists(OUTPUT_DIR))){
        await mkdir(OUTPUT_DIR);
    }
    
    const dataFiles = await readFilesFromDir(DATA_DIR);
    const result = [];
}
main().catch((err) => console.error(err));