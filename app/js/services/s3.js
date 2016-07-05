class S3 {
  constructor() {
    this.s3 = null
    this.continuationToken = null
  }

  configure() {
    const that = this
    return new Promise(
      function(resolve, reject) {
        chrome.storage.sync.get('ccS3', items => {
          AWS.config.update(items.ccS3)
          that.s3 = new AWS.S3()  
          resolve()
        })
      }
    )
  }

  loadImages(images = []) {
    console.log('this', this)
    const params = { Bucket: S3_BUCKET, Prefix: S3_BUCKET_PREFIX }
    if (this.continuationToken) params.ContinuationToken = this.continuationToken

    this.s3.listObjectsV2(params, (err, data) => {
      if (err) return

      images = images.concat(data.Contents)
      console.log('data', data)
      if (data.IsTruncated) {
        this.continuationToken = data.NextContinuationToken
        this.loadImagesFromS3(images)
      }
    })
  }
}