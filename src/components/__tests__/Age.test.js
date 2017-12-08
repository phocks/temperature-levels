const { h } = require('preact');
const render = require('preact-render-to-string');
const htmlLooksLike = require('html-looks-like');

const Age = require('../Age');

describe('Age', () => {
  test('It renders', () => {
    const actual = render(<Age />);
    const expected = `
      <div>
        Find me in {{ ... }}
      </div>
    `;

    htmlLooksLike(actual, expected);
  });
});
