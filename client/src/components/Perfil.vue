<template>
  <v-layout ml-16 mr-16 mt-8>
    <v-flex>
      <panel title="Perfil do Usuário">
        <v-text-field label="Nome:*" v-model="nom_pessoa" required :rules="[required]"></v-text-field>
        <v-text-field label="CPF:*" v-model="num_cpf" required :rules="[required]"></v-text-field>
        <div class="danger-alert" v-if="error">{{error}}</div>
        <v-btn class="green accent-2" @click="save" dark>Salvar</v-btn>
        <v-btn class="red accent-2" @click="navigateTo({name: 'root'})" dark>Cancelar</v-btn>
      </panel>
      <v-row>
        <v-col></v-col>
      </v-row>
      <panel title="Alterar senha" back="false">
        <v-text-field label="Nova senha:*" v-model="nova_senha" type="password" required :rules="[required]"></v-text-field>
        <v-text-field label="Repetir senha:*" v-model="repetir_senha" type="password" required :rules="[required]"></v-text-field>
        <div class="error" v-html="errorChange" />
        <v-btn class="green accent-2" @click="changePassword" dark>Salvar</v-btn>
        <v-btn class="red accent-2" @click="navigateTo({name: 'root'})" dark>Cancelar</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      user: {},
      token: this.$store.state.token,
      nom_pessoa: null,
      num_cpf: null,
      nova_senha: null,
      repetir_senha: null,
      error: null,
      errorChange: null,
      required: (value) => !!value || 'Required.'
    }
  },
  async mounted () {
    const userId = this.$store.state.user.id
    this.token = this.$store.state.token
    this.user = (await AuthenticationService.show(userId, this.token)).data
    this.nom_pessoa = this.user.nom_pessoa
    this.num_cpf = this.user.num_cpf
  },
  components: {
    Panel
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async save () {
      this.error = null
      const user = {
        id: this.$store.state.user.id,
        nom_pessoa: this.nom_pessoa,
        num_cpf: this.num_cpf
      }
      const areAllFieldsFilledIn = Object
        .keys(user)
        .every(key => !!user[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Informe todos os campos obrigatórios'
        return
      }
      try {
        await AuthenticationService.put(user, this.token)
        const response = await AuthenticationService.show(this.$store.state.user.id, this.token)
        this.$store.dispatch('setUser', response.data)
        this.$router.push({ name: 'root' })
      } catch (err) {
        this.error = err.response.data.error
        console.log(err)
      }
    },
    async changePassword () {
      this.errorChange = null
      const user = {
        id: this.$store.state.user.id,
        password: this.nova_senha,
        password2: this.repetir_senha
      }
      const areAllFieldsFilledIn = Object
        .keys(user)
        .every(key => !!user[key])
      if (!areAllFieldsFilledIn) {
        this.errorChange = 'Informe todos os campos obrigatórios'
        return
      }
      try {
        await AuthenticationService.changePassword(user, this.token)
        const response = await AuthenticationService.show(this.$store.state.user.id, this.token)
        this.$store.dispatch('setUser', response.data)
        this.$router.push({ name: 'root' })
      } catch (err) {
        this.errorChange = err.response.data.error
        console.log(err)
      }
    }
  }
}
</script>
<style scoped>
</style>
