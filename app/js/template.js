const templateHTML =
`
<a class="ccs3-show-me" id="ccs3-show-me" href="#">Images</a>
<div id="ccs3-image-drawer" class="ccs3-image-drawer">
  <div id="magic-bar__controls">
    <input type="file" id="file-upload" multiple="true" accept="${ACCEPTED_IMAGES},${ACCEPTED_PDF}"/>
    <input type="submit" id="submit-upload" />
    <a href="#" id="ccs3-image-drawer__close">Close</a>
  </div>
  <h4>Images</h4>
  <input type="text" id="ccs3-search-filter" placeholder="Search...">
  <div id="image-list" class="magic-bar__image-list"></div>
</div>
`
