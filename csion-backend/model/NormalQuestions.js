const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://mehmetsan:Northern61@clustermehmet-aio9p.mongodb.net/Personality', {
    useNewUrlParser: true
});

const Schema = mongoose.Schema;
let NormalQuestionsSchema = new Schema({
    question: String,
    requiredTags: [String],
    providedPositiveTags: [String],
    providedNegativeTags: [String],
    keywords: [String],
    score: String,
    subject: String,
    subSubject: [String],
    isInitial: Boolean
});

module.exports = mongoose.model('NormalQuestion', NormalQuestionsSchema);