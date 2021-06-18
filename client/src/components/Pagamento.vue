<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title="Pagamento">
        <v-text-field type="number" label="Número do Cartão" clearable></v-text-field>
        <v-text-field label="Nome Completo" clearable></v-text-field>
        <v-text-field type="number" label="Data de Expiração (mm/yy)" clearable></v-text-field>
        <v-text-field type="number" label="CVC" clearable></v-text-field>
        <v-btn elevation="2" large color="success"> Pagar Via Boleto </v-btn>
        <v-btn elevation="2" large color="primary"> Pagar </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'

export default {
  setup () {
  },
  components: {
    Panel
  }
}
</script>
