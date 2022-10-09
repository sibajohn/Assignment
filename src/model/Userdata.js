const mongoose = require('mongoose');
// const dotenv=require('dotenv');
// dotenv.config();
//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Library');
const mongoDbServer = process.env.MONGODB_URI || 'mongodb://localhost:27017/Library';
mongoose.connect(mongoDbServer,{useNewUrlParser:true,useUnifiedTopology:true});
//mongoose.connect('mongodb://localhost:27017/Library');
const Schema = mongoose.Schema;


var UserSchema = new Schema({
    firstname : String,
    lastname: String,
    email: {
        type:String,
        unique: true,
        index: true
    },
    password: String
});

var Userdata = mongoose.model('userdatas',UserSchema);

module.exports = Userdata;