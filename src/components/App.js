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

    if( getCookie("birthYear") ) {
      this.state = { birthYear: +getCookie("birthYear") };
    } else {
      this.state = { birthYear: 1999 };
    }
    
    this.handleAgeChange = this.handleAgeChange.bind(this);
  }
  handleAgeChange(year) {
    console.log(year);
    setCookie("birthYear", year, 30);
    this.setState(prevState => ({ birthYear: year }));
  }
  render(props, state) {
    return (
      <section>
        {/* <h1 class="display-1">Temperature levels</h1> */}
        {/* <Time /> */}
        {/* <Temperature temp="really hot" /> */}
        {/* <Form birthYear={state.birthYear} onAgeChange={this.handleAgeChange} /> */}
        {/* <Spacer /> */}
        <Age birthYear={state.birthYear} onAgeChange={this.handleAgeChange} />
        {/* <Spacer />
        <Button />
        <Spacer /> */}
      </section>
    );
  }
}

// Some generic cookie functions
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

module.exports = App;
