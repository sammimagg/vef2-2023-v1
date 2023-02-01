import { expect } from "@jest/globals";
import { direxists } from "./file.js";
it('Check if directory exists', async () => {
    const DIR = './src';
    const result = await direxists(DIR);
    expect(result).toBe(true);
});
it('Check if directory exists', async () => {
    const DIR = './BULL';
    const result = await direxists(DIR);
    expect(result).toBe(false);
});
