const { h, Component } = require("preact");

const styles = require("./Button.scss");

class Button extends Component {
  handleClick(event) {
    event.preventDefault();
    console.log(this);
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <a
          href="#!"
          class="btn btn-shadow text-mono btn-primary"
          onClick={event => this.handleClick(event)}
        >
          <span class="fa fa-download mr-2" />Warm it up!
        </a>
      </div>
    );
  }
}

module.exports = Button;
