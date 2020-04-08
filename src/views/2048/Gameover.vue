<template>
  <transition name="el-fade-in-linear">
    <div class="game-over" v-show="isGameover">
      <div class="title">
        Game over!
      </div>
      <div class="try-again" @click="resetGame">
        Try again
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Gameover',
  computed: {
    ...mapGetters('Game2048', ['isGameover'])
  },
  methods: {
    ...mapActions('Game2048', ['resetGameover']),

    resetGame() {
      this.resetGameover()
      this.$emit('reset')
    }
  }
}
</script>

<style lang="scss" scoped>
.game-over {
  position: absolute;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 42px;
  width: 500px;
  height: 500px;
  background: rgba(238, 228, 218, 0.5);

  .title {
    font-size: 60px;
    font-weight: bolder;
    color: #786c65;
  }

  .try-again {
    height: 40px;
    line-height: 40px;
    border-radius: 3px;
    margin-top: 22px;
    padding: 0 20px;
    background-color: #8f7a66;
    font-weight: bolder;
    font-size: 20px;
    color: #f9f6f2;
    cursor: pointer;
  }
}
</style>
