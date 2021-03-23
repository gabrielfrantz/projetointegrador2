<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title="Entrar">
        <br />
        <v-text-field required
          label="Email"
          v-model="email">
        </v-text-field>
        <br />
        <v-text-field required
          label="Senha"
          type="password"
          v-model="password">
        </v-text-field>
        <br />
        <div class="error" v-html="error" />
        <br />
        <v-btn class="gray" @click="login" dark>Entrar</v-btn>
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
      email: '',
      password: '',
      error: null
    }
  },
  watch: {
    email (value) {
      console.log('email has changed: ', value)
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
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
        this.navigateTo({name: 'root'})
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  components: {
    Panel
  }
  // mounted () {
  //   setTimeout(() => {
  //     this.email = 'hello world'
  //   }, 2000)
  // }
}
</script>

<style scoped>
.error {
  color: red
}
</style>
