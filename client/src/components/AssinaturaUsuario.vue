<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title="Minha Assinatura">
        <v-list shaped>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="a in assinaturas" :key="a.id" @click="save({assinaturaId: a.id})">
              <v-list-item-icon>
                <v-icon v-if="a.id === assinatura.id_assinatura">check</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="a.nom_assinatura"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
       </v-list>
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
      selectedItem: 0
    }
  },
  async mounted () {
    this.userId = this.$store.state.userId
    this.assinaturas = (await AssinaturaService.view(this.userId, this.token)).data
    this.assinatura = (await UsuarioAssinaturaService.show(this.userId, this.token)).data
  },
  methods: {
    async create () {
      this.userId = this.$store.state.userId
      this.error = null
    },
    navigateTo (route) {
      this.$router.push(route)
    },
    async save (assinaturaId) {
      this.error = null
      const usuarioAssinatura = {
        id_user: this.userId,
        id_assinatura: assinaturaId.assinaturaId
      }
      const areAllFieldsFilledIn = Object
        .keys(usuarioAssinatura)
        .every(key => !!usuarioAssinatura[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Informe todos os campos obrigatórios'
        return
      }
      try {
        await UsuarioAssinaturaService.post(this.userId, usuarioAssinatura, this.token)
        this.assinaturas = (await AssinaturaService.view(this.userId, this.token)).data
        this.assinatura = (await UsuarioAssinaturaService.show(this.userId, this.token)).data
      } catch (err) {
        console.log(err)
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
