import { defineStore } from "pinia";
import { useMovieStore } from "./MovieStore";

const URL =
  "https://api.themoviedb.org/3/search/movie?api_key=4d46c9665cacd5bd3f1d64df374f4c7f&query=";

export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    loader: false,
    movies: [],
  }),
  actions: {
    async getMovies(search) {
      this.loader = true;
      const res = await fetch(`${URL}${search}`);
      const data = await res.json();
      // console.log(data);
      this.movies = data.results;
      this.loader = false;
    },
    addToUserMovies(object) {
      const movieStore = useMovieStore();
      movieStore.movies.push({ ...object, isWatched: false });
      movieStore.activeTab = 1;
    },
  },
});
