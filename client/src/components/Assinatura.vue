<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title="Assinaturas">
        <v-btn slot="newButton" class="blue darken-2" fab ligth small absolute right middle @click="navigateTo({name: 'criar-assinatura'})">
            <v-icon>add</v-icon>
          </v-btn>
          <v-row>
            <v-col cols="12" sm="4" md="3">
              Nome
            </v-col>
            <v-col cols="6" sm="2">
              Valor
            </v-col>
            <v-col cols="6" sm="2">
              Período
            </v-col>
            <v-col cols="6" sm="1">
              Visível
            </v-col>
          </v-row>
          <div v-for="assinatura in assinaturas" :key="assinatura.id">
              <v-row>
                <v-col cols="12" sm="4" md="3">
                    {{assinatura.nom_assinatura}}
                </v-col>
                <v-col cols="6" sm="2">
                    R$ {{assinatura.vlr_assinatura}}
                </v-col>
                <v-col cols="6" sm="2">
                  {{assinatura.ind_periodo}}
                  <!-- <div v-if="'{{assinatura.ind_periodo}}' === 'M'">
                    Mensal
                  </div>
                  <div class="v-else">
                    Anual
                  </div> -->
                </v-col>
                <v-col cols="6" sm="1">
                  {{assinatura.ind_visivel}}
                  <!-- <div v-if="'{{assinatura.ind_visivel}}' === 'S'">
                    Sim
                  </div>
                  <div v-else>
                    Não
                  </div> -->
                </v-col>
                <v-col cols="6" sm="1" md="4" >
                  <v-btn class="green accent-2" fab ligth small right middle @click="navigateTo({name: 'editar-assinatura', params: {assinaturaId: assinatura.id}})">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn class="red accent-1" fab ligth small right middle @click="deleteAssinatura({assinaturaId: assinatura.id})">
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
import AssinaturaService from '@/services/AssinaturaService'
export default {
  data () {
    return {
      userId: null,
      error: null,
      assinaturas: null
    }
  },
  async mounted () {
    // do a request to the backend for all the banks
    this.userId = this.$store.state.userId
    this.assinaturas = (await AssinaturaService.view(this.userId)).data
  },
  methods: {
    async create () {
      this.userId = this.$store.state.userId
      this.error = null
    },
    navigateTo (route) {
      this.$router.push(route)
    },
    async deleteAssinatura (assinaturaId) {
      try {
        confirm('Are you sure you want to delete this item?') && await AssinaturaService.delete(this.userId, assinaturaId.assinaturaId)
        this.assinaturas = (await AssinaturaService.view(this.userId)).data
        // this.$router.push({ name: 'banks' })
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
