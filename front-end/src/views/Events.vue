<template>
    <div id='page'>
        <h1>Events List</h1>
        <router-link to='/' class='router-link back-button'>
            Go Back
        </router-link>
        <!-- <hr class='separator'> -->
        <div v-for="event in events" :key="event._id">
            <EventView :event="event" />
            <hr class='separator'>
        </div>
    </div>
</template>


<script>
import EventView from '@/components/EventView';
import axios from 'axios';

export default {
    name: 'events',
    data() {
        return {
            events: null,
        }
    },
    async created() {
        try{
            const response = await axios.get(`/api/events/`);
            this.events = response.data.events;
        }catch(err){
            console.log(err);
            this.message = err.message;
        }
    },
    components: {
        EventView,
    }
}

</script>


<style scoped>

#app {
    background-image: none;
    background-attachment: fixed;
}

h1 {
    color: white;
    background-color: rgba(50, 186, 77, 0.7);
    border-radius: 3px;
    padding: 0 10px;
    margin: 25px 0 10px 0;
}

* {
    margin:8px
}

#page {
    margin: 0 auto;
    width: 50%;
    padding: 50px;
    /* border: 1px solid red; */
    /* border: 1px solid blue; */
    /* background: rgb(94, 94, 94, 0.2); */
}

.separator {
    width: 50%;
    margin: 20px auto;
    color: white;
    padding: 4px;
    background: white;
    border: 1px solid white;
    border-radius: 3px;
}

@media only screen and (max-width: 375px) {
    * {
        margin: 0px;
    }
    #page {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;

        margin: 0 auto;
        /* border: 1px solid blue; */
        padding: 0px;
    }
}

</style>