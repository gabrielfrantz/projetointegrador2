<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title="Curso">
        <v-text-field label="Nome*" v-model="nom_curso" readonly></v-text-field>
        <v-textarea label="Descrição*" v-model="des_curso" readonly></v-textarea>
        <v-text-field label="Carga Horária*" v-model="des_carga_horaria" readonly></v-text-field>
      </panel>
      <br>
      <panel title="Modulos">
         <v-container class="grey lighten-5 mb-6">
              <v-row class="fill-height overflow-auto">
              <v-col class="py-2" :cols="(12/itemsPerRow)" cs12 sm6 md4 lg3 v-for="modulo in modulos" :key="modulo.id" >
                <v-card class="card fill-height" tile outlined>
                  <v-img class="white--text align-end" :aspect-ratio="16/9" height="200px" src="https://i.imgur.com/ui3uCKL.jpg">
                  </v-img>
                  <v-card-title primary-title>
                    <div>
                      {{modulo.nom_modulo}}
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn color="deep-purple" text dark @click="navigateTo({name: 'view-curso', params: {moduloId: modulo.id}})">
                      Abrir modulo
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
    const cursoId = this.$store.state.route.params.cursoId
    this.curso = (await CursosService.show(cursoId)).data
    this.modulos = (await ModulosService.index(cursoId)).data
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
    }
  }
}
</script>
<style scoped>
</style>
