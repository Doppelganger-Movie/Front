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
          <b-button variant="outline-secondary float-right" class="mt-3" @click="moveToCreateArticle">글쓰기</b-button>
          <!-- <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            align="center"
            class="mt-4"
          ></b-pagination> -->
        </div>
    </section>
  </div>
  <!-- :length="articles.length / 10 +1" -->
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
      currentPage: 1,
      perPage: 10,
    }
  },
  components: {
    ArticleItem
  },
  methods: {
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
        // this.perPage = articles.length / 10 +1,
        console.log('ArticleList 갱신!')
      })
      .catch(err => {
        console.log(err)
      })
    },
  },
  computed: {
    rows() {
      return this.articles.length
    },
    // userId : function () {
    //   const userId = this.$store.state.UserId
    //   return userId
    // },
  },
  created: function () {
    this.getArticles()
  },
}
</script>

<style scoped>
h1 {
  text-align: center;
}
th {
  text-align: center;
}
tr {
  text-align: center;
}
.board {
  display: flex;
  align-items:center;
  justify-content: center;
}
.content {
  width: fit-content;
}
/* .btnRightWrap {
  display: row;
  justify-items: center;
} */
</style>