<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title="Editar modulo">
        <v-text-field label="Nome*" v-model="nom_modulo" required :rules="[required]"></v-text-field>
        <v-text-field label="Ordem*" v-model="seq_ordem" required :rules="[required]"></v-text-field>
        <div id="selector"><div class="checkbox"><v-checkbox v-model="ind_visivel" label="Visível"></v-checkbox></div></div>
        <div class="danger-alert" v-if="error">{{error}}</div>
        <v-btn class="green accent-3" @click="create" dark>Salvar</v-btn>
        <v-btn class="red" @click="navigateTo({name: 'editar-curso', params: {cursoId: cursoId}})" dark>Cancelar</v-btn>
      </panel>
      <panel title="Aulas">
          <v-btn slot="newButton" class="blue darken-2" fab ligth small absolute right middle @click="navigateTo({name: 'criar-aula', params: {moduloId: moduloId, cursoId: cursoId}})">
            <v-icon>add</v-icon>
          </v-btn>
          <v-row>
            <v-col cols="6" sm="2" md="2">
              Nome
            </v-col>
            <v-col cols="12" sm="2" md="3">
              Descrição
            </v-col>
            <v-col cols="12" sm="4" md="3">
              Source
            </v-col>
            <v-col cols="6" sm="2">
              Ordem
            </v-col>
            <v-col cols="6" sm="1">
              Visível
            </v-col>
          </v-row>
          <div v-for="aula in aulas" :key="aula.id">
              <v-row>
                <v-col cols="6" sm="2" md="2">
                    {{aula.nom_aula}}
                </v-col>
                <v-col cols="12" sm="2" md="3">
                    {{aula.des_aula}}
                </v-col>
                <v-col cols="12" sm="4" md="3">
                    {{aula.src_video}}
                </v-col>
                <v-col cols="6" sm="2">
                    {{aula.seq_ordem}}
                </v-col>
                <v-col cols="6" sm="1">
                    {{aula.ind_visivel}}
                </v-col>
                <v-col cols="6" sm="1" md="1" >
                  <v-btn class="green accent-2" fab ligth small right middle @click="navigateTo({name: 'editar-aula', params: {aulaId: aula.id, moduloId: modulo.id, cursoId: cursoId}})">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn class="red accent-1" fab ligth small right middle @click="deleteaula({aulaId: aula.id})">
                    <v-icon>delete</v-icon>
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
import ModulosService from '@/services/ModulosService'
import AulasService from '@/services/AulasService'
export default {
  data () {
    return {
      modulo: {},
      aulas: {},
      userId: null,
      cursoId: null,
      moduloId: null,
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
    this.moduloId = this.$store.state.route.params.moduloId
    this.modulo = (await ModulosService.show(this.userId, this.moduloId)).data
    this.aulas = (await AulasService.index(this.userId, this.moduloId)).data
    this.nom_modulo = this.modulo.nom_modulo
    this.seq_ordem = this.modulo.seq_ordem
    var visivel = true
    if (this.modulo.ind_visivel === 'N') {
      visivel = false
    }
    this.ind_visivel = visivel
  },
  methods: {
    async create () {
      this.error = null
      var visivel = 'N'
      if (this.ind_visivel) {
        visivel = 'S'
      }
      const modulo = {
        id: this.$store.state.route.params.moduloId,
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
        await ModulosService.put(this.userId, modulo)
        this.$router.push({name: 'editar-curso', params: {cursoId: this.$store.state.route.params.cursoId}})
      } catch (err) {
        console.log(err)
      }
    },
    navigateTo (route) {
      this.$router.push(route)
    },
    async deleteaula (aulaId) {
      try {
        confirm('Are you sure you want to delete this item?') && await AulasService.delete(this.userId, aulaId.aulaId)
        this.aulas = (await AulasService.index(this.userId, this.moduloId)).data
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  components: {
    Panel
  }
}
</script>
<style scoped>
</style>
