const { h, Component } = require("preact");

const styles = require("./Temperature.scss");

class Temperature extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <p>The temperature is {this.props.temp}.</p>
      </div>
    );
  }
}

module.exports = Temperature;
