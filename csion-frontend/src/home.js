if ((window.innerWidth < window.innerHeight )) { 
    $('.categoryButton').css({"width": "70%"});
    $('.subcategoryButton').css({"width": "90%"});
    $('.navbar a').css({ "padding-top": "5%", "padding-bottom": "5%"});
    $('.backButton').css({"width": "30%"});
}

$('#career').click(() => {
    $('#categories').hide();
    $('#careerSub').show();
    $('.backButton').show();
});

$('#relation').click(() => {
    $('#categories').hide();
    $('#relationshipSub').show();
    $('.backButton').show();
});

$('#education').click(() => {
    $('#categories').hide();
    $('#educationSub').show();
    $('.backButton').show();
});

$('#back1').click(() => {
    $('#back1').hide();
    $('#educationSub').hide();
    $('#relationshipSub').hide();
    $('#careerSub').hide();
    $('#categories').show();
});


$('.subcategoryButton').click(() => {
    get("http://localhost:3000/getQuestions/"+ $(this).attr('id'), (data) => {
        //data should be array of strings
        console.log(data);
        //we should keep array of yes/no answers

        //post answers to backend and get decision, show decision to user

        
    });

});