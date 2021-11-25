<template>
<div class="container text-center mx-auto text-black">  
  <div class="profile wrapper">
    <img v-if="selfImg" :src="selfImg" class="rounded-circle mb-1" alt="프로필 사진" 
    style="object-fit: cover;" width="200" height="200">
    <!-- DB 이미지 못불러낼 경우 vuex 저장된 self 이미지 출력 -->
    <img v-else-if="Selfurl" :src="Selfurl" class="rounded-circle mb-1" alt="프로필 사진" 
    style="object-fit: cover;" width="200" height="200">
    <pre class="text-black"><h4>
Welcome!
{{ User.username }}님
    </h4></pre>
    
      <!-- 주석 <button @click="getDoppleganger">TEST</button> -->
    <hr class="text-black" style="width:30%; text-align:center; margin-left:0">
    <!-- 도플갱어 정보  -->
   <h1 v-if="!doppleganger">{{ msg }}</h1>
   <div class="doppleganger" v-if="doppleganger">
    <pre><h4 class="section-sub-title mb-3 text-black">{{ User.username }}님의 도플갱어는 배우 {{ doppleganger[0].celeb }} 입니다!</h4></pre>
      <img class="rounded-circle" :src="doppleganger[0].celeb_image" alt="도플갱어 사진"
      style="object-fit: cover;" width="200" height="200">    
    </div>         
  </div>
  <br>
  <!---주석 영화 카드 --->
     <hr class="text-black" style="width:30%; text-align:center; margin-left:0">
 <h4 class="mt-5 mb-1 text-black" v-if="doppleganger">도플갱어 {{ doppleganger[0].celeb }}의 출연영화가 궁금하다면..?</h4>
  <div class="row row-cols-1 row-cols-md-3 mt-1 movies h-100" v-if="doppleganger" >
    <div class="col mt-0" v-for="(poster, index) in doppleganger" :key="index">
      <img :src="poster.celeb_movie_poster" alt="영화 사진"  @click="moveToMovieDetail(poster.celeb_movie_id)" class="card-img-top">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{ poster.celeb_movie_title }}</h5>
          <!---주석 <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> --->
        </div>
      </div>
    </div>
  </div> 
</div>

</template>

<script>
import axios from 'axios'
const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'Profile',
  data: function (){
    return {
      User: null,
      selfImg: null,
      followers : -1,
      followings: -1,
      doppleganger : null,
      msg: null,
    }
  },
  methods: {
    setHeader: function() {
      const token = localStorage.getItem('JWT')
      const header = {
        Authorization : `Bearer ${token}`
      }
      return header
    },
    getUser () {
      axios({
        method: 'get',
        url:`${SERVER_URL}/accounts/${this.userId}/`,
        headers: this.setHeader()
      })
      .then(res => {
        console.log(res.data)
        console.log('프로필 불러오기 성공')
        this.User = res.data
        this.$store.dispatch('saveUsername', this.User.username)
      })
      .catch(err => {
        console.log(err)
        console.log('프로필 불러오기 실패ㅠㅠ')
      })
    },
    getDoppleganger: function () {
      axios({
        mehtod: 'get',
        url:`${SERVER_URL}/doppleganger/${this.userId}`,
        headers: this.setHeader()
      })
      .then(res => {
        console.log(res.data)
        console.log(this.userId)
        this.doppleganger = res.data.info
        this.selfImg = `${SERVER_URL}/media/${res.data.info[0].upload_image}`
        console.log(this.selfImg)
      })
      .catch(err => {
        console.log(err)
        console.log(this.userId)
        if (err.response.status === 500) {
        this.msg = '아직 도플갱어를 찾아보지 않으셨군요!\n 지금 바로 도플갱어를 찾아보세요.'
        }
      })
    },
    moveToMovieDetail: function (movie_id) {
     this.$router.push({name: 'MovieDetail', params: {'movie_num':movie_id}})
   },
  },
  created : function () {
    this.getUser()
    if (this.userId) {this.getDoppleganger()}
  },
  computed: {
    userId : function () {
      const userId = this.$store.state.UserId
      return userId
    },
    Selfurl : function() {
      const Selfurl = this.$store.state.Selfurl
      return Selfurl
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');

.container {
  margin:auto 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
h4, h5, pre {
  font-family:'Noto Sans KR', sans-serif;
}

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
  max-width: 100%;
  text-align: center;
}
.profile h3 {
  margin: 0rem auto;
  padding:0rem;
}
.doppleganger {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
}

.movies {
  display: flex;
  flex-direction: row;
  align-items:flex-start;
  flex-wrap: wrap;
  max-width:720px;
  margin-top: 1rem;
}



</style>