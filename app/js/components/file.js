class File {
  constructor(file) {
    this.file = file
    this.s3Url = this.buildS3Url()
  }

  buildS3Url() {
    return `${S3_PREFIX_URL}/${this.file.Key}`
  }

  render() {
    return `
      <div class="magic-bar__asset-wrapper">
        <div class="pdf-placeholder">
          ${this.buildS3Url().split('/').pop()}
        </div>

      </div>
    `
  }

}
