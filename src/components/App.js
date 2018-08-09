const { h, Component } = require("preact");
const spanify = require("spanify");
// const axios = require("axios");

const styles = require("./App.scss");
const Portal = require("preact-portal");

// Directly import data for now
const monthlyGlobalTemps = require("../monthly_global_temps_json.json");
console.log(monthlyGlobalTemps);

// Import all the Components
const Age = require("./Age");

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
    this.flowContent();
  }

  componentDidUpdate() {}

  handleAgeChange(year) {
    // Set some bounds on the birth year
    if (year < 1900) year = 1900;
    if (year > 2016) year = 2016;

    // Set Era age brackets
    if (year >= 2010) calculatedBirthEra = "tens";
    else if (year >= 2000) calculatedBirthEra = "noughties";
    else if (year >= 1990) calculatedBirthEra = "nineties";
    else if (year >= 1980) calculatedBirthEra = "eighties";
    else if (year >= 1970) calculatedBirthEra = "seventies";
    else if (year >= 1960) calculatedBirthEra = "sixties";
    else calculatedBirthEra = "boomers";

    this.saveLocalSession(year);

    // Set state to component
    this.setState(
      {
        birthYear: year,
        birthEra: calculatedBirthEra
      },
      () => {
        this.flowContent();
      }
    );
  }

  handleSlideYear(event) {
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

  flowContent() {
    // Go through and hide all again
    let allEraEls = document.querySelectorAll(
      ".noughties, .nineties, .eighties, .seventies, .sixties, .boomers"
    );
    for (let i = 0; i < allEraEls.length; i++) {
      removeClass(allEraEls[i], "show");
    }

    // Go through and show the ones we want
    let era = document.getElementsByClassName(this.state.birthEra);

    for (let i = 0; i < era.length; i++) {
      addClass(era[i], "show");
    }

    // Find the mean temperature from the data
    let mean = 0;
    let aboveBelow = "above";

    let currentTempRecord = monthlyGlobalTemps.find(temp => {
      return temp.Date === this.state.birthYear + "-01-08";
    });

    if (currentTempRecord) {
      // Make positive number
      mean = Math.abs(currentTempRecord.Mean);

      // Adjust above or below accordingly
      if (currentTempRecord.Mean < 0) aboveBelow = "below";
      else aboveBelow = "above";
    } else mean = "(no data)";

    // Search out classes is change HTML content
    // document.querySelector(".mean-year").innerHTML = mean;
    // document.querySelector(".above-below").innerHTML = aboveBelow;
    // document.querySelector(".minus-birth-year-2010").innerHTML = 2010 - this.state.birthYear;

    console.log(mean);
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
