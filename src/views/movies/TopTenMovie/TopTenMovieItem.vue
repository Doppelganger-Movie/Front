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
}
</script>

<style>

</style>