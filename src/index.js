const { h, render } = require("preact");
const xhr = require("xhr");
import { hashify } from "spanify";

const PROJECT_NAME = "interactive-temperature-records";
const root = document.querySelector(`[data-${PROJECT_NAME}-root]`);

function init() {
  const App = require("./components/App");
  render(<App projectName={PROJECT_NAME} />, root, root.firstChild);
}

// Fetch another CoreMedia article and parse it for dynamic use
xhr({ url: root.getAttribute("data-content-url") }, (err, response, body) => {
  function transform() {
    const doc = new DOMParser().parseFromString(body, "text/html");
    const startNode = doc.querySelector('a[name="content"]');
    const endNode = doc.querySelector('a[name="endcontent"]');

    if (!startNode || !endNode) {
      console.error(new Error("No content bookends found in document."));

      return init();
    }

    let currentNode = startNode;
    const injectionRoot = document.querySelector('[name="fullscript"]');

    let fetchedNodes = [];

    while (
      ((currentNode = currentNode.nextSibling),
      currentNode && currentNode !== endNode)
    ) {
      fetchedNodes.push(currentNode);
    }

    fetchedNodes.forEach(node => {
      // Use Odyssey API to re-apply smart quotes
      window.__ODYSSEY__.utils.misc.smartquotes(node);

      // Append fetched content
      injectionRoot.appendChild(node);
    });

    // Unwraps injected content from parent
    var parent = injectionRoot.parentNode;

    while (injectionRoot.firstChild)
      parent.insertBefore(injectionRoot.firstChild, injectionRoot);

    parent.removeChild(injectionRoot);

    // hashify({
    //   hashList: ["ageselector"]
    // });

    hashNext("class")
  }

  // Wait for Odyssey
  if (window.__ODYSSEY__) {
    transform();

    
  } else {
    window.addEventListener("odyssey:api", transform);
  }
});

if (module.hot) {
  module.hot.accept("./components/App", () => {
    try {
      init();
    } catch (err) {
      const ErrorBox = require("./components/ErrorBox");
      render(<ErrorBox error={err} />, root, root.firstChild);
    }
  });
}

if (process.env.NODE_ENV === "development") {
  require("preact/devtools");
  console.debug(`[${PROJECT_NAME}] public path: ${__webpack_public_path__}`);
}

// Add class via CoreMedia hashtags eg. #classverytop
function hashNext(targetString) {
  // Set deafult for params
  if (targetString === undefined) {
    targetString = "class";
  }

  const anchors = document.querySelectorAll("a");

  // Loop through all the anchor nodes
  anchors.forEach(anchor => {
    // Leave normal links on the page alone
    if (anchor.innerHTML !== " ") return;

    // Get name value
    const elementName = anchor.getAttribute("name");

    // Detect class
    if (elementName.slice(0, targetString.length) !== targetString) return;

    // Get class name to apply
    const classToApply = elementName.substr(targetString.length);

    // Get the next paragraph to work with
    const nextElement = anchor.nextElementSibling;

    // Apply the class
    nextElement.classList.add(classToApply);

    // Remove anchor
    anchor.parentNode.removeChild(anchor);
  });
}
