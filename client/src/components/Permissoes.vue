<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title='Controle de Permissões'>
        <v-card class="d-flex justify-end mb-6" flat tile>
          <div class="pa-2">
            <vue-json-to-csv
              :json-data="Object.values(usuarios)"
              :csv-title="'PermissoesUsuarios'"
              :labels="{
                id: { title: 'Código' },
                nom_pessoa: { title: 'Nome' },
                email: { title: 'E-mail' },
                num_cpf: { title: 'CPF' },
                ind_usuario: { title: 'Permissão' }
              }"
              >
              <v-btn color="success" class="">
                CSV <i class="mdi mdi-export-variant" aria-hidden="true"></i>
              </v-btn>
            </vue-json-to-csv>
          </div>
          <div class="pa-2">
            <v-btn color='red' class="white--text" @click='generatePDF'>
              PDF <i class="mdi mdi-export-variant"></i>
            </v-btn>
          </div>
        </v-card>
        <v-row>
          <v-col><span class="font-weight-bold">Nome</span></v-col>
          <v-col> <span class="font-weight-bold">Email</span></v-col>
          <v-col> <span class="font-weight-bold">CPF</span></v-col>
          <v-col> <span class="font-weight-bold">Permissão</span></v-col>
          <v-col> <span class="font-weight-bold">Ações</span></v-col>
        </v-row>
        <div v-for="usuario in usuarios" :key="usuario.id">
          <v-row>
            <v-col>
              {{usuario.nom_pessoa}}
            </v-col>
            <v-col>
              {{usuario.email}}
            </v-col>
            <v-col>
              {{usuario.num_cpf}}
            </v-col>
            <v-col>
              {{usuario.ind_usuario | indUsuario}}
            </v-col>
            <v-col>
              <v-btn class="green accent-2" v-if="usuario.ind_usuario === 'A'" fab ligth small right middle @click="mudarPermissao({userId: usuario.id})">
                <v-icon>how_to_reg</v-icon>
              </v-btn>
              <v-btn class="red accent-2" v-if="usuario.ind_usuario === 'P'" fab ligth small right middle @click="mudarPermissao({userId: usuario.id})">
                <v-icon>person_off</v-icon>
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
import AuthenticationService from '@/services/AuthenticationService'
import VueJsonToCsv from 'vue-json-to-csv'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default {
  components: {
    Panel,
    VueJsonToCsv
  },
  data () {
    return {
      userId: null,
      usuarios: {},
      usuario: {},
      heading: 'Permissões'
    }
  },
  async mounted () {
    this.userId = this.$store.state.userId
    this.usuarios = (await AuthenticationService.view(this.userId)).data
  },
  methods: {
    async mudarPermissao (idUsuario) {
      try {
        const user = {
          id: idUsuario
        }
        confirm('Você tem certeza que deseja modificar essa permissão?') &&
          await AuthenticationService.permission(this.userId, user)
        this.usuarios = (await AuthenticationService.view(this.userId)).data
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    generatePDF () {
      const columns = [
        { title: 'Nome', dataKey: 'nom_pessoa' },
        { title: 'E-Mail', dataKey: 'email' },
        { title: 'CPF', dataKey: 'num_cpf' },
        { title: 'Permissão', dataKey: 'ind_usuario' }
      ]
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'in',
        format: 'letter'
      })
      // text is placed using x, y coordinates
      doc.setFontSize(16).text(this.heading, 0.5, 1.0)
      // create a line under heading
      doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1)
      // Using autoTable plugin
      doc.autoTable({
        columns,
        body: Object.values(this.usuarios),
        margin: { left: 0.5, top: 1.25 }
      })
      // Using array of sentences
      doc
        .setFont('helvetica')
        .setFontSize(12)
        .text(this.moreText, 0.5, 3.5, { align: 'left', maxWidth: '7.5' })
      // Creating footer and saving file
      doc.save(`${this.heading}.pdf`)
      // doc
      //   .setFont('times')
      //   .setFontSize(11)
      //   .setFontStyle('italic')
      //   .setTextColor(0, 0, 255)
      //   .text(
      //     'This is a simple footer located .5 inches from page bottom',
      //     0.5,
      //     doc.internal.pageSize.height - 0.5
      //   )
      //   .save(`${this.heading}.pdf`)
    }
  }
}
</script>
<style scoped></style>
