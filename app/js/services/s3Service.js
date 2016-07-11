class S3Service {
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

  upload(file, key) {
    return new Promise((resolve,reject) => {
      var params = {Key: key, ContentType: file.type, Body: file, Bucket: S3_BUCKET, ACL: 'public-read'}

      this.s3.upload(params, (err, data) => {
        if(err) reject(err)

        resolve()
      })
    })
  }

  buildImageList(images, deferred) {
    const params = { Bucket: S3_BUCKET }
    if (this.continuationToken) params.ContinuationToken = this.continuationToken

    this.s3.listObjectsV2(params, (err, data) => {
      if (err) {
        const s3StatusService = new S3StatusService(err)
        s3StatusService.showConnectionError()
        return
      }

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
