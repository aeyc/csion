$("button").click(() => {
    $.get("http://localhost:3000/", (data) => {
        console.log(data);
        $("button").html(data);
    });
});
