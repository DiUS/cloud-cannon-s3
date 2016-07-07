class ImageList {
  constructor() {
    this.imageListElem = document.querySelector('#image-list')
    this.images = []
    this.continuationToken = null
    this.maxCount = 10
    this.fetchImages()
  }

  fetchImages() {
    App.s3Service.loadImages()
      .then(this.onImagesLoaded.bind(this))
  }

  onImagesLoaded(images) {
    this.images = images
    this.images = this.filterValidImages()
    this.render(this.images)
    this.setUpCopyImageButton()
  }

  filterValidImages() {
    const fileService = new FileService()
    let images = this.images.filter(image => {
      if (fileService.isValidFile(image.Key)) return true
    })
    return this.sortImagesByDate(images)
  }

  sortImagesByDate(images) {
    return images.slice(0).sort(this.customDateSort)
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

  render(images) {
    const truncatedImageList = images.slice(0, this.maxCount)

    this.imageListElem.innerHTML = truncatedImageList.map(image => {
      return new Image(image).render()
    }).join('')
  }

  setUpCopyImageButton() {
    const clipboard = new Clipboard('.btn-copy-image', {
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
