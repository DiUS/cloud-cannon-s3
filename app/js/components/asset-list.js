class AssetList {
  constructor() {
    this.assetListElem = document.querySelector('#asset-list')
    this.assets = []
    this.continuationToken = null
    this.maxCount = 10
    this.fetchAssets()
  }

  fetchAssets() {
    App.s3Service.loadImages()
      .then(this.onAssetsLoaded.bind(this))
  }

  onAssetsLoaded(assets) {
    this.assets = assets
    this.assets = this.filterValidAssets()
    this.render(this.assets)
    this.setUpCopyAssetButton()
  }

  filterValidAssets() {
    const fileService = new FileService()
    let assets = this.assets.filter(asset => {
      if (fileService.isValidFile(asset.Key)) return true
    })
    return this.sortAssetsByDate(assets)
  }

  sortAssetsByDate(assets) {
    return assets.slice(0).sort(this.customDateSort)
  }

  customDateSort(a, b) {
    if (a.LastModified > b.LastModified) {
      return -1
    }
    else if (a.LastModified < b.LastModified) {
      return 1
    }
    else {
      return 0
    }
  }

  render(assets) {
    const truncatedAssetList = assets.slice(0, this.maxCount)

    this.assetListElem.innerHTML = truncatedAssetList.map(asset => {
      return new Image(asset).render()
    }).join('')
  }

  setUpCopyAssetButton() {
    const clipboard = new Clipboard('.btn-copy-asset', {
      text: function(trigger) {
        return trigger.getAttribute('data-clipboard-text');
      }
    })

    clipboard.on('success', e => {
      e.trigger.addClass('active')
      window.setTimeout(function() {
        e.trigger.removeClass('active')
      }, 750)
    })
  }
}
