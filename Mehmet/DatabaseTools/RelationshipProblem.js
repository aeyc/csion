const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://mehmetsan:Northern61@clustermehmet-aio9p.mongodb.net/Personality', {
    useNewUrlParser: true
});

const Schema = mongoose.Schema;
let RelationshipProblemSchema = new Schema({
    category: String,
    subCategory: String,
    problem: String,
    personalQuestions: [String],
    encourage: [String],
    discourage: [String],
});

module.exports = mongoose.model('RelationshipProblem', RelationshipProblemSchema,"RelationshipProblems");
