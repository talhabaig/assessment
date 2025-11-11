import { createStore } from 'vuex';
import axios from "axios";

export interface Movie {
  Title?: string;
  Year?: string;
  imdbID?: string;
  [key: string]: any;
}

export interface State {
  movies: Movie[];
  currentPage: number;
  perPage: number;
  totalPages: number;
}

export default createStore<State>({
  state: {
    movies: [] as Movie[],
    currentPage: 1,
    perPage: 5,
    totalPages: 1,
  },
  mutations: {
    SET_MOVIES(state: State, movies: Movie[]) {
      state.movies = movies;
    },
    SET_CURRENT_PAGE(state: State, page: number) {
      state.currentPage = page;
    },
    SET_TOTAL_PAGES(state: State, totalPages: number) {
      state.totalPages = totalPages;
    },
  },
  actions: {
    async fetchMovies({ commit, state }: any) {
      try {
        const apiUrl: string = import.meta.env.VITE_MOVIES_API as string;
        const response = await axios.get(apiUrl, {
          params: {
            page: state.currentPage,
            per_page: state.perPage,
          },
        });

        commit("SET_MOVIES", response.data.data as Movie[]);
        commit("SET_TOTAL_PAGES", response.data.total_pages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
    async changePage({ commit, dispatch }: any, page: number) {
      commit("SET_CURRENT_PAGE", page);
      await dispatch("fetchMovies");
    },
  },
  getters: {
    allMovies: (state: State) => state.movies,
    currentPage: (state: State) => state.currentPage,
    totalPages: (state: State) => state.totalPages,
  },
});
