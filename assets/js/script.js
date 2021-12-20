var apiKey = "5kUQVR6ehDpKIKtoUyoViEDjNNLj9MHv";

var company = "APPL";

// $(#search-input).val();
var compTicker = "APPL";
var date = moment().subtract(1, 'days').format("YYYY-MM-DD");
console.log(date);

function getAPI() {
    var companySearchURL = "https://api.polygon.io/v1/open-close/" + compTicker + "/" + date + "?adjusted=true&apiKey=" + apiKey;

    fetch(companySearchURL)

        .then(function (response) {
            return response.json();
    })
        .then(function (data) {
            console.log(data);
    });
}

getAPI();








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



