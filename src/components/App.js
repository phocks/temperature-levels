const { h, Component } = require("preact");
const styles = require("./App.scss");

const Temperature = require("./Temperature");
const Time = require("./Time");
const Button = require("./Button");
const Form = require("./Form");
const Age = require("./Age");



function Spacer() {
  return (
    <div>
      <br />
      <br />
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { age: "1982" };
    this.handleAgeChange = this.handleAgeChange.bind(this);
  }
  handleAgeChange(year) {
    console.log(year);
    this.setState({ age: year });
  }
  render(props, state) {
    return (
      <section>
        {/* <h1 class="display-1">Temperature levels</h1> */}
        <Time />
        <Temperature temp="really hot" />
        <Button />
        <Spacer />
        <Form age={state.age} onAgeChange={this.handleAgeChange} />
        <Spacer />
        <Age age={state.age} />
      </section>
    );
  }
}

module.exports = App;
