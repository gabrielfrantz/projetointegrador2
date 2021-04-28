<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title="Controle de Logs">
        <v-row>
            <v-col cols="6" sm="3" md="2">
                <v-menu
                  v-model="menu1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dtaStart"
                      label="Fim"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="dtaStart"
                    @input="menu1 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6" sm="3" md="2">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dtaEnd"
                      label="Fim"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="dtaEnd"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-btn class="blue accent-3" @click="atualizar" dark>Atualizar</v-btn>
          </v-row>
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
import moment from 'moment'
export default {
  components: {
    Panel
  },
  data () {
    return {
      userId: null,
      logs: null,
      dtaStart: null,
      dtaEnd: null,
      menu1: false,
      menu2: false,
      today: null,
      tomorrow: null
    }
  },
  async mounted () {
    this.today = Date.now()
    this.dtaStart = this.today ? moment(this.today).format('yyyy-MM-DD') : ''
    const todayMoment = moment()
    this.tomorrow = todayMoment.clone().add(1, 'days')
    this.dtaEnd = this.tomorrow ? moment(this.tomorrow).format('yyyy-MM-DD') : ''
    this.userId = this.$store.state.userId
    this.logs = (await LogService.view(this.userId, this.dtaStart, this.dtaEnd)).data
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async atualizar () {
      this.logs = (await LogService.view(this.userId, this.dtaStart, this.dtaEnd)).data
    }
  }
}
</script>
<style scoped>
</style>
