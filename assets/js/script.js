// var searchInputEl = $("#search-input");
var headerEl = $(".section");
const tBodyEl = $("tbody");
const tRowEl = $("tr");


var apiKey = "_LaNx7emMoFfZ8iCsQNc9ljwjueJQf_z";
var newsApiKey = "5kUQVR6ehDpKIKtoUyoViEDjNNLj9MHv";
// $(#search-input).val();

// Fix this to work for yesterday's date, if possible.

var daysPast = 1;
var date = moment().subtract(daysPast, 'days').format("YYYY-MM-DD");

// console.log(date);
var stocksArray = JSON.parse(localStorage.getItem("stock")) || [];

var compTicker = $("#search-input").val().toUpperCase();

function getAPI() {

    date = moment().subtract(daysPast, 'days').format("YYYY-MM-DD");
    compTicker = $("#search-input").val().toUpperCase();

    var companySearchURL = "https://api.polygon.io/v1/open-close/" + compTicker + "/" + date + "?adjusted=true&apiKey=" + apiKey;

    fetch(companySearchURL)
        .then(function (response) {
            return response.json();
    })
        .then(function (data) {
            
            console.log(data);

        
        if(data.status === "ERROR"){
            daysPast++
            if (daysPast === 10){
                return
            }
            else{
                getAPI()
            };

            };


            // Do not add errors or empty arrays to stocksArray
            // & Display error message for user.
            if ($("#not-found-message")) {
                $("#not-found-message").remove();
            }
            if ($("#error-status")) {
                $("#error-status").remove();
            }

            

            if (data.status === "NOT_FOUND") {
                var notFound = document.createElement("p");
                notFound.setAttribute("id", "not-found-message");
                notFound.textContent = data.message;
                headerEl.append(notFound);
                return;
            }
            else if (data.status === "ERROR") {
                var errorStatus = document.createElement("p");
                errorStatus.setAttribute("id", "error-status");
                errorStatus.textContent = "Error: " + data.error;
                headerEl.append(errorStatus);
                return;
            }

            
            // Set newest data to top of stocksArray.
            stocksArray.unshift(data);

            // Remove oldest stock from array if total stocks reaches above 10.
            if (stocksArray.length > 10) {
                stocksArray.pop();
            }

            // Store new stocksArray into local storage.
            localStorage.setItem("stock", JSON.stringify(stocksArray));
            
            
            renderTable();
            renderChartSymbol();
            chartRender();
    });
}


// $("#search-form").on("button", getAPI);

search.addEventListener("click", getAPI);
getAPI();


// Create table
function renderTable() {
  
    
    // Create a row for every object in stocksArray
    for (i = 0; i < stocksArray.length; i++) {

        // clear previous row elements.
        $("#row" + i + ">th").remove();
        $("#row" + i + ">td").remove();


        // Create and set text for elements that will fill each row of the table.
        // create element for column one on current row
        var dataSymbol = document.createElement("th");
        // set text for column 1
        dataSymbol.textContent = stocksArray[i].symbol;
        // create elements for other columns on current row
        var stockDate = document.createElement("td");
        stockDate.textContent = date;
        var open = document.createElement("td");
        open.textContent = "$" + stocksArray[i].open;
        var high = document.createElement("td");
        high.textContent = "$" + stocksArray[i].high;
        var low = document.createElement("td");
        low.textContent = "$" + stocksArray[i].low;
        var close = document.createElement("td");
        close.textContent = "$" + stocksArray[i].close;
        var volume = document.createElement("td");
        volume.textContent = stocksArray[i].volume;
        var afterHours = document.createElement("td");
        afterHours.textContent = "$" + stocksArray[i].afterHours;
        var preMarket = document.createElement("td");
        preMarket.textContent = "$" + stocksArray[i].preMarket;

        // Append each column element to current row
        $("#row" + i).append(dataSymbol, stockDate, open, high, low, close, volume, afterHours, preMarket);

      
    }
}
renderTable();


symbolsArray = [];

function renderChartSymbol() {
   
    // Create a row for every object in stocksArray
    for (i = 0; i < stocksArray.length; i++) {
        

        var dataSymbol = document.createElement("div");
        // set text for column 1
        dataSymbol.textContent = stocksArray[i].symbol;

        symbolsArray.push([stocksArray[i].symbol])

        $("symbols" + i).push(dataSymbol)

        // symbolsArray.unshift(data);

        //     // Remove oldest stock from array if total stocks reaches above 10.
        //     if (symbolsArray.length > 10) {
        //         symbolsArray.pop();
        //      }

        //     // Store new stocksArray into local storage.
        //     localStorage.setItem("stock", JSON.stringify(symbolsArray));
        
    }

    chartRender();
    
}

chartRender();

function chartRender() {

    new TradingView.MediumWidget(
        {
        "symbols": symbolsArray,
        "chartOnly": false,
        "width": 750,
        "height": 350,
        "locale": "en",
        "colorTheme": "light",
        "gridLineColor": "rgba(42 ,46, 57, 0)",
        "fontColor": "#787B86",
        "isTransparent": false,
        "autosize": false,
        "showFloatingTooltip": true,
        "showVolume": false,
        "scalePosition": "no",
        "scaleMode": "Normal",
        "fontFamily": "Trebuchet MS, sans-serif",
        "noTimeScale": false,
        "chartType": "area",
        "lineColor": "#2962FF",
        "bottomColor": "rgba(41, 98, 255, 0)",
        "topColor": "rgba(41, 98, 255, 0.3)",
        "container_id": "tradingview_02e2e"
      }
        );
}


console.log(symbolsArray)



companySearchURL = "https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2020-06-01/2020-06-17?apiKey=5kUQVR6ehDpKIKtoUyoViEDjNNLj9MHv"



// Fetch Api for Financial News 
// $("#search-form").on("button", getNewsApi);

search.addEventListener("click", getNewsApi);

function getNewsApi() {

    
    compTicker = $("#search-input").val().toUpperCase();

    const newsSearchURL = "https://api.polygon.io/v2/reference/news?ticker=" + compTicker +"&limit=10&apiKey=5kUQVR6ehDpKIKtoUyoViEDjNNLj9MHv";

    fetch(newsSearchURL)

    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        // Add to local storage ****
        
        console.log(data);

        renderNews(data);
        
	})
    
}

function renderNews(data) {
	// Create column for every object in news
    // Limiting the Array output to one object per output
	for(i = 9; i < data.results.length; i++) {

		console.log(data)

        // NEWS CARD 1 ============

        compTicker = $("#search-input").val().toUpperCase();

    
		const newsCardBody1 = document.createElement("div")

		const newsHeadLines = document.createElement("h2");

		newsHeadLines.textContent = data.results[0].title

		const newsImg = document.createElement("img")

		newsImg.src = data.results[0].image_url

		const newsPara = document.createElement("p");

		newsPara.textContent = data.results[0].description

		const newsLink = document.createElement("a");

		newsLink.textContent = data.results[0].article_url

        // newsLink.href = data.results[0].article_url

        // Appending Parameters to Card
        newsCardBody1.append(newsImg, newsHeadLines, newsPara, newsLink);
        // Appending Card to newsCard Element
        $("#newsContainer").append(newsCardBody1);
        
	}

  
}



