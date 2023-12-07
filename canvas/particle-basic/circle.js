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

const canvasWidth = innerWidth
const canvasHeight = innerHeight

canvas.style.width = canvasWidth + "px"
canvas.style.height = canvasHeight + "px"

canvas.width = canvasWidth * DPR
canvas.height = canvasHeight * DPR
// DPR이 2 이상인 기기에선 좀 더 선명하게 보임
ctx.scale(DPR, DPR)

const RADIAN = Math.PI / 180
class Particle {
  constructor(x, y, radius, vy) {
    this.x = x
    this.y = y
    this.radius = radius
    this.vy = vy
    this.acc = 1.03 // 점차 증가되어야 하므로, 1 이상의 수를 곱하여야 함, 1이하를 곱하면 점점 느려짐(자동차 브레이크)
  }

  draw() {
    // 패스 그린다 대기해
    ctx.beginPath()
    // radian을 사용하므로

    ctx.arc(this.x, this.y, this.radius, 0, RADIAN * 360)
    ctx.fillStyle = "orange"
    ctx.fill()
    ctx.closePath()
  }

  update() {
    // 둥둥이
    // this.y += Math.cos(Date.now() / 1000) * 5
    // 떨어짐
    this.vy *= this.acc
    this.y += this.vy
  }
}

const randomNumberBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min
}

const particles = new Array(20).fill(0).map(() => {
  const x = randomNumberBetween(0, canvasWidth)
  const y = randomNumberBetween(0, canvasHeight)
  const radius = randomNumberBetween(50, 100)
  const vy = randomNumberBetween(1, 5)

  return new Particle(x, y, radius, vy)
})

// 60fps
let interval = 1000 / 60
let now, delta
let then = Date.now()

function animate() {
  window.requestAnimationFrame(animate)

  now = Date.now()
  delta = now - then

  if (delta < interval) return

  ctx.clearRect(0, 0, canvasWidth, canvasHeight)

  particles.forEach((particle) => {
    particle.update()
    particle.draw()

    if (particle.y - particle.radius > canvasHeight) {
      particle.x = randomNumberBetween(0, canvasWidth)
      particle.y = -particle.radius
      particle.radius = randomNumberBetween(50, 100)
      particle.vy = randomNumberBetween(1, 5)
    }
  })

  then = now - (delta & interval)
}

animate()

const feGaussianBlur = document.querySelector("feGaussianBlur")
const feColorMatrix = document.querySelector("feColorMatrix")

// dat gui
const controls = new (function () {
  this.blurValue = 40
  this.alphaChannel = 100
  this.alphaOffset = -23
  this.acc = 1.03
})()

let gui = new dat.GUI()

const f1 = gui.addFolder("Gooey Effect")
const f2 = gui.addFolder("Particle")
f1.open()

f1.add(controls, "blurValue", 0, 100).onChange((value) => {
  feGaussianBlur.setAttribute("stdDeviation", value)
})

f1.add(controls, "alphaChannel", 1, 200).onChange((value) => {
  feColorMatrix.setAttribute(
    "values",
    `1 0 0 0 0  0 1 0 0 0   0 0 1 0 0  0 0 0 ${value} ${controls.alphaOffset}`
  )
})

f1.add(controls, "alphaOffset", -40, 40).onChange((value) => {
  feColorMatrix.setAttribute(
    "values",
    `1 0 0 0 0  0 1 0 0 0   0 0 1 0 0  0 0 0 ${controls.alphaChannel} ${value}`
  )
})

f2.add(controls, "acc", 0, 1.5, 0.01).onChange((value) => {
  particles.forEach((particle) => {
    particle.acc = value
  })
})
