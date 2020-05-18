const EducationQuestion = require("../model/EducationQuestion");
const EducationProblem = require("../model/EducationProblem");
const Personality = require("../model/Personality");
const User = require("../model/User");



//addUser("selim", "özcan","selo","selo123","selo@selo.com","23");
function addUser(name, surname, username, password, email, age) {
    let newUser = new User({
        name: name,
        surname: surname,
        username: username,
        password: password,
        email: email,
        age: age
    });

    newUser.save((err, user) => {
        if (err) throw err;
        console.log(user);
    })
}

//getPersonalityType('Di');
function getPersonalityType(type) {
    Personality.find({type: type}, (err, personality) => {
        if (err) throw err;
        console.log(personality);
    });
}

//getUser("selo","selo123");
function getUser(username, password) {
    User.find( {username: username , password: password},(err, user) => {
        if (err) throw err;
        console.log(user);
    });
}

/*
let user = {};
user._id = "5ec1ab7e0018c41acc9e4023";
setPersonalityType(user, "Di")*/
function setPersonalityType(user, type) {
    User.findOneAndUpdate({_id: user._id}, {personalityType: type}, function(err, type) {
        if (err) throw err;
        console.log(type);
    })
}









