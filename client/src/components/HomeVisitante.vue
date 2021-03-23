<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <h1>Bem vindo, Visitante!</h1>
      <h2>Registre-se ou acesse sua conta para ter acesso ao conteúdo do site.</h2>
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
h1, h2 {
  font-weight: normal;
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
.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
