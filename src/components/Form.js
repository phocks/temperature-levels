const { h, Component } = require("preact");

const styles = require("./Form.scss");

class Form extends Component {
  handleSubmit(event) {
    event.preventDefault();
    console.log("Hello...");
  }

  render() {
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
      </div>
    );
  }
}

module.exports = Form;
