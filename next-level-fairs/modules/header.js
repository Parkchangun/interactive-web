const preloaderBtn = document.querySelector(".preloader-btn")
const header = document.querySelector(".header")
const poster = document.querySelector(".poster")

let intervalId = null
let scale = 1

const threshold = 18

// --- header 등장 전 사용되는 애니메이션 ---

// preloader 버튼 크기 지정하는 함수
function setPreloaderStyle(scale) {
  preloaderBtn.style.transform = `scale(${scale})`
  document.querySelector(".preloader-btn-hold").style.opacity = 1 - (scale - 1) / threshold
}

// 마우스를 눌렀을 때 점점 커지게
preloaderBtn.addEventListener("mousedown", () => {
  if (intervalId) {
    clearInterval(intervalId)
  }

  intervalId = setInterval(() => {
    if (scale >= 1 + threshold) {
      const preloader = document.querySelector(".preloader")

      preloader.classList.remove("shown-area")
      preloader.classList.add("hidden-area")

      header.classList.remove("hidden-area")
      header.classList.add("shown-area")

      poster.classList.remove("hidden-area")
      poster.classList.add("shown-area")

      clearInterval(intervalId)

      return
    }

    scale += 0.175

    setPreloaderStyle(scale)
  }, 10)
})

// 마우스를 떼었을 때 점점 작게
preloaderBtn.addEventListener("mouseup", () => {
  clearInterval(intervalId)

  intervalId = setInterval(() => {
    if (scale <= 1) {
      // scale의 값이 1보다 작아질 수 있어 1로 고정
      scale = 1

      clearInterval(intervalId)

      return
    }

    scale -= 0.075

    setPreloaderStyle(scale)
  }, 10)
})

// --- header 등장 이후 사용되는 애니메이션 ---

header.addEventListener("mousemove", (e) => {
  // 마우스의 상대적 위치를 나타냄
  const xRelativeToHeader = e.clientX / header.clientWidth
  const yRelativeToHeader = e.clientY / header.clientHeight

  document.querySelector(".header-title").style.transform = `translate(${
    xRelativeToHeader * -50
  }px, ${yRelativeToHeader * -50}px)`

  document.querySelector("#circle-1").style.transform = `translate(${xRelativeToHeader * -25}px, ${
    yRelativeToHeader * -25
  }px)`

  document.querySelector("#circle-2").style.transform = `translate(${xRelativeToHeader * 25}px, ${
    yRelativeToHeader * 25
  }px)`

  document.querySelector("#cube-image-1").style.transform = `translate(${
    xRelativeToHeader * 20
  }px, ${yRelativeToHeader * -15}px)`

  document.querySelector("#cube-image-2").style.transform = `translate(${
    xRelativeToHeader * 10
  }px, ${yRelativeToHeader * -15}px)`

  document.querySelector("#cube-image-3").style.transform = `translate(${
    xRelativeToHeader * -3
  }px, ${yRelativeToHeader * -3}px)`

  document.querySelector("#cube-image-4").style.transform = `translate(${
    xRelativeToHeader * 100
  }px, ${yRelativeToHeader * 100}px)`
})

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  },
  { threshold: 0.2 }
)

document.querySelectorAll(".poster-image-wrapper").forEach((poster) => observer.observe(poster))
