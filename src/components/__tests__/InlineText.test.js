const { h } = require('preact');
const render = require('preact-render-to-string');
const htmlLooksLike = require('html-looks-like');

const InlineText = require('../InlineText');

describe('InlineText', () => {
  test('It renders', () => {
    const actual = render(<InlineText />);
    const expected = `
      <div>
        Find me in {{ ... }}
      </div>
    `;

    htmlLooksLike(actual, expected);
  });
});
