# Project created by Mina Nicolò 4B Inf #
## Alpha Vantage -- Finance ##
> Questo progetto è basato su ajax, utilizza delle chiamate API per ottenere dei dati dal sito Alpha Vantage.


### Funzioni più importanti ###
```javascript
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
```
## IMPORTANTE!!! #
Alpha Vantage permette di fare solo 5 chiamate al minuto e 500 al giorno, quindi, l'applicazione dopo un certo numero di chiamate andrà in errore!
