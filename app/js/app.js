class App {
  constructor() {
    this.containerId = 'cloud-cannon-s3'
  }

  createContainer() {
    const extensionContainer = document.createElement('div')
    extensionContainer.id = this.containerId
    return extensionContainer
  }

  render() {
    const extensionContainer = this.createContainer()
    document.querySelector('body').appendChild(extensionContainer)
    extensionContainer.innerHTML = templateHTML
  }
}

const app = new App()
app.render()

const imageDrawer = new ImageDrawer()
const imageList = new ImageList()
const search = new Search(imageList)
