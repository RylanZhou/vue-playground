<template>
  <div
    class="main-game"
    tabindex="-1"
    v-focus
    @keyup.up.prevent="() => handleKeyUp('UP')"
    @keyup.down.prevent="() => handleKeyUp('DOWN')"
    @keyup.left.prevent="() => handleKeyUp('LEFT')"
    @keyup.right.prevent="() => handleKeyUp('RIGHT')"
  >
    <div class="grid-container">
      <div class="grid-row">
        <div class="grid-cell" />
        <div class="grid-cell" />
        <div class="grid-cell" />
        <div class="grid-cell" />
      </div>

      <div class="grid-row">
        <div class="grid-cell" />
        <div class="grid-cell" />
        <div class="grid-cell" />
        <div class="grid-cell" />
      </div>

      <div class="grid-row">
        <div class="grid-cell" />
        <div class="grid-cell" />
        <div class="grid-cell" />
        <div class="grid-cell" />
      </div>

      <div class="grid-row">
        <div class="grid-cell" />
        <div class="grid-cell" />
        <div class="grid-cell" />
        <div class="grid-cell" />
      </div>
    </div>
    <div class="tile-container">
      <div
        v-for="tile in tiles"
        :key="tile.id"
        :class="`tile tile-${tile.val} tile-position-${tile.row}-${tile.col}${tile.transition ? ' tile-transition' : ''}${tile.isNew ? ' tile-new' : ''}${tile.merged ? ' tile-merged' : ''}`"
        :style="{left: `${tile.col * 121}px`, top: `${tile.row * 121}px`}"
      >
        <div class="tile-inner">
          {{ tile.val }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Game, { UP, LEFT, RIGHT, DOWN, BOARD } from './Board'

export default {
  name: 'Game',
  directives: {
    focus: {
      inserted(element) {
        element.focus()
        element.onblur = () => {
          element.focus()
        }
      }
    }
  },
  data() {
    return {
      tiles: [],
      scoreThisRound: 0,
      movable: false
    }
  },
  computed: {
    ...mapGetters('Game2048', ['isGameover'])
  },
  mounted() {
    this.initGame()
  },
  methods: {
    ...mapActions('Game2048', ['addScore', 'setGameover']),

    initGame() {
      Game.initBoard()
      this.tiles = []
      this.generateTile()
      this.generateTile()
    },

    generateTile() {
      const { row, col, val } = Game.generateNewValue()
      this.tiles.push({
        id: `${Math.random() + Date.now()}`, row, col, val, isNew: true, transition: true
      })
    },

    clearAttributes() {
      for (let i = 0; i < this.tiles.length; i++) {
        this.$set(this.tiles, i, { ...this.tiles[i], isNew: false, merged: false, transition: false })
      }
      this.scoreThisRound = 0
      this.movable = false
    },

    resetTransition() {
      for (let i = 0; i < this.tiles.length; i++) {
        this.$set(this.tiles, i, { ...this.tiles[i], transition: true })
      }
    },

    updateTile([row, col], [newRow, newCol]) {
      const tileIndex = this.tiles.findIndex(each => each.row === row && each.col === col)
      if (tileIndex !== -1) {
        this.$set(this.tiles, tileIndex, { ...this.tiles[tileIndex], row: newRow, col: newCol })
      }
      // Will two tiles be merged?
      if (BOARD[row][col] === BOARD[newRow][newCol]) {
        // Push a new merged tile
        this.tiles.push({
          row: newRow,
          col: newCol,
          val: BOARD[newRow][newCol] << 1,
          merged: true,
          transition: true
        })
        // If two tiles have merged, set useless to true, delete them before next keyboard event
        for (let i = 0; i < this.tiles.length; i++) {
          const tile = this.tiles[i]
          if (tile.row === newRow && tile.col === newCol && !tile.merged) {
            this.$set(this.tiles, i, { ...tile, useless: true })
          }
        }
      }
    },

    deleteUseless() {
      this.tiles = this.tiles.filter(each => !each.useless)
    },

    handleKeyUp(direction) {
      if (this.isPressingKey || this.isGameover) {
        // Last round is still operating, or gameover
        return
      }

      this.isPressingKey = true

      // Handle Keyup
      if (this[`move${direction}`]) {
        this[`move${direction}`]()
      }

      if (!this.movable) {
        this.isPressingKey = false
        return
      }

      if (this.scoreThisRound) {
        this.addScore(this.scoreThisRound)
      }

      setTimeout(() => {
        // Remove isNew, merged, including transition to prevent animation when re-rendering the tiles
        this.clearAttributes()
        // Delete useless blocks
        this.deleteUseless()
        // FIXME: Put transition back
        this.resetTransition()

        this.isPressingKey = false
      }, 250)

      // Reset BOARD_STATE all to false
      Game.resetBoardState()
      // Generate new tile for a new round
      this.generateTile()
      // Game over?
      if (Game.judgeGameover()) {
        this.setGameover()
      }
    },

    moveUP() {
      for (let j = 0; j < BOARD[0].length; j++) {
        for (let i = 0; i < BOARD.length; i++) {
          if (BOARD[i][j]) {
            const destination = Game.isMovable(i, j, UP)
            // This tile is movable
            if (destination !== i) {
              this.movable = true

              // Update tile
              this.updateTile([i, j], [destination, j])

              // Add score
              this.scoreThisRound += (BOARD[destination][j] << 1)

              // Update BOARD
              BOARD[destination][j] += BOARD[i][j]

              // Empty origin position
              BOARD[i][j] = 0
            }
          }
        }
      }
    },

    moveDOWN() {
      for (let j = 0; j < BOARD[0].length; j++) {
        for (let i = BOARD.length - 1; i >= 0; i--) {
          if (BOARD[i][j]) {
            const destination = Game.isMovable(i, j, DOWN)
            if (destination !== i) {
              this.movable = true

              // Update tile
              this.updateTile([i, j], [destination, j])

              // Add score
              this.scoreThisRound += (BOARD[destination][j] << 1)

              // Update BOARD
              BOARD[destination][j] += BOARD[i][j]

              // Empty origin position
              BOARD[i][j] = 0
            }
          }
        }
      }
    },

    moveLEFT() {
      for (let i = 0; i < BOARD.length; i++) {
        for (let j = 0; j < BOARD[0].length; j++) {
          if (BOARD[i][j]) {
            const destination = Game.isMovable(i, j, LEFT)
            if (destination !== j) {
              this.movable = true
              this.updateTile([i, j], [i, destination])
              this.scoreThisRound += (BOARD[i][destination] << 1)
              BOARD[i][destination] += BOARD[i][j]
              BOARD[i][j] = 0
            }
          }
        }
      }
    },

    moveRIGHT() {
      for (let i = 0; i < BOARD.length; i++) {
        for (let j = BOARD[0].length - 1; j >= 0; j--) {
          if (BOARD[i][j]) {
            const destination = Game.isMovable(i, j, RIGHT)
            if (destination !== j) {
              this.movable = true
              this.updateTile([i, j], [i, destination])
              this.scoreThisRound += (BOARD[i][destination] << 1)
              BOARD[i][destination] += BOARD[i][j]
              BOARD[i][j] = 0
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './tile.scss';

.main-game {
  width: 500px;
  height: 500px;
  margin-top: 42px;
  box-sizing: border-box;
  padding: 15px;
  border-radius: 6px;
  background-color: #baaea0;
  outline: none;

  .grid-container {
    position: absolute;
    z-index: 1;

    .grid-row {
      font-size: 0;
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }

      .grid-cell {
        display: inline-block;
        width: 106px;
        height: 106px;
        margin-right: 15px;
        border-radius: 6px;
        background: #cdc1b6;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .tile-container {
    position: absolute;
    z-index: 2;
  }
}
</style>
