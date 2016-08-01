class Container {
  constructor() {
    const templateHTML =
    `
    <a id="ccs3-s3Status" class="ccs3-s3Status"></a>
    <a class="ccs3-show-me" id="ccs3-show-me" href="#">S3 Assets ></a>
    <div id="ccs3-asset-drawer" class="ccs3-asset-drawer">

      <a href="#" id="ccs3-close" class="ccs3-asset-drawer__close">&times;</a>

      <div id="ccs3-asset-status" class="ccs3-asset-status"></div>

      <div class="ccs3-container">
        <h4>Assets</h4>

        <div class="ccs3-magic-bar__uploader">
          <input type="file" id="file-upload" multiple="true" accept="${ACCEPTED_IMAGES.concat(ACCEPTED_PDF).join(',')}"/>
          <button type="submit" id="submit-upload" class="ccs3-btn ccs3-pull-right">
            Submit<img class="ccs3-spinner" src="${App.s3Service.s3BaseUrl()}/images/assets/spinner.svg" />
          </button>
        </div>

        <input type="text" id="ccs3-search-filter" placeholder="Search...">

        <div id="ccs3-image-sizing" class="ccs3-image-sizing">
          <fieldset>
            <label for="width">Width</label>
            <input type="text" id="image-width" placeholder="Auto"/>
          </fieldset>
          <fieldset>
            <label for="height">Height</label>
            <input type="text" id="image-height" placeholder="Auto"/>
          </fieldset>
        </div>
        <div id="asset-list" class="magic-bar__asset-list"></div>
      </div>
    </div>
    `

    this.containerId = 'ccs3'
    const extensionContainer = document.createElement('div')
    extensionContainer.id = this.containerId
    document.querySelector('body').appendChild(extensionContainer)
    extensionContainer.innerHTML = templateHTML
    this.showMeElement = document.getElementById('ccs3-show-me')
  }

  showMeAssetLink() {
    this.showMeElement.addClass('ccs3-show-me--show')
  }
}
