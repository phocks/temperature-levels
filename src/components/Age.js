const { h, Component } = require("preact");

const styles = require("./Age.scss");

class Age extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   originalMousePosX: 0,
    //   originalMousePosY: 0
    // };
  }

  // handleChange(event) {
  //   event.preventDefault();
  //   console.log(event);
  //   this.props.onAgeChange(event.target.innerText);
  // }

  handleMouseDown(event) {
    console.log(event);
    console.log(this.props.mousePosX, this.props.mousePosY);
    this.props.onSlideYear(event);
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
        <span className={styles.leftArrow} onClick={this.ageDown.bind(this)}>
          &lsaquo;{" "}
        </span>
        <span
          className={styles.number}
          onMouseDown={this.handleMouseDown.bind(this)}
        >
          <strong>{birthYear}</strong>
        </span>
        <span className={styles.rightArrow} onClick={this.ageUp.bind(this)}>
          {" "}
          &rsaquo;
        </span>
      </div>
    );
  }
}

module.exports = Age;
