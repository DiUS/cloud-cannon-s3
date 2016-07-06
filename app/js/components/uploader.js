class Uploader {
  constructor(imageList) {
    this.imageList = imageList
    document.addEventListener('click', this.onUploadSubmit.bind(this))
    this.s3 = new S3()
  }

  onUploadSubmit(e) {
    if (e.target.id !== 'submit-upload') return false

    const s3 = this.s3
    s3.configure()
      .then(this.upload.bind(this))
      .then(this.onUploadSuccess.bind(this))
  }

  onUploadSuccess() {
    this.imageList.fetchImages()
  }

  upload() {
    const fileUploader = document.querySelector('#file-upload')
    const file = fileUploader.files[0]
    const date = new Date()
    const pathname = `${S3_BUCKET_PREFIX}/${date.getFullYear()}/${date.getFullMonth()}/`
    return this.s3.upload(file, pathname)
  }
}
