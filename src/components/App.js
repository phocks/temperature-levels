const { h, Component } = require("preact");
const styles = require("./App.scss");

const Temperature = require("./Temperature");
const Time = require("./Time");
const Button = require("./Button");

class App extends Component {
  render() {
    return (
      <section>
        <h1 class="display-1">Temperature levels</h1>
        <Time />
        <Temperature temp="really hot" />
        <Button />
      </section>
    );
  }
}

module.exports = App;
