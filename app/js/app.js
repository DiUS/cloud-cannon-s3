const App = { s3Service: new S3Service() }

App.s3Service.configure()
  .then(_ => {
    new Container()
    const imageDrawer = new ImageDrawer()
    const imageList = new ImageList()
    const search = new Search(imageList)
    const uploader = new Uploader(imageList)
  })
