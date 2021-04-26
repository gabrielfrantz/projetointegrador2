<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title="Auditoria">
        <v-text-field label="Data" v-model="dta_auditoria" readonly></v-text-field>
        <v-text-field label="Tabela" v-model="nom_table" readonly></v-text-field>
        <v-text-field label="Ação" v-model="tip_acao" readonly></v-text-field>
        <v-textarea label="Antes" v-model="prevValues" readonly></v-textarea>
        <v-textarea label="Depois" v-model="newValues" readonly></v-textarea>
        <v-btn class="red" @click="navigateTo({name: 'auditoria'})" dark>Voltar</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import AuditoriaService from '@/services/AuditoriaService'
import moment from 'moment'
export default {
  data () {
    return {
      auditoria: {},
      userId: null,
      auditoriaId: null,
      dta_auditoria: null,
      nom_table: null,
      tip_acao: null,
      prevValues: null,
      newValues: null
    }
  },
  async mounted () {
    this.userId = this.$store.state.userId
    if (this.$store.state.route.params.auditoriaId) {
      this.auditoriaId = this.$store.state.route.params.auditoriaId
    } else if (localStorage.auditoriaId) {
      this.auditoriaId = localStorage.auditoriaId
    } else {
      this.navigateTo({name: 'root'})
    }
    this.auditoria = (await AuditoriaService.show(this.userId, this.auditoriaId)).data
    this.auditoriaId = this.auditoria.id
    this.dta_auditoria = this.formatDate(this.auditoria.createdAt)
    this.nom_table = this.auditoria.nom_table
    this.tip_acao = this.auditoria.tip_acao
    this.prevValues = JSON.stringify(this.auditoria.prevValues)
    this.newValues = JSON.stringify(this.auditoria.newValues)
  },
  components: {
    Panel
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
      localStorage.clear()
    },
    formatDate (value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY HH:mm:ss')
      }
    }
  },
  watch: {
    auditoriaId (auditoriaId) {
      localStorage.auditoriaId = auditoriaId
    }
  }
}
</script>
<style scoped>
</style>
