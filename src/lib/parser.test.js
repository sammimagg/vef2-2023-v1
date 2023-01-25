import { expect, it } from '@jest/globals';
import { parse } from "./lib/parser.js";

it('returns objects', () => {
    expect(parse('Númer;Heiti;Einingar;Kennslumisseri;Númstig;').length).toEqual(6);
});