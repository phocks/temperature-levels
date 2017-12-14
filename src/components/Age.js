const { h, Component } = require("preact");

const styles = require("./Age.scss");

class Age extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.ageDown = this.ageDown.bind(this);
    this.ageUp = this.ageUp.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    console.log(event);
    this.props.onAgeChange(event.target.innerText);
  }

  ageDown() {
    this.props.onAgeChange(this.props.birthYear - 1);
  }

  ageUp() {
    this.props.onAgeChange(this.props.birthYear + 1);
  }

  render() {
    const currentYear = 2017;
    const birthYear = this.props.birthYear;
    const age = currentYear - birthYear;
    return (
      <div className={styles.wrapper}>
        <span className={styles.leftArrow} onClick={this.ageDown}>
          &lsaquo;{" "}
        </span>
        <span className={styles.number} onInput={this.handleChange}>
          <strong>{birthYear}</strong>
        </span>
        <span className={styles.rightArrow} onClick={this.ageUp}>
          {" "}
          &rsaquo;
        </span>
      </div>
    );
  }
}

module.exports = Age;
