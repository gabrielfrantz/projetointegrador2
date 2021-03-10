<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title="Editar Curso">
        <v-text-field label="Nome*" v-model="nom_curso" required :rules="[required]"></v-text-field>
        <v-text-field label="Descrição*" v-model="des_curso" required :rules="[required]"></v-text-field>
        <v-text-field label="Carga Horária*" v-model="des_carga_horaria" required :rules="[required]"></v-text-field>
        <div id="selector"><div class="checkbox"><label><input type="checkbox" v-model="ind_visivel">Visível</label></div></div>
        <div class="danger-alert" v-if="error">{{error}}</div>
        <v-btn class="cyan" @click="save" dark>Save</v-btn>
        <v-btn class="cyan" @click="navigateTo({name: 'cursos'})" dark>Cancel</v-btn>
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
      curso: {},
      nom_curso: null,
      des_curso: null,
      des_carga_horaria: null,
      ind_visivel: null,
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  async mounted () {
    const cursoId = this.$store.state.route.params.cursoId
    this.curso = (await CursosService.show(cursoId)).data
    this.nom_curso = this.curso.nom_curso
    this.des_curso = this.curso.des_curso
    this.des_carga_horaria = this.curso.des_carga_horaria
    var visivel = true
    if (this.curso.ind_visivel === 'N') {
      visivel = false
    }
    this.ind_visivel = visivel
  },
  components: {
    Panel
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async save () {
      this.error = null
      var visivel = 'N'
      if (this.ind_visivel) {
        visivel = 'S'
      }
      const curso = {
        id: this.$store.state.route.params.cursoId,
        nom_curso: this.nom_curso,
        des_curso: this.des_curso,
        des_carga_horaria: this.des_carga_horaria,
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
        await CursosService.put(curso)
        this.$router.push({ name: 'cursos' })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style scoped>
</style>
