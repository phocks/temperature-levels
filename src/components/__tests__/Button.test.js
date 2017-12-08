const { h } = require('preact');
const render = require('preact-render-to-string');
const htmlLooksLike = require('html-looks-like');

const Button = require('../Button');

describe('Button', () => {
  test('It renders', () => {
    const actual = render(<Button />);
    const expected = `
      <div>
        Find me in {{ ... }}
      </div>
    `;

    htmlLooksLike(actual, expected);
  });
});
