const { h } = require('preact');
const render = require('preact-render-to-string');
const htmlLooksLike = require('html-looks-like');

const Temperature = require('../Temperature');

describe('Temperature', () => {
  test('It renders', () => {
    const actual = render(<Temperature />);
    const expected = `
      <div>
        Find me in {{ ... }}
      </div>
    `;

    htmlLooksLike(actual, expected);
  });
});
