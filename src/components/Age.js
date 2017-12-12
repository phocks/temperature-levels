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
    console.log("down");
    this.props.onAgeChange(this.props.birthYear - 1);
  }

  ageUp() {
    console.log("up");
    this.props.onAgeChange(this.props.birthYear + 1);
  }

  render() {
    const currentYear = 2017;
    const birthYear = this.props.birthYear;
    const age = currentYear - birthYear;
    return (
      <div className={styles.wrapper}>
        <span onClick={this.ageDown}>&larr; </span>
        <span onInput={this.handleChange}>{birthYear}</span>
        <span onClick={this.ageUp}> &rarr;</span>
      </div>
    );
  }
}

module.exports = Age;
