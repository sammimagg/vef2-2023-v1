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
    const obj = {
        title,
        description,
        cvs,
    }
    const array = Object.entries(results)
    console.log(array)
    const list = array
        .map(
            (item) => {
                console.log(item.title)
            })

}

export function statsTemplate(title, result) {
    return template(title);
}
export function indexTemplate(results) {
    return template("Námsleið", index(results));
}
