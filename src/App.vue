<template>
  <div>
    <div class="header">
      VIEWER
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}
body {
  color: #2c3e50;
}
</style>

<style lang="scss" scoped>
.header {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

