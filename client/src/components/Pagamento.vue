<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title="Assinatura">
        <v-text-field type="text" label="Nome" readonly v-model="assinatura.nom_assinatura"></v-text-field>
        <v-text-field type="text" label="Valor" readonly v-model="assinatura.vlr_assinatura"></v-text-field>
      </panel>
      <panel title="Pagamento" back="false">
        <v-text-field type="number" label="Número do Cartão" v-model="num_cartao" required :rules="[required]"></v-text-field>
        <v-text-field label="Nome Completo" v-model="nom_cartao" required :rules="[required]"></v-text-field>
        <v-text-field type="number" label="Data de Expiração (mm/yy)" v-model="dta_vcto_cartao" required :rules="[required]"></v-text-field>
        <v-text-field type="number" label="CVC" v-model="num_cvc" required :rules="[required]"></v-text-field>
        <v-btn elevation="2" large color="success" @click="pagarBoleto()"> Pagar via Boleto </v-btn>
        <v-btn elevation="2" large color="primary" @click="pagarCartao()"> Pagar via Cartão </v-btn>
        <div class="error" v-html="error" />
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
      userId: null,
      token: this.$store.state.token,
      assinaturaId: this.$store.state.route.params.assinaturaId,
      error: null,
      assinatura: null,
      num_cartao: null,
      nom_cartao: null,
      dta_vcto_cartao: null,
      num_cvc: null,
      required: (value) => !!value || 'Required.'
    }
  },
  async mounted () {
    this.userId = this.$store.state.userId
    this.assinatura = (await AssinaturaService.get(this.userId, this.assinaturaId, this.token)).data
  },
  setup () {
  },
  components: {
    Panel
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async pagarBoleto () {
      try {
        await AssinaturaService.pagarBoleto(this.userId, this.assinaturaId, this.token)
        alert('Boleto gerado com sucesso e enviado por e-mail!')
        this.navigateTo({name: 'root'})
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async pagarCartao () {
      this.error = null
      const cartao = {
        num_cartao: this.num_cartao,
        nom_cartao: this.nom_cartao,
        dta_vcto_cartao: this.dta_vcto_cartao,
        num_cvc: this.num_cvc
      }
      const areAllFieldsFilledIn = Object
        .keys(cartao)
        .every(key => !!cartao[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Informe todos os campos obrigatórios!'
        return
      }
      try {
        await AssinaturaService.pagarCartao(this.userId, this.assinaturaId, this.token)
        alert('Pagamento com cartão confirmado com sucesso!')
        this.navigateTo({name: 'root'})
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>
