class S3Service {
  constructor() {
    this.s3 = null
    this.continuationToken = null
  }

  configure(container) {
    this.container = container
    AWS.config.update({
      accessKeyId: EXT_SETTINGS.accessKeyId,
      secretAccessKey: EXT_SETTINGS.secretAccessKey,
      region: EXT_SETTINGS.region
    })
    this.s3 = new AWS.S3()
  }

  s3BaseUrl() {
    return `https://s3-${EXT_SETTINGS.region}.amazonaws.com/${EXT_SETTINGS.bucket}`
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
      var params = {Key: key, ContentType: file.type, Body: file, Bucket: EXT_SETTINGS.bucket, ACL: 'public-read'}

      this.s3.upload(params, (err, data) => {
        if(err) reject(err)

        resolve()
      })
    })
  }

  buildImageList(images, deferred) {
    const params = { Bucket: EXT_SETTINGS.bucket }
    if (this.continuationToken) params.ContinuationToken = this.continuationToken

    this.s3.listObjectsV2(params, (err, data) => {
      if (err) {
        const s3StatusService = new S3StatusService(err)
        return
      } else {
        this.container.showMeAssetLink()
        images = images.concat(data.Contents)

        if (data.IsTruncated) {
          this.continuationToken = data.NextContinuationToken
          this.buildImageList(images, deferred)
        } else {
          this.continuationToken = null
          deferred.resolve(images)
        }
      }
    })
  }
}
