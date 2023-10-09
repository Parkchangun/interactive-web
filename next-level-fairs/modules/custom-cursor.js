const cursor = document.querySelector(".cursor")

// 마우스 커서 위치에 커스텀 커서 위치 설정
function updateCursorPosition(e) {
  const cursorInner = document.querySelector(".cursor-default-inner")
  const cursorTraceInner = document.querySelector(".cursor-trace-inner")

  cursorInner.style.top = e.clientY + "px"
  cursorInner.style.left = e.clientX + "px"

  cursorTraceInner.style.top = e.clientY + "px"
  cursorTraceInner.style.left = e.clientX + "px"
}

// 
function onMouseMove(e) {
  requestAnimationFrame(() => {
    updateCursorPosition(e)
  })
}

function createRipple(e) {
  const ripple = document.createElement("span")

  ripple.classList.add("ripple")

  cursor.appendChild(ripple)

  // ripple이 그려진 후에 포지션 지정
  ripple.style.top = e.clientY - ripple.clientHeight / 2 + "px"
  ripple.style.left = e.clientX - ripple.clientWidth / 2 + "px"

  ripple.addEventListener("animationend", () => {
    cursor.removeChild(ripple)
  })
}

document.addEventListener("mousemove", onMouseMove)

document.addEventListener("mousedown", () => {
  cursor.classList.add("cursor-active")
})

document.addEventListener("mouseup", () => {
  cursor.classList.remove("cursor-active")
})

document.addEventListener("click", createRipple)
