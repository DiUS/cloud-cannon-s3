chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.insertCSS(null, {file: 'app/css/style.css'})
  chrome.tabs.executeScript(null, {file: 'app/js/vendor/aws-sdk-2.4.0.min.js'})
  chrome.tabs.executeScript(null, {file: 'app/js/vendor/react.min.js'})
  chrome.tabs.executeScript(null, {file: 'app/js/vendor/react-dom.min.js'})
  chrome.tabs.executeScript(null, {file: 'app/js/helpers.js'})
  chrome.tabs.executeScript(null, {file: 'app/js/page.js'})
});