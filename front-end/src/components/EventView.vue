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

* {
    /* border: 1px dotted red; */
}
* {
    color: white;
}

#root {
    width: 355px;
    margin: 0 auto;
    background-color: rgba(255, 166, 0, 0.5);
    padding: 5px;
    border-radius: 10px;
}

.name {
    width: 345px;
    margin: 0 auto;
    background: rgba(131, 255, 135, 0.5);
    border-radius: 10px;
}
.link {
    text-decoration: none;
    padding: 10px 0;
    margin: 0;
    background-color: lightgray;
    display: block;
    margin: 4px auto;
    width: 345px;
    color: white;

    background-color: rgba(50, 186, 77, 0.8);
    border-radius: 3px;

}
.link:hover {
    background-color: rgb(55, 184, 81);
    color: white;
    
}
.date {
    text-align: left;
    width: 325px;
    margin: 0 auto;
}
.address {
    text-align: left;
    width: 325px;
    margin: 0 auto;
}
.event {
    padding: 5px;
    /* border: 1px solid red; */
}
.description {
    text-align: left;
    margin: 0 auto;
    width: 338px;
}

.image {
    width: 90%;
    border-radius: 3px;
}

</style>