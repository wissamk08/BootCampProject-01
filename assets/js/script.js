// var searchInputEl = $("#search-input");
var headerEl = $(".section");
const tBodyEl = $("tbody");
const tRowEl = $("tr");


var apiKey = "5kUQVR6ehDpKIKtoUyoViEDjNNLj9MHv";
var newsApiKey = "5kUQVR6ehDpKIKtoUyoViEDjNNLj9MHv";
// $(#search-input).val();

// Fix this to work for yesterday's date, if possible.
var date = moment().subtract(4, 'days').format("YYYY-MM-DD");
console.log(date);

var stocksArray = JSON.parse(localStorage.getItem("stock")) || [];



function getAPI() {
    var compTicker = $("#search-input").val().toUpperCase();
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

// search.addEventListener("click", getAPI);
// getAPI();



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



companySearchURL = "https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2020-06-01/2020-06-17?apiKey=5kUQVR6ehDpKIKtoUyoViEDjNNLj9MHv"


// Fetch Api for Financial News 

function getNewsApi() {

	fetch("https://tech-news3.p.rapidapi.com/wired", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "tech-news3.p.rapidapi.com",
		"x-rapidapi-key": "fb63a7b6d5msh7afd34be9d3a803p195cdajsn344d92ba3d99"
	}
	})
	.then(response => {
		return response.json();
		

	}).then(function(data) {

		console.log(data)
		

		renderNews(data);
	})
}

function renderNews(news) {
	// Create column for every object in news
    // Limiting the Array output to one object per output
	for(i = 19; i < news.length; i++) {

		console.log(news)

        // NEWS CARD 1 ============
		const newsCardBody1 = document.createElement("div")

		const newsHeadLines = document.createElement("h2");

		newsHeadLines.textContent = news[0].title

		const newsImg = document.createElement("img")
        // img.src = newsImg.textContent
        // var src = document.getElementById("header1");
        // src.appendChild(img);

		newsImg.textContent = news[0].img

		const newsPara = document.createElement("p");

		newsPara.textContent = news[0].para

		const newsLink = document.createElement("a");

		newsLink.textContent = news[0].link
        // Appending Parameters to Card
        newsCardBody1.append(newsImg, newsHeadLines, newsPara, newsLink);
        // Appending Card to newsCard Element
        $("#newsCard1").append(newsCardBody1);
        

        // NEWS CARD 2 ===========

        const newsCardBody2 = document.createElement("div")

		const newsHeadLines2 = document.createElement("h2");

		newsHeadLines2.textContent = news[1].title

		const newsImg2 = document.createElement("img");

		newsImg2.img = news[1].img

		const newsPara2 = document.createElement("p");

		newsPara2.textContent = news[1].para

		const newsLink2 = document.createElement("a");

		newsLink2.textContent = news[1].link
         // Appending Parameters to Card
        newsCardBody2.append(newsHeadLines2, newsPara2, newsLink2, newsImg2);
        // Appending Card to newsCard Element
        $("#newsCard2").append(newsCardBody2);

        // NEWS CARD 3 ===========

        const newsCardBody3 = document.createElement("div")

		const newsHeadLines3 = document.createElement("h2");

		newsHeadLines3.textContent = news[2].title

		const newsImg3 = document.createElement("img");

		newsImg3.img = news[2].img

		const newsPara3 = document.createElement("p");

		newsPara3.textContent = news[2].para

		const newsLink3 = document.createElement("a");

		newsLink3.textContent = news[2].link
         // Appending Parameters to Card
        newsCardBody3.append(newsHeadLines3, newsPara3, newsLink3, newsImg3);
        // Appending Card to newsCard Element
		$("#newsCard3").append(newsCardBody3);

        // NEWS CARD 4 ===========

        const newsCardBody4 = document.createElement("div")

		const newsHeadLines4 = document.createElement("h2");

		newsHeadLines4.textContent = news[3].title

		const newsImg4 = document.createElement("img");

		newsImg4.textContent = news[3].img

		const newsPara4 = document.createElement("p");

		newsPara4.textContent = news[3].para

		const newsLink4 = document.createElement("a");

		newsLink4.textContent = news[3].link
        // Appending Parameters to Card
        newsCardBody4.append(newsHeadLines4, newsPara4, newsLink4, newsImg4);
        // Appending Card to newsCard Element
		$("#newsCard4").append(newsCardBody4);

        // NEWS CARD 5 ===========

        const newsCardBody5 = document.createElement("div")

		const newsHeadLines5 = document.createElement("h2");

		newsHeadLines5.textContent = news[4].title

		const newsImg5 = document.createElement("img");

		newsImg5.img = news[4].img

		const newsPara5 = document.createElement("p");

		newsPara5.textContent = news[4].para

		const newsLink5 = document.createElement("a");

		newsLink5.textContent = news[4].link
        // Appending Parameters to Card
        newsCardBody5.append(newsHeadLines5, newsPara5, newsLink5, newsImg5);
        // Appending Card to newsCard Element
		$("#newsCard5").append(newsCardBody5);

	}
}



// getNewsApi();




// Possible Api for Exchange charts

// http://api.marketstack.com/v1/exchanges
//     ? access_key = YOUR_ACCESS_KEY

//     & limit = 100
//     & offset = 0