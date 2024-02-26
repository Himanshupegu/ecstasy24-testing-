const navbar = document.querySelector('.navbar')

var lastScrollTop = 0
window.addEventListener('scroll', () => {
  var scrollTop = window.pageYOffset
  if (scrollTop > lastScrollTop) {
    navbar.style.transition = 'all .4s ease'
    navbar.style.transition = 'translateY(-100%)'
  } else {
    navbar.style.transition = 'all .6s ease'
    navbar.style.transition = 'translateY(0%)'
  }
  lastScrollTop = scrollTop
})

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
