<template>
  <canvas id="test-field" />
</template>

<script>
import Circle from './Circle'

export default {
  data() {
    return {
      canvas: null,
      ctx: null,
      circleArray: []
    }
  },

  mounted() {
    this.initCanvas()
    window.onresize = () => {
      this.initCanvas()
    }
  },

  methods: {
    initCanvas() {
      const { clientHeight, clientWidth } = document.querySelector('.main-container')
      const canvas = document.querySelector('#test-field')
      canvas.height = clientHeight - 32
      canvas.width = clientWidth - 32
      this.ctx = canvas.getContext('2d')
      this.canvas = canvas

      // this.drawRect()
      // this.drawLine()
      this.drawArc()
      this.doAnimate()
    },

    drawRect() {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
      this.ctx.fillRect(100, 100, 100, 100)
      this.ctx.fillRect(300, 300, 100, 100)
      this.ctx.fillRect(100, 400, 100, 100)
      this.ctx.fillRect(200, 10, 100, 100)
    },

    drawLine() {
      this.ctx.beginPath()
      this.ctx.moveTo(50, 300)
      this.ctx.lineTo(300, 100)
      this.ctx.lineTo(400, 300)
      this.ctx.strokeStyle = '#fa34a3'
      this.ctx.stroke()
    },

    drawArc() {
      for (let i = 0; i < 30; i++) {
        const x = 30 + Math.random() * (this.canvas.width - 60)
        const y = 30 + Math.random() * (this.canvas.height - 60)
        const dx = (Math.random() - 0.5) * 8
        const dy = (Math.random() - 0.5) * 8
        const circle = new Circle(x, y, 30, dx, dy)
        circle.draw(this.ctx)
        this.circleArray.push(circle)
      }
    },

    clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },

    doAnimate() {
      requestAnimationFrame(this.doAnimate)
      this.clearCanvas()
      this.circleArray.forEach(circle => {
        circle.update(this.ctx, this.canvas)
      })
    }
  },

  destroyed() {
    window.onresize = null
  }
}
</script>

<style lang="scss" scoped>

</style>
