<template>
  <v-layout class="ma-0 pa-0">
    <v-flex>
      <div class="home background">
        <img class="imagem_home" src="../assets/imagem_home.jpg" alt="Imagem de pessoa utilizando um laptop"/>
        <div class="centered-title"><h1>Bem-vindo a <span class="educare">Educare</span></h1></div>
        <div class="centered-subtitle"><h2>Sua nova plataforma de cursos online!</h2></div>
        <div class="centered-text"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quibusdam sit asperiores doloremque, esse odit!</p></div>
        <div class="centered-buttons">
          <v-btn class="accent-2" color="primary" @click="navigateTo('/register')"> Registre-se Agora! </v-btn>
        </div>
        <div class="stakeholder">
          <img src="../assets/Stakeholder2.jpg" alt="" class="imagem_stakeholder">
          <div class="texto_stakeholder">
            <h1>Ricardo Swarovsky</h1>
            <h4>Stakeholder</h4>
            <h2>Chief Technology Office (CTO) at <a href="https://www.combateafraude.com">Combate a Fraude</a></h2>
            <h3>Venâncio Aires, Rio Grande do Sul, Brasil</h3>
          </div>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'

export default {
  data () {
    return {
    }
  },
  components: {
    Panel
  },
  async mounted () {
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

h1 {
  font-weight: bold;
  font-size: 2.5rem;
  font-family: 'Montserrat', sans-serif;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.stakeholder{
  width: 100%;
  height: auto;
}

.background{
  background-image: url("../assets/imagem_home.jpg");
  background-size: cover;
}

.educare {
  color: #1976d2;
}

.center {
  margin: auto;
  width: 50%;
  border: 3px solid green;
  padding: 10px;
}

.home {
  position: relative;
  padding: 0;
  margin: 0;
  text-align: center;
  color: white;
  background: #1D1E20;
  font-family: 'Montserrat', sans-serif;
}

.centered-title {
  position: absolute;
  top: 8%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.centered-subtitle {
  position: absolute;
  top: 16%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin   : 0 auto;
  width    : 100%;
}

.centered-text {
  position: absolute;
  top: 24%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin   : 0 auto;
  width    : 100%;
}

.centered-buttons {
  position: absolute;
  top: 32%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.buttons {
  margin: 10px;
}

.imagem_home {
  height: 60%;
  filter: blur(5px) brightness(40%);
  position: relative;
}

.stakeholder {
  background: #1D1E20;
  margin-left: auto;
  margin-right: auto;
  border: 0px solid gray;
  max-width: 800px;
}

.imagem_stakeholder{
  display: inline-block;
  vertical-align: top;
  width: 25%;
  margin: 20px 30px 0 0;
}

.texto_stakeholder {
  text-align: left;
  margin: 1rem;
  display: inline-block;
  width: 46%;
}
</style>
