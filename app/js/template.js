const templateHTML =
`
<a class="show-me" id="show-me" href="#">Images</a>
<div class="magic-bar magic-bar--closed">
  <div id="magic-bar__controls">
    <input type="file" id="file-upload" />
    <input type="submit" id="submit-upload" />
    <a href="#" id="magic-bar-close">Close</a>
  </div>
  <h4>Images</h4>
  <input type="text" id="search-filter" placeholder="Search...">
  <div id="image-list" class="magic-bar__image-list"></div>
</div>
`