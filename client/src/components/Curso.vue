<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title="Eventos">
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
          </v-row>
          <div v-for="curso in cursos" :key="curso.id">
              <v-row>
                <v-col cols="12" sm="4" md="3">
                    {{curso.nom_evento}}
                </v-col>
                <v-col cols="6" sm="2">
                    {{curso.des_curso}}
                </v-col>
                <v-col cols="6" sm="2">
                    {{curso.des_carga_horaria}}
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
      eventos: null
    }
  },
  async mounted () {
    // do a request to the backend for all the banks
    this.cursos = (await CursosService.index()).data
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
