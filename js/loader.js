window.onload = function () {
  // Check if the loader has already been displayed
  if (
    !sessionStorage.getItem('loaderDisplayed')
  ) {
    // Set the flag in sessionStorage
    sessionStorage.setItem(
      'loaderDisplayed',
      'true'
    )
  } else {
    // If the loader has already been displayed, hide it
    var loader = document.querySelector('.loader')
    loader.style.display = 'none'
  }
}

document.addEventListener(
  'DOMContentLoaded',
  () => {
    const counter =
      document.querySelector('.counter')
    const loader =
      document.querySelector('.loader')
    // const elementsToAnimate =
      // document.querySelectorAll('.logo h1')
    // const introTag =
      // document.querySelector('.intro')
    // let animationsInitialized = false

    function shuffleText(
      finalText,
      duration,
      callback
    ) {
      let i = 0
      const shuffleInterval = setInterval(() => {
        if (i < duration) {
          counter.innerHTML = Math.random()
            .toString(36)
            .substring(2, 8)
          i++
        } else {
          clearInterval(shuffleInterval)
          counter.innerHTML = finalText
          if (callback) callback()
        }
      }, 100)
    }

    function removeLetters() {
      let text = counter.innerHTML
      const removeInterval = setInterval(() => {
        if (text.length > 0) {
          text = text.substring(
            0,
            text.length - 1
          )
          counter.innerHTML = text
        } else {
          clearInterval(removeInterval)
          fadeOutLoader()
        }
      }, 100)
    }

    gsap.to(counter, {
      innerHTML: 100 + '%',
      duration: 3,
      snap: 'innerHTML',
      ease: 'none',
      onComplete: () => {
        setTimeout(
          () =>
            shuffleText('ECSTASY/24', 20, () => {
              setTimeout(removeLetters, 500)
            }),
          500
        )
      },
    })

    function fadeOutLoader() {
      gsap.to(loader, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 1,
      })
    }
  }
)