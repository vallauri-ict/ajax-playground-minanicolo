"use strict";
const apiKey="44FIKZA1TRY5GHVQ";

let clientID = "615669052983-cqg11slnm57ufgo2s3r8bpfpctr5j7rf.apps.googleusercontent.com";
const redirectUri = "http://127.0.0.1:8080/index.html";
const clientSecret = "GWEegfM8Idkb3xe_a1rAZotg";
const pointTO = "https://www.googleapis.com/auth/drive";
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');

$(document).ready(function () {
    let _cmbSymbols = $("#cmbSymbols");
    let _table = $("#tableData tbody");
    _cmbSymbols.prop("selectedIndex", "0");

    let _chartTypeCmb = $("#chartStyleList").prop("selectedIndex", "0");
    let ctx;

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
    })

    //CHART
    _chartTypeCmb.on("change", function () {
        let ds = InviaRichiesta("GET", "http://localhost:3000/SECTOR");
        ds.done(function (data) {
            if (!ctx)
                ctx = chartCreation("http://localhost:3000/chart");
            chartMod(ctx, data[_chartTypeCmb.val()]);
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

});

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

function chartMod(chart, content)
{
    let dataChart=chart["data"];
    dataChart["labels"]=[];
    let dataset=dataChart["datasets"][0];
    dataset["data"]=[];
    for (let key in content)
    {
        dataChart["labels"].push(key);
        dataset["data"].push(content[key].replace("%", ""));
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

$.ajax({
    type: 'POST',
    url: "https://www.googleapis.com/oauth2/v4/token",
    data: {
        code:code,
        redirect_uri:redirectUri,
        client_secret:clientSecret,
        client_id:clientID,
        scope:pointTO,
        grant_type:"authorization_code"
    },
    dataType: "json",
    success: function(resultData)
    {
        localStorage.setItem("accessToken",resultData.access_token);
        localStorage.setItem("refreshToken",resultData.refreshToken);
        localStorage.setItem("expires_in",resultData.expires_in);
        window.history.pushState({}, document.title, "/GitLoginApp/" + "login.html");
    }
});

function stripQueryStringAndHashFromPath(URL)
{
    return URL.split("?")[0].split("#")[0];
}

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

    formData.append("file", this.file, this.getName());
    formData.append("upload_file", true);

    $.ajax({
        type: "POST",
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Bearer" + " " + localStorage.getItem("accessToken"));

        },
        url: "https://www.googleapis.com/upload/drive/v2/files",
        data:{
            uploadType:"media"},

        xhr: function () {
            let myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) {
                myXhr.upload.addEventListener('progress', that.progressHandling, false);
            }
            return myXhr;
        },
        success: function (data) {
            console.log(data);
            window.location.href="http://127.0.0.1:8080";
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

Upload.prototype.progressHandling = function (event)
{
    let percent = 0;
    let position = event.loaded || event.position;
    let total = event.total;
    let progress_bar_id = "#progress-wrp";
    if (event.lengthComputable)
        percent = Math.ceil(position / total * 100);

    $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
    $(progress_bar_id + " .status").text(percent + "%");
};

$("#upload").on("click", function (e)
{
    let file = $("#files")[0].files[0];
    let upload = new Upload(file);
    upload.doUpload();
});