<template>
  <v-app-bar color="primary" prominent>


    <v-toolbar-title>My Movies</v-toolbar-title>

  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="left" temporary>
    <v-list>
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :to="item.route"
        :prepend-icon="item.icon"
        :title="item.title"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(false)

const menuItems = [
  { title: 'Home', icon: 'mdi-home', route: '/' },
]
</script>