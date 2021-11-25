<template>
  <div class="board">
    <section class="container row justify-content-center mt-10">
     
      <h1>게시판</h1>
        <div class="wrap">
          <table class="table">
            <thead>
              <tr>
                <th col width="10%">no</th>
                <th col width="*">글 제목</th>
                <th col width="15%">아이디</th>
                <th col width="20%">작성일</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(article, idx) in articles" :key="idx">
                <td>{{ idx+1 }}</td>
                <td><article-item :article="article">{{ article.title }}</article-item></td>
                <td>{{ article.username }}</td>
                <td>{{ article.created_at|moment('YYYY-MM-DD') }}</td>
              </tr>
            </tbody>
          </table>
          <b-button variant="dark float-right" style="font-weight:600;" class="mt-3" @click="moveToCreateArticle">글쓰기</b-button>
          
        </div>
    </section>
  </div>
</template>

<script>
import ArticleItem from '@/views/community/ArticleItem.vue'
import axios from 'axios'
const SERVER_URL = process.env.VUE_APP_SERVER_URL


export default {
  name: 'ArticleList',
  data: function () {
    return {
      articles: null,
    }
  },
  components: {
    ArticleItem
  },
  methods: {
    myClickedEventhandler() {
    },
    setHeader: function() {
      const token = localStorage.getItem('JWT')
      const header = {
        Authorization : `Bearer ${token}`
      }
      return header
    },
    moveToCreateArticle: function() {
      this.$router.push({name:'CreateArticle'})
    },
    getArticles: function () {
      axios({
        method: 'get',
        url:`${SERVER_URL}/community/articles/`,
        headers: this.setHeader()
      })
      .then(res => {
        console.log(res.data)
        this.articles = res.data
        // console.log('ArticleList 갱신!')
      })
      .catch(err => {
        // console.log(err)
      })
    },
  },
  computed: {
    rows() {
      return this.articles.length
    },
  },
  created: function () {
    this.getArticles()
  },
}
</script>

<style scoped>

h1 {
  text-align: center;
  font-family:'Noto Sans KR', sans-serif;
  font-weight:600;
}
th {
  text-align: center;
  font-family:'Noto Sans KR', sans-serif;
  font-weight:600;
}
tr {
  text-align: center;
  font-family:'Noto Sans KR', sans-serif;
  font-weight:600;
}
.board {
  display: flex;
  align-items:center;
  justify-content: center;
}
.content {
  width: fit-content;
}

</style>