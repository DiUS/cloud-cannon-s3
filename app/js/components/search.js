class Search {
  constructor(assetList) {
    this.searchElem = document.querySelector('#ccs3-search-filter')
    this.assetList = assetList

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

    const assets = this.assetList.assets
    const regex = this.buildRegex(e.target.value)
    this.assetList.render(assets.filter(asset => {
      return asset.Key.match(regex)
    }))
  }

}
