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
      email: '',
      error: null
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async forgot () {
      this.errorChange = null
      const user = {
        id: this.$store.state.user.id,
        email: this.email
      }
      try {
        await AuthenticationService.forgot(this.id, user, this.email)
        const response = await AuthenticationService.show(this.$store.state.user.id, user, this.email)
        this.$store.dispatch('setUser', response.data)
        this.$router.push({ name: 'login' })
      } catch (err) {
        this.errorChange = err.response.data.error
        console.log(err)
      }
    },
    async forgotCheck () {
      this.errorChange = null
      const user = {
        id: this.$store.state.user.id,
        email: this.email
      }
      try {
        await AuthenticationService.forgot(this.id, user, this.email)
        const response = await AuthenticationService.show(this.$store.state.user.id, user, this.email)
        this.$store.dispatch('setUser', response.data)
        this.$router.push({ name: 'login' })
      } catch (err) {
        this.errorChange = err.response.data.error
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
