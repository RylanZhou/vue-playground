<template>
  <canvas id="test-field" />
</template>

<script>
export default {
  data() {
    return {
      ctx: null
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

      this.drawRect()
    },

    drawRect() {
      this.ctx.fillRect(100, 100, 100, 100)
      this.ctx.fillRect(300, 300, 100, 100)
      this.ctx.fillRect(100, 400, 100, 100)
      this.ctx.fillRect(200, 10, 100, 100)
    }
  },

  destroyed() {
    window.onresize = null
  }
}
</script>

<style lang="scss" scoped>

</style>
