class Image {
  constructor(image) {
    this.s3BaseUrl = App.s3Service.s3BaseUrl()
    this.image = image
    this.imageWidth = document.getElementById('image-width')
    this.imageHeight = document.getElementById('image-height')
    this.outputUrl = this.buildOutputUrlOnLoad()
    this.s3Url = this.buildS3Url()
  }

  buildOutputUrlOnLoad() {
    const imgSrc = `${EXT_SETTINGS.outputBaseUrl}/${this.image.Key}`.replace(/images\//, '')
    return this.buildOutputUrlWithImageSize(imgSrc)
  }

  buildOutputUrlOnClick() {
    const imgSrc = this.image
    return this.buildOutputUrlWithImageSize(imgSrc)
  }

  buildOutputUrlWithImageSize(imgSrc) {
    if(this.imageWidth.value !== "" || this.imageHeight.value !== "")
      return `${imgSrc}${this.buildCustomImageSizeString()}`
    else
      return imgSrc
  }

  buildCustomImageSizeString() {
    let imageSize = []

    if(this.imageWidth.value)
      imageSize.push(`w=${this.imageWidth.value}`)

    if(this.imageHeight.value)
      imageSize.push(`h=${this.imageHeight.value}`)

    return `?${imageSize.join('&')}`
  }

  buildS3Url() {
    return `${this.s3BaseUrl}/${this.image.Key}`
  }

  buildImageElement() {
    return `
      <div class="magic-bar__asset-wrapper">
        <img src="${this.s3Url}" class="magic-bar__image" data-path="${this.outputUrl}">
        <button data-ccs3-tooltip="success" class="ccs3-btn ccs3-btn--icon btn-copy-asset tooltip-bottom" data-clipboard-text="${this.outputUrl}">
          <img src="${this.s3BaseUrl}/images/assets/clipboard.svg" />
        </button>
      </div>
    `
  }

  addImageOnClick() {
    const scriptElem = document.createElement('script')

    let imageString = this.buildOutputUrlOnClick()

    scriptElem.textContent = this.getScriptElem(imageString)

    document.body.appendChild(scriptElem)
    scriptElem.parentNode.removeChild(scriptElem)
  }

  getScriptElem (imageString) {

    return `(function () {
       let iframeCKEDITOR = document.getElementById('editor-iframe').contentWindow.CKEDITOR
       let markdownEditor = iframeCKEDITOR.instances[CURRENT_CKEDITOR]
       if(markdownEditor)
         markdownEditor.insertHtml('<img src="${imageString}">')
      else {
        let uploadStatusElem = document.querySelector('#ccs3-asset-status')
        uploadStatusElem.className += ' ccs3-asset-status--error ccs3-asset-status--active'
        uploadStatusElem.innerHTML = "Cannot add ${this.outputUrl.split('/').pop()} to editor"
        window.setTimeout(_ => {
          uploadStatusElem.classList.remove('ccs3-asset-status--active')
        }, 2000)
        console.log('Cloudcannon CKEDITOR class might have change. Please update CKEDITOR element.')
      }

     })()`
  }

  render() {
    return this.buildImageElement()
  }

}
