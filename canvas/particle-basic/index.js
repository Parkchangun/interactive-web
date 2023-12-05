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

canvas.width = canvasWidth * DPR
canvas.height = canvasHeight * DPR
// DPR이 2 이상인 기기에선 좀 더 선명하게 보임
ctx.scale(DPR, DPR)

canvas.style.width = canvasWidth + "px"
canvas.style.height = canvasHeight + "px"

const RADIAN = Math.PI / 180
class Particle {
  constructor(x, y, radius, vy) {
    this.x = x
    this.y = y
    this.radius = radius
    this.vy = vy
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
    // this.y += Math.cos(Date.now() / 1000) * 5
    this.y += this.vy
  }
}

const randomNumberBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min
}

const particles = new Array(50).fill(0).map(() => {
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
