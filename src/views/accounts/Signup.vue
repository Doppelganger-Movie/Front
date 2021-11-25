<template>
  <div>
  <section class="sign-area section-padding-100">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-8 col-lg-6">
          <div class="sign-content text-center">
            <h1>회원가입</h1>
            <h3>Welcome</h3>
            <p v-if="errMsg">{{errMsg}}</p>
            <!-- Sign Form -->
            <form class="row justify-content-center">
              <div class="form-group col-8">
                <div class="input_row" id="id_line">
                  <b-icon icon="person" font-scale="1.5"></b-icon>
                  <input type="text" id="username" v-model.trim="credentials.username" placeholder="아이디">
                </div>
                <div class="input_row mt-3" id="id_line">
                  <b-icon icon="lock" font-scale="1.5"></b-icon>
                  <input type="password" id="password" v-model.trim="credentials.password" placeholder="비밀번호">
                </div>
                <div class="input_row mt-3" id="id_line">
                  <b-icon icon="lock-fill" font-scale="1.5"></b-icon>
                  <input type="password" id="password2" v-model.trim="credentials.password2" placeholder="비밀번호 확인" @keyup.enter="signup">
                </div>
                <b-button variant="outline-secondary" class="mt-5 row justify-content-center" @click="signup">회원가입</b-button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script>
import axios from 'axios'

const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'Singup',
  data: function () {
    return {
      credentials: {
        username: '',
        password: '',
        password2: '',
      },
      errMsg : null,
    }
  },
  methods: {
    signup: function () {
      axios({
        method: 'post',
        url: `${SERVER_URL}/accounts/signup/`,
        data: this.credentials
      })
      .then(() => {
        // console.log(res)
        this.errMsg = null
        this.$router.push({ name: 'Login' })
      })
      // 정상작동 :   
      // 400 : 이미 존재하는 유저일 때
      .catch(err => {        
        if (err.response.status === 400) {
          // console.log(err.response.data.error)
          this.errMsg = err.response.data.error
        } else if (err.response.status === 404) {
          this.errMsg = '세션이 종료되었습니다. 새로고침 후 사용해주세요'
        }
      })
    }
  }
}
</script>
<style scoped>
input {
  border: none;
  padding-left: 13px;
  box-shadow: none;
  cursor: pointer;
  background: 0;
  border-radius: 0;
  appearance: none;
  outline: 0;
}

.input_row {
  position: relative;
  border: 1px solid #dadada;
  padding: 15px 16px 15px 17px;
  box-sizing: border-box;
  text-align: left;
  border-radius: 8px 8px 8px 8px;
  box-shadow: none;
}
.justify-content-center {
  -webkit-box-pack: center;
}
.col-8, .col-lg-6 {
  position: relative;
  padding-right: 15px;
  padding-left: 15px;
  justify-content: center;
}
h1 {
  margin-top: 20px;
  font-family:'Noto Sans KR', sans-serif;
  font-weight:600;
  font-size: 3rem;
}

.h3, h3 {
  margin-top: 30px;
  font-family: "Archivo Narrow", sans-serif;
  font-family:'Noto Sans KR', sans-serif;
  font-weight:580;
}
</style>