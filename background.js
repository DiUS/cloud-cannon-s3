chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.insertCSS(null, {file: 'style.css'})
  chrome.tabs.executeScript(null, {file: 'aws-sdk-2.4.0.min.js'})
  chrome.tabs.executeScript(null, {file: 'helpers.js'})
  chrome.tabs.executeScript(null, {file: 'page.js'})
});