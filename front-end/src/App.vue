<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Music</router-link> |
      <router-link to="/events">Events</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');
* {
    margin: 0;
    font-family: 'Raleway', sans-serif;
}
/* * {
    border: 1px dotted red;
} */
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    /* border: 1px solid red; */
    /* height: 100vh; */

    background-image: url('~@/assets/concert.jpg');
    background-size: cover;
    background-position: left;
    background-attachment: fixed;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}


</style>
