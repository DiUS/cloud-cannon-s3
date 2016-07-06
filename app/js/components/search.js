class Search {
  constructor(imageList) {
    this.searchElem = document.querySelector('#ccs3-search-filter')
    this.imageList = imageList

    document.addEventListener('keyup', this.onSearchKeyUp.bind(this))
  }

  onSearchKeyUp(e) {
    if (e.target.id !== this.searchElem.id) return false
    const images = this.imageList.images
    const filter = e.target.value
    this.imageList.render(images.filter(image => {
      return image.Key.contains(filter)
    }))
  }

}
