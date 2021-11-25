<template>
  <div class="board">
    <div class="container mt-10">
      <div class="row ml-5">
        <div class="col-lg-5 col-md-6">
            <div class="product__details__pic">
                <div class="product__details__pic__item">
                    <img :src="movie.poster_path" class="rounded" alt="영화 포스터">
                </div>
            </div>
        </div>
        <div class="col-lg-7 col-md-6">
            <div class="ml-6 mt-3">
              <h1>{{ movie.title }}</h1>
              <p class="mt-3"> {{movie.release_date|moment('YYYY')}}</p><br><br><br><br><br>
              <div class="mt-10">
                <b-icon class="mt-3 ml-1" icon="star-fill" font-scale="1" variant="warning"></b-icon>
                {{movie.vote_average }} ( {{movie.vote_count}} )
                <br><b-icon class="mt-3 mr-1" icon="film" font-scale="1"></b-icon>
                {{movie.runtime}}분
                <div class="d-flex mt-3">
                  <b-icon class="mr-2" icon="tags" font-scale="1"></b-icon>
                  <div class="mr-2" v-for="(genre, idx) in movie.genres" :key="idx">
                    {{ genre["name"] }}
                  </div>
                </div>
                <b-icon class="mt-3 mr-1" icon="volume-up" font-scale="1"></b-icon>
                {{movie.original_language }}
              </div>
            </div>
        </div>
      </div>
      <div class="mt-6 d-flex justify-content-center">
        <b-tabs content-class="mt-3" align="center">
          <b-tab title="줄거리" active>
            <p class="mr-4 ml-4 mt-10"> {{ movie.overview }}</p>
          </b-tab>
          <b-tab title="출연 / 제작" >
            <div class="mt-7 ml-3">
              <h3 >감독</h3>
              <v-container class="people">
                <div class="d-flex justify-content-start pa-4 g-4" >
                  <v-card v-for="(director, idx) in movie.directors" :key="idx" class="pa-3" width="190px"> 
                  <v-img :src="director.profile_path" alt="director_profile_poster"></v-img>
                  <v-card-title> {{ director.name }} </v-card-title>
                  </v-card>
                </div>
              </v-container>
            </div>
            <h3>배우</h3>
            <v-container class="people">
              <v-sheet
                class="mx-auto"
                elevation="1" 
              >
                <v-slide-group
                  v-model="model"
                  class="pa-3"
                  center-active
                  show-arrows
                >
                  <v-slide-item
                    v-for="(actor, idx) in movie.actors.slice(0,10)" :key="idx" class="pa-3"
                    v-slot="{ active, toggle }"
                  >
                    <v-card class="d-flex flex-column justify-center" width="190px" >   
                        <v-img :src="actor.profile_path" alt="actor_profile_poster">
                        <v-row
                          class="fill-height ma-5  ma-0 "
                          align="center"
                          justify="center" :color="active ? 'primary' : 'grey lighten-1'"
                          @click="toggle" 
                          height="200" width="100"
                          >                                          
                            <v-scale-transition>
                              <!-- 눌릴 때 어떤 액션 할지 -->
                            </v-scale-transition>
                      </v-row>  
                          </v-img>
                        <v-card-title class="mx-auto"> {{ actor.name }} </v-card-title>                           
                      </v-card>   
                    </v-slide-item>
                </v-slide-group>
              </v-sheet>
            </v-container>
          </b-tab>
          <div class="reviewcontent mt-7">
            <b-tab title="리뷰" align="center">
              <div>
                <!-- <h3 >한줄평 남기기</h3> -->
                  <div>
                    <div class="w-50 mt-7">
                      <label for="rating-inline"> 영화는 어떤가요?&nbsp; &nbsp;</label>
                      <b-form-rating variant="warning" v-model="vote" show-value id="rating-inline" inline value="3"></b-form-rating>
                    </div>
                    <div class="w-50 mt-3">
                        <b-form-textarea id="review-input" placeholder="리뷰를 작성해주세요" rows="3" max-rows="8" v-model="content"></b-form-textarea>
                        <b-button class="mt-3" @click="createReview" variant="outline-dark" style="font-weight:600;">생성</b-button>
                    </div>
                  </div>
              </div>
              <!-- 리뷰 뒤에서부터하기!!!!!!!!!!!! -->
              <h3 v-if="blank" class="mt-7"><hr>아직 작성된 리뷰가 없어요!</h3>
              <div v-else v-for="(review, idx) in reviews" :key="idx">
                <!-- class="update-review" -->
                <div v-show="review_num === review.id"> 
                  <div v-show="update_state">
                    <hr>
                    <div class="w-50 mt-3">
                      <div class="d-flex flex-row mb-3">
                        <b-avatar variant="light"></b-avatar>
                        <label for="rating-inline" class="align-self-end" >{{ review.username }}님&nbsp;&nbsp;</label>
                        <b-form-rating variant="warning" v-model="update_vote" id="rating-inline" inline value="4"></b-form-rating>
                      </div>
                      <b-form-textarea id="review-update" rows="3" max-rows="8" v-model="update_content"></b-form-textarea>
                      <b-button class="mt-3" @click="updateReview" variant="outline-dark" style="font-weight:600;">수정</b-button>
                    </div>
                  </div> 
                  <div v-show="!update_state">
                    <hr>
                    <div class="w-50 mt-4">
                      <div class="d-flex flex-row">
                        <b-avatar variant="light"></b-avatar>
                        <label for="rating-inline" class="align-self-end" >{{ review.username }}님&nbsp;&nbsp;</label>
                        <b-form-rating variant="warning" v-model="review.vote" readonly id="rating-inline" inline value="4"></b-form-rating>
                      </div>
                      <b-list-group-item class="mt-3 text-left" style="height: 80px;">{{ review.content }}</b-list-group-item>
                      <div class="d-flex flex-row-reverse mb-2">
                        <b-button class="mt-3" @click="deleteReview(review)" variant="outline-dark" style="font-weight:600;">삭제</b-button>&nbsp;
                        <b-button class="mt-3" @click="ActivateUpdate(review)" variant="outline-dark" style="font-weight:600;">수정</b-button>
                      </div>
                    </div>
                </div>
                </div>
                <div v-show="review_num !== review.id">
                  <hr>
                  <div class="w-50 mt-4">
                    <div class="d-flex flex-row">
                      <b-avatar variant="light"></b-avatar>
                      <label for="rating-inline" class="align-self-end" >{{ review.username }}님&nbsp;&nbsp;</label>
                      <b-form-rating variant="warning" v-model="review.vote" readonly id="rating-inline" inline value="4"></b-form-rating>
                    </div>
                    <b-list-group-item class="mt-3 text-left" style="height: 80px;">{{ review.content }}</b-list-group-item>
                    <div class="d-flex flex-row-reverse mb-2">
                      <b-button class="mt-3" @click="deleteReview(review)" variant="outline-dark" style="font-weight:600;">삭제</b-button>&nbsp;
                      <b-button class="mt-3" @click="ActivateUpdate(review)" variant="outline-dark" style="font-weight:600;">수정</b-button>
                    </div>
                  </div>
                </div>
              </div>
            </b-tab>
          </div>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name:'MovieDetail',
  data: function() {
    return {
      movie : null,
      content:'',
      reviews: null,
      review_num:null,
      update_content:null,
      num : this.$route.params.movie_num,
      blank:false,
      vote:null,
      update_vote:null,
      update_state: false,
      actor_list: null,
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
    // ------- DeleteReview---------// 
    deleteReview: function(review) {
      // console.log(review.id)
      this.review_num = review.id
      // console.log(review.num)
      // console.log('삭제 작업 시작')
      axios({
        method: 'delete',
        url:`${SERVER_URL}/reviews/${this.num}/${this.review_num}/`,
        headers: this.setHeader()
      })
      .then(() => {
        // console.log(`${this.review_num}번 리뷰 삭제 완료`)
        this.getReviews()
      })
      .catch((err) => {
        // console.log(err.response)
        if (err.response.status === 403) {
        alert('작성자가 아닙니다.')} else if (err.response.status === 404) {
          this.blank = true
          this.getReviews()
        } 
      }) 
    },

    // ------- UpdateReview---------// 
    updateReview: function() {
      axios({
        method: 'put',
        url:`${SERVER_URL}/reviews/${this.num}/${this.review_num}/`,
        data: {
          content:this.update_content,
          vote: this.update_vote
        },
        headers: this.setHeader()
      })
      .then(() => {
        // console.log(`${this.review_num}번 리뷰 수정 완료`)
        this.update_state=false
        this.update_content = null
        this.update_vote = null
        this.getReviews()
      })
      .catch(err => {
        // console.log(err.response)
        if (err.response.status === 403) {
        alert('작성자가 아닙니다.')} 
        this.update_state=false
        this.update_content=null
        this.update_vote = 3
        this.getReviews()
      })
    },
    ActivateUpdate: function(review) {
      if (review.user === this.userId) {
        // console.log(review.user, this.userId)
        this.review_num = review.id
        this.update_state = true
        this.update_content = review.content
        this.update_vote = review.vote
      } else {
        alert('작성자가 아닙니다.')
      }
    },
    // ------- CreateReview---------// 
    createReview: function() {
      axios({
        method: 'post',
        url:`${SERVER_URL}/reviews/${this.num}/`,
        data: {
          content: this.content,
          vote : this.vote
        },
        headers: this.setHeader()
      })
      .then(() => {
        // console.log('리뷰 생성 완료')
        this.content = null
        this.vote = 3
        this.getReviews()
      })
      .catch(() => {
        // console.log(err)
      })
    },
    // ------- ReadReviews---------// 
    getReviews: function() {
      axios({
        method: 'get',
        url:`${SERVER_URL}/reviews/${this.num}/`,
        headers: this.setHeader()
      })
      .then(res => {
        // console.log(res.data)
        this.blank = false
        this.reviews = res.data
      })
      .catch(err => {
        // console.log(err.response)
        if (err.response.status === 404) {
        this.blank = true
        }
      })
    },
    // ------- ReadMovie---------// 
    getMovie: function() {
      axios({
        method: 'get',
        url:`${SERVER_URL}/movies/${this.num}/`,
        headers: this.setHeader()
      })
      .then(res => {
        // console.log(res.data)
        this.blank = false
        this.movie = res.data
      })
      .catch(err => {
        // console.log(err.response)
        if (err.response.status === 404) {
        this.blank = true
        }
      })
    },
  },
  created: function () {
    this.getMovie(),
    this.getReviews()
  },
  computed: {
    userId : function () {
      const userId = this.$store.state.UserId
      return userId
    }
  },
}
</script>

<style scoped>
.board {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family:'Noto Sans KR', sans-serif;
  font-weight:590;
}
.container {
  width: 1000px;
}
.people {
  width: 950px;
}
.reviewcontent {
  width: 950px;
}


</style>
