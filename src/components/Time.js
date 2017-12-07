const { h, Component } = require("preact");

const styles = require("./Time.scss");

class Time extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <h1 className="display-2">
          It is {this.state.date.toLocaleTimeString()}.
        </h1>
      </div>
    );
  }
}

module.exports = Time;
