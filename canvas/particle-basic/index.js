const canvas = document.querySelector("canvas")

console.log(canvas)

const ctx = canvas.getContext("2d")
console.log(ctx)

/**
 * devicePixelRatio(DPR) - 하나의 CSS를 픽셀을 그릴 때 사용되는 사용되는 장치의 픽셀 수
 * ../assets/dpr.png
 */

const DPR = window.devicePixelRatio

console.log(DPR)

/**
 * style과 canvas 고유의 사이즈를 동일하게 해 작업을 하는 것이 일반적
 */

const canvasWidth = 300
const canvasHeight = 300

canvas.width = canvasWidth * DPR
canvas.height = canvasHeight * DPR
// DPR이 2 이상인 기기에선 좀 더 선명하게 보임
ctx.scale(DPR, DPR)

canvas.style.width = canvasWidth + "px"
canvas.style.height = canvasHeight + "px"

ctx.fillRect(10, 10, 50, 50)
