const { h, Component } = require("preact");

const styles = require("./Container.scss");

class Container extends Component {
  componentDidMount() {
    
  }

  render() {
    return (
      <div className={styles.wrapper + " inline-content full"}>
        <p>This is an inserted component in a hashlink</p>
      </div>
    );
  }
}

module.exports = Container;
