const { h, Component } = require("preact");

const styles = require("./Age.scss");

class Age extends Component {
  render() {
    const age = this.props.age
    return (
      <div className={styles.wrapper}>
        <big>{age}</big>
      </div>
    );
  }
}

module.exports = Age;
