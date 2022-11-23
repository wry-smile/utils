const canvas = document.getElementById('canvas') as HTMLCanvasElement
const context = canvas.getContext('2d')!

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const hearts: Heart[] = []

class Heart {
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  size: number
  shadowBlur: number
  speedX: number
  speedY: number
  speedSize: number
  pointList: Record<'x' | 'y', number>[]

  constructor(ctx: CanvasRenderingContext2D = context, x: number = Math.random() * window.innerWidth, y: number = Math.random() * window.innerHeight, size = Math.random() * 2 + 1) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.size = size
    this.shadowBlur = Math.random() * 10
    this.speedX = (Math.random() + 0.2 - 0.6) * 8
    this.speedY = (Math.random() + 0.2 - 0.6) * 8
    this.speedSize = Math.random() * 0.05 + 0.01
    this.pointList = []
    const splitNumber = 50

    for (let i = 0; i < splitNumber; i++) {
      const step = i / splitNumber * (Math.PI * 2)
      const point = {
        x: (16 * Math.pow(Math.sin(step), 3)),
        y: -(13 * Math.cos(step) - 5 * Math.cos(2 * step) - 2 * Math.cos(3 * step) - Math.cos(4 * step)),
      }

      this.pointList.push(point)
    }
  }

  draw() {
    this.size -= this.speedSize
    this.x += this.speedX
    this.y += this.speedY
    this.ctx.save()
    this.ctx.translate(-1000, this.y)
    this.ctx.scale(this.size, this.size)
    this.ctx.beginPath()

    for (let i = 0; i < 50; i++) {
      const { x, y } = this.pointList[i]
      this.ctx.lineTo(x, y)
    }

    this.ctx.globalAlpha = this.size
    this.ctx.shadowBlur = Math.round((3 - this.size) * 10)
    this.ctx.shadowColor = 'hsla(0, 100%, 60%,0.5)'
    this.ctx.shadowOffsetX = this.x + 1000
    this.ctx.globalCompositeOperation = 'screen'
    this.ctx.closePath()
    this.ctx.fill()
    this.ctx.restore()
  }
}

function render() {
  requestAnimationFrame(render)

  hearts.push(new Heart())
  context.clearRect(0, 0, window.innerWidth, window.innerHeight)
  for (let i = 0; i < hearts.length; i++) {
    hearts[i].draw()
    if (hearts[i].size <= 0) {
      hearts.splice(i, 1)
      i--
    }
  }
}

render()

const onMove = (event: MouseEvent | TouchEvent) => {
  const { type } = event
  if (type === 'touchmove') {
    const { touches } = event as TouchEvent
    const touch = touches.item(0)!
    hearts.push(new Heart(context, touch.clientX, touch.clientY))
    hearts.push(new Heart(context, touch.clientX, touch.clientY))
  }
  else {
    const { clientX, clientY } = event as MouseEvent
    hearts.push(new Heart(context, clientX, clientY))
  }
}

canvas.addEventListener('mousemove', onMove)
canvas.addEventListener('touchmove', onMove)

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})
