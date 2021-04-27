<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title="Nova Assinatura">
        <v-text-field label="Nome*" v-model="nom_assinatura" required :rules="[required]"></v-text-field>
        <v-text-field label="Valor*" v-model="vlr_assinatura" required :rules="[required]" type="number" prefix="R$"></v-text-field>
        <v-select label="Período*" v-model="ind_periodo" :items="items" required :rules="[required]"></v-select>
        <div id="selector"><div class="checkbox"><v-checkbox v-model="ind_visivel" label="Visível"></v-checkbox></div></div>
        <v-btn class="green accent-3" @click="save" dark>Salvar</v-btn>
        <v-btn class="red" @click="navigateTo({name: 'assinatura'})" dark>Cancelar</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import AssinaturaService from '@/services/AssinaturaService'
export default {
  data () {
    return {
      items: ['Mensal', 'Anual'],
      selected: null,
      assinatura: {},
      userId: null,
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
    this.assinatura = (await AssinaturaService.show(this.userId, this.assinaturaId)).data
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
        await AssinaturaService.put(this.userId, assinatura)
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
