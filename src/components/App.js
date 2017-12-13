const { h, Component } = require("preact");
const spanify = require("spanify");


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

    // set some default states
    this.state = { birthYear: 1999 };

    this.checkLocalStorage();

    

    // We need to bind this to class functions sometimes
    this.handleAgeChange = this.handleAgeChange.bind(this);
  }

  handleAgeChange(year) {
    console.log(year);
    this.saveLocalSession(year);
    this.setState(prevState => ({ birthYear: year }));

    spanify.spanify();
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

// Functions go below here
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

// function spanify() {
//   /*
//    * Possibly limit it to certain paragraphs
//    * Make it scan the hole page for now
//    */
//   // const myElement = document.querySelector('[name="classify"]');
//   // const paragraph = myElement.nextElementSibling;

//   const anchors = document.querySelectorAll("a");

//   anchors.forEach(anchor => {
//     if (anchor.innerHTML !== " ") return;

//     const elementTitle = anchor.getAttribute("title");

//     if (!elementTitle) return;

//     if (elementTitle.slice(0, 3) === "end") {
//       anchor.parentNode.removeChild(anchor);
//       return;
//     }

//     const spanEl = document.createElement("span");
//     spanEl.setAttribute("class", elementTitle);
//     const spanTextEl = anchor.nextSibling;
//     spanEl.innerHTML = spanTextEl.textContent.trim();

//     anchor.parentNode.appendChild(spanEl);

//     anchor.parentNode.replaceChild(spanEl, anchor);
//     spanTextEl.parentNode.removeChild(spanTextEl);
//   });
// }

module.exports = App;
