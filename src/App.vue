<template>
  <NavBar />
  <router-view />
  <FooterBar />
</template>

<script>
import NavBar from './components/NavBar.vue'
import FooterBar from './components/Footer.vue'

export default {
  components: {
    NavBar,
    FooterBar
  }
}
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* router-view = hlavný obsah */
#app > *:nth-child(2) {
  flex: 1;
}

body {
  padding-top: 70px;
}

</style>
