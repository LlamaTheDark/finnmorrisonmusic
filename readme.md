
# Finn Morrison Music
See the website live at [finnmorrisonmusic.com](https://finnmorrisonmusic.com).

## Overview
Web app developed for the assistance of Finn Morrison's music career. Provides a centralized location for people to access his music, see and get tickets for his upcoming events, as well as (*not yet available*) buy merch like stickers or t shirts or something.

## Front-End
I used **Vue** for the creation and organization of the front end. It (currently) consists of 4 pages:
* Home.vue
* Events.vue
* Music.vue
* Admin.vue

### Administration
The admin page is used to edit event information and is locked behind an administrative password which is stored in a **mongo** database after being salted and hashed. To be clear, the password itself is not stored; only the result of the hash function whose input is the salted plaintext password.

The admin page itself consist of a dropdown menu listing all the events and 'new event'. When an event or 'new event' is selected, various input fields are populated with data regarding the event (such as *name*, *description*, *link to tickets*, etc...). This data can be changed and then saved via the 'save event' button. An event, when selected, can be deleted via the 'delete event' button. Saving an event when the event selected is 'new event' will create and store a new event in the mongo database collection 'events'.

There are no buttons to access the admin page, you just have to append `/admin` to the end of the homepage url. *e.g.* `https://finnmorrisonmusic.com/admin` and you'll be able to log in from there (if you are an administrator, of course).

### Accessing the back end
To make calls to the back-end's API endpoints, I used **axios**.

## Back-End
I used the following libraries:
* **mongoose** to access and manage a mongodb database.
* **express** to manage the creation of a back-end server that can receive endpoint calls and communicate with the front end.
* **multer** to manage the uploading and storing of photos associated with events.
* **fs** to delete photos when they are no longer needed (i.e. when deleting a photo's associated event).
* **argon2** to handle salting and hashing passwords.
* **cookie-parser** and **cookie-session** to handle cookie and session creation to allow for a more user-friendly experience for administration.

### Files
|file name|purpose|
|---------|-------|
|server.js|sets up the express server and links the routes/endpoints from other modules to the main app.|
|events.js|manages endpoints related to events.|
|photos.js|manages endpoints related to uploading and deleting photos.|
|admin.js |manages administrative priveledges and provides middleware for validating client administrative authority|

### Database Schema
Various schema were created to store data on the mongo database. The photos and admin schema are quite simple.

The **admin** schema has capability to store a name in case I decided to add that functionality later, but as of now there is no way accessible by the front end to have a name or username. I didn't think it was necessary because for now there needn't be more than one admin account/password. There isn't a way to change or create a password via the front end either. I just launch the server and database and then create a password via a **cURL** call. The admin schema is the following:
```js
const adminSchema = new mongoose.Schema({
    name: {
            type: String,
            default: 'admin',
    },
    password: String,
});
```

The **photo** schema is as follows:
```js

const photoSchema = new mongoose.Schema({
    path: String,
});
```

Finally, the **events** schema, the most robust of the 3, is the following:
```js
const eventSchema = new mongoose.Schema({
    name: String,
    date: String,
    photo: {
        type: mongoose.Schema.ObjectId,
        ref: 'Photo'
    },
    description: String,
    link: String, // link to more info
    address: String,
    created: { // for sorting purposes, won't be displayed
        type: Date,
        default: Date.now
    }
});
```

As you can see, the event schema contains an `ObjectId` / reference to a photo object, as well as the date of creation so that the events can be shown in order of recency (or the event most soon to be coming up). I may very well change the organization date to be listed in order of the date of the actual event, but for now it will function much like a blog - the events will be listed in order of creation.

### Nodejs and NPM
I used NPM to handle module installations and Node.js to interpret and execute teh server files.

