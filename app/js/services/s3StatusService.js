class S3StatusService {
  constructor(err) {
    this.s3ConnectionStatus = document.querySelector('#ccs3-s3Status')
    this.err = err
    if(err)
      this.showConnectionError()
  }

  showConnectionError() {
    this.s3ConnectionStatus.addClass('ccs3-s3Status--show')
    this.s3ConnectionStatus.innerHTML = this.err
  }
}
