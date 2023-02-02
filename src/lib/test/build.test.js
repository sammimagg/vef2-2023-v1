import { writeFile } from "fs/promises";
import path from "path";
import { readFile } from "../file.js";

describe("writeFile function", () => {
    it("writes the file to the specified path", async () => {
        const filepath = path.join('./data', "output.html");
        const template = "<html><body>Test Content</body></html>";

        await writeFile(filepath, template, { flag: "w+" });

        const contents = await readFile(file, 'utf8');
        expect(contents).toBe(template);

        // Clean up the test file
        await fs.promises.unlink(filepath);
    });
});
