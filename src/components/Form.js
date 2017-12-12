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
    const validYears = Array.from(
      { length: 117 },
      (dummy, startingPoint) => startingPoint + 1900
    );
    const birthYearOptions = validYears.map(number => (
      <option>{number}</option>
    ));

    return (
      <div className={styles.wrapper}>
        {/* <div class="card">
          <div class="card-body"> */}
        <form onSubmit={this.handleSubmit}>
          <div class="form-group">
            {/* <label for="exampleInputEmail1">When were you born?</label> */}
            <select
              class="form-control"
              id="sel1"
              value={props.birthYear}
              onInput={this.handleChange}
            >
              {birthYearOptions}
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

// A function that gives an array of consecutive numbers
// function range(start, stop, step) {
//   step = step || 1;
//   var a = [start],
//     b = start;
//   while (b + step < stop) {
//     b += step;
//     a.push(b);
//   }
//   return a;
// }

module.exports = Form;
