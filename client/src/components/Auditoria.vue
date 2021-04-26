<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title="Auditorias">
          <v-row>
            <v-col cols="12" sm="4" md="3">
              Data
            </v-col>
            <v-col cols="6" sm="2">
              Usuário
            </v-col>
            <v-col cols="6" sm="2">
              Tabela
            </v-col>
            <v-col cols="6" sm="1">
              Ação
            </v-col>
          </v-row>
          <div v-for="auditoria in auditorias" :key="auditoria.id">
              <v-row>
                <v-col cols="12" sm="4" md="3">
                    {{auditoria.createdAt | formatDate2}}
                </v-col>
                <v-col cols="6" sm="2">
                    {{auditoria.User | nomeUser}}
                </v-col>
                <v-col cols="6" sm="2">
                    {{auditoria.nom_table}}
                </v-col>
                <v-col cols="6" sm="1">
                    {{auditoria.tip_acao}}
                </v-col>
                <v-col cols="6" sm="1" md="4" >
                  <v-btn class="green accent-2" fab ligth small right middle @click="navigateTo({name: 'view-auditoria', params: {auditoriaId: auditoria.id}})">
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
import AuditoriaService from '@/services/AuditoriaService'
export default {
  components: {
    Panel
  },
  data () {
    return {
      userId: null,
      auditorias: null
    }
  },
  async mounted () {
    this.userId = this.$store.state.userId
    this.auditorias = (await AuditoriaService.view(this.userId)).data
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
