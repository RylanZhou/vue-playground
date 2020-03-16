<template>
  <div class="page-container">
    <new-form @new="addTodo" />
    <el-divider />
    <todo-list :data="todoData" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import NewForm from './Components/NewForm'
import TodoList from './Components/TodoList'

export default {
  name: 'TodoApp',
  components: {
    NewForm,
    TodoList
  },
  computed: {
    ...mapState({
      todoData: ({ todoApp }) => todoApp.data
    })
  },
  methods: {
    ...mapActions(['addTodo'])
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  width: 50%;
  min-width: 300px;
}
</style>
