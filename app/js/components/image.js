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
      <div class="magic-bar__asset-wrapper">
        <img src="${this.s3Url}" class="magic-bar__image" data-path="${this.imgixUrl}">
        <button data-ccs3-tooltip="success" class="ccs3-btn ccs3-btn--icon btn-copy-asset tooltip-bottom" data-clipboard-text="${this.imgixUrl}">
          <img src="${S3_PREFIX_URL}/images/assets/clipboard.svg" />
        </button>
      </div>
    `
  }

  onImageClick(e) {
    if (e.target.dataset.path !== this.imgixUrl) return false
    e.preventDefault()

    const scriptElem = document.createElement('script')
    scriptElem.textContent = this.getScriptElem()

    document.body.appendChild(scriptElem)
    scriptElem.parentNode.removeChild(scriptElem)
  }

  // document.getElementById('editor-iframe').contentWindow.CKEDITOR || document.querySelector('[id^="cms-identifiable-"]')
  getScriptElem () {
    console.log('getScriptElem')

    // return `(function () {
    //    let iframeCKEDITOR = document.getElementById('editor-iframe').contentWindow.CKEDITOR
    //    let markdownEditor = iframeCKEDITOR.instances['markdown-editor-wrapper']
    //    if(markdownEditor)
    //      markdownEditor.insertHtml('<img src="${this.imgixUrl}" srcset="${this.imgixUrl}?w=300 300w, ${this.imgixUrl}?w=775 775w" sizes="(max-width: 775px) 100vw, 775px">')
    //   else {
    //     let uploadStatusElem = document.querySelector('#ccs3-asset-status')
    //     uploadStatusElem.className += ' ccs3-asset-status--error ccs3-asset-status--active'
    //     uploadStatusElem.innerHTML = "Cannot add ${this.imgixUrl.split('/').pop()} to editor"
    //     window.setTimeout(_ => {
    //       uploadStatusElem.classList.remove('ccs3-asset-status--active')
    //     }, 2000)
    //     console.log('Cloudcannon CKEDITOR class might have change. Please update CKEDITOR element.')
    //   }
    //
    //  })()`

    return `(function () {
      function getCKEditor(imgixUrl, iframeCKEDITOR) {
        if(iframeCKEDITOR.instances['markdown-editor-wrapper']) {
          var markdownEditor = iframeCKEDITOR.instances['markdown-editor-wrapper']
          markdownEditor.insertHtml('<img src="'+imgixUrl+'" srcset="'+ imgixUrl+'?w=300 300w, '+imgixUrl+'?w=775 775w" sizes="(max-width: 775px) 100vw, 775px">')
        } else if(iframeCKEDITOR.contentWindow.CKEDITOR.instances.length > 1){
          console.log('cms-identifiable-')
          var instances = iframeCKEDITOR.contentWindow.CKEDITOR.instances

          console.log(instances)
        }
      }
      console.log(document.getElementById('editor-iframe').contentWindow.CKEDITOR.instances)
      const iframeCKEDITOR = document.getElementById('editor-iframe').contentWindow.CKEDITOR
      const ckEditorTemplate = getCKEditor("${this.imgixUrl}", iframeCKEDITOR)
    })()`

  }

  render() {
    return this.buildImageElement()
  }

}
