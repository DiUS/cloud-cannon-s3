class Uploader {
  constructor(imageList) {
    this.imageList = imageList
    document.addEventListener('click', this.onUploadSubmit.bind(this))
  }

  onUploadSubmit(e) {
    if (e.target.id !== 'submit-upload') return false

    const fileUploader = document.querySelector('#file-upload')
    const file = fileUploader.files[0]
    const date = new Date()
    const pathname = `${S3_BUCKET_PREFIX}/${date.getFullYear()}/${date.getFullMonth()}/`
    App.s3Service.upload(file, pathname)
      .then(this.onUploadSuccess.bind(this))
  }

  onUploadSuccess() {
    this.imageList.fetchImages()
  }
}
