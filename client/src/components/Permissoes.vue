<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title='Controle de Permissões'>
          <div class="d-flex justify-end">
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

export default {
  components: {
    Panel,
    VueJsonToCsv
  },
  data () {
    return {
      userId: null,
      usuarios: {},
      usuario: {}
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
    }
  }
}
</script>
<style scoped></style>
