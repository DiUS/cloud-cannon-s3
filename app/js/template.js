const templateHTML =
`
<a class="ccs3-show-me" id="ccs3-show-me" href="#">Assets</a>
<div id="ccs3-asset-drawer" class="ccs3-asset-drawer">
  <div id="magic-bar__controls">
    <input type="file" id="file-upload" multiple="true" accept="${ACCEPTED_IMAGES.concat(ACCEPTED_PDF).join(',')}"/>
    <input type="submit" id="submit-upload" />
    <a href="#" id="ccs3-asset-drawer__close">Close</a>
  </div>
  <h4>assets</h4>
  <input type="text" id="ccs3-search-filter" placeholder="Search...">
  <div id="asset-list" class="magic-bar__asset-list"></div>
</div>
`
