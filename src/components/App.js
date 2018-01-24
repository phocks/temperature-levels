const { h, Component } = require("preact");
const spanify = require("spanify");
// const axios = require("axios");

const styles = require("./App.scss");

const Portal = require("preact-portal");

// Directly import data for now
const data = require("../monthly_global_temps_json.json");
console.log(data);

// Import all the Components
const Temperature = require("./Temperature"),
  Time = require("./Time"),
  Button = require("./Button"),
  Form = require("./Form"),
  Age = require("./Age"),
  InlineText = require("./InlineText"),
  Container = require("./Container"),
  GeoLocation = require("./GeoLocation");

let calculatedBirthEra = "nineties";

class App extends Component {
  constructor(props) {
    super(props);

    // set some default states
    this.state = {
      birthYear: 1999,
      birthEra: "eighties",
      mousePosX: 0,
      mousePosY: 0,
      originalmousePosX: 0,
      originalmousePosY: 0,
      mouseIsDown: false
    };

    // We need to bind this to class functions sometimes
    // this.handleAgeChange = this.handleAgeChange.bind(this);
  }

  componentWillMount() {
    // Use HTML5 localStorage if available otherwise fallback to cookies
    this.checkLocalStorage();

    // Convert CoreMedia a tags to spans
    spanify.spanify({ defaultClass: "portal" });
    spanify.hashify({ defaultClass: "u-full", hashList: ["birthyearselect"] });

    // Clear the innerHTML of all portals
    clearPortals(".portal-remove");
  }

  componentDidMount() {
    console.log("App mounted...");
  }

  componentDidUpdate() {
    // console.log("updated");
  }

  handleAgeChange(year) {
    // Set some bounds on the birth year
    if (year < 1900) year = 1900;
    if (year > 2018) year = 2018;

    // Set Era age brackets
    let allEras = "noughties nineties eighties seventies boomers";

    if (year >= 2000) calculatedBirthEra = "noughties";
    else if (year >= 1990) calculatedBirthEra = "nineties";
    else if (year >= 1980) calculatedBirthEra = "eighties";
    else if (year >= 1970) calculatedBirthEra = "seventies";
    else calculatedBirthEra = "boomers";

    this.saveLocalSession(year);
    this.setState({ birthYear: year }, () => {});

    this.setState(
      {
        birthEra: calculatedBirthEra
      },
      () => {
        console.log(this.state.birthEra);

        let allEraEls = document.querySelectorAll(".noughties, .nineties, .eighties, .seventies, .boomers");
        console.log(allEraEls);
        for (let i = 0; i < allEraEls.length; i++) {
          removeClass(allEraEls[i], "show");
        }

        let era = document.getElementsByClassName(this.state.birthEra);
        console.log(era);

        for (let i = 0; i < era.length; i++) {
          addClass(era[i], "show");
        }
      }
    );
  }

  handleSlideYear(event) {
    // console.log("mousedowned");
    this.setState(prevState => ({
      originalmousePosX: event.screenX,
      originalmousePosY: event.screenY,
      mouseIsDown: true
    }));
  }

  handleMouseMove(event) {
    if (this.state.mouseIsDown) {
      this.setState(prevState => ({
        mousePosX: event.screenX,
        mousePosY: event.screenY
      }));

      const sensitivity = 5;
      const distance = this.state.mousePosX - this.state.originalmousePosX;

      if (Math.abs(distance) > sensitivity) {
        // console.log(distance);
        this.handleAgeChange(
          Math.round(this.state.birthYear + distance / sensitivity)
        );

        this.setState(prevState => ({
          originalmousePosX: event.screenX,
          originalmousePosY: event.screenY
        }));
      }
    }
  }

  handleStopSliding(event) {
    if (this.state.mouseIsDown) {
      this.setState(prevState => ({
        mouseIsDown: false
      }));
    }
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
      <section className={styles.wrapper}>
        <Portal into=".birthyearselect">
          <section
            onMouseMove={this.handleMouseMove.bind(this)}
            onMouseLeave={this.handleStopSliding.bind(this)}
            onMouseUp={this.handleStopSliding.bind(this)}
          >
            <Age
              birthYear={state.birthYear}
              mousePosX={state.mousePosX}
              mousePosY={state.mousePosY}
              onAgeChange={this.handleAgeChange.bind(this)}
              onSlideYear={this.handleSlideYear.bind(this)}
            />
          </section>
        </Portal>
        {/* <Portal into=".year">
          <InlineText text={state.birthYear} />
        </Portal>
        <Portal into=".heatwaves">
          <InlineText text={Math.floor(state.birthYear * 0.1323)} />
        </Portal>
        <Portal into=".container">
          <Time />
        </Portal>
        <Portal into=".currentAge">{String(2017 - state.birthYear)}</Portal>
        <Portal into=".age-in-1983">{String(1983 - state.birthYear)}</Portal>
        <Portal into=".geolocation">
          <GeoLocation />
        </Portal> */}
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

// For manipulating classes
function hasClass(el, className) {
  return el.classList
    ? el.classList.contains(className)
    : new RegExp("\\b" + className + "\\b").test(el.className);
}

function addClass(el, className) {
  if (el.classList) el.classList.add(className);
  else if (!hasClass(el, className)) el.className += " " + className;
}

function removeClass(el, className) {
  if (el.classList) el.classList.remove(className);
  else
    el.className = el.className.replace(
      new RegExp("\\b" + className + "\\b", "g"),
      ""
    );
}

module.exports = App;
