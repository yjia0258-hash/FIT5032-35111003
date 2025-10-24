<template>
  <div id="app">
    <BHeader />
    <main class="container mt-4" role="main" aria-live="polite">
      <RouterView />
    </main>
  </div>
</template>

<script>
import BHeader from './components/BHeader.vue'

export default {
  name: 'App',
  components: { BHeader }
}
</script>

<style>
/* 全局基础样式 */
:root {
  --app-max-width: 1200px;
}

html, body, #app {
  height: 100%;
}

body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background: #fafafa;
  color: #222;
}

#app {
  text-align: center;
}

/* 让内容在宽屏下更居中、好看 */
.container {
  max-width: var(--app-max-width);
  margin: 0 auto;
}

main {
  padding: 20px;
}

/* 可选：简单的页面切换淡入动画（需要时可保留） */
/*
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
*/
</style>
