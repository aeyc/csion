const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://mehmetsan:Northern61@clustermehmet-aio9p.mongodb.net/Personality', {
    useNewUrlParser: true
});

const Schema = mongoose.Schema;
let RelationshipQuestionSchema = new Schema({
    question: String,
    score: String,
    questionId: String
});

module.exports = mongoose.model('RelationshipQuestion', RelationshipQuestionSchema,"RelationshipQuestions");
