class S3StatusService {
  constructor(err) {
    this.s3ConnectionStatus = document.querySelector('#ccs3-s3Status')
    this.err = err
    this.errorCodes = {
      'SignatureDoesNotMatch': 'Please Check AWS Login details.',
      'NoSuchBucket': this.err.message,
    }
  }

  showConnectionError() {
    this.s3ConnectionStatus.addClass('ccs3-s3Status--show')
    if(this.errorCodes[this.err.code])
      this.s3ConnectionStatus.innerHTML = this.errorCodes[this.err.code]
  }
}
