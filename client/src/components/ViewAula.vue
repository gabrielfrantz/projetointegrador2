<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title="Aula">
        <v-responsive :aspect-ratio="16/9">
          <video-embed ref="youtube" allowfullscreen :src="aula.src_video"></video-embed>
        </v-responsive>
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
    if (this.$store.state.route.params.aulaId) {
      this.aulaId = this.$store.state.route.params.aulaId
    } else if (localStorage.aulaId) {
      this.aulaId = localStorage.aulaId
    } else {
      this.navigateTo({name: 'root'})
    }
    this.aula = (await AulasService.show(this.aulaId)).data
  },
  components: {
    Panel
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  watch: {
    aulaId (aulaId) {
      localStorage.aulaId = aulaId
    }
  }
}
</script>
<style scoped>
</style>
