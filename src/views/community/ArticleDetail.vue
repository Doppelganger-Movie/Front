<template>
  <div class="board">
    <div class="container text-center mt-10">
      <h1>게시판 상세보기</h1>
        <div class="Addwrap text-center mx-auto mt-5">
            <table class="tbAdd">
              <colgroup>
                <col width="15%" />
                <col width="*" />
              </colgroup>
              <tr>
                <th>글 제목</th>
                <td>{{ article.title }}</td>
              </tr>
              <tr>
                <th>작성자</th>
                <td>{{ article.username }}</td>
              </tr>
              <tr>
                <th>내용</th>
                <td class="txt_cont" v-html="cont"></td>
              </tr>
              <tr>
                <th>생성시간</th>
                <td>{{ article.created_at|moment('YYYY-MM-DD HH:mm') }}</td>
              </tr>
              <tr>
                <th>수정시간</th>
                <td>{{ article.updated_at|moment('YYYY-MM-DD HH:mm') }}</td>
              </tr>
            </table>
            <div>
              <b-button variant="outline-secondary float-left" class="mt-3" @click="Back">목록 보기</b-button>
              <b-button variant="outline-secondary float-right" class="mt-3" @click="deleteArticle">삭제</b-button>
              <b-button variant="outline-secondary float-right" class="mt-3" @click="moveToUpdateArticle(article)">수정</b-button>
            </div>
        </div>
        <div v-if="article">
        <div class="mx-auto commentWrap">
            <div class="input-group mt-10 mb-10">
              <textarea class="form-control" placeholder="댓글 쓰기" v-model="content" id="comment"></textarea>
              <b-button variant="outline-secondary float-bottom" type="button" @click="createComment">등록</b-button>
            </div>
          <h1 v-if="blank"><hr>아직 댓글이 없어요!</h1>
          <div v-else v-for="(comment, idx) in comments" :key="idx">
            <div v-if="comment_num === comment.id">
              <div v-if="update_state">
                <hr><h3>댓글 수정 중</h3>
                <div class="input-group mt-3 mb-10">
                  <textarea class="form-control" v-model="update_content" id="comment-update"></textarea>
                  <b-button variant="outline-secondary float-bottom" type="button" @click="updateComment">수정</b-button>
                </div>
              </div>
              <div v-else>
                <table class="tbAdd row">
                  <tr>
                    <th col width="10%">{{ comment.username }}</th>
                    <td class="comment_cont">{{ comment.content }}</td>
                  </tr>
                </table>
                <div class="row">
                  <caption class="text-lefts">{{comment.updated_at|moment('YYYY-MM-DD HH:mm') }}</caption>
                </div>
                <div class="btn-group float-right mt-0 mb-2" >
                  <b-button variant="outline-secondary" @click="ActivateUpdate(comment)">수정</b-button>
                  <b-button variant="outline-secondary" @click="deleteComment(comment)">삭제</b-button>
                </div>
              </div>
            </div>
            <div v-else>
              <table class="tbAdd row">
                  <tr>
                    <th col width="10%">{{ comment.username }}</th>
                    <td class="comment_cont">{{ comment.content }}</td>
                  </tr>
                </table>
                <div class="row">
                  <caption class="text-lefts">{{comment.updated_at|moment('YYYY-MM-DD HH:mm') }}</caption>
                </div>
                <div class="btn-group float-right mt-0 mb-2" >
                  <b-button variant="outline-secondary" @click="ActivateUpdate(comment)">수정</b-button>
                  <b-button variant="outline-secondary" @click="deleteComment(comment)">삭제</b-button>
                </div>
            </div>
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
  name:'ArticleDetail',
  data: function() {
    return {
      article : null,
      num : this.$route.params.article_num,
      comments : null,
      content : null,
      cont: null,
      update_content: null,
      update_state:false,
      comment_num: null,
      blank:false,
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
    // ------- DeleteComment---------// 
    deleteComment: function(comment) {
      this.comment_num = comment.id
      axios({
        method: 'delete',
        url:`${SERVER_URL}/community/articles/${this.num}/comments/${this.comment_num}/`,
        headers: this.setHeader()
      })
      .then(() => {
        console.log(`${this.comment_num}번 댓글 삭제 완료`)
        this.getComments()
      })
      .catch(err => {
        console.log(err.response)
        if (err.response.status === 403) {
        alert('작성자가 아닙니다.')} 
      })
    },

    // ------- UpdateComment---------// 
    updateComment: function() {
      axios({
        method: 'put',
        url:`${SERVER_URL}/community/articles/${this.num}/comments/${this.comment_num}/`,
        data: {
          content:this.update_content
        },
        headers: this.setHeader()
      })
      .then(() => {
        console.log(`${this.comment_num}번 댓글 수정 완료`)
        this.update_state=false
        this.update_content = null
        this.getComments()
      })
      .catch(err => {
        console.log(err.response)
        if (err.response.status === 403) {
        alert('작성자가 아닙니다.')} 
        this.update_state=false
        this.update_content=null
        this.getComments()
      })
    },
    ActivateUpdate: function(comment) {
      if (comment.user === this.userId){
      this.update_state = true
      this.update_content = comment.content
      this.comment_num = comment.id
      } else {
        alert('작성자가 아닙니다.')
      }
    },
    // ------- CreateComment---------// 
    createComment: function() {
      axios({
        method: 'post',
        url:`${SERVER_URL}/community/articles/${this.num}/comments/`,
        data: {
          content: this.content
        },
        headers: this.setHeader()
      })
      .then(() => {
        console.log('댓글 생성 완료')
        this.content = null
        this.getComments()
      })
      .catch(err => {
        console.log(err)
      })
    },
    // ------- ReadComments---------// 
    getComments: function() {
      axios({
        method: 'get',
        url:`${SERVER_URL}/community/articles/${this.num}/comments`,
        headers: this.setHeader()
      })
      .then(res => {
        this.blank = false
        this.comments = res.data
      })
      .catch(err => {
        console.log(err.response)
        if (err.response.status === 404) {
        this.blank = true
        }
      })
    },
    // ------- ReadArticleDetail---------// 
    getArticle: function () {
      axios({
        method: 'get',
        url:`${SERVER_URL}/community/articles/${this.num}/`,
        headers: this.setHeader()
      })
      .then(res => {
        console.log(res.data)
        this.article = res.data
        this.cont = this.article.content
      })
      .catch(err => {
        console.log(err)
      })
    },
    // ------- DeleteArticle---------// 
    deleteArticle: function () {
      axios({
        method: 'delete',
        url: `${SERVER_URL}/community/articles/${this.num}/`,
        headers: this.setHeader()
      })
      .then(() => {
        console.log(`${this.num}번째 글 delete`)
        this.$router.push({name:'ArticleList'})
      })
      .catch(err => {
        console.log(err.response)
        if (err.response.status === 403) {
        alert('작성자가 아닙니다.')} 
      })
    },
    // ------- UpdateArticle---------// 
    moveToUpdateArticle: function(article) {
      if (article.user === this.userId){
      this.$router.push({name:'UpdateArticle', params:{article_num:this.num}}) }
      else {
        alert('작성자가 아닙니다.')
      }
    }
  },
  created: function () {
    this.getArticle(),
    this.getComments()
  },
  computed: {
    userId : function () {
      const userId = this.$store.state.UserId
      return userId
    }
  }

}
</script>

<style scoped>
.tbAdd{border-top:1px solid #888;}
.tbAdd th, .tbAdd td{border-bottom:1px solid #eee; padding:5px 0; }
.tbAdd td{padding:10px 10px; box-sizing:border-box; text-align:left;} 
.tbAdd td.txt_cont{height:300px; vertical-align:top;}
.tbAdd td.comment_cont{height: 100px; width:500px; vertical-align:middle;}

button {
  margin-left: 1px;
  margin-right: 1px;
}
input {
  border: 1px solid black;
}
.board {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.tbAdd {
  justify-content: center;
}
.Addwrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 700px;
}
.commentWrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 600px;
}
</style>
