/**
 * Parse numbers from string of data. Numbers are \n seperated into lines.
 * @param {string} input String with data
 * @returns {number[]} Array of parsed numbers from the data, empty if no numbers
 */
export function parse(input) {
  if (
    typeof input !== "string" ||
    !input.includes("Númer;Heiti;Einingar;Kennslumisseri;Námstig;")
  ) {
    return [];
  }
  const result = [];
  const array = input.split("\n");

  for (var i = 1; i < array.length; i++) {
    const data = array[i].split(";");
    if (data.length === 6) {
      const object = {
        number: data[0],
        title: data[1],
        credit: data[2],
        semester: data[3],
        level: data[4],
        url: data[5],
      };
      result.push(object);
    }
  }

  if (result.length === 0) {
    return [];
  }
  return result;
}
