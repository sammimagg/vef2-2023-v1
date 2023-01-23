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
function index(results) {
    const list = results
        .map(
            (result) => `
  <li>
    <a href="${result.filename}">${result.title}</a>
    <p>${result.numbers.length} tölur</p>
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
export function indexTemplate(results) {
    return template('Gagnavinnsla', index(results));
}