<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <h1 v-if="$store.state.isUserLoggedIn">{{ msg }}</h1>
      <br>
      <panel title="Cursos" v-if="$store.state.isUserLoggedIn" back="false">
        <div class="error" v-html="error" />
        <v-container class="grey lighten-5 mb-6">
              <v-row class="fill-height overflow-auto">
              <v-col class="py-2" :cols="(12/itemsPerRow)" cs12 sm6 md4 lg3 v-for="curso in cursos" :key="curso.id" >
                <v-card class="card fill-height" tile outlined>
                  <v-img class="white--text align-end" :aspect-ratio="16/9" height="200px" :src="curso.src_banner">
                  </v-img>
                  <v-card-title primary-title>
                    <div>
                      {{curso.nom_curso}}
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn color="deep-purple" text dark @click="navigateTo({name: 'view-curso', params: {cursoId: curso.id}})">
                      Abrir curso
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
        </v-container>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import CursosService from '@/services/CursosService'

export default {
  data () {
    return {
      cursos: null,
      userId: this.$store.state.user.id,
      token: this.$store.state.token,
      error: null,
      msg: 'Bem-vindo ao Educare, ' + (this.$store.state.user.nom_pessoa || 'por favor, complete seu cadastro na aba perfil!')
    }
  },
  components: {
    Panel
  },
  async mounted () {
    this.err = null
    if (this.$store.state.isUserLoggedInAdm) {
      this.cursos = (await CursosService.view(this.userId, this.token)).data
    } else {
      try {
        this.cursos = (await CursosService.viewAssinatura(this.userId, this.token)).data
      } catch (err) {
        this.error = err.response.data.error
      }
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    calcRowsPerPage () {
      let container = document.getElementById('container')
      let minItemHeight = 170
      if (container) {
        let containerHeight = parseInt(container.clientHeight, 0)
        this.rpp = Math.floor(containerHeight / minItemHeight)
      } else {
        this.rpp = 4
      }
    },
    created () {
      // re-calc on screen resize
      window.addEventListener('resize', () => {
        this.calcRowsPerPage()
      })
    }
  },
  computed: {
    numberOfPages () {
      return Math.ceil(this.beers.length / this.ipp)
    },
    rowsPerPage () {
      return this.rpp
    },
    itemsPerRow () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 1
        case 'sm': return 2
        case 'md': return 3
        case 'lg': return 4
        case 'xl': return 4
      }
    },
    ipp () {
      return Math.ceil(this.rowsPerPage * this.itemsPerRow)
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
