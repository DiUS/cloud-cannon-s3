class ImageDrawer {
  constructor() {
    this.images = []
    this.filteredImages = []
    this.awsBucket = 'dius-site'
    this.awsPrefix = 'images/'
    this.html =
      `<a class="show-me" id="show-me" href="#">Images</a>
       <div class="magic-bar magic-bar--closed">
         <div id="magic-bar__controls">
          <input type="file" id="file-upload" />
          <input type="submit" id="submit-upload" />
          <a href="#" id="magic-bar-close">Close</a>
         </div>
         <h4>Images</h4>
         <input type="text" id="search-filter" placeholder="Search...">
         <div id="image-list" class="magic-bar__image-list"></div>
      </div>`
    this.sitePrefix = 'https://s3-ap-southeast-2.amazonaws.com/dius-site'
    this.imgixPrefix = 'http://dius.imgix.net'
    this.s3 = null

    document.addEventListener('click', this.onShowDrawerClick.bind(this))
    document.addEventListener('click', this.onCloseDrawerClick.bind(this))
    document.addEventListener('keyup', this.onSearchKeyUp.bind(this))
    document.addEventListener('click', this.onImageClick.bind(this))
    document.addEventListener('click', this.onUploadSubmit.bind(this))
  }

  onShowDrawerClick(e) {
    if (e.target.id !== 'show-me') return false
    e.preventDefault()
    this.drawerElem.removeClass('magic-bar--closed')
  }

  onCloseDrawerClick(e) {
    if (e.target.id !== 'magic-bar-close') return false
    e.preventDefault()
    this.drawerElem.addClass('magic-bar--closed')
  }

  onSearchKeyUp(e) {
    if (e.target.id !== 'search-filter') return false

    const filter = e.target.value
    this.renderImages(this.images.filter(image => {
      return image.Key.contains(filter)
    }))
  }

  onImageClick(e) {
    if (!e.target.className.contains('magic-bar__image')) return false
    e.preventDefault()

    const scriptElem = document.createElement('script')
    scriptElem.textContent =
      `(function () {
         let iframeCKEDITOR = document.getElementById('editor-iframe').contentWindow.CKEDITOR
         iframeCKEDITOR.instances['markdown-editor-wrapper'].insertHtml('<img src="${this.buildImgixURL(e.target)}">')
       })()`
    this.drawerElem.appendChild(scriptElem)
    scriptElem.parentNode.removeChild(scriptElem)
  }

  onUploadSubmit(e) {
    if (e.target.id !== 'submit-upload') return false
    e.preventDefault()
    const fileUploader = document.querySelector('#file-upload')
    const file = fileUploader.files[0]
    const date = new Date()
    const filename = `${this.awsPrefix}${date.getFullYear()}/${date.getFullMonth()}/${file.name}`
    var params = {Key: filename, ContentType: file.type, Body: file, Bucket: this.awsBucket, ACL: 'public-read'}
    this.s3.upload(params, (err, data) => {
      if(err) return

      this.images = []
      this.loadImagesFromAWS(null, this.onImagesLoaded.bind(this))

    })
  }

  onImagesLoaded() {
    this.filterValidImages()
    this.renderImages(this.images)
  }

  buildImgixURL(imgElement) {
    const imgixPath = imgElement.dataset.imagePath.replace(/^images\//, '')
    return `${this.imgixPrefix}/${imgixPath}`
  }

  filterValidImages() {
    this.images = this.images.filter(image => {
      if (!image.Key.contains('.DS_Store') && !image.Key.match(/\/$/)) {
        return true
      }
    }).reverse()
  }

  renderImages(filteredImages) {
    let maxCount = 10
    if (filteredImages.length < maxCount) maxCount = filteredImages.length
    const truncatedImageList = filteredImages.slice(0, maxCount)

    this.imageListElem.innerHTML = truncatedImageList.map(image => {
      const imageElem = document.createElement('img')
      imageElem.src = `${this.sitePrefix}/${image.Key}`
      imageElem.className = 'magic-bar__image'
      imageElem.dataset.imagePath = image.Key
      const imgixURL = this.buildImgixURL(imageElem)
      return `<div class="magic-bar__image-wrapper">${imageElem.outerHTML}<p>${imgixURL}</p></div>`
    }).join('')
  }

  init() {
    this.render()
    this.configureAWS()
      .then(() => {
        this.s3 = new AWS.S3()
        this.loadImagesFromAWS(null, this.onImagesLoaded.bind(this))
      })
  }

  render() {
    const container = document.createElement('div')
    document.querySelector('body').appendChild(container)
    container.innerHTML = this.html

    this.drawerElem = document.querySelector('.magic-bar')
    this.statusElem = document.querySelector('#status')
    this.imageListElem = document.querySelector('#image-list')
  }

  configureAWS() {
    return new Promise(
      function(resolve, reject) {
        chrome.storage.sync.get('ccS3', function(items) {
          AWS.config.update(items.ccS3)
          resolve()
        })
      }
    )
  }

  loadImagesFromAWS(continuationToken, cb) {
    const params = { Bucket: this.awsBucket, Prefix: this.awsPrefix }
    if (continuationToken) params.ContinuationToken = continuationToken
    this.s3.listObjectsV2(params, (err, data) => {
      if (err) return

      this.images = this.images.concat(data.Contents)
      if (data.IsTruncated) {
        this.loadImagesFromAWS(data.NextContinuationToken, cb)
      } else {
        cb()
      }
    })
  }
}

const imageDrawer = new ImageDrawer()
imageDrawer.init()
