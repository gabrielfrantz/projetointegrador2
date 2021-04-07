<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title="Logs">
          <v-row>
            <v-col cols="12" sm="4" md="3">
              Data
            </v-col>
            <v-col cols="6" sm="2">
              Usuário
            </v-col>
            <v-col cols="6" sm="2">
              Url
            </v-col>
            <v-col cols="6" sm="1">
              Erro
            </v-col>
          </v-row>
          <div v-for="log in logs" :key="log.id">
              <v-row>
                <v-col cols="12" sm="4" md="3">
                    {{log.createdAt | formatDate2}}
                </v-col>
                <v-col cols="6" sm="2">
                    {{log.User | nomeUser}}
                </v-col>
                <v-col cols="6" sm="2">
                    {{log.nom_url}}
                </v-col>
                <v-col cols="6" sm="1">
                    {{log.nom_erro}}
                </v-col>
                <v-col cols="6" sm="1" md="4" >
                  <v-btn class="green accent-2" fab ligth small right middle @click="navigateTo({name: 'view-log', params: {logId: log.id}})">
                    <v-icon>visibility</v-icon>
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
import LogService from '@/services/LogService'
export default {
  components: {
    Panel
  },
  data () {
    return {
      userId: null,
      logs: null
    }
  },
  async mounted () {
    this.userId = this.$store.state.userId
    this.logs = (await LogService.view(this.userId)).data
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
