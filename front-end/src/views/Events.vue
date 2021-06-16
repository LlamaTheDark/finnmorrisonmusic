<template>
    <div id='page'>
        <h1> See Finn Morrison Live </h1>
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

* {
    margin:8px
}

#page {
    margin: 0 auto;
    width: 70%;
    padding: 50px;
    /* border: 1px solid red; */
}

.separator {
    width: 50%;
    margin: 20px auto;
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