<template>
  <div class="header">
    <div class="text">
      <h1>2048</h1>
      <p>Join numbers to get to the 2048 tile!</p>
    </div>
    <div class="float-right">
      <div class="score">
        <div class="title">
          SCORE
        </div>
        <div class="number">
          {{ score }}
        </div>
        <div class="indicator" :class="`${scoreDelta ? 'active' : ''}`">
          +{{ scoreDelta }}
        </div>
      </div>
      <div class="best">
        <div class="title">
          BEST
        </div>
        <div class="number">
          {{ bestScore }}
        </div>
      </div>
      <br>
      <div class="new-game" @click="resetGame">
        NEW GAME
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Header',
  data() {
    return {
      scoreDelta: 0
    }
  },
  watch: {
    score(next, prev) {
      if (next) {
        this.scoreDelta = next - prev
        setTimeout(() => {
          this.scoreDelta = 0
        }, 400)
      }
    }
  },
  computed: {
    ...mapGetters('Game2048', ['score', 'bestScore'])
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
.header {
  font-family: Arial, Helvetica, sans-serif;

  .text {
    float: left;

    h1 {
      margin: 0;
      font-size: 50px;
      color: #786c65;
    }
    p {
      margin: 0;
      line-height: 42px;
      color: #766d65;
      font-weight: bold;
      font-size: 18px;
    }
    text-align: left;
  }

  .float-right {
    float: right;
    text-align: right;

    .score, .best {
      display: inline-block;
      position: relative;
      box-sizing: border-box;
      height: 55px;
      min-width: 63px;
      margin-left: 4px;
      padding: 8px;
      border-radius: 4px;
      text-align: center;
      font-size: 12px;
      font-weight: bold;
      background-color: #baaea0;

      .title {
        color: #efe4da
      }

      .number {
        margin-top: 6px;
        padding: 0 16px;
        font-size: 18px;
        color: white;
      }

      .indicator {
        position: absolute;
        top: 28px;
        left: 0;
        right: 0;
        margin: auto;
        font-size: 18px;
        opacity: 0;
        transform: translateY(0);
        transition: transform 0.4s ease-in-out;

        &.active {
          opacity: 1;
          transform: translateY(-40px);
        }
      }
    }

    .new-game {
      display: inline-block;
      height: 40px;
      margin-top: 4px;
      padding: 0 16px;
      line-height: 40px;
      border-radius: 4px;
      font-weight: bold;
      font-size: 16px;
      background-color: #8f7a66;
      color: white;
      cursor: pointer;
    }
  }
}
</style>
