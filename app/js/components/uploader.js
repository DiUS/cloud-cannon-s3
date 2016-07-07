class Uploader {
  constructor(imageList) {
    this.imageList = imageList
    this.fileElem = document.querySelector('#file-upload')
    document.addEventListener('click', this.onUploadSubmit.bind(this))
  }

  onUploadSubmit(e) {
    if (e.target.id !== 'submit-upload') return false

    const promises = [];
    for (let i = 0; i < this.fileElem.files.length; i++) {
      const file = this.fileElem.files[i]
      let key = this.buildS3Key(file)

      promises.push(App.s3Service.upload(file, key))
    }

    Promise.all(promises)
      .then(this.onUploadSuccess.bind(this))
  }

  onUploadSuccess() {
    this.imageList.fetchImages()
  }

  buildS3Key(file) {
    const fileService = new FileService()
    const date = new Date()
    let bucket

    if (fileService.isImage(file.name)) {
      bucket = S3_IMAGES_PREFIX
    } else if (fileService.isPdf(file.name)) {
      bucket = S3_PDF_PREFIX
    }

    return `${bucket}/${date.getFullYear()}/${date.getFullMonth()}/${file.name}`
  }
}
