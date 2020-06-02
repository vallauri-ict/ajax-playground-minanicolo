"use strict";

$(document).ready(function(){
    let _btnOpenSidebar=$("#openSidebar");
    let _btnCloseSidebar=$("#closeSidebar");
    let _divItems=$("#divItems");
    let _btnMan=$("#btnMan");
    let _btnWomen=$("#btnWomen");

    let img;
    let countClick=0;
    let vetTaglia=["XS","S","M","L","XL"];
    let vetNumeri=["38","39","40","41","42","43","44","45"];
    let vet=[];

    let isEmpty;

    createDiv();

    load_cart_data();

    $("#cart-popover").popover({
        html : true,
        container : "body",
        content:function () {
            return $("#popover-content-wrapper").html();
        }
    });
    $("#cart-popover").on("show.bs.popover", function(e){
        $("#cart-popover").data("bs.popover").tip().css({"max-width": "600px"})});


    $(document).on("click",".delete",function () {
        let product_id=$(this).prop("id");
        let action="remove";
        if(confirm("Are you sure you want to remove this item?"))
        {
            $.ajax({
                url:"server/action.php",
                method:"POST",
                data:{"product_id":product_id,"action":action},
                success:function (data) {
                    var jsonObject= JSON.stringify(data);
                    var count = JSON.parse(jsonObject).length;
                    if(count==2) {
                        isEmpty=true;
                        $("#check_out_cart").attr("disabled", isEmpty);
                    }
                    load_cart_data();
                    $("#cart-popover").popover("hide");
                    alert("Item has been removed from cart");
                }
            });
        }
        else
            return false;
    });

    $(document).on("click","#clear_cart",function () {
        let action="empty";
        isEmpty=true;
        $("#check_out_cart").attr("disabled", isEmpty);
        $.ajax({
            url:"server/action.php",
            method:"POST",
            data:{"action":action},
            success:function () {
                load_cart_data();
                $("#cart-popover").popover("hide");
                alert("Cart has been cleared");
            }
        });
    });

    _btnOpenSidebar.on("click",function(){
        $("#mySidenav").css({"width":"270px"});
    });
    _btnCloseSidebar.on("click",function(){
        $("#mySidenav").css({"width":"0"});
    });

    _btnMan.on("click",function () {
        _divItems.html("");
        createDivMF("male");
    });
    _btnWomen.on("click",function () {
        _divItems.html("");
        createDivMF("female");
    });


    _divItems.on("click","button.clsItems",function () {
        if(countClick==0)
        {
            let _this=$(this);
            _divItems.children("button.clsItems").prop("disabled",true);
            _this.prop("disabled",false);
            let id=_this.prop("id");
            img=_this.children("img").prop("src");
            _this.css({"background-color": "#2f4353",
            "background-image": "linear-gradient(315deg, #2f4353 0%, #d2ccc4 74%)"});
            _this.children("img").hide();
            let _div=$("<form>").css({"margin":"50px auto"}).appendTo(_this);

            _this.children("a").children("i").prop("title","Clicca due volte per uscire");

            let rq=InviaRichiesta("GET","server/dettagli.php",{"id":id});
            rq.fail(error);
            rq.done(function (data) {
                $("<span>",{
                    "text":"Genere: "+data[0]["gender"]
                }).appendTo(_div).append($("<br>"));

                $("<span>",{
                    "text":"Marca: "+data[0]["marca"]
                }).appendTo(_div).append($("<br>"));

                $("<span>",{
                    "text":"Colore: "+data[0]["colore"]
                }).appendTo(_div).append($("<br>"));

                $("<span>",{
                    "text":"Prezzo: "+data[0]["prezzo"]+"€"
                }).appendTo(_div).append($("<br>"));

                if(data[0]["tipo"]=="vestito")
                {
                    let divTaglia=$("<div>").appendTo(_div);
                    $("<span>",{
                        "text":"Taglia  "
                    }).appendTo(divTaglia);
                    let _select=$("<select>").appendTo(divTaglia);
                    for(let q=0;q<vetTaglia.length;q++)
                    {
                        $("<option>",{
                            "text":vetTaglia[q],
                            "css":{"width":"50px"}
                        }).appendTo(_select);
                    }

                    let divQta=$("<div>").appendTo(_div);
                    $("<span>",{
                        "text":"Quantità  "
                    }).appendTo(divQta);
                    $("<input>",{
                        "type":"text",
                        "name":"quantity",
                        "id":"quantity"+data[0]["id"],
                        "css":{"width":"40px","margin":"5px auto","height":"20px"},
                        "value":"1"
                    }).appendTo(divQta).append($("<br><br><br><br>"));
                }
                else if(data[0]["tipo"]=="scarpa")
                {
                    let divNumber=$("<div>").appendTo(_div);
                    $("<span>",{
                        "text":"Numero  "
                    }).appendTo(divNumber);
                    let _select=$("<select>").appendTo(divNumber);
                    for(let q=0;q<vetNumeri.length;q++)
                    {
                        $("<option>",{
                            "text":vetNumeri[q],
                            "css":{"width":"50px"}
                        }).appendTo(_select);
                    }

                    let divQta=$("<div>").appendTo(_div);
                    $("<span>",{
                        "text":"Quantità  "
                    }).appendTo(divQta);
                    $("<input>",{
                        "type":"text",
                        "name":"quantity",
                        "id":"quantity"+data[0]["id"],
                        "css":{"width":"40px","margin":"5px auto","height":"20px"},
                        "value":"1"
                    }).appendTo(divQta).append($("<br><br><br><br>"));
                }
                else
                {
                    let divQta=$("<div>").appendTo(_div);
                    $("<span>",{
                        "text":"Quantità  "
                    }).appendTo(divQta);
                    $("<input>",{
                        "type":"text",
                        "name":"quantity",
                        "id":"quantity"+data[0]["id"],
                        "css":{"width":"40px","margin":"5px auto","height":"20px"},
                        "value":"1"
                    }).appendTo(divQta).append($("<br><br><br><br>"));
                }

                $("<button>",{
                    "prop":{"id":"btnAddToCart"},
                    "text":"Add to cart",
                    "class":"clsBtnAddCart",
                }).appendTo(_div).on("click",function () {
                    isEmpty=false;
                    $("#check_out_cart").removeAttr("disabled");
                    let product_id=data[0]["id"];
                    let product_name=data[0]["marca"];
                    let product_price=data[0]["prezzo"];
                    let product_quantity=$("#quantity"+product_id).val();
                    let action="add";
                    if(product_quantity > 0)
                    {
                        $.ajax({
                           url:"server/action.php",
                           method:"POST",
                           data:{"product_id":product_id,"product_name":product_name,
                           "product_price":product_price,"product_quantity":product_quantity,"action":action},
                           success:function () {
                                load_cart_data();
                                alert("Item has been added into cart");
                           }
                        });
                    }
                    else
                        alert("Please enter a number of quantity");
                });

                countClick++;
            });
        }
    });

    $(document).on("click","#check_out_cart",function () {
        window.location.href="registrazione.html";
    });

    _divItems.on("dblclick","button.clsItems",function () {
        countClick=0;
        let _this=$(this);
        _divItems.children("button.clsItems").prop("disabled",false);
        let id=_this.prop("id");
        _this.html("");
        _this.css({"background-color":"white",
            "background-image": ""}).addClass("clsItems").prop("id",id);
        $("<img>",{
            "src":img
        }).appendTo(_this);
        let a=$("<a>").appendTo(_this).css({"position":"absolute","top":"5","left":"5"});
        $("<i>").appendTo(a).prop("class","fas fa-info-circle")
            .prop("title","Clicca per vedere le caratteristiche");
    });

    function createDivMF(gender) {
        let k=0;
        let rq=InviaRichiesta("GET", "server/datiPageIndex.php", {gn:gender});

        rq.fail(error);

        rq.done(function (data) {
            for (let i=0; i<4; i++) {
                for (let j = 0; j < 3; j++) {
                    let _div = $("<button>");
                    _div.addClass("clsItems");
                    _div.appendTo(_divItems);
                    _div.prop("id", data[k]["id"]);
                    let a=$("<a>").appendTo(_div).css({"position":"absolute","top":"5","left":"5"});
                    $("<i>").appendTo(a).prop("class","fas fa-info-circle")
                        .prop("title","Clicca per vedere le caratteristiche");
                    let dim = parseInt(_div.css("width")) + (2 * parseInt(_div.css("border-left-width"))) + (2 * parseInt(_div.css("margin")));
                    _div.css({
                        "top": ((i+0.2) * dim) + "px",
                        "left": ((j+0.1) * dim) + "px"
                    });
                    $("<img>",{
                        "src":data[k++]["img"],
                        "class":"imgItems"
                    }).appendTo(_div);
                }
            }
        });
    }

    function load_cart_data() {
        $.ajax({
            url:"server/fetch_cart.php",
            method:"POST",
            dataType:"json",
            success:function (data) {
                $("#cart_details").html(data.cart_details);
                $(".total_price").text(data.total_price);
                $(".badge").text(data.total_item);
            }
        });
    }

    function createDiv() {
        let k=0;
        let rq = InviaRichiesta("GET", "server/datiPageIndex.php",{gn:""});
        rq.fail(error);

        rq.done(function (data) {
            chooseClothes();
            for (let i=0; i<3; i++) {
                for (let j = 0; j < 3; j++) {
                    let _div = $("<button>");
                    _div.addClass("clsItems");
                    _div.appendTo(_divItems);
                    _div.prop("id", data[vet[k]]["id"]);
                    let a=$("<a>").appendTo(_div).css({"position":"absolute","top":"5","left":"5"});
                    $("<i>").appendTo(a).prop("class","fas fa-info-circle")
                        .prop("title","Clicca per vedere le caratteristiche");
                    let dim = parseInt(_div.css("width")) + (2 * parseInt(_div.css("border-left-width"))) + (2 * parseInt(_div.css("margin")));
                    _div.css({
                        "top": ((i+0.2) * dim) + "px",
                        "left": ((j+0.1) * dim) + "px"
                    });
                    $("<img>",{
                        "src":data[vet[k++]]["img"],
                        "class":"imgItems"
                    }).appendTo(_div);
                }
            }
        });
    }


    function chooseClothes() {
        vet=[];
        let n;
        for(let i=0; i<9; i++) {
            do {
                 n = random(1, 23);
            } while (vet.includes(n));
            vet.push(n);
        }
    }

});


function random(min, max) {
    return Math.floor((max - min + 1) * Math.random()) + min;
}

