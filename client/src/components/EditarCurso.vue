<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title="Editar Curso">
        <v-text-field label="Nome*" v-model="nom_curso" required :rules="[required]"></v-text-field>
        <v-textarea label="Descrição*" v-model="des_curso" required :rules="[required]"></v-textarea>
        <v-text-field label="Carga Horária*" v-model="des_carga_horaria" required :rules="[required]"></v-text-field>
        <v-text-field label="Banner*" v-model="src_banner" required :rules="[required]"></v-text-field>
        <div id="selector"><div class="checkbox"><v-checkbox v-model="ind_visivel" label="Visível"></v-checkbox></div></div>
        <div class="danger-alert" v-if="error">{{error}}</div>
        <v-btn class="green accent-3" @click="save" dark>Salvar</v-btn>
        <v-btn class="red" @click="navigateTo({name: 'cursos'})" dark>Cancelar</v-btn>
      </panel>
      <panel title="Modulos">
          <v-btn slot="newButton" class="blue darken-2" fab ligth small absolute right middle @click="navigateTo({name: 'criar-modulo', params: {cursoId: cursoId}})">
            <v-icon>add</v-icon>
          </v-btn>
          <v-row>
            <v-col cols="12" sm="4" md="3">
              Nome
            </v-col>
            <v-col cols="6" sm="2">
              Ordem
            </v-col>
            <v-col cols="6" sm="1">
              Visível
            </v-col>
          </v-row>
          <div v-for="modulo in modulos" :key="modulo.id">
              <v-row>
                <v-col cols="12" sm="4" md="3">
                    {{modulo.nom_modulo}}
                </v-col>
                <v-col cols="6" sm="2">
                    {{modulo.seq_ordem}}
                </v-col>
                <v-col cols="6" sm="1">
                    {{modulo.ind_visivel}}
                </v-col>
                <v-col cols="6" sm="1" md="4" >
                  <v-btn class="green accent-2" fab ligth small right middle @click="navigateTo({name: 'editar-modulo', params: {moduloId: modulo.id, cursoId: cursoId}})">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn class="red accent-1" fab ligth small right middle @click="deletemodulo({moduloId: modulo.id})">
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
import CursosService from '@/services/CursosService'
import ModulosService from '@/services/ModulosService'
export default {
  data () {
    return {
      curso: {},
      modulos: {},
      userId: null,
      cursoId: null,
      nom_curso: null,
      des_curso: null,
      des_carga_horaria: null,
      src_banner: null,
      ind_visivel: null,
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  async mounted () {
    this.userId = this.$store.state.userId
    if (this.$store.state.route.params.cursoId) {
      this.cursoId = this.$store.state.route.params.cursoId
    } else if (localStorage.cursoId) {
      this.cursoId = localStorage.cursoId
    } else {
      this.navigateTo({name: 'root'})
    }
    this.curso = (await CursosService.show(this.userId, this.cursoId)).data
    this.modulos = (await ModulosService.index(this.userId, this.cursoId)).data
    this.cursoId = this.curso.id
    this.nom_curso = this.curso.nom_curso
    this.des_curso = this.curso.des_curso
    this.des_carga_horaria = this.curso.des_carga_horaria
    this.src_banner = this.curso.src_banner
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
      localStorage.clear()
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
        await CursosService.put(curso)
        this.$router.push({ name: 'cursos' })
      } catch (err) {
        console.log(err)
      }
    },
    async deletemodulo (moduloId) {
      try {
        confirm('Are you sure you want to delete this item?') && await ModulosService.delete(this.userId, moduloId.moduloId)
        this.modulos = (await ModulosService.index(this.userId, this.cursoId)).data
        // this.$router.push({ name: 'banks' })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  watch: {
    cursoId (cursoId) {
      localStorage.cursoId = cursoId
    }
  }
}
</script>
<style scoped>
</style>
