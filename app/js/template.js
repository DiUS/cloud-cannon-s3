const templateHTML =
`
<a class="ccs3-show-me" id="ccs3-show-me" href="#">Assets</a>
<div id="ccs3-asset-drawer" class="ccs3-asset-drawer">
  
  <a href="#" id="ccs3-close" class="ccs3-asset-drawer__close">&times;</a>

  <div class="ccs3-container">
    <h4>Assets</h4>
    
    <div class="ccs3-magic-bar__uploader">
      <input type="file" id="file-upload" multiple="true" accept="${ACCEPTED_IMAGES.concat(ACCEPTED_PDF).join(',')}"/>
      <input type="submit" id="submit-upload" class="ccs3-btn ccs3-pull-right"/>
    </div>
    
    <input type="text" id="ccs3-search-filter" placeholder="Search...">
    
    <div id="asset-list" class="magic-bar__asset-list"></div>
  </div>
</div>
`
