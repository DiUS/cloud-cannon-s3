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
        <button data-ccs3-tooltip="success" class="btn-copy-asset tooltip-bottom" data-clipboard-text="${this.s3Url}">
          Copy to clipboard
        </button>
      </div>
    `
  }

}
