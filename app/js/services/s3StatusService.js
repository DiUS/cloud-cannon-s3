class S3StatusService {
  constructor() {
    this.s3ConnectionStatus = document.querySelector('#ccs3-s3Status')
    this.errorCodes = {
      'SignatureDoesNotMatch': 'Please Check AWS Login details.'
    }
  }

  showConnectionError(err) {
    this.s3ConnectionStatus.addClass('ccs3-s3Status--show')
    if(err === 'SignatureDoesNotMatch')
      this.s3ConnectionStatus.innerHTML = this.errorCodes[err]
  }
}
