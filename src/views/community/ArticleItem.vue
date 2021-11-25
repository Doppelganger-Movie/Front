<template>
  <div>
    <a href="" @click="moveToArticleDetail">{{ article.title }}</a>
  </div>
</template>

<script>
export default {
  name:'ArticleItem',
  props: {
    article:Object
  },
  methods: {
    moveToArticleDetail: function() {
      this.$router.push({name:'ArticleDetail', params: {'article_num':this.article.id}})
    },
  }

}
</script>

<style>

</style>