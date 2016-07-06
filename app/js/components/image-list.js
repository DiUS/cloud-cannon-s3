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
  }

  filterValidImages() {
    return this.images.filter(image => {
      if (!image.Key.contains('.DS_Store') && !image.Key.match(/\/$/)) {
        return true
      }
    }).reverse()
  }

  render(images) {
    const truncatedImageList = images.slice(0, this.maxCount)

    this.imageListElem.innerHTML = truncatedImageList.map(image => {
      return new Image(image).render()
    }).join('')
  }
}
