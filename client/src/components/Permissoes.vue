<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title='Controle de Permissões'>
        <v-row>
          <v-col>Nome</v-col>
          <v-col>Email</v-col>
          <v-col>CPF</v-col>
          <v-col>Permissão</v-col>
          <v-col>Ações</v-col>
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
export default {
  components: {
    Panel
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
