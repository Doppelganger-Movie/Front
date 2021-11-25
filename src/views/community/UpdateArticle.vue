<template>
  <!-- <div class="UpdateForm">
    <h1>게시글 수정</h1>
    <div class="AddWrap">
      <table class="tbAdd">
        <colgroup>
          <col width="15%" />
          <col width="*" />
        </colgroup>
        <tr>
          <th>제목</th>
          <td><input type="text" v-model="title" ref="subject" /></td>
        </tr>
        <tr>
          <th>내용</th>
          <td><textarea v-model="content" ref="cont"></textarea></td>
        </tr>
      </table>
    </div>
		<div class="btnWrap">
			<button @click="Back" class="btn btn-secondary">목록</button>
			<button @click="UpdateArticle" class="btnAdd btn">글 수정</button>
		</div>
  </div> -->
  <div class="board">
    <div class="container text-center mt-10">
      <h1>게시판 수정</h1>
      <div class="AddWrap d-flex justify-content-center mt-10">
        <table class="tbAdd">
          <colgroup>
            <col width="20%" />
            <col width="*" />
          </colgroup>
          <tr>
            <th>제목</th>
            <td><input type="text" v-model="title" ref="subject" /></td>
          </tr>
          <tr>
            <th>내용</th>
            <td><textarea v-model="content" ref="cont"></textarea></td>
          </tr>
        </table>
      </div>
      <div class="mt-5">
        <b-button variant="outline-secondary float-left" @click="Back">목록</b-button>
        <b-button variant="outline-secondary float-right" @click="UpdateArticle">수정</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'UpdateArticle',
  data: function () {
    return {
      article: null,
      num : this.$route.params.article_num,      
      title: null,
      content: null,
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
    Back () {
      this.$router.push({name:'ArticleList'})
    },
    getArticle: function () {
      axios({
        method: 'get',
        url:`${SERVER_URL}/community/articles/${this.num}/`,
        headers: this.setHeader()
      })
      .then(res => {
        this.article = res.data
        this.title = res.data.title
        this.content = res.data.content
      })
      .catch(err => {
        console.log(err)
      })
    },
    UpdateArticle: function () {
      // 4번 문제
      const articleItem = {
        title: this.title,
        content:this.content
      }
      axios({
        method: 'put',
        url:`${SERVER_URL}/community/articles/${this.num}/`,
        data: articleItem,
        headers: this.setHeader()
      })
      .then((res) => {
        console.log('수정 완료')
        console.log(res)
        this.$router.push({name:'ArticleDetail', params:{article_num:this.num}})
      })
      .catch(err => {
        console.log(err.response)
        if (err.response.status === 403) {
        alert('작성자가 아닙니다.')}
        this.$router.push({name:'ArticleDetail', params:{article_num:this.num}})
      })
    },
  },
  created: function() {
    this.getArticle()
  },  
}
</script>

<style scoped>
.tbAdd{border-top:1px solid #888;}
.tbAdd th, .tbAdd td{border-bottom:1px solid #eee; padding:15px 0; padding-left: 10px;}
.tbAdd td{padding:10px 10px; box-sizing:border-box;}
.tbAdd td input{width:630px; min-height:30px; box-sizing:border-box; padding:0 10px;}
.tbAdd td textarea{width:630px; min-height:300px; padding:10px; box-sizing:border-box;}
.btnWrap{text-align:center; margin:20px 0 0 0;}
.btnWrap a{margin:0 10px;}
.UpdateForm {
  display: flex;
  flex-direction: column;
  /* align-items:center; */
  justify-content: center;
  /* margin: 1rem auto; */
}
.board {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.tbAdd {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 700px
}
.container {
  width: 750px;
}
</style>