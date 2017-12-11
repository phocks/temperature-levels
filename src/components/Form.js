const { h, Component } = require("preact");

const styles = require("./Form.scss");

class Form extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onAgeChange(event.target["0"].value);
  }

  handleChange(event) {
    event.preventDefault();
    // console.log(event);
    this.props.onAgeChange(event.target.value);
  }

  render(props, state) {
    return (
      <div className={styles.wrapper}>
        <div class="card">
          <div class="card-body">
            <form onSubmit={this.handleSubmit}>
              <div class="form-group">
                <label for="exampleInputEmail1">
                  Please enter your year of birth:
                </label>
                <input
                  class="form-control"
                  id="Year"
                  placeholder="Your Y.O.B."
                  type="number"
                  value={props.age}
                  onInput={this.handleChange}
                />
                {/* <small id="yearHelp" class="form-text text-muted">
                  Your age is safe with us...
                </small> */}
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
