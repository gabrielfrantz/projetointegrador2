<template>
  <v-layout ma-0 pa-0>
    <v-flex>
      <div class="home">
        <img class="imagem_home" src="../assets/imagem_home.jpg" alt="Imagem de pessoa utilizando um laptop"
        srcset="" width="100%"/>
        <div class="centered-title"><h1>Bem-vindo a <span class="educare">Educare</span></h1></div>
        <div class="centered-subtitle"><h2>Sua nova plataforma de cursos online!</h2></div>
        <div class="centered-buttons">
          <v-btn class="buttons" color="primary"> Inscreva-se Agora </v-btn>
          <v-btn class="buttons" color="primary"> Teste gratuito por 30 dias </v-btn>
        </div>
      </div>
      <br>
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

h1 {
  font-weight: bold;
  font-size: 2.5rem;
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

.educare {
  color: #1976d2;
}

.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.home {
  position: relative;
  padding: 0;
  margin: 0;
  text-align: center;
  color: white;
}

.centered-title {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.centered-subtitle {
  position: absolute;
  top: 18%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.centered-buttons {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.buttons {
  margin: 10px;
}

.imagem_home {
  width: auto;
  filter: blur(5px) brightness(40%);
  /* height: 50%; */
}
</style>
