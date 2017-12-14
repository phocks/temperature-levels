const { h, Component } = require('preact');

const styles = require('./InlineText.scss');

class InlineText extends Component {
  render(props, state) {
    return (
      <span className={styles.wrapper}>
        {props.text}
      </span>
    );
  }
}

module.exports = InlineText;