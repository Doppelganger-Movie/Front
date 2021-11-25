<template>
  <div>
    <a href="" @click="moveToMovieDetail">{{ movie.id }}</a>
  </div>
</template>

<script>
export default {
 name: 'DirectorMovieItem',
 props: {
    movie:Object
 },
 methods: {
   moveToMovieDetail: function () {
     this.$router.push({name: 'MovieDetail', params: {'movie_num':this.movie.id}})

   },
 }
}
</script>

<style>

</style>