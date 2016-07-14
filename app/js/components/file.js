class File {
  constructor(file) {
    const s3Service = new S3Service()
    this.s3BaseUrl = s3Service.s3BaseUrl()
    this.file = file
    this.s3Url = this.buildS3Url()
  }

  buildS3Url() {
    return `${this.s3BaseUrl}/${this.file.Key}`
  }

  render() {
    return `
      <div class="magic-bar__asset-wrapper">
        <div class="pdf-placeholder">
          ${this.buildS3Url().split('/').pop()}
        </div>
        <button data-ccs3-tooltip="success" class="ccs3-btn ccs3-btn--icon btn-copy-asset tooltip-bottom" data-clipboard-text="${this.s3Url}">
          <img src="${this.s3BaseUrl}/images/assets/clipboard.svg" />
        </button>
      </div>
    `
  }

}
