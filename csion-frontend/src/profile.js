$('.item2').click(()=>{
    $('#infoCard').hide();
    $('#nameInput').val($('.item1').text());
    $('#mailInput').val($('.item3').text());
    $('#unameInput').val($('.item5').text());
    $('#ageInput').val($('.item4').text());
    $('#editForm').css({'display':'inline-block'});
});

$('#editbutton').click(()=>{
    //send user info to server, checks username if same username exists doesnot accept
    var message = {
        'nameSurname': $('#nameInput').val(),
        'mail': $('#mailInput').val(),
        'username': $('#unameInput').val(),
        'age': $('#ageInput').val()
    }
    $.post("http://localhost:3000/userInfoChange", message, (data) => {
        if (data) {
            $('.item1').text($('#nameInput').val());
            $('.item3').text($('#mailInput').val());
            $('.item5').text($('#unameInput').val());
            $('.item4').text($('#ageInput').val());
            $('#editForm').hide();
            $('#infoCard').css({'display':'inline-block'});
            $('#alert').remove();
        } else {
            $('#editbutton').after(`<p id='alert' style='color:Red'>This username already exists!</p>`);
        }
    });
});

$( document ).ready( ()=>{
    //incoming data should be in the type of the message above
    $.get("http://localhost:3000/getUserInfo", (data) => {
        //user info
        $('.item1').text(data.nameSurname);
        $('.item3').text(data.mail);
        $('.item5').text(data.username);
        $('.item4').text(data.age);

        //user personality
        $("#personalityCard").append(`<div id = "personalityExp">
      <img id= "pChart" style= "width: 300px; height:auto" src=` + data.personality.images.disc_map + `>`);
        $("#pChart").after( `</ul><h4 id="p">Overall Profile: </h4><ul class="mylist">`);
        data.personality.content.profile.quality.forEach(element => {
            $("#p").after(`<li>`+ element  +`</li>`);
        });
        $("#pChart").after( `</ul><h4 id="m">This Personality's Motivations: </h4><ul class="mylist">`);
        data.personality.content.motivation.phrase.forEach(element => {
            $("#m").after(`<li>`+ element  +`</li> `);
        });
        $("#pChart").after( `</ul><h4 id="d">This Personality's Drainer Qualities: </h4><ul class="mylist">`);
        data.personality.content.drainer.quality.forEach(element => {
            $("#d").after(`<li>`+ element  +`</li> `);
        });
        $("#pChart").after( `<h4 id="b">This Personality's Behavior Phrases: </h4><ul class="mylist">`);
        data.personality.content.behavior.phrase.forEach(element => {
            $("#b").after(`<li>`+ element  +`</li> `);
        });
        $("#personalityExp").append('</ul></div>');

        //previous decisions asked
        data.decisions.forEach(element,index => {
            $('#previousAnswers').append(`
            <hr>
            <div class="decision" id="decision`+ index +`">
                <p id="problem`+ index +`">`+ element.problem +`</p>
                <p>Our Answer:`+ element.answer +`</p>
                <button class="feedback" id="`+ index +`">Give Feedback</button>
                <div class="feedbackForm" id= "q`+ index +`feedback">
                    <h4>Give Feedback</h4>
                    <p>Did you follow our decision?</p>
                    <input type="radio" id="followed`+ index +`" name="follow`+ index +`" value="true">
                    <label for="followed`+ index +`">Yes</label>
                    <input type="radio" id="not`+ index +`" name="follow`+ index +`" value="false">
                    <label for="not`+ index +`">No</label>
                    <p>Are you happy and satisfied with the decision you've made?</p>
                    <input type="radio" id="satisfied`+ index +`" name="satisfy`+ index +`" value="true">
                    <label for="satisfied`+ index +`">Yes</label>
                    <input type="radio" id="notsat" name="satisfy`+ index +`" value="false">
                    <label for="notsat`+ index +`">No</label>
                    <p>Any further detail you want to share with us?</p>
                    <textarea class="detail" id="detail`+ index +`" placeholder="Please type here..."></textarea>
                    <br>
                    <button class= "feedbackSubmit" id="feedbackSubmit`+ index +`">Submit</button>
                </div>
            </div>
            `);
            if(element.feedbackGiven){
                $('#'+index).remove();
                $('#q'+index+'feedback').remove();
            }
        });
        $('.feedback').click(()=>{
            var id = $(this).attr('id');
            $('#'+id).remove();
            $('#q'+id+'feedback').show();
            $('#feedbackSubmit'+id).click(()=>{
                const feedback = {
                    'problem': $('#problem'+id).text(),
                    'isFollowed': $("input[name='follow'"+id+"]:checked").val(),
                    'isSatisfied': $("input[name='satisfy'"+id+"]:checked").val(),
                    'detail': $('#detail'+id).text()
                }
               $.post("http://localhost:3000/setUserFeedback",feedback,(data)=>{
                    if(data){
                        $('#q'+id+'feedback').remove();
                    } else {
                        //TODO Alert user
                    }
               });
            });
        });
    });
});

if ((window.innerWidth < window.innerHeight )) { 
    $('.settingsDiv').css({"width": "100%"});
    $('.profileCard').css({"width": "100%"});
}