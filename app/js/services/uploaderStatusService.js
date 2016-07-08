class UploaderStatusService {
  constructor() {
    this.statusElem = document.querySelector('#ccs3-upload-status')

    document.addEventListener('transitionend', this.onStatusBarHidden.bind(this))
  }

  onStatusBarHidden(e) {
    if (e.target.id !== this.statusElem.id) return false

    if (!this.statusElem.className.contains('ccs3-upload-status--active')) {
      this.statusElem.innerHTML = ''
      this.statusElem.removeClass('ccs3-upload-status--error')
      this.statusElem.removeClass('ccs3-upload-status--success')
    }
  }

  showUploadStatus() {
    this.statusElem.addClass('ccs3-upload-status--active')
    window.setTimeout(_ => {
      this.statusElem.removeClass('ccs3-upload-status--active')
    }, 1500)
  }

  showUploadError(message) {
    this.statusElem.addClass('ccs3-upload-status--error')
    this.statusElem.innerHTML = message
    this.showUploadStatus()
  }

  showUploadSuccess(message) {
    this.statusElem.addClass('ccs3-upload-status--success')
    this.statusElem.innerHTML = message
    this.showUploadStatus()
  }

}
