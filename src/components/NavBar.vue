<template>
  <nav class="navbar">
    <router-link to="/">Home</router-link>
    <router-link to="/top">Top films</router-link>
    <router-link to="/favorites">Môj zoznam</router-link>
    <router-link to="/search">Vyhľadávanie</router-link>
  </nav>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style>
.navbar {
  display: flex;
  gap: 20px;
  padding: 10px 20px;
  background-color: #222;
}

.navbar a {
  color: white;
  text-decoration: none;
}

.navbar a.router-link-exact-active {
  font-weight: bold;
}
</style>
