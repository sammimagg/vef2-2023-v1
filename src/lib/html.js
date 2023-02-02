export function template(title, content) {
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
export function index(results) {
    const list = results
        .map(
            (item) => `
            <li>
                <a href="${item.filename}">${item.title}</a>
                <p>${item.description}</p>
            </li>`
        )
        .join("\n");
    return `<section>
            <h1>Námsleiðir</h1>
            <ul>${list}</ul>
            </section>`;
}

export function tableTemplate(title, result) {
    let content = {};
    if (Array.isArray(result.classes)) {
        content = result.classes
            .map(
                (item) => `
                        <tr>
                            <td><a href="${item.url}">${item.number}</a></td>
                            <td><a href="${item.url}">${item.title}</a></td>
                            <td><a href="${item.url}">${item.credit}</a></td>
                            <td><a href="${item.url}">${item.semester}</a></td>
                            <td><a href="${item.url}">${item.level}</a></td>
                        </tr>`
            )
            .join("\n");
    } else {
        return [];
    }

    var table = `<table>
                    <tr>
                        <th>Númer</th>
                        <th>Heiti</th>
                        <th>Einingar</th>
                        <th>Kennslumisseri</th>
                        <th>Námstig</th>
                    </tr>
                        ${content}
                </table>`;

    return template(title, table);
}
export function indexTemplate(results) {
    return template("Námsleið", index(results));
}
