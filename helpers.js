String.prototype.contains = function(matcher) {
  const regex = new RegExp(matcher, 'i')
  return regex.test(this)
}

Element.prototype.addClass = function(className) {
  const currentClasses = this.className
  this.className = `${currentClasses} ${className}`.trim()
  return this
}

Element.prototype.removeClass = function(className) {
  const regex = new RegExp(className, 'g')
  const newClasses = this.className.replace(regex, '')
  this.className = newClasses.trim()
  return this
}

Date.prototype.getFullMonth = function() {
  const month = this.getMonth()
  return month.length === 1 ? '0'+month : month
}
