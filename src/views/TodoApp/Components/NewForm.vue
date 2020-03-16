<template>
  <div class="new-form">
    <el-input class="input" placeholder="What to do?" v-model="message" />
    <el-button type="primary" @click="handleSubmit">
      Submit
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'NewForm',
  data() {
    return {
      message: ''
    }
  },
  methods: {
    handleSubmit() {
      if (this.message) {
        this.$emit('new', this.message)
        this.message = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.new-form {
  display: flex;

  .el-input {
    flex-grow: 1;
    margin-right: 16px;
  }
}
</style>
