<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
        <panel :title="nom_aula">
          <youtube
            ref="video"
            :video-id='videoId'
            player-width="100%"
            player-height="700px"
            :player-vars="{autoplay: 0}"
            aspectRatio="16:9"
          />
        </panel>
        <v-row>
          <v-col>
            <div class="text-center">
              Clique aqui para fazer sua avaliação da aula:
              <star-rating class="justify-center" v-model="rating" @click="saveRate({})"></star-rating>
            </div>
          </v-col>
          <v-col>
            <div class="text-center">
              Média das avaliações:
              <v-progress-circular
              :rotate="90"
              :size="100"
              :width="15"
              :value="perRate"
              :color="color"
            >
            {{ mediaRate }}
            </v-progress-circular>
            </div>
          </v-col>
        </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
'use strict'
import Vue from 'vue'
import VueYouTubeEmbed from 'vue-youtube-embed'
import Panel from '@/components/Panel'
import AulasService from '@/services/AulasService'
import AulaUsuarioService from '@/services/AulaUsuarioService'
import {StarRating} from 'vue-rate-it'

Vue.use(VueYouTubeEmbed)

export default {
  data () {
    return {
      aula: {},
      media: {},
      modulos: {},
      userId: null,
      aulaId: null,
      error: null,
      videoId: null,
      nom_aula: null,
      rating: null,
      mediaRate: null,
      perRate: null,
      color: null
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
    this.userRate = (await AulaUsuarioService.show(this.userId, this.aulaId)).data
    this.media = (await AulaUsuarioService.showMedia(this.userId, this.aulaId)).data
    this.rating = this.userRate.qtd_estrela
    this.mediaRate = this.media.media_estrela
    this.perRate = ((this.mediaRate * 100) / 5)
    if (this.perRate <= 33) {
      this.color = 'red'
    } else if (this.perRate <= 66) {
      this.color = 'yellow'
    } else {
      this.color = 'green'
    }
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
    },
    saveRate () {
      alert('teste')
      alert(this.rating)
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
.v-progress-circular {
  margin: 1rem
}
</style>
