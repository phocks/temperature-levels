const { h, Component } = require('preact');

const styles = require('./Age.scss');

class Age extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        Find me in <strong>src/components/Age.js</strong>
      </div>
    );
  }
}

module.exports = Age;