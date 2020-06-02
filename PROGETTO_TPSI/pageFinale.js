"use strict";

$(document).ready(function(){
    let _btnOpenSidebar=$("#openSidebar");
    let _btnCloseSidebar=$("#closeSidebar");

    _btnOpenSidebar.on("click",function(){
        $("#mySidenav").css({"width":"270px"});
    });
    _btnCloseSidebar.on("click",function(){
        $("#mySidenav").css({"width":"0"});
    });

    $(".rating").on("click",function () {
        window.location.href="index.html";
    });

});

