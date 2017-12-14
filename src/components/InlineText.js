const { h, Component } = require('preact');

const styles = require('./InlineText.scss');

class InlineText extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        Find me in <strong>src/components/InlineText.js</strong>
      </div>
    );
  }
}

module.exports = InlineText;