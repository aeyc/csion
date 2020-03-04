const Personality = require("../model/Personality");
const NormalQuestion = require("../model/NormalQuestions");


//getPersonalityType('Di');



function getPersonalityType(type) {
    Personality.find({type: type}, (err, personality) => {
        if (err) throw err;
        console.log(personality);
    });
}




//createNormalQuestion(null,null,null,null,null,null, null, null, false);

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


function updatePersonality(type,tends, strengths,weaknesses,growths,motivations,stresses,positiveCareer,negativeCareer,jobs,positiveFriendship,negativeFriendship,positiveRelationship,negativeRelationship,keywords) {

    Personality.update({ type: type  }, { tends: tends, strengths: strengths,
    weaknesses: weaknesses, growths: growths, motivations: motivations,
    Stresses: stresses, positiveCareer: positiveCareer, negativeCareer: negativeCareer,
    jobs: jobs, positiveFriendship: positiveFriendship,  negativeFriendship: negativeFriendship,
    positiveRelationship: positiveRelationship, negativeRelationship: negativeRelationship, keywords: keywords})
        .exec(function(err, personality) {
            console.log(personality);
        });

}

let type = "D";
let tends = ['Pursuing goals', 'Resourceful', 'Competition', 'High Expectations','Debate','Resist Influence'];
let strengths = ['Communicate Directly', 'Realistic Expectations', 'Conclusive','Goal Oriented','Urgency', 'Motivating Others','Directing Others','Control'];
let weaknesses = ['Teamwork' , 'Omitting Details', 'Displaying Impatience', 'Criticize Others', 'Aggressive'];
let growths = [];
let motivations = [];
let stresses = [];
let positiveCareer = [];
let negativeCareer = [];
let jobs = [];
let positiveFriendship = [];
let negativeFriendship = [];
let positiveRelationship = [];
let negativeRelationship = [];
let keywords = [];


updatePersonality(type,tends,strengths,weaknesses,growths,motivations,stresses,positiveCareer,negativeCareer,jobs,positiveFriendship,
    negativeFriendship,positiveRelationship,negativeRelationship,keywords);





