<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
        <panel :title="nom_aula">
          <youtube
            ref="video"
            :video-id='videoId'
            player-width="100%"
            player-height="700px"
            :player-vars="{autoplay: 1}"
            aspectRatio="16:9"
          />
        </panel>
        <br>
        <div>Clique nas entrelas para fazer sua avaliação sobre a videoaula:</div>
        <star-rating class="justify-center" v-model="rating" ></star-rating>
        <div>Avaliação selecionada: {{rating}}</div>
        <br>
        <br>
    </v-flex>
  </v-layout>
</template>

<script>
'use strict'
import Vue from 'vue'
import VueYouTubeEmbed from 'vue-youtube-embed'
import Panel from '@/components/Panel'
import AulasService from '@/services/AulasService'
import {StarRating} from 'vue-rate-it'
Vue.use(VueYouTubeEmbed)

export default {
  data () {
    return {
      aula: {},
      modulos: {},
      userId: null,
      aulaId: null,
      error: null,
      videoId: null,
      nom_aula: null,
      rating: 4.5
    }
  },
  async mounted () {
    this.userId = this.$store.state.userId
    if (this.$store.state.route.params.aulaId) {
      this.aulaId = this.$store.state.route.params.aulaId
    } else if (localStorage.aulaId) {
      this.aulaId = localStorage.aulaId
    } else {
      this.navigateTo({name: 'root'})
    }
    this.aula = (await AulasService.show(this.userId, this.aulaId)).data
    this.videoId = this.aula.video_id
    this.nom_aula = this.aula.nom_aula
  },
  components: {
    Panel,
    StarRating
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
