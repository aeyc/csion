let view = `<div id="entrance"><img src="assets/logo.PNG" id="logo">
    <br>
    <div class="entrance">
        <button ontouchstart="" id="login" class="openLogin">Log In</button>
        <br>
        <button ontouchstart="" id="signup" class="openSignUp">Sign Up</button>
        <hr id="entranceLine">
        <p id="rights">All rights reserved. © </p>
    </div>
    <div class='circle' id="circle1" style='margin-left:40%;'></div>
    <div class='circle' id="circle2" style='margin-left:35%;'></div>
    <div class='circle' id="circle3" style='margin-left:45%;'></div>
    <div class='circle' id="circle4" style='margin-left:40%;'></div>
    <div class='circle' id="circle5" style='margin-left:35%;'></div>
    <div class='circle' id="circle6" style='margin-left:45%;'></div>

    <form class="fade" id="loginForm">
        <input ontouchstart="" type="text" id="uname" placeholder="Username"><br><br>
        <input ontouchstart="" type="text" id="password" placeholder="Password"><br><br>
        <button ontouchstart="" class="formButton">Log In</button><br>
        <hr>
        <p id="text">Don't have an account yet?<a id="signUpLink" class="openSignUp" href='#'> Sign up from here!</a>
        </p>
    </form>
    <form class="fade" id="signUpForm">
        <input ontouchstart="" type="text" id="uname" placeholder="Username"><br><br>
        <input ontouchstart="" type="text" id="email" placeholder="Email"><br><br>
        <input ontouchstart="" type="text" id="password" placeholder="Password"><br><br>
        <button ontouchstart="" class="formButton" id="signUpButton">Sign Up</button>
        <hr>
        <p id="text">Already have an account?<a id="loginLink" class="openLogin" href='#'> Login from here!</a></p>

    </form></div>`

export default class Entrance {

    constructor() {
        this.view = jQuery(view);
        const delay = ms => new Promise(res => setTimeout(res, ms));
        this.view.find(".openLogin").click(() => {
            this.view.find(".entrance").hide();
            this.view.find("#signUpForm").hide();
            this.view.find(".circle").removeClass('open');

            if ((window.innerWidth < window.innerHeight)) {
                this.view.find("#logo").css("margin-bottom", "30%");
            } else {
                this.view.find("#logo").css("margin-top", "5% ");
            }
            var k = 1;
            for (let i = 1; i < 7; i++) {
                var element = "";
                sleep(200 * i).then(() => {
                    element = "#circle" + k.toString();
                    this.view.find(element).addClass('open');
                    k++;
                });
            }
            sleep(1800).then(() => {
                this.view.find("#loginForm").show();
                setTimeout(() => {
                    this.view.find("#loginForm").addClass("unfade");
                }, 100);
            });
        });
        this.view.find(".openSignUp").click(() => {
            this.view.find(".entrance").hide();
            this.view.find("#loginForm").hide();
            this.view.find(".circle").removeClass('open');
            if ((window.innerWidth < window.innerHeight)) {
                this.view.find("#logo").css("margin-bottom", "30%");
            } else {
                this.view.find("#logo").css("margin-top", "5% ");
            }

            var k = 1;
            for (let i = 1; i < 7; i++) {
                var element = "";
                sleep(200 * i).then(() => {
                    element = "#circle" + k.toString();
                    this.view.find(element).addClass('open');
                    k++;
                });
            }
            sleep(1800).then(() => {
                this.view.find("#signUpForm").show();
                setTimeout(() => {
                    this.view.find("#signUpForm").addClass("unfade");
                    //this.view.find("html").empty().load("../public/index1.html");
                }, 100);
            });

        });
        if ((window.innerWidth < window.innerHeight)) {
            //mobile
            this.view.find("#logo").css({ "width": "50%", "margin-bottom": "45%", "margin-top": "30%" });
            this.view.find("button:hover, button:active").css({ "position": "relative", "top": "1px" });
            this.view.find("#circle1").css({ "margin-left": "20%", "margin-top": "70%" });
            this.view.find("#circle2").css({ "margin-left": "-15%", "margin-top": "73%" });
            this.view.find("#circle3").css({ "margin-left": "65%", "margin-top": "74%" });
            this.view.find("#circle4").css({ "margin-left": "25%", "margin-top": "115%" });
            this.view.find("#circle5").css({ "margin-left": "-15%", "margin-top": "115%" });
            this.view.find("#circle6").css({ "margin-left": "65%", "margin-top": "115%" });


            this.view.find("#loginForm").css({ "margin-left": "12%", "margin-top": "100%" });
            this.view.find("#signUpForm").css({ "margin-left": "12%", "margin-top": "82%" });


        } else {
            //desktop

            this.view.find("button:active").css({ "position": "relative", "top": "1px" });
            this.view.find("#signup:hover").css({ "background-color": "#ffffff  !important", "color": "#539093 !important" });
            this.view.find("#login:hover").css({ "background-color": "#64adb1 ", "color": "#ffffff" });
            this.view.find("hr").css("margin-top", "10%");
            this.view.find("#circle1").css({ "margin-left": "52%", "margin-top": "17%" });
            this.view.find("#circle2").css({ "margin-left": "32%", "margin-top": "18%" });
            this.view.find("#circle3").css({ "margin-left": "42%", "margin-top": "16%" });
            this.view.find("#circle4").css({ "margin-left": "52%", "margin-top": "30%" });
            this.view.find("#circle5").css({ "margin-left": "32%", "margin-top": "30%" });
            this.view.find("#circle6").css({ "margin-left": "42%", "margin-top": "30%" });
            this.view.find("#loginForm").css({ "margin-left": "40%", "margin-top": "25%" });
            this.view.find("#signUpForm").css({ "margin-left": "40%", "margin-top": "23%" });

        }
        const sleep = milliseconds => {
            return new Promise(resolve => setTimeout(resolve, milliseconds));
        };

        this.view.find('#signUpButton').click(() => {
            console.log("asdasd");
            this.view.find.post("http://localhost:3000/createNewUser", (data) => {
                console.log(data);
            });

        })
        $("#content").append(this.view);
    }

    remove() {
        this.view.remove();
    }

}