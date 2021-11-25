<template>
  <div class="container">
    <br>
    <h2 class="text-white" style=" font-weight:600;">당신의 도플갱어 {{ doppleganger[0].celeb }}의 영화</h2>
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
          v-for="(movie, idx) in doppleganger"
          :key="idx"
          v-slot="{ active, toggle }"      
        >
          <v-card outlined
            :color="active ? 'grey' : 'black'"
            @click="toggle"
            class="ma-5  ma-0 fill-height"
            height="250"
            width="170"
            style="font-family:'Noto Sans KR', sans-serif;
  font-weight:550;">
            <v-img
              :src="movie.celeb_movie_poster" alt="포스터 이미지" 
              @click="moveToMovieDetail(movie.celeb_movie_id)" class="fill-height ma-0">              
              <v-row
                class="fill-height"
                align="center"
                justify="center"
                >
                  <v-scale-transition>
                  </v-scale-transition>
              </v-row>
            </v-img>
            <p class="text-center mb-1 text-white">{{ movie.celeb_movie_title }}</p>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>

  </div>
</template>

<script>
export default {
  name: 'DopplegangerMovieList',
  data: function () {
    return {
      model: null,   
      selectMovie: null,
    }
  },
  props: {
    doppleganger:Object,
  },
  components: {
    // TopTenMovieItem
  },
  methods: {
   moveToMovieDetail: function (id) {
     this.selectMovie = id
    //  console.log(id)
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