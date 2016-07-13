const App = { s3Service: new S3Service() }

App.s3Service.configure()
  .then(_ => {
    new Container()
    const ckMonitor = new CkMonitor()
    const assetDrawer = new AssetDrawer()
    const assetList = new AssetList()
    const search = new Search(assetList)
    const uploader = new Uploader(assetList)
  })
