if ((window.innerWidth < window.innerHeight )) { 
    $('.settingsDiv').css({"width": "100%"});
}

$('#aboutUs').click(()=>{
    $('.settingComp').hide();
    $('#about').css('display', 'inline-block');
});

$('#backAbout').click(()=>{
    $('.settingComp').show();
    $('#about').css('display', 'none');
});

$('#logout').click(()=>{
    //server interaction to end session 
    $.get("http://localhost:3000/logout", (data) => {
        //if success go to entrance page
        if (data) {
            window.location = "http://localhost:1234/index.html";
        }
    });
});

$('#switchNotif').change(()=>{
    const msg = {'pref': $('#switchNotif').is('checked')};

    //send new preference to server
    $.get("http://localhost:3000/notificationPref" + msg, (data) => {
        console.log('Success');
    });
});

$('#suspend').submit(()=>{
    const message= {'password': $('#suspend :input').get(0).value};
    //send suspend request to server with password to be checked
    $.post("http://localhost:3000/checkAndSuspend", message, (data) => {
        if (data) {
            console.log('Success');
            window.location = "http://localhost:1234/index.html";
        } else {
            $('#susSub').after(`<p style='color:red;'>Wrong Password!</p>`);
        }
    });
    $(':input','#suspend')
    .not(':button, :submit, :reset, :hidden')
    .val('');
    return false;
});

$('#changePassword').submit(()=>{
    //send suspend request to server with password to be checked
    var message = {'oldPass': $('#changePassword :input').get(0).value,'newPass': $('#changePassword :input').get(1).value}
    $.post("http://localhost:3000/changePass", message, (data) => {
        if (data) {
            $('#pasSub').after(`<p style='color:antiquewhite;'>Password Changed!</p>`);
        } else {
            $('#pasSub').after(`<p style='color:red;'>Wrong Old Password!</p>`);
        }
    });
    $(':input','#changePassword')
    .not(':button, :submit, :reset, :hidden')
    .val('');
    return false;
});

$( document ).ready( ()=>{
    //get notification preference
    $.get("http://localhost:3000/getNotifPref", (data) => {
        if(data !== $('#switchNotif').is(":checked")){
            if( $('#switchNotif').is(":checked"))
                $('#switchNotif').prop('checked', false);
            else 
                $('#switchNotif').prop('checked', true);
        }
    });
});