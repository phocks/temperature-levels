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

    this.state = { birthYear: "1942" };
    this.handleAgeChange = this.handleAgeChange.bind(this);
  }
  handleAgeChange(year) {
    console.log(year);
    this.setState(prevState => ({ birthYear: year }));
  }
  render(props, state) {
    return (
      <section>
        {/* <h1 class="display-1">Temperature levels</h1> */}
        {/* <Time /> */}
        {/* <Temperature temp="really hot" /> */}
        
        <Spacer />
        <Form age={state.birthYear} onAgeChange={this.handleAgeChange} />
        <Spacer />
        <Age birthYear={state.birthYear} />
        <Spacer />
        <Button />
        <Spacer />
      </section>
    );
  }
}

module.exports = App;
