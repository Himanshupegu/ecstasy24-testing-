window.onload = function () {
  if (
    !sessionStorage.getItem('loaderDisplayed')
  ) {
    sessionStorage.setItem(
      'loaderDisplayed',
      'true'
    )
  } else {
    var loader = document.querySelector('.loader')
    loader.style.display = 'none'
  }
}