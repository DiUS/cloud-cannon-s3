class ImageDrawer {
  constructor() {
    this.drawerElem = document.querySelector('#ccs3-image-drawer')
    this.closeElemId = 'ccs3-image-drawer__close'
    this.openElemId = 'ccs3-show-me'

    document.addEventListener('click', this.onShowDrawerClick.bind(this))
    document.addEventListener('click', this.onCloseDrawerClick.bind(this))
  }

  onShowDrawerClick(e) {
    if (e.target.id !== this.openElemId) return false
    e.preventDefault()
    this.drawerElem.addClass('ccs3-image-drawer--open')
  }

  onCloseDrawerClick(e) {
    if (e.target.id !== this.closeElemId) return false
    e.preventDefault()
    this.drawerElem.removeClass('ccs3-image-drawer--open')
  }
}
