const App = { 
  s3Service: new S3Service(),
  configure: _ => {
    return new Promise(
      (resolve, reject) => {
        chrome.storage.sync.get('ccS3', items => {
          Object.assign(EXT_SETTINGS, items.ccS3)
          resolve()
        })
      }
    )
  }
}

App.configure()
  .then(_ => {
    new Container()
    App.s3Service.configure()
    const ckMonitor = new CkMonitor()
    const assetDrawer = new AssetDrawer()
    const assetList = new AssetList()
    const search = new Search(assetList)
    const uploader = new Uploader(assetList)
  })
