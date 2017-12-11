const { h, Component } = require("preact");

const styles = require("./Button.scss");

class Button extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "Hello!",
      number: 0
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.setState(prevState => ({ text: "Yo!" }));
    this.setState(prevState => ({ number: (this.state.number + 1) * 2 }));

    const myElement = document.querySelector('[name="content"');

    console.log(myElement.nextElementSibling);

    setTimeout(() => {
      myElement.nextElementSibling.innerHTML = `Now kids experience really hot temperatures.`;
    }, 1000);
  }

  render(props, state) {
    let text = state.number;
    return (
      <div className={styles.wrapper}>
        <a
          href="#!"
          class="btn btn-shadow text-mono btn-primary"
          onClick={this.handleClick}
        >
          <span class="fa fa-thermometer-full mr-2" />
          {text}
        </a>
      </div>
    );
  }
}

module.exports = Button;
