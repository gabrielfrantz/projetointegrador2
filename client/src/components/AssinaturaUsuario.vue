<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title="Minha Assinatura">
        <v-list shaped>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="a in assinaturas" :key="a.id" @click="setSelectedAssinatura({assinatura: a})">
              <v-list-item-icon>
                <v-icon v-if="a.id === selAssinatura.id">check</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="a.nom_assinatura"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
       </v-list>
       <div class="error" v-html="error" />
       <v-btn class="green accent-3" @click="pagamento" dark>Ir para pagamento</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import AssinaturaService from '@/services/AssinaturaService'
import UsuarioAssinaturaService from '@/services/UsuarioAssinaturaService'
export default {
  data () {
    return {
      userId: null,
      token: this.$store.state.token,
      error: null,
      assinaturas: null,
      assinatura: null,
      selAssinatura: null,
      selectedItem: 0
    }
  },
  async mounted () {
    this.selAssinatura = {
      id: 0
    }
    this.userId = this.$store.state.userId
    this.assinaturas = (await AssinaturaService.view(this.userId, this.token)).data
    this.assinatura = (await UsuarioAssinaturaService.show(this.userId, this.token)).data
    if (this.assinatura) {
      this.selAssinatura = {
        id: this.assinatura.id_assinatura
      }
      this.selectedItem = this.assinatura.id_assinatura - 1
    }
  },
  methods: {
    async create () {
      this.userId = this.$store.state.userId
      this.error = null
    },
    navigateTo (route) {
      this.$router.push(route)
    },
    async setSelectedAssinatura (assinatura) {
      console.log(assinatura.assinatura.id)
      this.selAssinatura = assinatura.assinatura
    },
    async pagamento () {
      if (this.selAssinatura.id === 0) {
        this.error = 'Selecione a assinatura'
        return
      }
      this.$router.push({name: 'pagamento', params: {assinaturaId: this.selAssinatura.id}})
    }
  },
  components: {
    Panel
  }
}
</script>
<style scoped>
</style>
