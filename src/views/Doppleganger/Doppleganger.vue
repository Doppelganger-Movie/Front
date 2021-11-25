<template>
  <div>
    <b-overlay :show="show" rounded="sm" @shown="onShown" @hidden="onHidden">
      <section id="main-container" class="main-container p-4">
        <div class="container" :aria-hidden="show ? 'ture' : null">
          <div class="row text-center justify-center">
            <div class="col-lg-8">
              <h3 class="section-sub-title">나와 닮은 배우는? 본인의 사진을 업로드해주세요!</h3>
              <div class="col-lg-8 mx-auto">
                <v-file-input label="2MB 이하로 넣어주세요." v-model="files" prepend-icon="mdi-camera" show-size counter>
                </v-file-input>
              </div>
                <b-button ref="show" :disabled="show" @click="sendImages" elevation="6" style="font-weight:600;" variant="dark" text>도플갱어 찾아보기</b-button>
            </div>
          </div>
          <div v-if="errormsg" class="text-center"><br><br><br><h3>사진 크기를 확인해주세요 <b-icon icon="emoji-frown" font-scale="1.5"> </b-icon></h3> </div>
          <div v-else-if="nullerror" class="text-center"><br><br><br><h3>사진을 업로드해주세요 <b-icon icon="emoji-frown" font-scale="1.5"> </b-icon></h3> </div>
          <div v-else-if="doppleganger" class="main-container p-4">
          <br>
            <hr v-if="doppleganger" style="width:40%; margin-left:30%; padding:0px; text-align:center;">
            <div class="row justify-content-center">
              <div class="row text-center">
                <div class="col-lg-12">
                  <h3 class="section-sub-title mb-3">{{ username }}님과 {{ doppleganger.celeb}}님은 {{ (doppleganger.confidence * 100).toFixed(1) }}% 닮았습니다! <b-icon icon="emoji-wink" font-scale="1.5"></b-icon><b-icon icon="hand-thumbs-up"></b-icon></h3> 
                </div>
              </div>
              <div class="row justify-content-center">
                <div class="col-lg-3 col-sm-6 mb-5">
                  <div class="sc-wrapper">
                    <div class="sc-img-wrapper">
                      <b-card v-if="Selfimgsrc" :img-src="Selfimgsrc" img-alt="user-img" img-top tag="article" style="width: 280px;" border-variant="light" ></b-card>
                      <b-card v-else-if="selfurl" :img-src="selfurl" img-alt="user-img" img-top tag="article" style="width: 280px;" border-variant="light"></b-card>
                    </div>
                    <div class="sc-content justify-content-center">
                      <h3 class="text-center pr-11">{{ username }}</h3>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 col-sm-6 mb-5">
                  <div class="sc-wrapper">
                    <div class="sc-img-wrapper ml-4 pl-3">
                      <b-card :img-src="doppleganger.celeb_image" img-alt="celeb-img" img-top tag="article" style="width: 280px;" border-variant="light" ></b-card>
                    </div>
                    <div class="sc-content justify-content-center mx-auto">
                      <h3 class="text-center ml-1">{{ doppleganger.celeb }}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br>
            <hr v-if="doppleganger" style="width:40%; margin-left:30%; padding:0px; text-align:center;">
            <div v-if="doppleganger.celeb_movie_id.length">              
              <div class="row text-center">
                <div class="col-lg-12">
                  <h3 class="section-sub-title">{{ doppleganger.celeb}}의 출연작 보러가기</h3>
                  <br>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="row text-center">
                <div class="col-lg-12">
                  <h3 class="section-sub-title">{{ doppleganger.celeb}}의 출연작을 찾을 수 없습니다. <b-icon icon="emoji-frown" font-scale="1.5"></b-icon></h3>
                </div>
              </div>
            </div>
            
            <div class="row justify-content-center">
              <div  v-for="(poster, idx) in doppleganger.celeb_movie_poster" :key="idx" class="col-lg-2 col-md-3 col-sm-4 mb-5">
                <div class="sc-wrapper">
                  <div class="sc-img-wrapper">
                    <img :src="poster" alt="poster" class="img-fluid" @click="moveToMovieDetail(doppleganger.celeb_movie_id[idx])" >
                  </div>
                  <div class="sc-content justify-content-center">
                    <h5 class="text-center mt-2">{{ doppleganger.celeb_movie_title[idx] }}</h5>
                  </div>
                </div>
              </div>
            </div>
            <br>
            <hr v-if="doppleganger" style="width:40%; margin-left:30%; padding:0px; text-align:center;">
            <div class="mx-auto" style="text-align:center;">
              <h4 class="mt-4 mb-1">결과를 공유하기</h4>
              <img style="border:none" src="@/assets/images/icon-facebook.png" class="link-icon facebook mt-1 pt-0" @click="shareFacebook">   
            </div>
          </div>
        </div>
      </section>
      <template #overlay>
          <div class="text-center">
          <b-icon  icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
          <p id="cancel-label">Please wait...</p>
        </div>
      </template>
    </b-overlay>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name:'Doppleganger',
  data() {
    return {
      files: null,
      Selfimgsrc: null,
      selfurl : null,
      msg : null,
      doppleganger: null,
      username: null,
      show: false,
      errormsg: null,
      nullerror: null,
    }
  },
  methods: {
    shareFacebook() {
        var text = `당신의 도플갱어는? : ${this.doppleganger.celeb}, 정확도 ${(this.doppleganger.confidence * 100).toFixed(1)}%`; // 전달할 텍스트
        var snsText = encodeURIComponent(text);
        var snsURL   = encodeURIComponent("http://doppelganger-movie.netlify.app")
        window.open("http://www.facebook.com/sharer/sharer.php?u=" + snsURL + "&text=" + snsText);
    },

    onHidden() {
      // this.$refs.show.focus()
      // this.show=true
      // console.log('되고잇나??', this.show)
    },
    onShown() {
      // this.doppleganger
    },
    sendImages() {
      this.show = true
      this.onHidden()
      this.doppleganger = null
      this.msg = null
      this.errormsg = null
      this.nullerror = null
      let info = new FormData()
      info.append('files', this.files)
      if (this.files===null) {             // 파일을 보내지 않을 경우
        info.append('files', [])
      } else {
        for (let i = 0; i < this.files.length; i++) {   // 파일이 하나 이상인 경우
          info.append('files', this.files[i]);
        }
      }
      const token = localStorage.getItem('JWT') // token을 세션에 저장시켜 사용했기 때문에
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data', // Content-Type을 변경해야 파일이 전송됨
          'Authorization': `Bearer ${token}`
          },
      }
      axios.post(
        `${SERVER_URL}/doppleganger/images/`, 
        info, config)
      .then((res) => {
        // console.log(res.data) // 필요한 것 넣어서 쓰면됨
        let img_path = res.data.upload_image
        // console.log(`${SERVER_URL}${img_path}`)
        this.Selfimgsrc = `${SERVER_URL}${img_path}`

        this.selfurl = URL.createObjectURL(this.files)
        // console.log(this.selfurl)
        this.$store.dispatch('saveSelfurl', this.selfurl) //프로필에서 쓸 이미지 vuex로 보내기        
        this.FindDopplegangerInfo()
      })
      .catch(() => {
        // console.log('이미지가 없음')
        // console.log(err)
        this.nullerror="이미지가 없음"
        this.show = false
        this.onShown()
      })
    },

    setHeader: function() {
      const token = localStorage.getItem('JWT')
      const header = {
        Authorization : `Bearer ${token}`
      }
      return header
    },

    FindDopplegangerInfo: function () {
      axios({
        mehtod: 'get',
        url:`${SERVER_URL}/doppleganger/`,
        headers: this.setHeader()
      })
      .then(res => {
        // console.log(res.data)
        if (res.data.noImg) {
          this.msg = '아직 사진을 올리지 않았어요! 사진을 올려주세요.'
        } else if (res.data.celeb_movie_id.length === 0) {
          this.doppleganger = res.data
          this.username = res.data.upload_username
          this.msg = '이 배우는 찍은 필모그래피가 없어요!'
          this.show = false
          this.onShown()
        }        
        else {
          this.doppleganger = res.data
          this.username = res.data.upload_username
          // this.$store.dispatch('saveDoppleganger', this.doppleganger)
          this.msg = null
          this.show = false
          this.onShown()
        }
      })
      .catch(() => {
        // console.log(err)
        // console.log('닮은 배우가 없음.')
        this.errormsg = '다른 사진을 넣어주세요ㅠㅠ'
        this.show = false
        this.onShown()
      })
    },
    moveToMovieDetail: function (movie_id) {
     this.$router.push({name: 'MovieDetail', params: {'movie_num':movie_id}})
   },
  },
  created () {
    // this.getDoppleganger()
  },
  computed: {
      ...mapState(['UserId'])
    }      
}
</script>


<style scoped>

.link-icon { position: relative; display: inline-block; width: auto;    
font-size: 14px; font-weight: 500; color: #333; margin-right: 10px; padding-top: 50px; }
.link-icon.facebook { background-image: "./images/icon-facebook.png"; background-repeat: no-repeat; } 

.h3.section-sub-title {
  font-family:'Noto Sans KR', sans-serif;
}

h3, h4, h5, p {
  font-family:'Noto Sans KR', sans-serif;
  font-weight:600;
}

img {
  border: 2px solid darkgrey;
}

.card-list {
  margin-top: 3rem;
  margin-left: 0rem;
  margin-right: 0rem;
  justify-content: center;
  width: 100%;
}
.dopple {
  justify-content: center;
}
</style>