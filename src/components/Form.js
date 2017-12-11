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
    const numbers = [1, 2, 3, 4, 5];
    const doubled = numbers.map(number => number * 2);
    console.log(doubled);

    return (
      <div className={styles.wrapper}>
        {/* <div class="card">
          <div class="card-body"> */}
        <form onSubmit={this.handleSubmit}>
          <div class="form-group">
            {/* <label for="exampleInputEmail1">When were you born?</label> */}
            <select class="form-control" id="sel1" value={props.birthYear} onInput={this.handleChange}>
              <option>1981</option>
              <option>1982</option>
              <option>1983</option>
              <option>1984</option>
              <option>1985</option>
            </select>
            {/* <input
                  class="form-control"
                  id="Year"
                  placeholder="Your Y.O.B."
                  type="number"
                  value={props.birthYear}
                  onInput={this.handleChange}
                /> */}
            {/* <small id="yearHelp" class="form-text text-muted">
                  Your age is safe with us...
                </small> */}
          </div>
          {/* <button type="submit" class="btn btn-primary">
            Submit
          </button> */}
        </form>
      </div>
      //   </div>
      // </div>
    );
  }
}

module.exports = Form;
