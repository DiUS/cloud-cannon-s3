class S3 {
  constructor() {
    this.s3 = null
    this.continuationToken = null
  }

  configure() {
    return new Promise(
      (resolve, reject) => {
        chrome.storage.sync.get('ccS3', items => {
          AWS.config.update(items.ccS3)
          this.s3 = new AWS.S3()  
          resolve()
        })
      }
    )
  }

  loadImages() {
    return new Promise(
      (resolve, reject) => {
        this.buildImageList([], {resolve, reject})
      }
    )    
  }

  buildImageList(images, deferred) {
    const params = { Bucket: S3_BUCKET, Prefix: S3_BUCKET_PREFIX }
    if (this.continuationToken) params.ContinuationToken = this.continuationToken

    this.s3.listObjectsV2(params, (err, data) => {
      if (err) return

      images = images.concat(data.Contents)
      
      if (data.IsTruncated) {
        this.continuationToken = data.NextContinuationToken
        this.buildImageList(images, deferred)
      } else {
        this.continuationToken = null
        deferred.resolve(images)
      }
    })
  }
}