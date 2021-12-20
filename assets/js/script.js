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







