import fs from 'fs';

import parse from '../src';

const testDirectory = './test';

describe('Portfolio Performance', () => {
  test('it should parse PP XML', () => {
    const xmlString = fs.readFileSync(
      `${testDirectory}/portfolio.xml`,
      'utf-8'
    );
    const expectedJson = fs.readFileSync(
      `${testDirectory}/portfolio.json`,
      'utf-8'
    );
    const result = parse(xmlString);

    expect(JSON.stringify(result, null, 2)).toEqual(expectedJson);
  });
});
