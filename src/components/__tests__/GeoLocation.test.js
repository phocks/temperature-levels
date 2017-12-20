const { h } = require('preact');
const render = require('preact-render-to-string');
const htmlLooksLike = require('html-looks-like');

const GeoLocation = require('../GeoLocation');

describe('GeoLocation', () => {
  test('It renders', () => {
    const actual = render(<GeoLocation />);
    const expected = `
      <div>
        Find me in {{ ... }}
      </div>
    `;

    htmlLooksLike(actual, expected);
  });
});
