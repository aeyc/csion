const Personality = require("../model/Personality");



    Personality.find({type: 'ISTP'}, (err, kullanicilar) => {
        if (err) throw err;
        console.log(kullanicilar);
    });





