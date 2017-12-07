const { h, Component } = require("preact");

const styles = require("./Temperature.scss");

class Temperature extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        The temperature is {this.props.temp}.
      </div>
    );
  }
}

module.exports = Temperature;
