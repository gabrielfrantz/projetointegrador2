<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title="Cursos">
          <v-btn slot="newButton" class="blue darken-2" fab ligth small absolute right middle @click="navigateTo({name: 'criar-curso'})">
            <v-icon>add</v-icon>
          </v-btn>
          <v-row>
            <v-col cols="12" sm="4" md="3">
              Nome
            </v-col>
            <v-col cols="6" sm="2">
              Descrição
            </v-col>
            <v-col cols="6" sm="2">
              Carga Horária
            </v-col>
            <v-col cols="6" sm="1">
              Visível
            </v-col>
          </v-row>
          <div v-for="curso in cursos" :key="curso.id">
              <v-row>
                <v-col cols="12" sm="4" md="3">
                    {{curso.nom_curso}}
                </v-col>
                <v-col cols="6" sm="2">
                    {{curso.des_curso}}
                </v-col>
                <v-col cols="6" sm="2">
                    {{curso.des_carga_horaria}}
                </v-col>
                <v-col cols="6" sm="1">
                    {{curso.ind_visivel}}
                </v-col>
                <v-col cols="6" sm="1" md="4" >
                  <v-btn class="green accent-2" fab ligth small right middle @click="navigateTo({name: 'editar-curso', params: {cursoId: curso.id}})">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn class="red accent-1" fab ligth small right middle @click="deletecurso({cursoId: curso.id})">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
          </div>
      </panel>
      </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import CursosService from '@/services/CursosService'
export default {
  components: {
    Panel
  },
  data () {
    return {
      cursos: null
    }
  },
  async mounted () {
    // do a request to the backend for all the banks
    this.cursos = (await CursosService.index()).data
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async deletecurso (cursoId) {
      try {
        confirm('Are you sure you want to delete this item?') && await CursosService.delete(cursoId.cursoId)
        this.cursos = (await CursosService.index()).data
        // this.$router.push({ name: 'banks' })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>
<style scoped>
</style>
