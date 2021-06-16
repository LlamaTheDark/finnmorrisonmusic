const express = require('express');
const mongoose = require('mongoose');
const argon2 = require('argon2');

const router = express.Router();

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'admin',
    },
    password: String,
});

adminSchema.pre('save', async function(next) {
    if(!this.isModified('password'))
        return next();
    try {
        const hash = await argon2.hash(this.password);

        this.password = hash;
        next();
    } catch(error) {
        console.log(error);
        next(error);
    }
});

// we can also add methods to our schema as we will below. We'll make one called comparePassword
adminSchema.methods.comparePassword = async function(password) {
    try{
        // note that we supply the hash stored in the database (first argument of verify(p1, p2))
        // and the plaintext password. Again, argon2 will do the hashing and salting and comparison for us.
        const isMatch = await argon2.verify(this.password, password);
        return isMatch;
    } catch(error) {
        return false;
    }
}

// this function is called whenever we convert a user object to JSON. It deletes the password hash from the object.
// This way we never send our password hashes over the API.
adminSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
}

const Admin = mongoose.model('Admin', adminSchema);

const admin = async (req, res, next) => {
    if(!req.session.admin)
        return res.sendStatus(403);
    try{
        const admin = await Admin.findOne({});
        if(!admin){
            return res.sendStatus(500);
        }
        
        req.admin = admin;
    }catch(err){
        return res.sendStatus(403);
    }

    next();
};

// create admin password (can only be done through a curl cmd)
router.post('/create', async (req, res) => {
    if(!req.body.password)
        return res.sendStatus(400);
    try{
        const admin = new Admin({
            password: req.body.password
        })
        await admin.save();
        return res.sendStatus(200);
    }catch(err){
        console.log('big penis man');
        console.log(err);
        return res.sendStatus(500);
    }
});

// login to admin
router.post('/', async (req, res) => {
    try{
        if(req.session.admin){
            return res.send({
                admin: true
            });
        }
        if(!req.body.password)
            return res.status(403).send({
                message: 'no user logged in'
            });
        const admin = await Admin.findOne({});
        if(!admin){
            return res.status(500).send({
                message: 'you done messed up big time'
            });
        }
        if(!await admin.comparePassword(req.body.password)){
            return res.status(403).send({
                message: 'incorrect password'
            });
        }
        
        req.session.admin = true;

        return res.send({
            admin: true
        });

    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
});

module.exports = {
    routes: router,
    admin: admin,
}