const { h, Component } = require("preact");

const styles = require("./Button.scss");

class Button extends Component {
  constructor(props) {
    super(props);

    this.state = { text: "Hello!",
  number: 0 };
  }
  handleClick(event) {
    event.preventDefault();
    this.setState({ text: "Yo!" })
    this.setState({number: this.state.number + 1})
    console.log(this.state.text);
  }
  render(props, state) {
    let text = state.number;
    return (
      <div className={styles.wrapper}>
        <a
          href="#!"
          class="btn btn-shadow text-mono btn-primary"
          onClick={event => this.handleClick(event)}
        >
          <span class="fa fa-download mr-2" />
          {text}
        </a>
      </div>
    );
  }
}

module.exports = Button;
