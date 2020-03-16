<template>
  <div class="todo-list">
    <todo-item v-for="item in data" :key="item.id" :item="item" />
  </div>
</template>

<script>
import TodoItem from './TodoItem'

export default {
  name: 'TodoList',
  components: {
    TodoItem
  },
  props: {
    data: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style lang="scss" scoped>
.todo-list {
}
</style>
