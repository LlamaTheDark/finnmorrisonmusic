<template>
    <div>
        <div v-if="!admin">
            <label for='admin'>Enter admin password: </label>
            <input type='password' v-model="password">
            <button id='login' @click="handleLogin">login</button>
            <div v-if="message != ''">
                {{message}}
            </div>
        </div>
        <div id='page' v-else>
            <div id='admin-view'>
                <div id='editor'>
                    <h1 class='title'>
                        Editor
                    </h1>
                    <label for='events'>Choose an event to edit, or create a new one: </label>
                    <select v-model="eventName" name='events' id='events'>
                        <option>New Event</option>
                        <option v-for="event in events" :key="event._id">{{event.name}}</option>
                    </select>

                    <form id='form'>
                        <label for='fname'>Name: </label>
                        <input type='text' id='fname' v-model="name">
                        <label for='fdate'>Date: </label>
                        <input type='text' id='fdate' v-model="date">
                        <label for='faddress'>Address: </label>
                        <input type='text' id='faddress' v-model="address">
                        <label for='fdescription'>Description: </label>
                        <textarea id='fdescription' v-model="description"></textarea>
                        <label for='flink'>Link: </label>
                        <input type='text' id='flink' v-model="link">

                        <label for='fileInput'>Upload an Image</label>    
                        <input class="fileInput" ref="fileInput" type="file" @input="fileChanged">
                    </form>

                    <div id='buttons'>
                        <button id='save-btn' @click="handleSaveEvent">save event</button>
                        <button id='delete-btn' @click="handleDeleteEvent" v-if="eventName != 'New Event' && eventName != ''">delete event</button>
                    </div>
                </div>
                <div class='separator'></div>
                <div id='preview'>
                    <h1 class='title'>
                        Preview 
                    </h1>
                    <EventView :event="event" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EventView from '@/components/EventView.vue';
import axios from 'axios';

export default {
    name: 'admin',
    components: {
        EventView,
    },
    data() {
        return {
            admin: false,
            password: '',

            message: '',
            eventName: '',
            event: null,
            events: null,

            // for editing
            name: '',
            date: '',
            imagesrc: '',
            description: '',
            link: '',
            address: '',

            file: null,
            url: '',
        }
    },
    async created() {
        await this.handleLogin();
        await this.refreshEvents();
    },
    methods: {
        fileChanged(event){
            this.file = event.target.files[0];
            this.url = URL.createObjectURL(this.file);
        },
        async uploadPhoto() {
            try{
                const formData = new FormData();
                formData.append('photo', this.file, this.file.name);
                const response = await axios.post(`/api/photos`, formData);
                console.log(response);
                return response.data._id;
            }catch(err){
                // this.message = 'Error: ' + err.response.data.message;
                console.log(err);
            }
        },
        async handleLogin() {
            this.message = '';
            try{
                const result = await axios.post(`/api/admin/`, {password: this.password});
                this.admin = result.data.admin;
            }catch(err){
                this.message = err.response.data.message;
            }
            
        },
        async refreshEvents() {
            try{
                this.event = null;
                this.eventName = 'New Event';
                const response = await axios.get(`/api/events/`);
                this.events = response.data.events;
            }catch(err){
                console.log(err);
                this.message = err.message;
            }
            this.clearInput();
        },
        async handleSaveEvent() {
            if(this.eventName === '')
                return;
            var photo;
            if(this.file != null){
                photo = await this.uploadPhoto();
            }else{
                photo = '';
            }
            const event = {
                name: this.name,
                date: this.date,
                photo: photo,
                description: this.description,
                link: this.link,
                address: this.address,
            };
            try{
                if(this.eventName === "New Event"){
                    await axios.post(`/api/events/`, event);
                }else{
                    await axios.put(`/api/events/${this.event._id}`, event);
                }
            }catch(err){
                console.log(err);
                this.message = err.message;
            }
            await this.refreshEvents();
        },
        async handleDeleteEvent() {
            try{
                await axios.delete(`/api/events/${this.event._id}`);
                await axios.delete(`/api/photos/${this.event.photo}`);
                await this.refreshEvents();
            }catch(err){
                console.log(err);
            }
        },
        clearInput() {
            this.name = '';
            this.date = '';
            this.description = '';
            this.link = '';
            this.address = '';
        }
    },
    watch: {
        eventName (val) {
            if(val === "New Event"){
                this.clearInput();
            }else{
                this.event = this.events.find(event => event.name === val);

                this.name = this.event.name;
                this.date = this.event.date;
                this.description = this.event.description;
                this.link = this.event.link;
                this.address = this.event.address;
                this.file = null;
                this.url = null;
            }
        }
    }
}
</script>

<style scoped>

* {
    margin: 8px;
}

#page {
    /* border: 4px solid green; */
    height: 1000px;
}


#login {
    margin: 10px;
    padding: 3px 8px;
}

.separator {
    height: 700px;
    color: black;
    background-color: black;
    width: 1px;
    margin: 10px;
}

#admin-view {
    display: flex;
    justify-content: space-around;
    margin: 0 8px;
    
}

#editor {
    width: 40%;
    background-color: rgb(230, 230, 230); 

}
#preview {
    width: 40%;
}

.title {
    text-decoration: underline;
    background-color: rgb(230, 230, 230); 
    
    border-radius: 5px;
}

#form {
    background-color: rgba(211, 211, 211, 0.542);
    border-radius: 5px;
    display: flex;
    flex-direction: column;

    text-align: left;
}

#form label {
    margin-top: 10px;
}

textarea {
    resize: none;
}

#buttons {
    display: flex;
    padding: 10px;
    justify-content: space-between;
}
#delete-btn {
    background-color: rgb(255, 137, 137);
}
#save-btn {
    background-color: rgb(145, 255, 145);
}

</style>