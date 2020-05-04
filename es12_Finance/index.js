"use strict";
const apiKey="44FIKZA1TRY5GHVQ";

$(document).ready(function () {
    let _cmbSymbols=$("#cmbSymbols");
    let _table=$("#tableData tbody");
    _cmbSymbols.prop("selectedIndex","0");

	let _chartTypeCmb=$("#chartStyleList").prop("selectedIndex","0");
    let ctx;

	//RICERCA TRAMITE COMBOBOX
    _cmbSymbols.on("change",function () {
        _table.html("");
       _table.append(createRows(0));
        getGlobalQuotes($(this).val(),0);
    });

	//RICERCA INCREMENTALE
    $("#textSearched").on("keyup",function () {
        if($("#textSearched").val().length>=2) {
            _table.html("");
            getSymbolSearched($(this).val(), _table);
        }
    })
	
	//CHART
	_chartTypeCmb.on("change",function(){
		let ds=InviaRichiesta("GET","http://localhost:3000/SECTOR");
		ds.done(function (data) {
		if(!ctx)
			ctx=chartCreation("http://localhost:3000/chart");
		chartMod(ctx, data[_chartTypeCmb.val()]);
		});
	});

    //DOWNLOAD CHART IMAGE
    $("#download").on('click', function(){
        /*Get image of canvas element*/
        var url_base64jp = document.getElementById("myChart").toDataURL("image/png");
        /*get download button (tag: <a></a>) */
        var a =  document.getElementById("download");
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
