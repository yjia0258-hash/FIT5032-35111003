<script setup>
import JSONLab from './components/JSONLab.vue'
import BHeader from './components/BHeader.vue'
// import LibraryRegistrationForm from './components/LibraryRegistrationForm.vue'
</script>

<template class="main-container">
  <header>
    <BHeader />
  </header>

  <main class="">
    <!-- <LibraryRegistrationForm /> -->
    <!-- <JSONLab /> -->
     <router-view></router-view>
  </main>
</template>

<style scoped>
.about {
  text-align: center;
  padding: 2rem;
}.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
}

.form {
  text-align: center;
  margin-top: 50px;
}

#username:focus,
#password:focus,
#confirm-password:focus,
#isAustralian:focus,
#suburb:focus,
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
.is-invalid {
  border-color: #dc3545 !important;
}
/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */

</style>
