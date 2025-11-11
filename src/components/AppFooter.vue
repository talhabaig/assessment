<template>
  <v-footer class="bg-primary">
    <v-row justify="center" no-gutters>
      <v-col class="text-center mt-4" cols="12">
        <v-btn
          v-for="link in links"
          :key="link"
          variant="text"
          class="mx-2"
          rounded="xl"
        >
          {{ link }}
        </v-btn>
      </v-col>

      <v-col class="text-center mb-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>My Movies</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup lang="ts">
const links = [
  'Home'
]
</script>