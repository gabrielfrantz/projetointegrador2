<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title="Nova Assinatura">
        <v-text-field label="Nome*" v-model="nom_assinatura" required :rules="[required]"></v-text-field>
        <v-text-field label="Valor*" v-model="vlr_assinatura" required :rules="[required]" type="number" prefix="R$"></v-text-field>
        <v-select label="Período*" v-model="ind_periodo" single-line :items="items" required :rules="[required]"></v-select>
        <div id="selector"><div class="checkbox"><v-checkbox v-model="ind_visivel" label="Visível"></v-checkbox></div></div>
        <v-btn class="green accent-3" @click="create" dark>Salvar</v-btn>
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
      select: 'Mensal',
      userId: null,
      token: this.$store.state.token,
      error: null,
      nom_assinatura: null,
      vlr_assinatura: null,
      ind_periodo: null,
      ind_visivel: true,
      required: (value) => !!value || 'Required.'
    }
  },
  methods: {
    async create () {
      this.userId = this.$store.state.userId
      this.error = null
      if (this.ind_periodo === 'Mensal') {
        this.ind_periodo = 'M'
      } else {
        this.ind_periodo = 'A'
      }
      var visivel = 'N'
      if (this.ind_visivel) {
        visivel = 'S'
      }
      const assinatura = {
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
        await AssinaturaService.post(this.userId, assinatura, this.token)
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
  }
}
</script>
<style scoped>
</style>
