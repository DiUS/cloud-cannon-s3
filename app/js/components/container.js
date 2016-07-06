class Container {
  constructor() {
    const extensionContainer = document.createElement('div')
    extensionContainer.id = this.containerId
    document.querySelector('body').appendChild(extensionContainer)
    extensionContainer.innerHTML = templateHTML
  }
}
