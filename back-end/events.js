const express  = require('express' );
const mongoose = require('mongoose');

const router = express.Router();

const admin = require('./admin.js').admin;
const photos = require('./photos.js');
const Photo = photos.model;

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

const Event = mongoose.model('Event', eventSchema);

// ########### //
//  ENDPOINTS  //
// ########### //

// get events
router.get('/', async (req, res) => {
    try{
        const events = await Event.find().sort({
            created: -1
        });
        if(!events){
            return res.status(404).send({
                message: 'There are no upcoming events.'
            });
        }
        return res.send({
            events: events
        });
    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
});

// get specific event
// router.get('/:id', async (req, res) => {
//     try{
//         const event = await Event.findOne({
//             _id: req.params.id
//         });
//         if(!event){
//             return res.sendStatus(404);
//         }
//         return res.send({
//             event: event
//         });
//     }catch(err){
//         console.log(err);
//         return res.sendStatus(500);
//     }
// });

// create an event
router.post('/', admin, async (req, res) => {
    const event = new Event({
        name: req.body.name,
        date: req.body.date,
        photo: req.body.photo,
        description: req.body.description,
        link: req.body.link,
        address: req.body.address,

    });
    try{
        await event.save();
        return res.send({
            event: event
        });
    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
});

// edit an event
router.put('/:id', admin, async (req, res) => {
    try{
        const event = await Event.findOne({
            _id: req.params.id
        });

        event.name = req.body.name;
        event.date = req.body.date;
        event.photo = req.body.photo;
        event.description = req.body.description;
        event.link = req.body.link;
        event.address = req.body.address;

        await event.save();
        return res.send({
            event: event
        });

    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
});

// delete an event
router.delete('/:id', admin, async (req, res) => {
    try{
        await Event.deleteOne({
            _id: req.params.id
        });
        return res.sendStatus(200); 
    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
});

module.exports = {
    routes: router
};