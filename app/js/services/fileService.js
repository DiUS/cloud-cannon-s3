class FileService {
  constructor() {}
  
  fileExtension(file) {
    return `.${file.split('.').pop()}`
  }

  isValidFile(file) {
    const acceptedFiles = ACCEPTED_IMAGES.concat(ACCEPTED_PDF)
    if (acceptedFiles.contains(this.fileExtension(file))) return true
    return false
  }

  isImage(file) {
    if (ACCEPTED_IMAGES.contains(this.fileExtension(file))) return true
    return false
  }

  isPdf(file) {
    if (ACCEPTED_PDF.contains(this.fileExtension(file))) return true
    return false
  }
}
