var searchInputEl = $("#search-input");
const tBodyEl = $("tbody");
const tRowEl = $("tr");

var apiKey = "5kUQVR6ehDpKIKtoUyoViEDjNNLj9MHv";

// $(#search-input).val();

// compTicker placeholder until full searchbar is written.
var compTicker = "AAPL";
var date = moment().subtract(3, 'days').format("YYYY-MM-DD");
console.log(date);

var stocksArray = JSON.parse(localStorage.getItem("stock")) || [];


function getAPI() {
    var companySearchURL = "https://api.polygon.io/v1/open-close/" + compTicker + "/" + date + "?adjusted=true&apiKey=" + apiKey;

    fetch(companySearchURL)
        .then(function (response) {
            return response.json();
    })
        .then(function (data) {

            console.log(data);

            // Do not add erroes or empty arrays to stocksArray
            if (data.status === "ERROR" || data.status === "NOT_FOUND"){
                console.log("Error, or not found");
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
            
           
          
    });
}

search.addEventListener("click", getAPI);
// getAPI();


// Create table
function renderTable() {

    // Create a row for every object in stocksArray
    for (i = 1; i < stocksArray.length + 1; i++) {

        // clear rows of previous text.
        $("#row" + i).innerHTML = "";  

        // Create and set text for elements that will fill each row of the table.
        // create element for column one on current row
        var dataSymbol = document.createElement("th");
        // set text for column 1
        dataSymbol.textContent = stocksArray[i].symbol;
        // create elements for other columns on current row
        var open = document.createElement("td");
        open.textContent = stocksArray[i].open;
        var high = document.createElement("td");
        high.textContent = stocksArray[i].high;
        var low = document.createElement("td");
        low.textContent = stocksArray[i].low;
        var close = document.createElement("td");
        close.textContent = stocksArray[i].close;
        var volume = document.createElement("td");
        volume.textContent = stocksArray[i].volume;
        var afterHours = document.createElement("td");
        afterHours.textContent = stocksArray[i].afterHours;
        var preMarket = document.createElement("td");
        preMarket.textContent = stocksArray[i].preMarket;

        // Append each column element to current row
        $("#row" + i).append(dataSymbol, open, high, low, close, volume, afterHours, preMarket);
    }
}
renderTable();





companySearchURL = "https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2020-06-01/2020-06-17?apiKey=5kUQVR6ehDpKIKtoUyoViEDjNNLj9MHv"










// Fetch Api for financial news 
fetch("https://yh-finance.p.rapidapi.com/news/v2/get-details?uuid=9803606d-a324-3864-83a8-2bd621e6ccbd&region=US", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "yh-finance.p.rapidapi.com",
		"x-rapidapi-key": "5kUQVR6ehDpKIKtoUyoViEDjNNLj9MHv"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});

function apinewsreponce(responce) {
    var newsEl  = responce

    $("#newsCardDeck").append(newsEl);



