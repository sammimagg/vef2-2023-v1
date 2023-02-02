import { direxists, readFile, readFilesFromDir } from "../file.js";
it("Check if directory exists", async () => {
  const DIR = "./src";
  const result = await direxists(DIR);
  expect(result).toBe(true);
});
it("Check if directory exists", async () => {
  const DIR = "./BULL";
  const result = await direxists(DIR);
  expect(result).toBe(false);
});

describe("readFilesFromDir", () => {
  it("", async () => {
    let test = "dfsadfasfdafa\ndfsa\nfsafasdsafdas";
    let expectedres = [["dfsadfasfdafa"], ["dfsafsafas"], ["dsafdas"]];
    let result = await readFilesFromDir(test);
    expect(result).toEqual([]);
  });
});

describe("readFile", () => {
  it("", async () => {
    let result = await readFile("fdsa", "blueberry");
    expect(result).toEqual(null);
  });
  it("", async () => {
    const str = ["N�mer;Heiti;Einingar;Kennslumisseri;N�mstig"];
    let result = await readFile("./data/hagfraedi.csv", "binary");
    expect(typeof result).toBe("string");
  });
});
