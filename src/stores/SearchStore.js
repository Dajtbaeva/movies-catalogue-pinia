import { defineStore } from "pinia";
import { useMovieStore } from "./MovieStore";
import { ref } from "vue";

const URL =
  "https://api.themoviedb.org/3/search/movie?api_key=4d46c9665cacd5bd3f1d64df374f4c7f&query=";

  export const useSearchStore = defineStore("searchStore", () => {
    const loader = ref(false);
    const movies = ref([]);
    
  const getMovies = async (search) => {
    loader.value = true;
    const res = await fetch(`${URL}${search}`);
    const data = await res.json();
    movies.value = data.results;
    loader.value = false;
  };
  
  const addToUserMovies = (object) => {
    const movieStore = useMovieStore();
    movieStore.movies.push({ ...object, isWatched: false });
    movieStore.activeTab = 1;
  };

  return {
    loader,
    movies,
    getMovies,
    addToUserMovies,
  };
});

// OPTIONS API
// export const useSearchStore = defineStore("searchStore", {
//   state: () => ({
//     loader: false,
//     movies: [],
//   }),
//   actions: {
//     async getMovies(search) {
//       this.loader = true;
//       const res = await fetch(`${URL}${search}`);
//       const data = await res.json();
//       this.movies = data.results;
//       this.loader = false;
//     },
//     addToUserMovies(object) {
//       const movieStore = useMovieStore();
//       movieStore.movies.push({ ...object, isWatched: false });
//       movieStore.activeTab = 1;
//     },
//   },
// });