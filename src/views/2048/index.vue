<template>
  <div class="page-container">
    <Header @reset="handleResetGame" />
    <div class="clear" />
    <Gameover @reset="handleResetGame" />
    <Game ref="game" />
  </div>
</template>

<script>
import Header from './Header'
import Gameover from './Gameover'
import Game from './Game'

export default {
  name: 'Game2048',
  components: {
    Header, Game, Gameover
  },
  methods: {
    handleResetGame() {
      this.$refs['game'].initGame()
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  width: 500px;
  user-select: none;

  .clear {
    clear: both;
  }
}
</style>
