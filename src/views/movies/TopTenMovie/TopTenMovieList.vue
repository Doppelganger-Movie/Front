<template>
  <div class="container">
    <br>
    <h2 class="text-white" style="font-weight:600;">지금 사람들이 가장 많이 찾는 영화</h2>
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
            :color="active ? 'grey' : 'black'"
            @click="toggle"
            class="ma-5  ma-0 fill-height"
            style="font-family:'Noto Sans KR', sans-serif;
  font-weight:550;"
            height="250"
            width="170">
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
    //  console.log(movie.id)
     this.$router.push({name: 'MovieDetail', params: {'movie_num':this.selectMovie}})
    },
  },
}
</script>

<style>
.img {
  object-fit: cover;
}
.container {
  text-decoration-color: white;
}
.p {
  font-family:'Noto Sans KR', sans-serif;
  font-weight:600;
}
</style>