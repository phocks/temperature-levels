const { h, Component } = require("preact");

const styles = require("./Form.scss");

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = { year: 1982 };
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ year: event.target["0"].value})
    console.log(this.state.year);
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div class="card">
          <div class="card-body">
            <form onSubmit={event => this.handleSubmit(event)}>
              <div class="form-group">
                <label for="exampleInputEmail1">
                  Please enter your year of birth:
                </label>
                <input
                  class="form-control"
                  id="Year"
                  placeholder="Your Y.O.B."
                  type="number"
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
      </div>
    );
  }
}

module.exports = Form;
