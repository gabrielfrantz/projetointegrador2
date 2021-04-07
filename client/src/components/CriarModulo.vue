<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title="Novo modulo">
        <v-text-field label="Nome*" v-model="nom_modulo" required :rules="[required]"></v-text-field>
        <v-text-field label="Ordem*" v-model="seq_ordem" required :rules="[required]"></v-text-field>
        <div id="selector"><div class="checkbox"><v-checkbox v-model="ind_visivel" label="Visível"></v-checkbox></div></div>
        <div class="danger-alert" v-if="error">{{error}}</div>
        <v-btn class="green accent-3" @click="create" dark>Salvar</v-btn>
        <v-btn class="red" @click="navigateTo({name: 'editar-curso', params: {cursoId: cursoId}})" dark>Cancelar</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import ModulosService from '@/services/ModulosService'
export default {
  data () {
    return {
      userId: null,
      cursoId: null,
      nom_modulo: null,
      seq_ordem: null,
      ind_visivel: null,
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  async mounted () {
    this.userId = this.$store.state.userId
    this.cursoId = this.$store.state.route.params.cursoId
  },
  methods: {
    async create () {
      this.error = null
      var visivel = 'N'
      if (this.ind_visivel) {
        visivel = 'S'
      }
      const modulo = {
        nom_modulo: this.nom_modulo,
        seq_ordem: this.seq_ordem,
        id_curso: this.cursoId,
        ind_visivel: visivel
      }
      const areAllFieldsFilledIn = Object
        .keys(modulo)
        .every(key => !!modulo[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Informe todos os campos obrigatórios'
        return
      }
      try {
        await ModulosService.post(this.userId, modulo)
        this.$router.push({name: 'editar-curso', params: {cursoId: this.cursoId}})
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
