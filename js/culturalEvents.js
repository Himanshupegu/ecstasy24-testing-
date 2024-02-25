const cultural = [
  {
    name: 'Folk intruments workshop',
    role: '(Click right to view more)',
  },
  {
    name: 'Ethnic workshop',
    role: '',
  },
  {
    name: 'Drama & Stree Play',
    role: '',
  },
  {
    name: 'Cultural Rally',
    role: '',
  },
  {
    name: 'Variety Show',
    role: '',
  },
  {
    name: "Various Artist's Performances",
    role: '',
  },

  {
    name: "DJ Night",
    role: '(Click left to view more)',
  },
]

const cursor = document.querySelector('.cursor')
const cursorIcon = cursor.querySelector('i')

const cursorWidth = cursor.offsetWidth / 2
const cursorHeight = cursor.offsetHeight / 2

let currentSlide = 1
const totalSlides = 7

const updateCursorClass = (
  xPosition,
  yPosition
) => {
  const container =
    document.querySelector('.container')
  const containerBounds =
    container.getBoundingClientRect()

  if (
    xPosition > containerBounds.left &&
    xPosition < containerBounds.right &&
    yPosition > containerBounds.top &&
    yPosition < containerBounds.bottom
  ) {
    // Cursor is inside the .container
    if (
      xPosition >
      containerBounds.left +
        containerBounds.width / 2
    ) {
      if (currentSlide < totalSlides) {
        cursorIcon.classList.remove(
          'ph-arrow-left'
        )
        cursorIcon.classList.add('ph-arrow-right')
        cursor.style.display = ''
      } else {
        cursor.style.display = 'none'
      }
    } else {
      if (currentSlide > 1) {
        cursorIcon.classList.remove(
          'ph-arrow-right'
        )
        cursorIcon.classList.add('ph-arrow-left')
        cursor.style.display = ''
      } else {
        cursor.style.display = 'none'
      }
    }
  } else {
    // Cursor is outside the .container
    cursor.style.display = 'none'
  }
}

document.addEventListener('mousemove', (e) => {
  gsap.to(cursor, {
    x: e.clientX - cursorWidth,
    y: e.clientY - cursorHeight,
    duration: 1,
    ease: 'power3.out',
  })

  updateCursorClass(e.clientX, e.clientY)
})

const updateInfo = (slideNumber) => {
  const member = cultural[slideNumber - 1]
  document.querySelector(
    '.info .name'
  ).textContent = member.name
  document.querySelector(
    '.info .role'
  ).textContent = member.role
}

const animateSlide = (slideNumber, reveal) => {
  const marquee = document.querySelector(
    `.t-${slideNumber}.marquee-wrapper`
  )
  const img = document.getElementById(
    `t-${slideNumber}`
  )
  const clipPathValue = reveal
    ? 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)'
    : 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)'

  gsap.to(marquee, {
    clipPath: clipPathValue,
    duration: 1,
    ease: 'power4.out',
    delay: 0.3,
  })

  gsap.to(img, {
    clipPath: clipPathValue,
    duration: 1,
    ease: 'power4.out',
  })
}

updateInfo(currentSlide)

const handleRightClick = () => {
  if (currentSlide < totalSlides) {
    animateSlide(currentSlide + 1, true)
    currentSlide++
    updateInfo(currentSlide)
  }
}

const handleLeftClick = () => {
  if (currentSlide > 1) {
    animateSlide(currentSlide, false)
    currentSlide--
    updateInfo(currentSlide)
  }
}

document.addEventListener('click', (e) => {
  const halfPageWidth = window.innerWidth / 2
  if (e.clientX > halfPageWidth) {
    handleRightClick()
  } else {
    handleLeftClick()
  }
})
