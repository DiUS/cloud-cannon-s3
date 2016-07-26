// Saves options to chrome.storage.sync.
const EXTENSION_PREFIX = 'ccS3'

function save_options() {
  var ccS3 = {}
  ccS3[EXTENSION_PREFIX] = {
    accessKeyId: document.querySelector('#aws-access-key-id').value,
    secretAccessKey: document.querySelector('#aws-secret-access-key').value,
    region: document.querySelector('#aws-region').value,
    bucket: document.querySelector('#aws-bucket').value,
    outputBaseUrl: document.querySelector('#output-base-url').value
  }

  chrome.storage.sync.set(ccS3, function() {
    var status = document.querySelector('#status')
    status.textContent = 'Options saved.'
    setTimeout(function() { status.textContent = '' }, 750)
  })
}

function restore_options() {
  chrome.storage.sync.get(EXTENSION_PREFIX, function(items) {
    document.querySelector('#aws-access-key-id').value = items[EXTENSION_PREFIX].accessKeyId
    document.querySelector('#aws-secret-access-key').value = items[EXTENSION_PREFIX].secretAccessKey
    document.querySelector('#aws-region').value = items[EXTENSION_PREFIX].region
    document.querySelector('#aws-bucket').value = items[EXTENSION_PREFIX].bucket
    document.querySelector('#output-base-url').value = items[EXTENSION_PREFIX].outputBaseUrl
  })
}

document.addEventListener('DOMContentLoaded', restore_options)
document.querySelector('#save').addEventListener('click', save_options)
