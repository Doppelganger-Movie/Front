<template>
  <v-app>
    <Header :isLogin="isLogin" @logout="logout" />
      <router-view @login="setLogin"/>
    <!-- <Footer/> -->
  </v-app>
</template>
<script>
import Header from '@/Header.vue'
// import Footer from '@/Footer.vue'
import jwt_decode from "jwt-decode"

export default {
  name: 'App',
  data: function () {
    return {
      isLogin: false,
    }
  },
  components: {
    Header,
    // Footer,
  },
  methods: {
    setLogin: function () {
      this.isLogin = true
    },
    logout: function () {
      localStorage.removeItem('JWT')
      this.$store.
      this.isLogin = false
      console.log('로그아웃됐으니 로그인으로 이동한다')
      this.$router.push({ name: 'Login' })
    }
  },
  created: function () {
    if (localStorage.getItem('JWT')) {
      console.log('created!-> isLogin=True')
      this.isLogin = true
      var token = localStorage.getItem('JWT')
      var decoded = jwt_decode(token);
      var userId = decoded.user_id
      this.$store.dispatch('saveUserId', userId)
      console.log(userId)
    } else {
      alert('로그인을 해주세요')
      this.$router.push({ name: 'Login' }).catch(() => {})
      // if (this.$route.name !=='Login') {this.$router.push({ name: 'Login' })}
    }
  }  
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');

#app {
  font-family: 'Montserrat', sans-serif;
}

</style>
