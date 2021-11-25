<template>
 <header>
	 	<nav class="navbar navbar-dark bg-black">
			<h1><a href="#" class="logo"><img alt="logo" src="@/assets/logo.png" width="200" @click="MoveToMain"></a></h1>
  	<!-- Navbar content -->
			<div class="menuWrap">
				<ul v-if="isLogin" class="menu">
				<!-- <router-link :to="{ name: 'MovieList' }">Movie</router-link> | -->
				<router-link :to="{ name: 'ArticleList' }"><button class="text-white" id="menuBtn">Community</button></router-link>
				<router-link :to="{ name: 'Profile' }"><button class="text-white" id="menuBtn">Profile</button></router-link>
				<router-link :to="{ name: 'Doppleganger' }"><button class="text-white" id="menuBtn">Doppleganger</button></router-link>
				<router-link @click.native="logout" :to="{ name: 'Main' }"><button class="text-white" id="menuBtn">Log Out</button></router-link>
				</ul>
				<ul v-else class="menu">
				<router-link :to="{ name: 'Signup' }"><button class="text-white" id="menuBtn">Signup</button></router-link>
				<router-link :to="{ name: 'Login' }"><button class="text-white" id="menuBtn">Login</button></router-link>
				</ul>
			</div>
		</nav>
  </header>
</template>

<script>
export default {
	name: 'Header',
	props: {
		isLogin:Boolean
	},
	methods: {
		logout: function () {
			this.$emit('logout')
		},
		MoveToMain: function() {
			this.$router.push({ name: 'Main' })
		}
	}

}
</script>

<style scoped>
/* header{width:100%; text-align:center; position:relative; height:120px; border-bottom:1px solid #35495e}
header h1{position:absolute; top:0; left:100px;}
header ul.menu:after{display:block; clear:both; content:'';}
header ul.menu{position:absolute; top:20px; right:50px;}
header ul.menu li{float:left; padding:10px 20px; list-style:none;}

a{text-decoration:none; color:#333;} */
.navbar {
	padding: 0 1rem;
	display:flex;
	align-items: center;
}
.menuWrap {
	padding-top:1rem;
	display:flex;
	align-items: center;
}
nav li:hover,
nav li:active{
	background-color: white;
	cursor: pointer;
}
#menuBtn {
	margin:0 0.5rem;
}
.logo {
	margin-left: 1rem;
	margin-top: 1rem;
}


</style>