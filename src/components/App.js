const { h, Component } = require("preact");
const spanify = require("spanify");

const styles = require("./App.scss");

const Portal = require("preact-portal");

const Temperature = require("./Temperature"),
  Time = require("./Time"),
  Button = require("./Button"),
  Form = require("./Form"),
  Age = require("./Age"),
  InlineText = require("./InlineText"),
  Container = require("./Container");

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
    this.state = {
      birthYear: 1999,
      mousePosX: 0,
      mousePosY: 0,
      originalmousePosX: 0,
      originalmousePosY: 0
    };

    // We need to bind this to class functions sometimes
    // this.handleAgeChange = this.handleAgeChange.bind(this);
  }

  componentWillMount() {
    // Use HTML5 localStorage if available otherwise fallback to cookies
    this.checkLocalStorage();

    // Convert CoreMedia a tags to spans
    spanify.spanify();
    spanify.hashify();

    // Clear the innerHTML of all portals
    clearPortals(".portal");
  }

  componentDidMount() {
    console.log("App mounted...");
  }

  handleAgeChange(year) {
    console.log(year);
    this.saveLocalSession(year);
    this.setState(prevState => ({ birthYear: year }));
  }

  handleSlideYear(event) {
    console.log("mousedowned");
    this.setState(prevState => ({
      originalmousePosX: event.screenX,
      originalmousePosY: event.screenY
    }))
  }

  handleMouseMove(event) {
    this.setState(prevState => ({
      mousePosX: event.screenX,
      mousePosY: event.screenY
    }));
    console.log(this.state.mousePosX - this.state.originalmousePosX);
  }

  saveLocalSession(year) {
    if (localStorageTest() === true) {
      localStorage.birthYear = year;
    } else {
      setCookie("birthYear", year, 30);
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
  }

  render(props, state) {
    return (
      <section onMouseMove={this.handleMouseMove.bind(this)}>
        <Age
          birthYear={state.birthYear}
          mousePosX={state.mousePosX}
          mousePosY={state.mousePosY}
          onAgeChange={this.handleAgeChange.bind(this)}
          onSlideYear={this.handleSlideYear.bind(this)}
        />
        <Portal into=".year">
          <InlineText text={state.birthYear} />
        </Portal>
        <Portal into=".heatwaves">
          <InlineText text={Math.floor(state.birthYear * 0.1323)} />
        </Portal>
        <Portal into=".container">
          <Time />
        </Portal>
        <Portal into=".currentAge">{2017 - state.birthYear}</Portal>
      </section>
    );
  }
}

/*
 * Some helper functions
 ***********************/

// Clears all <span class="portal"> inner HTML on the page
function clearPortals(into) {
  let portals = document.querySelectorAll(into),
    i;

  for (i = 0; i < portals.length; i++) {
    portals[i].innerHTML = "";
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

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

module.exports = App;
