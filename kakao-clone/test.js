const animations = {
  listScroll: null
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.target.id === "list-item-wrapper") listScrollAnimation(entry)
  })
})

function listScrollAnimation(entry) {
  console.log("list-item-wrapper")
  const rect = entry.boundingClientRect
  const top = rect.top + window.scrollY
  const bottom = rect.bottom + window.scrollY
  const listItems = document.querySelectorAll(".list-item")
  if(!animations.listScroll) {
    animations.listScroll = onScroll({ top, bottom }, listItems)
  }

  if (entry.isIntersecting) {
    console.log("call")
    window.addEventListener("scroll", animations.listScroll)
  } else {
    console.log("remove")
    window.removeEventListener("scroll", animations.listScroll)
  }
}

function onScroll(rect, listItems) {
  let ticking = false

  return () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        applyAnimation(rect, listItems)
        ticking = false
      })

      ticking = true
    }
  }
}

function applyAnimation(rect, listItems) {
  const viewportHeight = window.innerHeight
  const centerY = window.scrollY + viewportHeight / 2 // 중앙 y 좌표
  console.log("centerY: ", centerY, rect.top, rect.bottom)

  if (centerY >= rect.top && centerY <= rect.bottom) {
    if (document.getElementById("on")) {
      document.getElementById("on").removeAttribute("id")
    }

    const division = (rect.bottom - rect.top) / listItems.length
    const target = Math.floor((centerY - rect.top) / division)
    console.log("target: ", target)

    if (target >= 0 && target < listItems.length) {
      listItems[target].id = "on"
    }
  }
}

const listWrapper = document.getElementById("list-item-wrapper")
observer.observe(listWrapper)



---

function setupScrollObserver() {
  // listStyleChangeStartY와 listStyleChangeEndY는 이제 클로저 내부에서만 사용됩니다.
  let listStyleChangeStartY = 0
  let listStyleChangeEndY = 0

  const listItems = document.querySelectorAll(".list-item")

  function applyAnimation(scrollY) {
    const viewportHeight = window.innerHeight
    const centerY = scrollY + viewportHeight / 2 // 중앙 y 좌표
    console.log("centerY: ", centerY)

    if (centerY >= listStyleChangeStartY && centerY <= listStyleChangeEndY) {
      if (document.getElementById("on")) {
        document.getElementById("on").removeAttribute("id")
      }

      const division = (listStyleChangeEndY - listStyleChangeStartY) / listItems.length
      const target = Math.floor((centerY - listStyleChangeStartY) / division)
      console.log("target: ", target)

      if (target >= 0 && target < listItems.length) {
        listItems[target].id = "on"
      }
    }
  }

  let lastKnownScrollY = 0
  let ticking = false

  function onScroll() {
    lastKnownScrollY = window.scrollY

    if (!ticking) {
      requestAnimationFrame(() => {
        applyAnimation(lastKnownScrollY)
        ticking = false
      })

      ticking = true
    }
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const rect = entry.boundingClientRect

        listStyleChangeStartY = window.scrollY + rect.top
        listStyleChangeEndY = window.scrollY + rect.bottom

        window.addEventListener("scroll", onScroll)
      } else {
        window.removeEventListener("scroll", onScroll)
      }
    })
  })

  const listWrapper = document.getElementById("list-item-wrapper")
  observer.observe(listWrapper)
}

// 클로저를 설정하는 함수 호출
setupScrollObserver()