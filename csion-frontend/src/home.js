if ((window.innerWidth < window.innerHeight )) { 
    $('.categoryButton').css({"width": "70%"});
    $('.subcategoryButton').css({"width": "70%"});
    $('.problemButton').css({"width": "90%"});
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
    $('.subCategories').hide();
    $('#categories').show();
});


$('.subcategoryButton').click(() => {
    $('#back1').hide();
    $('.subCategories').hide();
    get("http://localhost:3000/getProblems/"+ $(this).attr('id'), (data) => {
        
        //data should be array of strings: problems
        console.log(data);
        data.forEach(element => {
            $('#problems').append(`<button ontouchstart="" class="problemButton">`+ element +`</button> <br>`);
        });
    });
    $('#problems').show();
});

$('.problemButton').click(() => {
    $('#problems').hide();
    $('#categoryHeader').hide();
    $('#questionHeader').show();
    get("http://localhost:3000/getProblems/"+ $(this).text(), (data) => {
        //data should be array of strings: questions
        console.log(data);
        data.forEach(element,index => {
            $('#questions').append(`<div class= "question">
            <p>`+ element +`</p>
            <input type="radio" id="positive`+ index +`" name="`+ index +`" value="yes">
            <label for="positive`+ index +`">Yes</label>
            <input type="radio" id="negative`+ index +`" name="`+ index +`" value="no" >
            <label for="negative`+ index +`">No</label>
        </div><br> `);
        });
        $('#questions').append(`<input type="submit" value="Submit" id = "submitQuestions">`);
        $('#questions').submit(()=>{
            //we should keep array of yes/no answers
            var answers = [];
            data.forEach(element, index => {
                answers.push($('input[name='+ index +']:checked').val());
            });
            //post answers to backend and get decision, show decision to user
            post("http://localhost:3000/questionAnswers", answers, (data) => {
                console.log("Successful!");
                $('#questions').hide();
                $('#questionHeader').hide();
                $('#decision').show();
                $('#decision').append(`<p>`+ data+`</p>`);
            });
        })   
    });
});