<template>
  <nav class="navbar">
    <router-link to="/">Domov</router-link> 
    <router-link to="/top">Top films</router-link>
    <router-link to="/favorites">Môj zoznam</router-link>
    <router-link to="/search">Vyhľadávanie</router-link>
    <router-link to="/about">O nás</router-link>
  </nav>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  display: flex;
  justify-content: center;
  gap: 30px;

  padding: 15px 0;
  background-color: #222;
  z-index: 1000;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  transition: color 0.2s ease;
}

/* hover */
.navbar a:hover {
  color: orange;
}

/* aktívna (kliknutá) linka */
.navbar a.router-link-exact-active {
  color: red;
  font-weight: bold;
}
</style>