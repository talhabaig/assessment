<template>
  <v-container class="pa-4 pa-md-6">
    <div class="d-flex justify-end mb-4">
      <v-text-field
        v-model="searchQuery"
        label="Search movies..."
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        density="comfortable"
        hide-details
        clearable
        style="max-width: 250px;"
        @keyup.enter="onSearch"
        @click:clear="onClear"
      />
    </div>

    <div v-if="loading" class="d-flex justify-center my-10">
      <v-progress-circular
        indeterminate
        color="primary"
        size="48"
      ></v-progress-circular>
    </div>
    <div v-else>
      <v-row v-if="movies.length > 0">
        <v-col
          v-for="movie in movies"
          :key="movie.imdbID ?? movie.Title"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card class="pa-3 cursor-pointer" outlined>
            <v-tooltip activator="parent" location="top">
              {{ movie.Title }}
            </v-tooltip>
            <v-card-title>{{ movie.Title }}</v-card-title>
            <v-card-subtitle>Year: {{ movie.Year }}</v-card-subtitle>
            <v-card-subtitle>ID: {{ movie.imdbID }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <div v-else class="text-center my-10">
        <p class="mt-2 text-h6 font-weight-bold">No Data Found</p>
      </div>
    </div>
    
    <div class="d-flex justify-end mt-6" v-if="movies.length">
      <v-pagination
        v-model="page"
        :length="totalPages"
        :total-visible="totalVisible"
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
import { onMounted, computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useDisplay } from "vuetify";
import type { State, Movie } from "../store";

const store = useStore<State>();
const route = useRoute();
const router = useRouter();

const { smAndDown } = useDisplay();

const searchQuery = ref('');
const loading = ref(false);

// Initialize page from URL query or store
const page = ref(Number(route.query.page) || store.state.currentPage || 1);

const movies = computed(() => store.state.movies as Movie[]);
const totalPages = computed(() => store.state.totalPages);

const totalVisible = computed(() => (smAndDown.value ? 3 : 5));

const updateQuery = (newPage: number) => {
  router.replace({ query: { ...route.query, page: newPage } });
};

const fetchMovies = async () => {
  loading.value = true;
  await store.dispatch("changePage", page.value);
  loading.value = false;
};

onMounted(fetchMovies);

const onSearch = async () => {
  loading.value = true;
  page.value = 1;
  updateQuery(1);

  if (searchQuery.value.trim()) {
    await store.dispatch('searchMovies', searchQuery.value);
  } else {
    await store.dispatch('fetchMovies');
  }
  loading.value = false;
};

const onClear = async () => {
  searchQuery.value = '';
  page.value = 1;
  updateQuery(1);

  loading.value = true;
  await store.dispatch('fetchMovies');
  loading.value = false;
};

const onPageChange = async (newPage: number) => {
  page.value = newPage;
  updateQuery(newPage);

  loading.value = true;
  await store.dispatch("changePage", newPage);
  loading.value = false;
};

watch(() => route.query.page, async (newPage) => {
  const pageNumber = Number(newPage) || 1;
  if (pageNumber !== page.value) {
    page.value = pageNumber;
    loading.value = true;
    await store.dispatch("changePage", pageNumber);
    loading.value = false;
  }
});
</script>