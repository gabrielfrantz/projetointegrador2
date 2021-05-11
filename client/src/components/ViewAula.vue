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
              <star-rating class="justify-center" v-model="rating" @rating-selected="saveRate()"></star-rating>
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
          <v-col>
            <div class="v-input__slot">
            <div id="selector"><div class="checkbox"><v-checkbox v-model="ind_concluido" label="Marcar como concluída" @click="saveConcluido()"></v-checkbox></div></div>
            </div>
          </v-col>
        </v-row>
        <panel title="Comentários">
          <v-text-field placeholder="Adicionar comentário*" class="border" v-model="des_comentario" required :rules="[required]">
          </v-text-field>
            <div class="danger-alert" v-if="error">{{error}}</div>
            <v-btn class="green accent-3" @click="saveComentario" dark>Salvar</v-btn>
            <v-btn class="red" @click="clearComentario" dark>Cancelar</v-btn>
            <br>
            <br>
            <div v-for="comentario in comentarios" :key="comentario.id">
            <panel :title="comentario.User | nomeUser">
            <v-row>
            <v-col cols="6" sm="1" md="4" v-if="comentario.User.id == userId">
            </v-col>
            </v-row>
            <v-text-field class="border" v-model="comentario.des_comentario" :readonly="comentario.User.id != userId" color="primary">
            <template v-slot:append>
              <v-btn class="green accent-2" fab ligth small right middle @click="updateComentario({comentarioId: comentario.id, comentarioDes: comentario.des_comentario})">
              <v-icon>edit</v-icon>
              </v-btn>
              <v-btn class="red accent-1" fab ligth small right middle @click="deleteComentario({comentarioId: comentario.id})">
              <v-icon>delete</v-icon>
              </v-btn>
            </template>
            </v-text-field>
            </panel>
           </div>
        </panel>
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
import ComentarioAulaService from '@/services/ComentarioAulaService'
import {StarRating} from 'vue-rate-it'

Vue.use(VueYouTubeEmbed)

export default {
  data () {
    return {
      aula: {},
      media: {},
      modulos: {},
      comentarios: {},
      comentario: null,
      userId: null,
      aulaId: null,
      error: null,
      errorUpdate: null,
      videoId: null,
      nom_aula: null,
      ind_concluido: null,
      rating: null,
      mediaRate: null,
      perRate: null,
      color: null,
      des_comentario: null,
      required: (value) => !!value || 'Required.'
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
    this.comentarios = (await ComentarioAulaService.view(this.userId, this.aulaId)).data
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
    var concluido = true
    if (this.userRate.ind_concluido === 'N') {
      concluido = false
    }
    this.ind_concluido = concluido
  },
  components: {
    Panel,
    StarRating
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    clearComentario () {
      this.des_comentario = null
    },
    async saveComentario () {
      const comentarioAula = {
        id_user: this.userId,
        id_aula: this.aulaId,
        des_comentario: this.des_comentario
      }
      const areAllFieldsFilledIn = Object
        .keys(comentarioAula)
        .every(key => !!comentarioAula[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Informe todos os campos obrigatórios'
        return
      }
      await ComentarioAulaService.post(this.userId, comentarioAula)
      this.comentarios = (await ComentarioAulaService.view(this.userId, this.aulaId)).data
      this.des_comentario = null
    },
    async updateComentario (comentarioId, comentarioDes) {
      const comentarioAula = {
        id: comentarioId.comentarioId,
        id_user: this.userId,
        id_aula: this.aulaId,
        des_comentario: comentarioDes
      }
      await ComentarioAulaService.put(this.userId, comentarioId.comentarioId, comentarioAula)
      this.comentarios = (await ComentarioAulaService.view(this.userId, this.aulaId)).data
    },
    async deleteComentario (comentarioId) {
      confirm('Are you sure you want to delete this item?') && await ComentarioAulaService.delete(this.userId, comentarioId.comentarioId)
      this.comentarios = (await ComentarioAulaService.view(this.userId, this.aulaId)).data
    },
    async saveRate () {
      const aulaUser = {
        id_user: this.userId,
        id_aula: this.aulaId,
        qtd_estrela: this.rating
      }
      await AulaUsuarioService.post(this.userId, aulaUser)
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
    },
    async saveConcluido () {
      var concluido = 'N'
      if (this.ind_concluido) {
        concluido = 'S'
      }
      const aulaUser = {
        id_user: this.userId,
        id_aula: this.aulaId,
        ind_concluido: concluido
      }
      await AulaUsuarioService.post(this.userId, aulaUser)
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
.v-input__slot {
  align-items: center;
  justify-content: center;
}
</style>
