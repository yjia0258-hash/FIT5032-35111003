<template>
  <nav class="topnav">
    <router-link to="/GetBookCount">Get Book Count</router-link>
    <router-link to="/WeatherCheck">Get Weather</router-link>
    <router-link to="/CountBookAPI" class="nav-link" active-class="active">Count Book API</router-link>
  </nav>
</template>

<script>
export default { name: 'BHeader' }
</script>

<style scoped>
.topnav{
  display:flex; gap:16px; justify-content:center;
  padding:16px 0; background:transparent;
}
.topnav a{
  padding:10px 16px; border-radius:12px;
  text-decoration:none; font-weight:600;
  color:#1a73e8;                       /* 链接默认蓝 */
}
.topnav a.router-link-exact-active{
  background:#1a73e8; color:#fff;      /* 当前路由高亮成蓝底白字 */
  box-shadow:0 6px 14px rgba(26,115,232,.25);
}
</style>
