<template>
  <v-toolbar fixed dark class="gray">
    <v-toolbar-title>
      <span class="home" @click="navigateTo({name: 'root'})">Educare</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>

  <v-toolbar-items class="hidden-xs-only">
    <v-btn text  v-if="$store.state.isUserLoggedInAdm" @click="navigateTo({name: 'cursos'})">Gerenciar</v-btn>
    <v-btn text  v-if="$store.state.isUserLoggedIn" @click="navigateTo({name: 'perfil'})">Perfil</v-btn>
    <v-btn text  v-if="!$store.state.isUserLoggedIn" @click="navigateTo({name: 'register'})">Registrar-se</v-btn>
    <v-btn text  v-if="!$store.state.isUserLoggedIn" @click="navigateTo({name: 'login'})">Entrar</v-btn>
    <v-btn text  v-if="$store.state.isUserLoggedIn" @click="logout()">Sair</v-btn>
  </v-toolbar-items>
  <div class="hiddden-sm-and-up">
    <v-menu offset-y v-if="$vuetify.breakpoint.xsOnly">
      <template v-slot:activator="{ on }">
        <v-app-bar-nav-icon v-on="on"></v-app-bar-nav-icon>
      </template>
      <v-list class="responsiveMenu">
      <v-list-item v-if="$store.state.isUserLoggedIn"><v-btn text   @click="navigateTo({name: 'cursos'})">Gerenciar</v-btn></v-list-item>
      <v-list-item v-if="$store.state.isUserLoggedIn"><v-btn text   @click="navigateTo({name: 'perfil'})">Perfil</v-btn></v-list-item>
      <v-list-item v-if="!$store.state.isUserLoggedIn"><v-btn text  @click="navigateTo({name: 'register'})">Registrar-se</v-btn></v-list-item>
      <v-list-item v-if="!$store.state.isUserLoggedIn"><v-btn text  @click="navigateTo({name: 'login'})">Entrar</v-btn></v-list-item>
      <v-list-item v-if="$store.state.isUserLoggedIn"><v-btn text   @click="logout()">Sair</v-btn></v-list-item>
      </v-list>
    </v-menu>
  </div>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$store.dispatch('setIsUserLoggedIn', false)
      this.$store.dispatch('setIsUserLoggedInAdm', false)
      this.navigateTo({name: 'root'})
    }
  }
}
</script>
<style scoped>
.home{
  cursor: pointer;
}
.home:hover{
  color: rgb(93, 190, 228);
}
</style>
