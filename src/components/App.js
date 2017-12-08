const { h, Component } = require("preact");
const styles = require("./App.scss");

const Temperature = require("./Temperature");
const Time = require("./Time");
const Button = require("./Button");

function Spacer() {
  return (
    <div>
      <br />
      <br />
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <section>
        <h1 class="display-1">Temperature levels</h1>
        <Time />
        <Temperature temp="really hot" />
        <Button />
        <Spacer />
        <div class="card">
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Please enter your date of birth:</label>
                <input
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Your D.O.B."
                  type="email"
                />
                <small id="emailHelp" class="form-text text-muted">
                  Your age is safe with us...
                </small>
              </div>
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

module.exports = App;
