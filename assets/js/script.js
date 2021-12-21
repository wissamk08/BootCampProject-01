// var searchInputEl = $("#search-input");
var headerEl = $(".section");
const tBodyEl = $("tbody");
const tRowEl = $("tr");

var apiKey = "5kUQVR6ehDpKIKtoUyoViEDjNNLj9MHv";


// Fix this to work for yesterday's date, if possible.
var date = moment().subtract(4, 'days').format("YYYY-MM-DD");
console.log(date);

var stocksArray = JSON.parse(localStorage.getItem("stock")) || [];



function getAPI() {
    var compTicker = $("#search-input").val();
    var companySearchURL = "https://api.polygon.io/v1/open-close/" + compTicker + "/" + date + "?adjusted=true&apiKey=" + apiKey;

    fetch(companySearchURL)
        .then(function (response) {
            return response.json();
    })
        .then(function (data) {

            console.log(data);
            
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
    });
}

search.addEventListener("click", getAPI);


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
        $("#row" + i).append(dataSymbol, stockDate, open, high, low, close, volume, afterHours, preMarket);

    }
}
renderTable();


// Fetch Api for financial news 
// fetch("https://yh-finance.p.rapidapi.com/news/v2/get-details?uuid=9803606d-a324-3864-83a8-2bd621e6ccbd&region=US", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "yh-finance.p.rapidapi.com",
// 		"x-rapidapi-key": "5kUQVR6ehDpKIKtoUyoViEDjNNLj9MHv"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });

// function apinewsreponce(responce) {
//     var newsEl  = responce

//     $("#newsCardDeck").append(newsEl);


// }
