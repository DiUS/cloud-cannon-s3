class AssetStatusService {
  constructor() {
    this.statusElem = document.querySelector('#ccs3-asset-status')

    document.addEventListener('transitionend', this.onStatusBarHidden.bind(this))
  }

  onStatusBarHidden(e) {
    if (e.target.id !== this.statusElem.id) return false

    if (!this.statusElem.className.contains('ccs3-asset-status--active')) {
      this.statusElem.innerHTML = ''
      this.statusElem.removeClass('ccs3-asset-status--error')
      this.statusElem.removeClass('ccs3-asset-status--success')
    }
  }

  showStatus() {
    this.statusElem.addClass('ccs3-asset-status--active')
    window.setTimeout(_ => {
      this.statusElem.removeClass('ccs3-asset-status--active')
    }, 1500)
  }

  showError(message) {
    console.error(message)
    this.statusElem.addClass('ccs3-asset-status--error')
    this.statusElem.innerHTML = message
    this.showStatus()
  }

  showSuccess(message) {
    this.statusElem.addClass('ccs3-asset-status--success')
    this.statusElem.innerHTML = message
    this.showStatus()
  }

}
