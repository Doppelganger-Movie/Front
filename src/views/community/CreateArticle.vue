<template>
  <div class="board">
    <div class="container text-center mt-10">
      <h1>게시판 등록</h1>
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
          <b-button variant="outline-dark float-left" style="font-weight:600;" @click="Back">목록</b-button>
          <b-button variant="outline-dark float-right" style="font-weight:600;" @click="createArticle">작성</b-button>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'CreateArticle',
  data: function () {
    return {
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
    createArticle: function () {
      axios({
        method: 'post',
        url: `${SERVER_URL}/community/articles/`,
        data: {
          title: this.title,
          content: this.content,
        },
        headers: this.setHeader()
      })
      .then(() => {
        alert('게시글이 등록되었습니다.')
        this.$router.push({name:'ArticleList'})
      })
      .catch(() => {
        // console.log(err.data)
      })
    },
    Back () {
      this.$router.push({name:'ArticleList'})
    }
  }
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

.CreateForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.board {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family:'Noto Sans KR', sans-serif;
  font-weight:600;
}
.container {
  width: 750px;
}
.tbAdd {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 700px
}

</style>