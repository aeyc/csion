const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://mehmetsan:Northern61@clustermehmet-aio9p.mongodb.net/Personality', {
    useNewUrlParser: true
});

const Schema = mongoose.Schema;
let UserSchema = new Schema({
    name: String,
    surname: String,
    username: String,
    password: String,
    email: String,
    age: String,
    personalityType: String
});

module.exports = mongoose.model('User', UserSchema);
