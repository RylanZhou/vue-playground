<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" exact>
        Home
      </router-link>|
      <router-link to="/todo-list">
        Todo List
      </router-link>|
      <router-link to="/canvas">
        Canvas
      </router-link>
    </div>
    <div id="pages">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active, &.router-link-active {
        color: #409efe;
      }
    }
  }

  #pages {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
