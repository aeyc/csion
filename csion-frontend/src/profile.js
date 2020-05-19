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


if ((window.innerWidth < window.innerHeight )) { 
    $('.settingsDiv').css({"width": "100%"});
    $('.profileCard').css({"width": "100%"});
}