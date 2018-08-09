const { h, render } = require("preact");
const axios = require("axios"); // Maybe use xhr instead
const xhr = require("xhr");

const PROJECT_NAME = "interactive-temperature-records";
const root = document.querySelector(`[data-${PROJECT_NAME}-root]`);

// let content = {}; // Using xhr to get a CoreMedia page

// Fetch html from external html and inject in page
axios
  .get("https://raw.githubusercontent.com/TLes/temprecord/master/script.html")
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
  render(
    <App content={content} projectName={PROJECT_NAME} />,
    root,
    root.firstChild
  );
}

// xhr({ url: root.getAttribute('data-content-url') }, (err, response, body) => {
//   const doc = new DOMParser().parseFromString(body, 'text/html');
//   const startNode = doc.querySelector('a[name="content"]');
//   const endNode = doc.querySelector('a[name="endcontent"]');

//   if (!startNode || !endNode) {
//     console.error(new Error('No content bookends found in document.'));

//     return init();
//   }

//   let currentNode = startNode;
//   let currentSection;

//   while (((currentNode = currentNode.nextSibling), currentNode && currentNode !== endNode)) {
//     if (!currentNode.tagName || (currentNode.tagName === 'P' && currentNode.textContent.trim().length === 0)) {
//       // Skip non-elements & empty paragraphs
//     } else if (currentNode.tagName === 'A' && currentNode.getAttribute('name').length > 0) {
//       // Set currentSection to tag's name attribute, and create a key on content if it doesn't exist
//       currentSection = currentNode.getAttribute('name');
//       content[currentSection] = content[currentSection] || [];
//     } else if (currentSection) {
//       // Append element to content's currentSection
//       content[currentSection].push(currentNode);
//     }
//   }

//   init();
// });

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
