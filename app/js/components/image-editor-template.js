// 
// function getCKEditor(imgixUrl, iframeCKEDITOR) {
//   if(iframeCKEDITOR.instances['markdown-editor-wrapper']) {
//     var markdownEditor = iframeCKEDITOR.instances['markdown-editor-wrapper']
//     markdownEditor.insertHtml('<img src="'+imgixUrl+'" srcset="'+ imgixUrl+'?w=300 300w, '+imgixUrl+'?w=775 775w" sizes="(max-width: 775px) 100vw, 775px">')
//   } else if(iframeCKEDITOR.contentWindow.CKEDITOR.instances.length > 1){
//     console.log('cms-identifiable-')
//   }
// }
//
// const imageEditorTemplateScript = `(function () {
//
//   let markdownEditor = iframeCKEDITOR.instances['markdown-editor-wrapper']
//   if(markdownEditor)
//      markdownEditor.insertHtml('<img src="${this.imgixUrl}" srcset="${this.imgixUrl}?w=300 300w, ${this.imgixUrl}?w=775 775w" sizes="(max-width: 775px) 100vw, 775px">')
//   else {
//     let uploadStatusElem = document.querySelector('#ccs3-asset-status')
//     uploadStatusElem.className += ' ccs3-asset-status--error ccs3-asset-status--active'
//     uploadStatusElem.innerHTML = "Cannot add ${this.imgixUrl.split('/').pop()} to editor"
//     window.setTimeout(_ => {
//       uploadStatusElem.classList.remove('ccs3-asset-status--active')
//     }, 2000)
//     console.log('Cloudcannon CKEDITOR class might have change. Please update CKEDITOR element.')
//   }
//  })()`

// function getCKEditor(){
//   console.log('getCKEditor');
// }
  // editor = iframeCKEDITOR.contentWindow.CKEDITOR.instances['markdown-editor-wrapper']
  // iframeCKEDITOR.contentWindow.CKEDITOR.instances
  // entry-content
    // return document.getElementById('editor-iframe')
  // else if(document.querySelector('[id^="cms-identifiable-"]'))
  //   // return document.querySelector('[id^="cms-identifiable-"]')
  // else
  //   return false
