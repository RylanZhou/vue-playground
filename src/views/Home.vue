<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
    <h1>Playground</h1>
  </div>
</template>

<script>
export default {
  name: 'Home',
  beforeCreate() {
    console.log(this)
  }
}
</script>
