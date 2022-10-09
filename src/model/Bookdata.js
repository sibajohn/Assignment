const mongoose = require('mongoose');
// const dotenv=require('dotenv');
// dotenv.config();
//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Library');
//mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true,useUnifiedTopology:true});
//mongoose.connect('mongodb://localhost:27017/Library');
const mongoDbServer = process.env.MONGODB_URI || 'mongodb://localhost:27017/Library';
mongoose.connect(mongoDbServer,{useNewUrlParser:true,useUnifiedTopology:true});
const Schema = mongoose.Schema;


var BookSchema = new Schema({
    title : String,
    author: String,
    image: String,
    about: String
});

var Bookdata = mongoose.model('bookdatas',BookSchema);

module.exports = Bookdata;