<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title="Log">
        <v-text-field label="Data" v-model="dta_log" readonly></v-text-field>
        <v-text-field label="URL" v-model="nom_url" readonly></v-text-field>
        <v-text-field label="Erro" v-model="nom_erro" readonly></v-text-field>
        <v-textarea label="Paramêtros" v-model="des_params" readonly></v-textarea>
        <v-textarea label="Body" v-model="des_body" readonly></v-textarea>
        <v-textarea label="Descrição" v-model="des_erro" readonly></v-textarea>
        <v-btn class="red" @click="navigateTo({name: 'log'})" dark>Voltar</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import LogService from '@/services/LogService'
import moment from 'moment'
export default {
  data () {
    return {
      log: {},
      userId: null,
      token: this.$store.state.token,
      logId: null,
      dta_log: null,
      nom_url: null,
      nom_erro: null,
      des_params: null,
      des_body: null,
      des_erro: null
    }
  },
  async mounted () {
    this.userId = this.$store.state.userId
    this.token = this.$store.state.token
    if (this.$store.state.route.params.logId) {
      this.logId = this.$store.state.route.params.logId
    } else if (localStorage.logId) {
      this.logId = localStorage.logId
    } else {
      this.navigateTo({name: 'root'})
    }
    this.log = (await LogService.show(this.userId, this.logId, this.token)).data
    this.logId = this.log.id
    this.dta_log = this.formatDate(this.log.createdAt)
    this.nom_url = this.log.nom_url
    this.nom_erro = this.log.nom_erro
    this.des_params = this.log.des_params
    this.des_body = this.log.des_body
    this.des_erro = this.log.des_erro
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
    logId (logId) {
      localStorage.logId = logId
    }
  }
}
</script>
<style scoped>
</style>
