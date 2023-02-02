import { fixer, parse, validator } from "../parser.js";

it("returns objects", () => {
  expect(
    parse(`Númer;Heiti;Einingar;Kennslumisseri;Námstig;
    TÁK502G;Táknmálstúlkun I;20;Haust;Grunnnám;https://ugla.hi.is/kennsluskra/?tab=nam&chapter=namskeid&id=05102020226&kennsluar=2022
    AMV105G;Mál annarrar ættar I: tyrkneska;10;Haust;Grunnnám;https://ugla.hi.is/kennsluskra/?tab=nam&chapter=namskeid&id=70852020226&kennsluar=2022
    ÞÝÐ601F;Einstaklingsverkefni í þýðingafræði;10;Sumar;Framhaldsnám;https://ugla.hi.is/kennsluskra/?tab=nam&chapter=namskeid&id=05021620233&kennsluar=2022
     `).length
  ).toEqual(3);
});

it("returns empty array", () => {
  const test = `x
    ;
    123
    
    
    
    ;;;;;`;
  expect(parse(test)).toEqual([]);
});
it("returns boolean", () => {
  const array = [
    "ÍSL241L",
    "BA-ritgerð í íslensku",
    "10",
    "Sumar",
    "Grunnnám",
    "https://ugla.hi.is/kennsluskra/?tab=nam&chapter=namskeid&id=91002920233&kennsluar=2022",
  ];
  expect(validator(array)).toBe(true);
});

it("returns boolean", () => {
  const array = [];
  array.push("ÍSL241L", "BA-ritgerð í íslensku", "10", "Sumar");
  validator(array);
  expect(validator(array)).toBe(false);
});
it("returns boolean", () => {
  const array = [
    "ÍSL241L",
    "",
    "10",
    "Sumar",
    "Grunnnám",
    "https://ugla.hi.is/kennsluskra/?tab=nam&chapter=namskeid&id=91002920233&kennsluar=2022",
  ];
  validator(array);
  expect(validator(array)).toBe(false);
});

it("Auka dálkur ?", () => {
  const array = [
    "ÍSL241L",
    "BA-ritgerð í íslensku",
    " Þetta er frammhald",
    "10",
    "Sumar",
    "Grunnnám",
    "https://ugla.hi.is/kennsluskra/?tab=nam&chapter=namskeid&id=91002920233&kennsluar=2022",
  ];
  const fixed = [
    "ÍSL241L",
    "BA-ritgerð í íslensku Þetta er frammhald",
    "10",
    "Sumar",
    "Grunnnám",
    "https://ugla.hi.is/kennsluskra/?tab=nam&chapter=namskeid&id=91002920233&kennsluar=2022",
  ];
  expect(fixer(array)).toEqual(fixed);
});
it("Punktur í stað kommu", () => {
  const array = [
    "ÍSL241L",
    "BA-ritgerð í íslensku",
    "7.5",
    "Sumar",
    "Grunnnám",
    "https://ugla.hi.is/kennsluskra/?tab=nam&chapter=namskeid&id=91002920233&kennsluar=2022",
  ];
  const fixed = [
    "ÍSL241L",
    "BA-ritgerð í íslensku",
    "",
    "Sumar",
    "Grunnnám",
    "https://ugla.hi.is/kennsluskra/?tab=nam&chapter=namskeid&id=91002920233&kennsluar=2022",
  ];
  expect(fixer(array)).toEqual(fixed);
});
it("Kennslumisseri skal aðeins vera Vor, Sumar eða Haust", () => {
  const array = [
    "ÍSL241L",
    "BA-ritgerð í íslensku",
    "10",
    "Lumar",
    "Grunnnám",
    "https://ugla.hi.is/kennsluskra/?tab=nam&chapter=namskeid&id=91002920233&kennsluar=2022",
  ];
  const fixed = [
    "ÍSL241L",
    "BA-ritgerð í íslensku",
    "10",
    "",
    "Grunnnám",
    "https://ugla.hi.is/kennsluskra/?tab=nam&chapter=namskeid&id=91002920233&kennsluar=2022",
  ];
  expect(fixer(array)).toEqual(fixed);
});
it("Ef námsstig er tómt skal ekki birta það", () => {
  const array = [
    "ÍSL241L",
    "BA-ritgerð í íslensku",
    "10",
    "Lumar",
    "Grunnnám",
    "ennsluskra/?tab=nam&chapter=namskeid&id=91002920233&kennsluar=2022",
  ];
  const fixed = ["ÍSL241L", "BA-ritgerð í íslensku", "10", "", "Grunnnám", "#"];
  expect(fixer(array)).toEqual(fixed);
});
