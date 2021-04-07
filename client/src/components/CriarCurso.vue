<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title="Novo curso">
        <v-text-field label="Nome*" v-model="nom_curso" required :rules="[required]"></v-text-field>
        <v-textarea label="Descrição*" v-model="des_curso" required :rules="[required]"></v-textarea>
        <v-text-field label="Carga Horária*" v-model="des_carga_horaria" required :rules="[required]"></v-text-field>
        <v-text-field label="Banner*" v-model="src_banner" required :rules="[required]"></v-text-field>
        <div id="selector"><div class="checkbox"><v-checkbox v-model="ind_visivel" label="Visível"></v-checkbox></div></div>
        <div class="danger-alert" v-if="error">{{error}}</div>
        <v-btn class="green accent-3" @click="create" dark>Salvar</v-btn>
        <v-btn class="red" @click="navigateTo({name: 'cursos'})" dark>Cancelar</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import CursosService from '@/services/CursosService'
export default {
  data () {
    return {
      userId: null,
      nom_curso: null,
      des_curso: null,
      des_carga_horaria: null,
      src_banner: null,
      ind_visivel: null,
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  methods: {
    async create () {
      this.userId = this.$store.state.userId
      this.error = null
      var visivel = 'N'
      if (this.ind_visivel) {
        visivel = 'S'
      }
      const curso = {
        nom_curso: this.nom_curso,
        des_curso: this.des_curso,
        des_carga_horaria: this.des_carga_horaria,
        src_banner: this.src_banner,
        ind_visivel: visivel
      }
      const areAllFieldsFilledIn = Object
        .keys(curso)
        .every(key => !!curso[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Informe todos os campos obrigatórios'
        return
      }
      try {
        await CursosService.post(this.userId, curso)
        this.$router.push({ name: 'cursos' })
      } catch (err) {
        console.log(err)
      }
    },
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  components: {
    Panel
  }
}
</script>
<style scoped>
</style>
