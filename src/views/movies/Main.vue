<template>
  <v-main class="black lighten-2" style="height:100%">
    <v-container>
      <div class="card bg-dark text-white" style="max-height: 400px; font-family:'Noto Sans KR', sans-serif; font-weight:550;">
        <img src="@/assets/images/banner.png" alt="배너 이미지" id="banner">
        <div class="card-img-overlay">
          <div class="text">
            <h1 class="card-title">당신의 도플갱어를 찾아보세요!</h1>
          </div>
          <b-button variant="light" @click="moveTodopple" style="font-weight:600;">찾으러 가기</b-button>
          <!-- <b-button variant="dark" @click="moveTodopple">찾으러 가기</b-button> -->
        </div>
      </div>

      <v-row style="height:100%">
        <!-- movie-list(슬라이드 그룹) -->
        <DopplegangerMovieList :doppleganger="savedDoppleGnager"/>
        <TopTenMovieList :movies="TopTenMovies"/>
        <DirectorMovieList v-if="DirectorMovies" :movies="DirectorMovies"/> 
      </v-row>
    </v-container> 
  </v-main>
</template>

<script>
import DirectorMovieList from '@/views/movies/DirectorMovie/DirectorMovieList.vue'
import TopTenMovieList from '@/views/movies/TopTenMovie/TopTenMovieList.vue'
import DopplegangerMovieList from '@/views/Doppleganger/DopplegangerMovieList.vue'
const SERVER_URL = process.env.VUE_APP_SERVER_URL
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'Main',
  data: function () {
    return {
      TopTenMovies : null,
      DirectorMovies: null,
      savedDoppleGnager:null
    }
  },
  components: {
    DirectorMovieList,
    TopTenMovieList,
    DopplegangerMovieList,
  },
  methods: {
    setHeader: function() {
      const token = localStorage.getItem('JWT')
      const header = {
        Authorization : `Bearer ${token}`
      }
      return header
    },
    //Top 10 영화 전체 가져오기
    getTopTenMovies: function() {
      axios({
          mehtod: 'get',
          url:`${SERVER_URL}/movies/topten_movie/`,
          // headers: this.setHeader()
        })
        .then(res => {
          this.TopTenMovies = res.data
        })
        .catch(() => {
          // console.log(err)
        })
    },
    //감독 영화 전체 가져오기
    getDirectorMovies: function () {
      axios({
        mehtod: 'get',
        url:`${SERVER_URL}/movies/director_movie/`,
        headers: this.setHeader()
      })
      .then(res => {
        // console.log(res.data)
        this.DirectorMovies = res.data
      })
      .catch(() => {
        // console.log(err)
      })
    },
    //저장된 도플갱어 영화 전체 가져오기
    getDoppleganger: function () {
      axios({
        mehtod: 'get',
        url:`${SERVER_URL}/doppleganger/${this.UserId}`,
        headers: this.setHeader()
      })
      .then(res => {
        // console.log(typeof(res.data))
        // console.log(typeof(res.data.info[0]))
        // console.log(res.data['info'])
        this.savedDoppleGnager = res.data['info']
      })
      .catch(() => {
        // console.log(err)
        // console.log(this.UserId)
        // console.log('지난 데이터 불러오는 데 실패')
      })
    },
    moveTodopple () {
      this.$router.push({name:'Doppleganger'})
    },
    moveToMovieDetail: function (movie_id) {
     this.$router.push({name: 'MovieDetail', params: {'movie_num':movie_id}})
   },
  },
  created () {
    this.getTopTenMovies()
    this.getDirectorMovies()
    if(this.UserId) {this.getDoppleganger()}
  },

  computed: {
    ...mapState([
      // 'VDoppleganger', 
      'UserId'
    ]),
  },
}
</script>

<style>
#banner {
  object-fit: cover;
  max-height: 400px;
  font-family:'Noto Sans KR', sans-serif;
  font-weight:550;
}
.card-img-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}
.h2 {
  font-family:'Noto Sans KR', sans-serif;
  font-weight:550;
}

</style>