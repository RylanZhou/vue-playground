<template>
  <div class="todo-item">
    <div
      class="circle"
      :class="item.isCompleted ? 'filled' : ''"
      @click="() => toggleComplete(item.id)"
    />
    <span :class="item.isCompleted ? 'line-cross' : ''">{{ item.message }}</span>
    <div class="trash" @click="() => deleteTodo(item.id)">
      <i class="el-icon-delete" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TodoItem',
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    ...mapActions(['toggleComplete', 'deleteTodo'])
  }
}
</script>

<style lang="scss" scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 10px 0;
  height: 30px;
  border-radius: 4px;
  line-height: 30px;
  text-align: left;
  color: white;
  background-color: #666;

  .circle {
    display: inline-block;
    height: 20px;
    width: 20px;
    margin-right: 10px;
    border-radius: 50%;
    border: 1px solid white;

    &.filled {
      background-color: white;
    }
  }

  span {
    user-select: none;
    flex-grow: 1;

    &.line-cross {
      text-decoration: line-through;
    }
  }
}
</style>
