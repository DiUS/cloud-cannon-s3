class Uploader {
  constructor(imageList) {
    this.imageList = imageList
    document.addEventListener('click', this.onUploadSubmit.bind(this))
  }

  onUploadSubmit(e) {
    if (e.target.id !== 'submit-upload') return false

    const date = new Date()
    const pathname = `${S3_BUCKET_PREFIX}/${date.getFullYear()}/${date.getFullMonth()}/`
    const fileUploader = document.querySelector('#file-upload')

    const promises = [];
    for (let i = 0; i < fileUploader.files.length; i++) {
      promises.push(App.s3Service.upload(fileUploader.files[i], pathname))
    }

    Promise.all(promises)
      .then(this.onUploadSuccess.bind(this))
  }

  onUploadSuccess() {
    this.imageList.fetchImages()
  }
}
