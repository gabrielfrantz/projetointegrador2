<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title="Novo curso">
        <v-text-field label="Nome*" v-model="nom_curso" required :rules="[required]"></v-text-field>
        <v-text-field label="Descrição*" v-model="des_curso" required :rules="[required]"></v-text-field>
        <v-text-field label="Carga Horária*" v-model="des_carga_horaria" required :rules="[required]"></v-text-field>
        <v-text-field label="Visível*" v-model="ind_visivel" required :rules="[required]"></v-text-field>

        <div class="danger-alert" v-if="error">{{error}}</div>
        <v-btn class="cyan" @click="create" dark>Save</v-btn>
        <v-btn class="cyan" @click="navigateTo({name: 'banks'})" dark>Cancel</v-btn>
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
      nom_curso: null,
      des_curso: null,
      des_carga_horaria: null,
      ind_visivel: null,
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  methods: {
    async create () {
      this.error = null
      const curso = {
        nom_curso: this.nom_curso,
        des_curso: this.des_curso,
        des_carga_horaria: this.des_carga_horaria,
        ind_visivel: this.ind_visivel
      }
      const areAllFieldsFilledIn = Object
        .keys(curso)
        .every(key => !!curso[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Informe todos os campos obrigatórios'
        return
      }
      try {
        await CursosService.post(curso)
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
