<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title="Editar Assinatura">
        <v-text-field label="Nome*" v-model="nom_assinatura" required :rules="[required]"></v-text-field>
        <v-text-field label="Valor*" v-model="vlr_assinatura" required :rules="[required]" type="number" prefix="R$"></v-text-field>
        <v-select label="Período*" v-model="ind_periodo" :items="items" required :rules="[required]"></v-select>
        <div id="selector"><div class="checkbox"><v-checkbox v-model="ind_visivel" label="Visível"></v-checkbox></div></div>
        <v-btn class="green accent-3" @click="save" dark>Salvar</v-btn>
        <v-btn class="red" @click="navigateTo({name: 'assinatura'})" dark>Cancelar</v-btn>
      </panel>
      <panel title="Cursos">
          <v-row>
            <v-col cols="12" sm="4" md="3">
              Nome
            </v-col>
            <v-col cols="12" sm="4">
              Descrição
            </v-col>
            <v-col cols="6" sm="1" md="4" >
              Mostra
            </v-col>
          </v-row>
          <div v-for="curso in cursos" :key="curso.id">
              <v-row>
                <v-col cols="12" sm="4" md="3">
                    {{curso.nom_curso}}
                </v-col>
                <v-col cols="12" sm="4">
                    {{curso.des_curso}}
                </v-col>
                <v-col cols="6" sm="1" md="4" >
                  <v-btn v-if="hasAssinatura(curso.CursoAssinaturas) == true" class="green accent-2" fab ligth small right middle @click="deleteCursoAssinatura({cursoId: curso.id})">
                    <v-icon>check_box</v-icon>
                  </v-btn>
                  <v-btn v-if="hasAssinatura(curso.CursoAssinaturas) == false" class="red accent-1" fab ligth small right middle @click="saveCursoAssinatura({cursoId: curso.id})">
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
import AssinaturaService from '@/services/AssinaturaService'
import CursoAssinaturaService from '@/services/CursoAssinaturaService'
export default {
  data () {
    return {
      items: ['Mensal', 'Anual'],
      selected: null,
      assinatura: {},
      cursos: {},
      curso: null,
      userId: null,
      token: this.$store.state.token,
      error: null,
      assinaturaId: null,
      nom_assinatura: null,
      vlr_assinatura: null,
      ind_periodo: null,
      ind_visivel: null,
      required: (value) => !!value || 'Required.'
    }
  },
  async mounted () {
    this.userId = this.$store.state.userId
    if (this.$store.state.route.params.assinaturaId) {
      this.assinaturaId = this.$store.state.route.params.assinaturaId
    } else if (localStorage.assinaturaId) {
      this.assinaturaId = localStorage.assinaturaId
    } else {
      this.navigateTo({name: 'root'})
    }
    if (this.assinatura.ind_periodo === 'M') {
      this.selected = 'Mensal'
    }
    this.assinatura = (await AssinaturaService.show(this.userId, this.assinaturaId, this.token)).data
    this.cursos = (await CursoAssinaturaService.view(this.userId, this.assinaturaId, this.token)).data
    this.assinaturaId = this.assinatura.id
    this.nom_assinatura = this.assinatura.nom_assinatura
    this.vlr_assinatura = this.assinatura.vlr_assinatura
    var periodo = 'Mensal'
    if (this.assinatura.ind_periodo === 'A') {
      periodo = 'Anual'
    }
    this.ind_periodo = periodo
    var visivel = true
    if (this.assinatura.ind_visivel === 'N') {
      visivel = false
    }
    this.ind_visivel = visivel
  },
  methods: {
    hasAssinatura (cursoAssinatura) {
      if (cursoAssinatura.toString() !== '') {
        return true
      }
      return false
    },
    async deleteCursoAssinatura (cursoId) {
      try {
        await CursoAssinaturaService.delete(this.userId, cursoId.cursoId, this.assinaturaId, this.token)
        this.cursos = (await CursoAssinaturaService.view(this.userId, this.assinaturaId, this.token)).data
      } catch (err) {
        console.log(err)
      }
    },
    async saveCursoAssinatura (cursoId) {
      try {
        const cursoAssinatura = {
          id_curso: cursoId.cursoId,
          id_assinatura: this.assinaturaId
        }
        await CursoAssinaturaService.post(this.userId, cursoAssinatura, this.token)
        this.cursos = (await CursoAssinaturaService.view(this.userId, this.assinaturaId, this.token)).data
      } catch (err) {
        console.log(err)
      }
    },
    async save () {
      this.error = null
      var visivel = 'N'
      if (this.ind_visivel) {
        visivel = 'S'
      }
      if (this.ind_periodo === 'Mensal') {
        this.ind_periodo = 'M'
      } else {
        this.ind_periodo = 'A'
      }
      const assinatura = {
        id: this.$store.state.route.params.assinaturaId,
        nom_assinatura: this.nom_assinatura,
        vlr_assinatura: this.vlr_assinatura,
        ind_periodo: this.ind_periodo,
        ind_visivel: visivel
      }
      const areAllFieldsFilledIn = Object
        .keys(assinatura)
        .every(key => !!assinatura[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Informe todos os campos obrigatórios'
        return
      }
      try {
        await AssinaturaService.put(this.userId, assinatura, this.token)
        this.$router.push({ name: 'assinatura' })
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
  },
  watch: {
    assinaturaId (assinaturaId) {
      localStorage.assinaturaId = assinaturaId
    }
  }
}
</script>
<style scoped>
</style>
