setTimeout(function() {
    $("body").addClass("loaded");
}, 2000); // 2 second delay

// Optional: To save on MediaWiki API calls, you may like to get a shortlist of years first and make a large API call

var years = [];
$(".record").each(function() {
    recordYear = $(this).find(".year span").text();
    // Check if this year has already been found
    if(!years.includes(recordYear)) {
        years.push(recordYear);
    }
});