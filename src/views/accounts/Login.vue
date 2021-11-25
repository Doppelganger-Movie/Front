<template>
  <div>
    <section class="login-area section-padding-100">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-8 col-lg-6">
            <div class="login-content text-center">
              <h1>로그인</h1>
              <h3>Welcome Back</h3>
              <!-- login Form -->
              <form class="row justify-content-center">
                <div class="form-group col-8">
                  <div class="input_row" id="id_line">
                    <b-icon icon="person" font-scale="1.5"></b-icon>
                    <input type="text" id="username" v-model="credentials.username" placeholder="아이디">
                  </div>
                  <div class="input_row mt-4" id="id_line">
                    <b-icon icon="lock" font-scale="1.5"></b-icon>
                    <input type="password" id="password" v-model="credentials.password" placeholder="비밀번호">
                  </div>
                  <b-button variant="outline-secondary" class="mt-5 row justify-content-center" @click="login">로그인</b-button>
                </div>
              </form>
                <router-link :to="{ name: 'Signup' }"><button class="text-blue mt-6" id="menuBtn">회원이 아니시라면 회원가입을 해주세요.</button></router-link>
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
import jwt_decode from "jwt-decode"

export default {
  name: 'Login',
  data: function () {
    return {
      credentials: {
        username: null,
        password: null,
      },
      errMsg: '',
    }
  },
  methods: {
    login: function () {
      axios({
        method: 'post',
        url: `${SERVER_URL}/accounts/api/token/`,
        data: this.credentials
      })
      .then(res => {
        // console.log('로그인됨')
        localStorage.setItem('JWT', res.data.access)
        this.$emit('login')
        // console.log(localStorage.getItem('JWT'))
        var token = localStorage.getItem('JWT')
        var decoded = jwt_decode(token);
        var userId = decoded.user_id
        this.$store.dispatch('saveUserId', userId)
        // console.log(userId)
        this.$router.push({name: 'Main'})
      })
      .catch(err => {
        // console.dir(err.response.data['detail'])
        this.errMsg = err.response.data.detail
        alert('아이디와 비밀번호를 확인해주세요.')
        this.credentials.username = null
        this.credentials.password = null
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
  font-family:'Noto Sans KR', sans-serif;
  font-weight:580;
}
</style>