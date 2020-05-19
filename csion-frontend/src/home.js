if ((window.innerWidth < window.innerHeight )) { 
    $('.categoryButton').css({"width": "70%"});
    $('.subcategoryButton').css({"width": "70%"});
    $('.problemButton').css({"width": "90%"});
    $('.navbar a').css({ "padding-top": "5%", "padding-bottom": "5%"});
    $('.backButton').css({"width": "30%"});
    $('.slider').css({"width": "90%"});
}

$('#career').click(() => {
    $('#categories').hide();
    $('#careerSub').show();
    $('.backButton').show();
});

$('#relation').click(() => {
    $('#categories').hide();
    $('#relationshipSub').show();
    $('#back1').show();
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
    const message = {'id': $(this).attr('id')};
    $.get("http://localhost:3000/getProblems/"+ message, (data) => {
        $('#problems').append(`<div id='removeProblems'>`);
        //data should be array of strings: problems
        console.log(data);
        data.forEach(element => {
            $('#problems').append(`<button ontouchstart="" class="problemButton">`+ element +`</button> <br>`);
        });
        $('#problems').append('</div>');
    });
    $('#problems').show();
});

$('.problemButton').click(() => {
    $('#problems').hide();
    $('#categoryHeader').hide();
    $('#questionHeader').show();
    const msg = {'selectedProblem': $(this).text()};
    $.post("http://localhost:3000/getProblems/", msg, (data) => {
        //data should be array of strings: questions
        console.log(data);
        $('#questions').append(`<div id='removeQuestions>'`);
        data.forEach(element,index => {
            $('#questions').append(`<div class= "question">
            <p>`+ element +`</p>
            <input type="radio" id="positive`+ index +`" name="`+ index +`" value="yes">
            <label for="positive`+ index +`">Yes</label>
            <input type="radio" id="negative`+ index +`" name="`+ index +`" value="no" >
            <label for="negative`+ index +`">No</label>
        </div><br> `);
        });
        $('#questions').append(`<label style="font-family: 'Montserrat'; color:white">Please use the scale below to tell us how much do you want to perform this action.</label><br><br>
        <input type="range" min="-10" max="10" value="0" class="slider" id="myRange"><br>`);
        $('#questions').append(`<input type="submit" value="Submit" id = "submitQuestions"></div>`);
        $('#submitQuestions').click(()=>{
            //we should keep array of yes/no answers
            var answers = [];
            data.forEach(element, index => {
                answers.push($('input[name='+ index +']:checked').val());
            });
            answers.push($('#myRange').val());
            //post answers to backend and get decision, show decision to user
            $.post("http://localhost:3000/questionAnswers", JSON.stringify(answers), (data) => {
                console.log("Successful!");
                $('#questions').hide();
                $('#questionHeader').hide();
                $('#decision').show();
                $('#decision').append(`<div id='removeDecision'><p>`+ data +`</p><br><button ontouchstart="" class="backButton" id="back2"><i class="fas fa-arrow-left"></i> Back To Home</button></div>`);
                $('#back2').click(()=>{
                    $('#removeProblems').remove();
                    $('#removeQuestions').remove();
                    $('#removeDecision').remove();
                    $('#decision').hide();
                    $('#categories').show();
                    $('#categoryheader').show();
                });
            });
        })   
    });
});