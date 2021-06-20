<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title="Esqueceu a senha">
        <v-text>Enviaremos um código de redefinição de senha para o e-mail cadastrado em sua conta!</v-text>
        <br />
        <br />
        <v-text-field required label="Email" v-model="email">
        </v-text-field>
        <v-btn class="gray" @click="forgot" dark>Enviar e-mail</v-btn>
        <br />
        <br />
        <v-text-field required label="Código" v-model="hash">
        </v-text-field>
        <v-btn class="blue" @click="forgotCheck" dark>Validar código</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import Panel from '@/components/Panel'
export default {
  data () {
    return {
      user: {},
      email: null,
      error: null,
      hash: null,
      errorForgot: null,
      errorCheck: null,
      userId: null,
      token: this.$store.state.token
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async forgot () {
      this.errorForgot = null
      try {
        await AuthenticationService.forgot(0, this.email, this.token)
        alert('E-mail enviado. Consulte seu e-mail!')
      } catch (err) {
        alert(err.response.data.error)
        this.errorForgot = err.response.data.error
        console.log(err)
      }
    },
    async forgotCheck () {
      this.errorCheck = null
      try {
        const response = await AuthenticationService.validaHash(
          0, this.hash, this.token
        )
        console.log(response.data)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        if (response.data.token) {
          this.$store.dispatch('setIsUserLoggedIn', true)
          if (response.data.user.ind_admin === 'S') {
            this.$store.dispatch('setIsUserLoggedInAdm', true)
          }
        } else {
          this.$store.dispatch('setIsUserLoggedIn', false)
        }
        this.navigateTo({name: 'perfil'})
      } catch (error) {
        this.error = error.response.data.error
        alert('Código inválido ou expirado. Verifique seu email ou solicite nova recuperação!')
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
