"use strict";
const apiKey="44FIKZA1TRY5GHVQ";

const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
const redirect_uri = "http://127.0.0.1:8080/index.html"; // replace with your redirect_uri;
const client_secret = "1mxPnqrS06vDZ2dzGx1wMfvW"; // replace with your client secret
const scope = "https://www.googleapis.com/auth/drive";
let access_token= "https://oauth2.googleapis.com/token";
let client_id = "615669052983-6nc3ff9he6a8hnt56a9aqoeqfh4hkvoe.apps.googleusercontent.com";// replace it with your client id;

let _btnUpload=$("#uploadFile");

$(document).ready(function () {
    let _cmbSymbols = $("#cmbSymbols");
    let _table = $("#tableData tbody");
    let _signInIco=$("#signInIco");
    let _cmbSector = $("#cmbSector").prop("selectedIndex", "-1");
    let chartCreate;


    _cmbSymbols.prop("selectedIndex", "-1");
    $(".chartTitle").hide();


    //RICERCA TRAMITE COMBOBOX
    _cmbSymbols.on("change", function () {
        _table.html("");
        _table.append(createRows(0));
        getGlobalQuotes($(this).val(), 0);
    });

    //RICERCA INCREMENTALE
    $("#textSearched").on("keyup", function () {
        if ($("#textSearched").val().length >= 2) {
            _table.html("");
            getSymbolSearched($(this).val(), _table);
        }
    });

    //CHART
    _cmbSector.on("change", function () {
        $(".chartTitle").fadeIn(1000);
        let rq = InviaRichiesta("GET", "http://localhost:3000/SECTOR");
        rq.done(function (data) {
            if (!chartCreate)
                chartCreate = chartCreation("http://localhost:3000/chart");
            chartChangeValues(chartCreate, data[_cmbSector.val()]);
        });
    });

    //DOWNLOAD CHART IMAGE
    $("#download").on('click', function () {
        /*Get image of canvas element*/
        var url_base64jp = document.getElementById("myChart").toDataURL("image/png");
        /*get download button (tag: <a></a>) */
        var a = document.getElementById("download");
        /*insert chart image url to download button (tag: <a></a>) */
        a.href = url_base64jp;
    });

    if(localStorage.getItem("accessToken")==null)
    {
        _signInIco.addClass("fas fa-sign-in-alt");
        $("#signIn").prop("title", "Sign In");
    }
    else
    {
        _signInIco.removeClass("fas fa-sign-in");
        _signInIco.addClass("fab fa-google-drive");
        $("#signIn").prop("title", "You are already signed in");
    }

    //UPLOAD A FILE
    if (code) {
        let r_ = $.ajax({
            //PROMISE PER RICHESTA AJAX
            type: "POST",
            url: "https://www.googleapis.com/oauth2/v4/token",
            data: {
                code: code,
                redirect_uri: redirect_uri,
                client_secret: client_secret,
                client_id: client_id,
                scope: scope,
                grant_type: "authorization_code",
            },
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            dataType: "json",
            timeout: 5000,
        });
        r_.done(function (data) {
            localStorage.setItem("accessToken", data.access_token);
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("expires_in", data.expires_in);
            window.history.pushState({}, document.title, "index.html");
        });
    }

    $("#uploadFile").on("click", function(){
        if(localStorage.getItem("accessToken")!=null) {
            let file = $("#file")[0].files[0];
            let upload = new Upload(file);
            upload.doUpload();
        }
        else alert("You must sign in first");
    });

    $("#signIn").on("click", function(){
        if(localStorage.getItem("accessToken")==null)
            signIn(client_id,redirect_uri,scope);
    });

});



function signIn(client_id,redirect_uri,scope) {
    let url = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=" + redirect_uri + "&prompt=consent&response_type=code&client_id=" + client_id
        + "&scope=" + scope + "&access_type=offline";
    // this line makes the user redirected to the url
    window.open(url);
}

function getGlobalQuotes(symbol,i) {
    let url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey="+apiKey;
    $.getJSON(url,
        function (data) {
            let globalQuoteData = data["Global Quote"];
            $("#symbol"+i).text(globalQuoteData["01. symbol"]);
            $("#previousClose"+i).text(globalQuoteData["08. previous close"]);
            $("#open"+i).text(globalQuoteData["02. open"]);
            $("#lastTrade"+i).text(globalQuoteData["05. price"]);
            $("#lastTradeTime"+i).text(globalQuoteData["07. latest trading day"]);
            $("#change"+i).text(globalQuoteData["09. change"]);
            $("#daysLow"+i).text(globalQuoteData["04. low"]);
            $("#daysHigh"+i).text(globalQuoteData["03. high"]);
            $("#volume"+i).text(globalQuoteData["06. volume"]);
        }
    );
}

function getSymbolSearched(str,table) {
        let url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="+str+"&apikey="+apiKey;
        $.getJSON(url, function (data) {
                let symbolSearched=data["bestMatches"];
                for (let i = 0; i < symbolSearched.length; i++) {
                    table.append(createRows(i));
                    getGlobalQuotes(symbolSearched[i]["1. symbol"],i);
                }
            })
}

function createRows(n) {
    let tr=$("<tr>");

    $("<td>").prop("id", "symbol"+n).appendTo(tr);
    $("<td>").prop("id", "lastTrade"+n).appendTo(tr);
    $("<td>").prop("id", "lastTradeTime"+n).appendTo(tr);
    $("<td>").prop("id", "change"+n).appendTo(tr);
    $("<td>").prop("id", "open"+n).appendTo(tr);
    $("<td>").prop("id", "previousClose"+n).appendTo(tr);
    $("<td>").prop("id", "daysLow"+n).appendTo(tr);
    $("<td>").prop("id", "daysHigh"+n).appendTo(tr);
    $("<td>").prop("id", "volume"+n).appendTo(tr);

    return tr;
}

function chartCreation(dataChart){
    let _data = InviaRichiesta("GET", dataChart,{},false);
    _data.done(function (data) { return data; });

    return new Chart($("#myChart"),JSON.parse(_data.responseText));
}

function chartChangeValues(chart, values)
{
    let dataChart=chart["data"];
    dataChart["labels"]=[];
    let dataset=dataChart["datasets"][0];
    dataset["data"]=[];
    for (let key in values)
    {
        dataChart["labels"].push(key);
        dataset["data"].push(values[key].replace("%", ""));
        let color = "rgba(" + Random(0, 255) + ", " + Random(0, 255) + ", " + Random(0, 255) + ", 1)";
        dataset["backgroundColor"].push(color);
        dataset["borderColor"].push(color);
    }
    chart.update();

}


function InviaRichiesta(method, url, parameters = "",async=true)
{
    return $.ajax({
        type: method,
        url: url,
        data: parameters,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType: "json",
        timeout: 5000,
        async:async
    });
}

function Random(min, max) {
    return Math.floor((max - min + 1) * Math.random()) + min; }

let Upload = function (file)
{
    this.file = file;
};

Upload.prototype.getType = function()
{
    localStorage.setItem("type",this.file.type);
    return this.file.type;
};
Upload.prototype.getSize = function()
{
    localStorage.setItem("size",this.file.size);
    return this.file.size;
};
Upload.prototype.getName = function()
{
    return this.file.name;
};

Upload.prototype.doUpload = function ()
{
    let that = this;
    let formData = new FormData();

    // add assoc key values, this will be posts values
    formData.append("file", this.file, this.getName());
    formData.append("upload_file", true);

    $.ajax({
        type: "POST",
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Bearer" + " " + localStorage.getItem("accessToken"));

        },
        url: "https://www.googleapis.com/upload/drive/v2/files",
        data:{
            uploadType:"media"
        },
        xhr: function () {
            let myXhr = $.ajaxSettings.xhr();
            /*if (myXhr.upload) {
                myXhr.upload.addEventListener('progress', that.progressHandling, false);
            }*/
            return myXhr;
        },
        success: function (data) {
            console.log(data);
        },
        error: function (error) {
            console.log(error);
        },
        async: true,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        timeout: 60000
    });
};