/**
 * Parse numbers from string of data. Numbers are \n seperated into lines.
 * @param {string} input String with data
 * @returns {number[]} Array of parsed numbers from the data, empty if no numbers
 */
export function parse(input) {

  if (typeof input !== "string" ||
    !input.includes("Númer;Heiti;Einingar;Kennslumisseri;Námstig;")) {
    return [];
  }
  const result = [];
  const array = input.split("\n");



  for (var i = 1; i < array.length - 1; i++) {
    const data = array[i].split(";");
    const fixed = fixer(data);
    if (validator(fixed) && typeof (fixed)) {
      const object = {
        number: fixed[0],
        title: fixed[1],
        credit: fixed[2],
        semester: fixed[3],
        level: fixed[4],
        url: fixed[5],
      };
      result.push(object);
    }
  }

  return result;
}

/**
 * Validate array if it's constructed right;
 * @param {*} item array to be checked
 * @returns boolean if true, every thing is correct, else false 
 */
export function validator(item) {
  const temp = item;
  if (temp.length !== 6) {   // Auka dálkur ?
    return false;
  }
  if (temp[1] === '') {   // Empty title
    return false
  }

  // Ef námsstig er tómt skal ekki birta það. ????
  return true;
}
/**
 * Fix invalid format 
 * @param {array} item unvalid array
 * @returns {array} temp fixed array
 */
export function fixer(item) {
  const temp = item;
  // Auka dálkur ?
  if (temp.length > 6) {
    return fixTitle(temp)
  }
  if (typeof temp[2] === 'string' && temp[2].includes(".")) {
    temp[2] = '';
  }
  // Kennslumisseri skal aðeins vera Vor, Sumar eða Haust
  if (!['Vor', 'Sumar', 'Haust'].includes(temp[3])) {

    temp[3] = '';
  }
  // Ef námsstig er tómt skal ekki birta það ?
  if (typeof temp[5] === 'string' && !temp[5].startsWith("https")) {
    temp[5] = '#';
  }
  return temp;
}
/**
 * Wrongling formated csv with two titles
 * @param {*} item 
 * @returns temp array, fixed title at size 6
 */
function fixTitle(item) {
  const fix = item[1] + (item[2]);
  const temp = [item[0], fix, item[3], item[4], item[5], item[6]];

  return fixer(temp);
}
