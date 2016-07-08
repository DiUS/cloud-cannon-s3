class Container {
  constructor() {
    this.containerId = 'ccs3'
    const extensionContainer = document.createElement('div')
    extensionContainer.id = this.containerId
    document.querySelector('body').appendChild(extensionContainer)
    extensionContainer.innerHTML = templateHTML
  }
}
