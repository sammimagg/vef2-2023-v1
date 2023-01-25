function template(title, content) {
    return `<!doctype html>
<html lang="is">
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <link rel="stylesheet" href="../public/styles.css">
  </head>
  <body>${content}</body>
</html>`;
}
function index(indexJSON, results) {
    console.log(results)

    const list = indexJSON
        .map(
            (item) => `
            <li>
                <a href="${item.title}">${item.title}</a>
                <p>${item.desciption}</p>
            </li>`
        )
        .join('\n');

    return `<section>
            <h1>Gagnavinnsla</h1>
            <ul>${list}</ul>
            </section>`;

}

export function statsTemplate(title, result) {
    return template(title);
}
export function indexTemplate(indexJSON, results) {
    return template("Námsleið", index(indexJSON, results));
}
