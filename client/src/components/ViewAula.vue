<template>
  <div id="app">
    <div class="card">
      <youtube
        ref="video"
        :video-id='videoId'
        player-width="100%"
        :player-vars="{autoplay: 1}"
      />
    </div>
  </div>
</template>

<script>
'use strict'
import Vue from 'vue'
import VueYouTubeEmbed from 'vue-youtube-embed'
import Panel from '@/components/Panel'
import AulasService from '@/services/AulasService'
Vue.use(VueYouTubeEmbed)

export default {
  data () {
    return {
      aula: {},
      modulos: {},
      aulaId: null,
      error: null,
      videoId: null
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
    this.videoId = this.aula.video_id
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

<style>
.card {
  width: 80%;
  background: #050404;
  border: px solid #ddd;
  border-radius: 0px;
  padding: 10px;
  margin: 0 auto;
}
</style>
