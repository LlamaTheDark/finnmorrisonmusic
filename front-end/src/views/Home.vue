<template>
<div id='page'>
    <h1>
        Finn Morrison
    </h1>
    <router-link to='/music' class='router-link'>
        Latest Music
    </router-link>
    <router-link to='/events' class='router-link'>
        Upcoming Events
    </router-link>
	<!-- <button>
        Shop
    </button> -->
</div>

</template>

<style scoped>

h1 {
    color: white;
    margin: 0 0 15px 0; 
}

#page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.router-link {
    background-color: white;
    width: 20%;
    margin: 10px auto;
    padding: 20px 0;
    border-radius: 10px;
    text-decoration: none;
    color: black;
    font-weight: bold;
}

.router-link:hover {
    border: 3px solid white;
    padding: 17px 0;

    background-color: rgb(255, 255, 255, 0.5);
    color: white;
}

@media only screen and (max-width: 375px){
    .router-link {
        width: 90%;
    }
    .router-link:hover {
        padding: 17px 0;
    }
}



</style>