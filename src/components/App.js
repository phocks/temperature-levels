const { h, Component } = require("preact");
const spanify = require("spanify");

const styles = require("./App.scss");

const Portal = require("preact-portal");
console.log(typeof Portal);

const Temperature = require("./Temperature");
const Time = require("./Time");
const Button = require("./Button");
const Form = require("./Form");
const Age = require("./Age");
const InlineText = require("./InlineText");

// I need my space - test component to delete later
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

    // set some default states
    this.state = { birthYear: 1999 };

    this.checkLocalStorage();

    // We need to bind this to class functions sometimes
    this.handleAgeChange = this.handleAgeChange.bind(this);
  }

  componentWillMount(props) {
    spanify.spanify();
  }

  handleAgeChange(year) {
    console.log(year);
    this.saveLocalSession(year);
    this.setState(prevState => ({ birthYear: year }));
  }

  saveLocalSession(year) {
    if (localStorageTest() === true) {
      localStorage.birthYear = year;
    } else {
      setCookie("birthYear", year, 30);
    }

    function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
  }

  checkLocalStorage() {
    if (localStorageTest() === true) {
      if (localStorage.birthYear) {
        this.setState(prevState => ({ birthYear: +localStorage.birthYear }));
      }
    } else {
      if (getCookie("birthYear")) {
        this.setState(prevState => ({ birthYear: +getCookie("birthYear") }));
      }
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
  }

  render(props, state) {
    return (
      <section>
        <Age birthYear={state.birthYear} onAgeChange={this.handleAgeChange} />
        {clearPortals(".portal")}
        <Portal into=".year">
          <InlineText text={state.birthYear} />
        </Portal>
        <Portal into=".heatwaves">
          <InlineText text={state.birthYear} />
        </Portal>
      </section>
    );
  }
}

/*
 * Some helper functions
 */

// Returns true if Client browser supports local HTML5 storage
function localStorageTest() {
  var test = "test";
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

// Clears all <span class="portal"> inner HTML on the page
function clearPortals(into) {
  let portals = document.querySelectorAll(into), i;
  
  for (i = 0; i < portals.length; ++i) {
    portals[i].innerHTML = "";
  }
}

module.exports = App;
