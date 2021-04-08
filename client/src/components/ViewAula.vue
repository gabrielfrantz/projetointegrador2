<template>
  <youtube :video-id="aula.src_video" player-width="100%" :player-vars="{autoplay: 1}"></youtube>
</template>

<script>
'use strict'
import Vue from 'vue'
import VueYouTubeEmbed from 'vue-youtube-embed'
import Panel from '@/components/Panel'
import AulasService from '@/services/AulasService'
Vue.use(VueYouTubeEmbed)

window.app = new Vue({
  el: '#app',
  data: {
    videoId: 'aula.src_video'
  }
})
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
      this.aulaId = 1
    } else if (localStorage.aulaId) {
      this.aulaId = 1
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
