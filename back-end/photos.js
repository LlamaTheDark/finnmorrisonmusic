const mongoose = require('mongoose');
const express  = require('express' );
const fs = require('fs');

const router   = express.Router();

const multer = require('multer');
const upload = multer({
	dest: '../front-end/public/images',
	limits: {
		fileSize: 50000000
	}
});

const admin = require('./admin.js').admin;

const photoSchema = new mongoose.Schema({
    path: String,
});

const Photo = mongoose.model('Photo', photoSchema);

router.post('/', admin, upload.single('photo'), async (req, res) => {
    if(!req.file)
        return res.status(400).send({
            message: 'must upload a file.'
        });
    const photo = new Photo({
        path: '/images/' + req.file.filename,
    });
    try{
        await photo.save();
        return res.send(photo);
    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try{
        let photo = await Photo.findOne({
            _id: req.params.id
        });
        return res.send(photo);
    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let photo = await Photo.findOne({
            _id: req.params.id
        });

        fs.unlink(`../front-end/public${photo.path}`, (err) => {
            if(err) {
                console.log(err);
                return;
            }
        });

        await Photo.deleteOne({
            _id: req.params.id
        });
        
        return res.sendStatus(200);

    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
});

module.exports = {
    routes: router,
    model: Photo,
}