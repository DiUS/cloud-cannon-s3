class CkMonitor {
  constructor() {
    const scriptElem = document.createElement('script')
    scriptElem.textContent = `
      let CURRENT_CKEDITOR = null
      
      function waitFor(testFn, cb) {
        if (testFn()) {
          cb()
        } else {
          window.setTimeout(function() {
            waitFor(testFn, cb)
          }, 1000)
        }
      }

      function test() {
        const iframeElem  = document.querySelector('#editor-iframe')
        if (!iframeElem) return false

        return iframeElem.contentWindow && iframeElem.contentWindow.CKEDITOR
      }

      waitFor(test, function() {
        // Careful, there is a CKEDITOR instance on the global document, but it is the wrong one!
        let iframeCKEDITOR = document.querySelector('#editor-iframe').contentWindow.CKEDITOR
        for (editor in iframeCKEDITOR.instances) {
          iframeCKEDITOR.instances[editor].on('focus', function() {
            CURRENT_CKEDITOR = this.name
          })
        }
      })
    `
    document.body.appendChild(scriptElem)
  }
}