const { h, Component } = require("preact");

const styles = require("./Container.scss");

class Container extends Component {
  componentDidMount() {
    var el = this.base.parentNode;

    // get the element's parent node
    var parent = el.parentNode;

    // move all children out of the element
    while (el.firstChild) parent.insertBefore(el.firstChild, el);

    // remove the empty element
    // parent.removeChild(el);
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
