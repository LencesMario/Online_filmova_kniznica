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
body {
  margin: 0;
  padding-top: 70px;
}
</style>
