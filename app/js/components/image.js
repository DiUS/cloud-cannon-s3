class Image {
  constructor(image) {
    this.image = image
    this.imgixUrl = this.buildImgixUrl()
    this.s3Url = this.buildS3Url()
    document.addEventListener('click', this.onImageClick.bind(this))

  }

  buildImgixUrl() {
    return `${IMGIX_PREFIX_URL}/${this.image.Key}`.replace(/images\//, '')
  }

  buildS3Url() {
    return `${S3_PREFIX_URL}/${this.image.Key}`
  }

  buildImageElement() {
    return `
      <div class="magic-bar__image-wrapper">
        <img src="${this.s3Url}" class="magic-bar__image" data-path="${this.imgixUrl}">

      </div>
    `
  }

  onImageClick(e) {
    if (e.target.dataset.path !== this.imgixUrl) return false
    e.preventDefault()

    const scriptElem = document.createElement('script')
    scriptElem.textContent =
      `(function () {
         let iframeCKEDITOR = document.getElementById('editor-iframe').contentWindow.CKEDITOR
         iframeCKEDITOR.instances['markdown-editor-wrapper'].insertHtml('<img src="${this.imgixUrl}">')
       })()`
    document.body.appendChild(scriptElem)
    scriptElem.parentNode.removeChild(scriptElem)
  }

  render() {
    return this.buildImageElement()
  }

}
