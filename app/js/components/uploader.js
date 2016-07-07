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
    let bucket = ""
    if(file.type.contains(ACCEPTED_IMAGES))
      bucket = S3_IMAGES_PREFIX
    else if(file.type.contains(ACCEPTED_PDF))
      bucket = S3_PDF_PREFIX

    const date = new Date()
    return `${bucket}/${date.getFullYear()}/${date.getFullMonth()}/${file.name}`
  }




}
