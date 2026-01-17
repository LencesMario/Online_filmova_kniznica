<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="footer-column">
        <h4>Stránky</h4>
        <ul>
          <li><router-link to="/">Domov</router-link></li>
          <li><router-link to="/top">Top filmy</router-link></li>
          <li><router-link to="/favorites">Môj zoznam</router-link></li>
          <li><router-link to="/search">Vyhľadávanie</router-link></li>
          <li><router-link to="/about">O nás</router-link></li>
        </ul>
      </div>
      <div class="footer-column">
        <h4>Kontakt</h4>
        <p>📧 info@onlinefilmkniznica.sk</p>
        <p>📞 +421 911 123 456</p>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© 2026 Online Filmová knižnica. Všetky práva vyhradené.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterBar"
}
</script>

<style>
.footer {
  background-color: #222;
  color: white;
  padding: 20px 10px;
  margin-top: 40px;
}

.footer-top {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 20px;
}

.footer-column {
  min-width: 200px;
  margin: 0 20px;
}

.footer-column h4 {
  margin-bottom: 10px;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column li {
  margin: 5px 0;
}

/* odkazy ako navbar */
.footer a {
  color: white;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer a:hover {
  color: orange;
}

.footer a.router-link-exact-active {
  color: red;
  font-weight: bold;
}

.footer-bottom {
  text-align: center;
  font-size: 14px;
}
</style>
