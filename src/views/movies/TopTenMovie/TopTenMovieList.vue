<template>
  <div class="container">
    <br>
    <h2 class="text-white">탑 텐 영화</h2>
    <v-sheet
      class="mx-auto black"
      elevation="1"
    >
      <v-slide-group
        v-model="model"
        class="pa-3"
        center-active
        show-arrows
        dark
      >
        <v-slide-item
          v-for="(movie, idx) in movies"
          :key="idx"
          v-slot="{ active, toggle }"      
        >
          <v-card outlined
            :color="active ? 'primary' : 'black'"
            @click="toggle"
            class="ma-5  ma-0 fill-height"
            height="200"
            width="100">
            <v-img
              :src="movie.poster_path" alt="포스터 이미지" 
              @click="moveToMovieDetail(movie)" class="fill-height ma-0">              
              <v-row
                class="fill-height"
                align="center"
                justify="center"
                >
                  <v-scale-transition>
                  </v-scale-transition>
              </v-row>
            </v-img>
            <!-- <p class="text-center mb-1">{{ movie.title }}</p> -->
            <p class="text-center mb-1 text-white"> {{ movie.title }} </p>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>

  </div>
</template>

<script>
// import TopTenMovieItem from './TopTenMovieItem.vue'

export default {
  name: 'TopTenMovieList',
  data: function () {
    return {
      model: null,   
      selectMovie: null,
    }
  },
  props: {
    movies:Array,
  },
  components: {
    // TopTenMovieItem
  },
  methods: {
   moveToMovieDetail: function (movie) {
     this.selectMovie = movie.id
     console.log(movie.id)
     this.$router.push({name: 'MovieDetail', params: {'movie_num':this.selectMovie}})
    },
  },
  // computed: {
  //   posterPath () {
  //     const poster_url = 'https://image.tmdb.org/t/p/w300/' + movie.poster_path
  //     return poster_url
  //   }
  // }
}
</script>

<style>
.img {
  object-fit: cover;
}
.container {
  text-decoration-color: white;
}
</style>