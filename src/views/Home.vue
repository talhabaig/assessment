<template>
  <v-container class="pa-6">
    <v-row>
      <v-col
        v-for="movie in movies"
        :key="movie.imdbID ?? movie.Title"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="pa-3" outlined>
          <v-img v-if="movie.Poster" :src="movie.Poster" height="200px" />
          <v-card-title>{{ movie.Title }}</v-card-title>
          <v-card-subtitle>Year: {{ movie.Year }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- Pagination without arrows -->
    <div class="d-flex justify-end mt-6">
      <v-pagination
        v-model="page"
        :length="totalPages"
        total-visible="5"
        size="small"
        rounded
        color="primary"
        @update:model-value="onPageChange"
        prev-icon="mdi-chevron-left"
        next-icon="mdi-chevron-right"
      />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import type { State, Movie } from "../store";

const store = useStore<State>();
const page = ref(store.state.currentPage);
const movies = computed(() => store.state.movies as Movie[]);
const totalPages = computed(() => store.state.totalPages);

// Fetch movies
const fetchMovies = async () => {
  await store.dispatch("changePage", page.value);
};
onMounted(fetchMovies);

// Page change
const onPageChange = async (newPage: number) => {
  page.value = newPage;
  await store.dispatch("changePage", newPage);
};
</script>
<style scoped>
/* Optional: extra spacing for pagination */
.v-pagination {
  border: 1px solid #cce4ff;
  border-radius: 8px;
  background-color: #f0f8ff;
}
.v-pagination .v-btn {
  min-width: 15px;
  height: 15px;
  font-size: 6px;
}
</style>