<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title="Aula">
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import AulasService from '@/services/AulasService'
export default {
  data () {
    return {
      aula: {},
      modulos: {},
      aulaId: null,
      error: null
    }
  },
  async mounted () {
    const aulaId = this.$store.state.route.params.aulaId
    this.aula = (await AulasService.show(aulaId)).data
  },
  components: {
    Panel
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>
<style scoped>
</style>
