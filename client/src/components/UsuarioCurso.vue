<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title='Controle de usuários aprovados no curso'>
        <v-row>
          <v-col><span class="font-weight-bold">Nome</span></v-col>
          <v-col> <span class="font-weight-bold">Email</span></v-col>
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
              <v-btn v-if="hasAprovacao(usuario.UsuarioCursos) == true" class="green accent-2" fab ligth small right middle @click="deleteUsuarioCurso({userId: usuario.id})">
                <v-icon>check_box</v-icon>
              </v-btn>
              <v-btn v-if="hasAprovacao(usuario.UsuarioCursos) == false" class="red accent-1" fab ligth small right middle @click="saveUsuarioCurso({userId: usuario.id})">
                <v-icon>check_box_outline_blank</v-icon>
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
import UsuarioCursoService from '@/services/UsuarioCursoService'

export default {
  components: {
    Panel
  },
  data () {
    return {
      userId: null,
      token: this.$store.state.token,
      cursoId: this.$store.state.route.params.cursoId,
      usuarios: {},
      usuario: {},
      heading: 'PermissoesUsuarios'
    }
  },
  async mounted () {
    this.userId = this.$store.state.userId
    this.usuarios = (await UsuarioCursoService.view(this.userId, this.cursoId, this.token)).data
  },
  methods: {
    hasAprovacao (usuarioCurso) {
      if (usuarioCurso.toString() !== '') {
        return true
      }
      return false
    },
    async deleteUsuarioCurso (userId) {
      try {
        await UsuarioCursoService.delete(userId.userId, this.cursoId, this.token)
        this.usuarios = (await UsuarioCursoService.view(this.userId, this.cursoId, this.token)).data
      } catch (err) {
        console.log(err)
      }
    },
    async saveUsuarioCurso (userId) {
      try {
        const usuarioCurso = {
          id_curso: this.cursoId,
          id_user: userId.userId
        }
        await UsuarioCursoService.post(this.userId, usuarioCurso, this.token)
        this.usuarios = (await UsuarioCursoService.view(this.userId, this.cursoId, this.token)).data
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style scoped></style>
