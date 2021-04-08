<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title='Usuários'>
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
              {{usuario.id}}
            </v-col>
            <v-col>
              {{usuario.ind_usuario}}
            </v-col>
            <v-col>
              <v-btn class='green accent-2'
               fab
               ligth
               small
               right
               middle
               @click='mudarPermissao({idUsuario: usuario.id})'>
                <v-icon>how_to_reg</v-icon>
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
      usuarios: {}
    }
  },
  async mounted () {
    this.userId = this.$store.state.userId
    this.usuarios = (await AuthenticationService.view(this.userId)).data
  },
  methods: {
    async mudarPermissao (idUsuario) {
      try {
        var user = {
          id: idUsuario
        }
        alert(idUsuario)
        confirm('Você tem certeza que deseja modificar essa permissão?') &&
          await AuthenticationService.permission(idUsuario, user)
        this.usuarios = (await AuthenticationService.view(this.userId)).data
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>
<style scoped></style>
