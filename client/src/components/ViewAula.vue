<template>
  <youtube :video-id="videoId" player-width="100%" :player-vars="{autoplay: 1}"></youtube>
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
      error: null,
      videoId: 'aulas.src_video'
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
