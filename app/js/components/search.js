class Search {
  constructor(imageList) {
    this.searchElem = document.querySelector('#ccs3-search-filter')
    this.imageList = imageList

    document.addEventListener('keyup', this.onSearchKeyUp.bind(this))
  }

  buildRegex(searchString) {
    const searchTerms = searchString.split(' ')
    const regexString = searchTerms.map(searchTerm => {
      return `(?=.*${searchTerm})`
    }).join('')
    return new RegExp(regexString, 'i')
  }

  onSearchKeyUp(e) {
    if (e.target.id !== this.searchElem.id) return false

    const images = this.imageList.images
    const regex = this.buildRegex(e.target.value)
    this.imageList.render(images.filter(image => {
      return image.Key.match(regex)
    }))
  }

}
