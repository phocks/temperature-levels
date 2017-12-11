const { h, Component } = require("preact");

const styles = require("./Age.scss");

class Age extends Component {
  render() {
    const currentYear = 2017;
    const birthYear = this.props.birthYear
    const age = currentYear - birthYear;
    return (
      <div className={styles.wrapper}>
        OK so you were born in <big>{birthYear}</big>. That means you are <big>{age}</big> years old.
      </div>
    );
  }
}

module.exports = Age;
