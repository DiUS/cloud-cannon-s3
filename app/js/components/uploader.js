class Uploader {
  constructor(imageList) {
    this.imageList = imageList
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

      promises.push(App.s3Service.upload(file, key))
    }

    this.submitUploadElem.addClass('loading')

    Promise.all(promises)
      .then(this.onUploadSuccess.bind(this))
  }

  onUploadSuccess() {
    const statusService = new StatusService()
    statusService.showSuccess('Upload successful!')
    this.fileElem.value = ''
    this.submitUploadElem.removeClass('loading')
    this.imageList.fetchAssets()
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
}
