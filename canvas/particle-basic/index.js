const canvas = document.querySelector("canvas")

console.log(canvas)

const ctx = canvas.getContext('2d')
console.log(ctx)

canvas.style.width = 300 + 'px'
canvas.style.height = 300 + 'px'

ctx.fillRect(10, 10, 50, 50)
