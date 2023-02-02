import { index, tableTemplate, template } from "../html.js";

describe("template", () => {
  it("Return empty template", async () => {
    const title = "";
    const content = "";
    const result = `<!doctype html>
<html lang="is">
    <head>
        <meta charset="utf-8">
        <title></title>
        <link rel="stylesheet" href="../public/styles.css">
    </head>
    <body></body>
</html>`;
    expect(template(title, content)).toEqual(result);
  });
});
describe("index", () => {
  it("Return empty template", () => {
    const files = [
      {
        title: "Hagfræðideild",
        filename: "Hagfræðideild.csv",
        description:
          "Menntun í Hagfræðideild er greiðasta leiðin til þátttöku, rannsókna og skilnings á hagkerfi okkar. Kennslan stendur á sterkum grunni og er markmið námsins að veita nemendum góðan undirbúning í hagfræði, stærðfræði og tölfræði og möguleika á sérhæfingu í öðrum greinum.",
        csv: "hagfraedi.csv",
      },
    ];
    const list = files
      .map(
        (item) => `
            <li>
                <a href="${item.filename}">${item.title}</a>
                <p>${item.description}</p>
            </li>`
      )
      .join("\n");
    const result = `<section>
            <h1>Námsleiðir</h1>
            <ul>${list}</ul>
            </section>`;
    expect(index(files)).toEqual(result);
  });
});
describe("tableTemplate", () => {
  it("Return template for table containg data that was given", () => {
    const item = {
      number: "OSS014F",
      title: "Verkefni í opinberri stjórnsýslu",
      credit: "4",
      semester: "Sumar",
      level: "Framhaldsnám",
      url: "https://ugla.hi.is/kennsluskra/?tab=nam&chapter=namskeid&id=10591720233&kennsluar=2022",
    };
    let results = [
      {
        filename: "vidskiptafraedi.html",
        csv: "vidskiptafraedi.csv",
        classes: [[item], [item]],
      },
    ];

    let list = `
                        <tr>
                            <td><a href="${item.url}">${item.number}</a></td>
                            <td><a href="${item.url}">${item.title}</a></td>
                            <td><a href="${item.url}">${item.credit}</a></td>
                            <td><a href="${item.url}">${item.semester}</a></td>
                            <td><a href="${item.url}">${item.level}</a></td>
                        </tr>`;

    var table = `<table>
        <tr>
            <th>Númer</th>
            <th>Heiti</th>
            <th>Einingar</th>
            <th>Kennslumisseri</th>
            <th>Námstig</th>
        </tr>
            ${list}
    </table>`;

    const result = `<section>
            <h1>Námsleiðir</h1>
            <ul>${table}</ul>
            </section>`;
    const expected = `<!doctype html>
<html lang=\"is\">
    <head>
        <meta charset=\"utf-8\">
        <title>[object Object]</title>
        <link rel=\"stylesheet\" href=\"../public/styles.css\">
    </head>
    <body><table>
                    <tr>
                        <th>Númer</th>
                        <th>Heiti</th>
                        <th>Einingar</th>
                        <th>Kennslumisseri</th>
                        <th>Námstig</th>
                    </tr>
                        [object Object]
                </table></body>
</html>`;

    expect(tableTemplate(results, "TET")).toEqual([]);
  });
});
