<template>
  <div class='container'>
    <br>
    <h2 class="text-white">{{movies[0].directors[0]['name']}} 감독의 영화</h2>
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
          <v-card 
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
                    <!-- 눌릴 때 어떤 액션 할지 -->
                  </v-scale-transition>
              </v-row>
              </v-img>
              <p class="text-center mb-1 text-white">{{ movie.title }}</p>
          </v-card>
            

        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script>
// import DirectorMovieItem from '@/views/movies/DirectorMovie/DirectorMovieItem.vue'

export default {
  name: 'DirectorMovieList',
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
    // DirectorMovieItem,
  },
  methods: {
   moveToMovieDetail: function (movie) {
     this.selectMovie = movie.id
     this.$router.push({name: 'MovieDetail', params: {'movie_num':this.selectMovie}})
    },
  },
}
</script>

<style>
.container {
  text-decoration-color: white;
}
</style>