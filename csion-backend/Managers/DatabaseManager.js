const Personality = require("../model/Personality");
const NormalQuestion = require("../model/NormalQuestions");


//getPersonalityType('Di');



function getPersonalityType(type) {
    Personality.find({type: type}, (err, personality) => {
        if (err) throw err;
        console.log(personality);
    });
}




createNormalQuestion(null,null,null,null,null,null, null, null, false);

function createNormalQuestion(question, requiredTags,providedPositiveTags,providedNegativeTags, keywords, score, subject, subSubject, isInitial){
    let Normal =  new NormalQuestion({
        question: question,
        requiredTags: requiredTags,
        providedPositiveTags: providedPositiveTags,
        providedNegativeTags: providedNegativeTags,
        keywords: keywords,
        score: score,
        subject: subject,
        subSubject: subSubject,
        isInitial: isInitial,
    });

    Normal.save((err, result) => {
        if (err) throw err;
        console.log(result);
    });
}






