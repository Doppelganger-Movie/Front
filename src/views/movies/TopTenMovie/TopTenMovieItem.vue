<template>
<div>
  
</div>
</template>

<script>
export default {
 name: 'TopTenMovieItem',
 props: {
    movie:Object
 },
 methods: {
   moveToMovieDetail: function () {
     this.$router.push({name: 'MovieDetail', params: {'movie_num':this.movie.id}})

    },
 },
  computed: {
    // posterPath () {
    //   const poster_url = 'https://image.tmdb.org/t/p/w300/' + this.movies.poster_path
    //   return poster_url
    // }
  }
}
</script>

<style>

</style>