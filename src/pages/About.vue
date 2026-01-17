<template>
  <div class="about-page">
    <h1>O nás</h1>

    <section class="section">
      <h2>Naša misia</h2>
      <p>
        FilmApp je miestom, kde môžete objavovať najlepšie filmy, sledovať top rebríčky a ukladať si svoje obľúbené filmy.
        Naším cieľom je sprístupniť filmy rýchlo a jednoducho a vytvoriť komunitu filmových nadšencov.
      </p>
    </section>

    <section class="section">
      <h2>Naša vízia</h2>
      <p>
        Naším cieľom je poskytovať aktuálne informácie o filmoch, ponúkať prehľadné zoznamy a recenzie, a byť miestom, kde
        sa stretávajú fanúšikovia filmov.
      </p>
    </section>

    <section class="section">
      <h2>Náš tím</h2>
      <div class="team">
        <div class="team-member">
          <h3>Mário Lenčéš</h3>
          <p>Vývojár a zakladateľ</p>
        </div>
      </div>
    </section>

    <!-- Kontakt -->
    <section class="section">
      <h2>Kontakt</h2>
      <p>📧 Email: kontakt@filmapp.sk</p>
      <p>🌐 Web: www.filmapp.sk</p>
    </section>

  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>

<style scoped>
.about-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  color: white;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: blueviolet;
}

.section {
  margin-bottom: 30px;
}

h2 {
  margin-bottom: 10px;
  color: orange;
}

p {
  line-height: 1.6;
  color: black;
}

.team {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}

.team-member {
  background-color: #333;
  padding: 15px;
  border-radius: 8px;
  flex: 1 1 200px;
}
</style>
