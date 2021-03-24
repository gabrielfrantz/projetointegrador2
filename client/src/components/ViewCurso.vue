<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel :title="nom_curso">
        <v-textarea label="Descrição*" v-model="des_curso" readonly></v-textarea>
        <v-text-field label="Carga Horária*" v-model="des_carga_horaria" readonly></v-text-field>
      </panel>
      <br>
      <panel title="Modulos">
        <v-expansion-panels focusable>
          <v-expansion-panel v-for="modulo in modulos" :key="modulo.id">
            <v-expansion-panel-header>{{modulo.nom_modulo}}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-container class="grey lighten-5 mb-6">
                <v-row class="fill-height overflow-auto">
                  <v-col class="py-2" :cols="(12/itemsPerRow)" cs12 sm6 md4 lg3 v-for="aula in modulo.Aulas" :key="aula.id" >
                    <v-card class="card fill-height" tile outlined>
                      <v-img class="white--text align-end" :aspect-ratio="16/9" height="200px" :src="aula.src_thumbnail">
                      </v-img>
                      <v-card-title primary-title>
                        <div>
                          {{aula.nom_aula}}
                        </div>
                      </v-card-title>
                      <v-card-actions>
                        <v-btn color="deep-purple" text dark @click="navigateTo({name: 'view-aula', params: {aulaId: aula.id}})">
                          Abrir aula
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import CursosService from '@/services/CursosService'
import ModulosService from '@/services/ModulosService'
export default {
  data () {
    return {
      curso: {},
      modulos: {},
      cursoId: null,
      nom_curso: null,
      des_curso: null,
      des_carga_horaria: null,
      ind_visivel: null,
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  async mounted () {
    if (this.$store.state.route.params.cursoId) {
      this.cursoId = this.$store.state.route.params.cursoId
    } else if (localStorage.cursoId) {
      this.cursoId = localStorage.cursoId
    } else {
      this.navigateTo({name: 'root'})
    }
    this.curso = (await CursosService.show(this.cursoId)).data
    this.modulos = (await ModulosService.view(this.cursoId)).data
    this.cursoId = this.curso.id
    this.nom_curso = this.curso.nom_curso
    this.des_curso = this.curso.des_curso
    this.des_carga_horaria = this.curso.des_carga_horaria
    var visivel = true
    if (this.curso.ind_visivel === 'N') {
      visivel = false
    }
    this.ind_visivel = visivel
  },
  components: {
    Panel
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
  },
  watch: {
    cursoId (cursoId) {
      localStorage.cursoId = cursoId
    }
  }
}
</script>
<style scoped>
</style>
