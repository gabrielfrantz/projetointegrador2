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
        <v-text-field required label="Código">
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
        await AuthenticationService.forgot(0, this.email, this.token)
        this.$router.push({ name: 'login' })
      } catch (err) {
        this.errorCheck = err.response.data.error
        console.log(err)
      }
    }
  },
  components: {
    Panel
  }
}
</script>

<style scoped>
.error {
  color: red
}
</style>
