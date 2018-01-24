const { h, render } = require("preact");
const axios = require("axios");

const PROJECT_NAME = "temperature-levels";
const root = document.querySelector(`[data-${PROJECT_NAME}-root]`);

// Fetch html from Gist and inject in page
axios
  .get(
    "https://rawgit.com/TLes/8256d53cb369f0f7a1d98c02d3271673/raw/01f877a881336e5efa47fb422dca1485817aa243/gistfile1.txt"
  )
  .then(response => {
    const injectHtml = response.data;
    const injectionRoot = document.querySelector(`[name="fullscript"]`);

    injectionRoot.innerHTML = injectHtml;
    // + `<div class="birthyearselect u-full"></div>`;

    // get the element's parent node
    var parent = injectionRoot.parentNode;

    // move all children out of the element
    while (injectionRoot.firstChild)
      parent.insertBefore(injectionRoot.firstChild, injectionRoot);

    // remove the empty element
    parent.removeChild(injectionRoot);

    init();
  });

function init() {
  const App = require("./components/App");
  render(<App projectName={PROJECT_NAME} />, root, root.firstChild);
}

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
