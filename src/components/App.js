const { h, Component } = require("preact");
const styles = require("./App.scss");

const Temperature = require("./Temperature");

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.string = "What year?";
  // }
  // handleSubmit(event) {
  //   event.preventDefault();
  //   this.string = new Date().toLocaleTimeString()
  //   console.log(this.string);
  // }

  // render({ projectName }) {
  //   return (
  //     <section>
  //       <h1 class="display-1">{this.string}</h1>

  //       <form class="form-inline" onSubmit={(e) => this.handleSubmit(e)}>
  //         <label class="sr-only" for="inlineFormInputGroup">
  //           Your birth year
  //         </label>
  //         <div class="input-group mb-2 mr-sm-2 mb-sm-0">
  //           <input
  //             class="form-control"
  //             id="inlineFormInputGroup"
  //             placeholder="Your birth year"
  //             type="text"
  //           />
  //         </div>
  //         <button type="submit" class="btn btn-primary">
  //           Calculate
  //         </button>
  //       </form>
  //     </section>
  //   );
  // }

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
      <section>
        <h1 class="display-1">Temperature levels</h1>
        <h1 className="display-2">It is {this.state.date.toLocaleTimeString()}.</h1>
        <Temperature temp="really hot" />
      </section>
    );
  }
}

module.exports = App;
