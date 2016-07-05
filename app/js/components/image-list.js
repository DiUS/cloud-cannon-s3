class ImageList {
  constructor() {
    this.images = []
    this.continuationToken = null
    
    const s3 = new S3()
    s3.configure()
      .then(s3.loadImages.bind(s3))
      .then(function(data) {
        console.log(data)
      })
  }
}
