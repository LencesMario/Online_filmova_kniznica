<template>
  <nav class="navbar">
    <router-link to="/" class="logo">
      <img src="/images/psi.jpg" alt="Logo" class="logo-img" />
    </router-link>

    <!-- hamburger -->
    <div class="hamburger" @click="toggleMenu">
      ☰
    </div>

    <!-- menu -->
    <div class="nav-links" :class="{ open: menuOpen }">
      <router-link to="/" @click="closeMenu">Domov</router-link> 
      <router-link to="/top" @click="closeMenu">Top filmy</router-link>
      <router-link to="/favorites" @click="closeMenu">Môj zoznam</router-link>
      <router-link to="/search" @click="closeMenu">Vyhľadávanie</router-link>
      <router-link to="/about" @click="closeMenu">O nás</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      menuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },
    closeMenu() {
      this.menuOpen = false
    }
  }
}
</script>

<style>
.logo {
  margin-left: 10px;
}

.logo-img {
  height: 30px;
  width: auto;
  transition: transform 0.3s ease;
}

.logo-img:hover {
  transform: scale(1.05);
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  display: flex;
  align-items: center;

  padding: 15px 20px;
  background-color: #222;
  z-index: 1000;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  transition: color 0.2s ease;
}

.navbar a:hover {
  color: orange;
}

.navbar a.router-link-exact-active {
  color: red;
  font-weight: bold;
}

/* hamburger */
.hamburger {
  display: none;
  font-size: 28px;
  color: white;
  cursor: pointer;
}

/* links wrapper */
.nav-links {
  display: flex;
  gap: 30px;

  justify-content: center;
  flex: 1;
}

/* responsive */
@media (max-width: 768px) {
  .hamburger {
    display: block;
    position: absolute;
    right: 40px;
  }

  .nav-links {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: #222;

    flex-direction: column;
    align-items: center;
    gap: 20px;

    padding: 20px 0;
    display: none;
  }

  .nav-links.open {
    display: flex;
  }
}
</style>
