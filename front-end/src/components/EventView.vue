<template>
<div id='root'>
    <div v-if="event" class='event'>
        <h1 class='name'>
            {{event.name}}
        </h1>
        <h2 class='date'>
            <i>
                {{event.date}}
            </i>
        </h2>
        <h3 class='address'>
            <i>
                {{event.address}}
            </i>
        </h3>
        <img :src="photoPath" :alt="event.name" v-if="event.photo" class='image'>
        <p class='description'>
            &nbsp;&nbsp;&nbsp;&nbsp;{{event.description}}
        </p>
        <div>
            <a :href="event.link" class='link'>
                Get Tickets
            </a>
        </div>
    </div>
    <div v-else>
        {{this.message}}
    </div>
</div>
</template>


<script>
import axios from 'axios';

export default {
    name: 'event-view',
    props: {
        event: Object
    },
    data() {
        return {
            photoPath: '',
            message: '',
        }
    },
    async created() {
        await this.updatePhotoPath();
    },
    methods: {
        async updatePhotoPath(){
            try{
                const photo = await axios.get(`/api/photos/${this.event.photo}`);
                this.photoPath = photo.data.path;
            }catch(err){
                this.message = 'No event selected.';
            }
        }
    },
    watch: {
        async event() {
            await this.updatePhotoPath();
        }
    }
}

</script>


<style scoped>

#root {
    width: 360px;
    margin: 0 auto;
}

.name {
    width: 350px;
    margin: 0 auto;
    background: rgba(131, 131, 255, 0.2);
    border-radius: 10px;
}
.link {
    text-decoration: none;
    padding: 10px 0;
    background-color: lightgray;
    display: block;
    margin: 4px auto;
    width: 350px;

    color: black;
}
.date {
    text-align: left;
    width: 330px;
    margin: 0 auto;
}
.address {
    text-align: left;
    width: 330px;
    margin: 0 auto;
}
.event {
    padding: 5px;
    /* border: 1px solid red; */
}
.description {
    text-align: left;
    margin: 0 auto;
    width: 350px;
}

.image {
    width: 90%;
    border-radius: 3px;
}

</style>