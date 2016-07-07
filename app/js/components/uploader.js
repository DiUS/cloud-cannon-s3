class Uploader {
  constructor(assetList) {
    this.assetList = assetList
    this.fileElem = document.querySelector('#file-upload')
    this.submitUploadElem = document.querySelector('#submit-upload')
    document.addEventListener('click', this.onUploadSubmit.bind(this))
  }

  onUploadSubmit(e) {
    if (e.target.id !== this.submitUploadElem.id) return false

    const promises = [];
    for (let i = 0; i < this.fileElem.files.length; i++) {

      const file = this.fileElem.files[i]
      let key = this.buildS3Key(file)

      if(this.validateFileUpload(key)) {
        promises.push(App.s3Service.upload(file, key))
        this.submitUploadElem.addClass('loading')

        Promise.all(promises)
          .then(this.onUploadSuccess.bind(this))
      } else {
        const statusService = new StatusService()
        statusService.showError(`${file.name} exist!`)
      }
    }
  }

  onUploadSuccess() {
    const statusService = new StatusService()
    statusService.showSuccess('Upload successful!')
    this.fileElem.value = ''
    this.submitUploadElem.removeClass('loading')
    this.assetList.fetchAssets()
  }

  buildS3Key(file) {
    const fileService = new FileService()
    const date = new Date()
    let bucket = "lost_n_found"

    if (fileService.isImage(file.name)) {
      bucket = S3_IMAGES_PREFIX
    } else if (fileService.isPdf(file.name)) {
      bucket = S3_PDF_PREFIX
    }

    return `${bucket}/${date.getFullYear()}/${date.getFullMonth()}/${date.getDate()}${file.name}`
  }

  validateFileUpload(key) {
    const matchingKey = this.assetList.assets.filter(asset => {
      return asset.Key === key ? true : false
    })
    return matchingKey.length === 0 ? true : false
  }
}
