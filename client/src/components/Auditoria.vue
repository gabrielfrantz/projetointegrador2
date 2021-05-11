<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title="Controle de Auditorias">
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
              <v-card class="d-flex justify-end mb-6" flat tile>
                <div class="pa-2">
                  <v-btn color="blue" class="" @click='atualizar' dark>Filtrar</v-btn>
                  <vue-json-to-csv
                    :json-data="Object.values(auditorias)"
                    :csv-title="'Auditorias'"
                    :labels="{
                      createdAt: { title: 'Criação' },
                      User: { title: 'Usuário' },
                      nom_table: { title: 'Tabela' },
                      tip_acao: { title: 'Ação' }
                    }"
                  >
                    <v-btn color="success" class="">
                      CSV <i class="mdi mdi-export-variant" aria-hidden="true"></i>
                    </v-btn>
                  </vue-json-to-csv>
                    <v-btn color='red' class="white--text" @click='generatePDF'>
                      PDF <i class="mdi mdi-export-variant"></i>
                    </v-btn>
                </div>
              </v-card>
          </v-row>
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
import moment from 'moment'
import VueJsonToCsv from 'vue-json-to-csv'
import JsPDF from 'jspdf'
import 'jspdf-autotable'

export default {
  components: {
    Panel,
    VueJsonToCsv
  },
  data () {
    return {
      userId: null,
      auditorias: null,
      dtaStart: null,
      dtaEnd: null,
      menu1: false,
      menu2: false,
      today: null,
      tomorrow: null,
      heading: 'Auditoria'
    }
  },
  async mounted () {
    this.today = Date.now()
    this.dtaStart = this.today ? moment(this.today).format('yyyy-MM-DD') : ''
    const todayMoment = moment()
    this.tomorrow = todayMoment.clone().add(1, 'days')
    this.dtaEnd = this.tomorrow ? moment(this.tomorrow).format('yyyy-MM-DD') : ''
    this.userId = this.$store.state.userId
    this.auditorias = (await AuditoriaService.viewQ(this.userId, 0, 50, this.dtaStart, this.dtaEnd)).data
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async atualizar () {
      this.auditorias = (await AuditoriaService.viewQ(this.userId, 0, 50, this.dtaStart, this.dtaEnd)).data
    },
    generatePDF () {
      const columns = [
        { title: 'Data', dataKey: 'createdAt' },
        { title: 'Usuário', dataKey: 'id_user' },
        { title: 'Tabela', dataKey: 'nom_table' },
        { title: 'Ação', dataKey: 'tip_acao' }
      ]
      const doc = new JsPDF()
      doc.autoTable({
        columns,
        body: Object.values(this.auditorias)
      })
      doc.save(`${this.heading}.pdf`)
    }
  },
  computed: {
    computedDateFormattedMomentjs () {
      return this.date ? moment(this.date).format('yyyy-mm-dd') : ''
    }
  }
}
</script>
<style scoped>
</style>
