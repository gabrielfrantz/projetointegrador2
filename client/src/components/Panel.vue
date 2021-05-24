<template>
  <div class="white elevation-2">
    <v-toolbar flat dense class="gray" dark>
      <v-btn class="blue darken-2" v-if="(back==true) && (hasHistory())" fab ligth small @click="$router.go(-1)">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <slot name="buttons"/>
      <slot name="newButton"/>
      <slot name="editButton"/>
    </v-toolbar>

    <div class="pl-4 pr-4 pt-2 pb-2">
      <slot>
        No slot content defined here
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: ''
    },
    back: {
      default: true
    }
  },
  methods: {
    hasHistory () { return window.history.length > 2 }
  }
}
</script>
<style scoped>
</style>
