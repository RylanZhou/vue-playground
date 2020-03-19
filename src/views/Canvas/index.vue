<template>
  <div class="page-container">
    <div class="sub-menu">
      <ul>
        <li>
          <router-link to="/canvas/test">
            Test Field
          </router-link>
        </li>
      </ul>
    </div>
    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  width: 100%;
  height: calc(100vh - 82px);
  border-top: 1px solid #ccc;

  .sub-menu {
    min-width: 200px;
    border-right: 1px solid #ccc;

    ul {
      padding: 0;
      margin: 0;
      list-style: none;

      li {
        a {
          display: block;
          padding: 20px 0 20px 20px;
          font-weight: bold;
          text-decoration: none;
          text-align: left;
          color: #2c3e50;
          transition: all .2s linear;
          &:hover {
            background-color: rgb(245, 229, 188);
          }
          &.router-link-exact-active {
            border-left: 12px solid orange;
            background-color: rgb(245, 229, 188);
          }
        }
      }
    }
  }

  .main-container {
    flex-grow: 1;
    padding: 16px;

    canvas {
      border: 1px solid #ccc;
    }
  }
}
</style>
