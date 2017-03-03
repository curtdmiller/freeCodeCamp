$(document).ready(function() {
    $.ajaxSetup({ cache: false }); // disable cache for getJSON calls
    firstQuote();
    $("#newQuote").on("click", newQuote);
});

function hashtagFromName(name) {
    var hash = name.split(' ').join('');
    return hash;
}
function firstQuote() {
    var quote, author, authorHash;
    $.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(json) {
        quote = json[0].content;
        author = json[0].title;
        authorHash = hashtagFromName(author);
        // quote is a string of html with a p tag, can be added directly to the blockquote but needs parsing for the tweet
        $('blockquote').html(quote + '<footer>' + author + '</footer>');
        $('#tweet').attr('href', 'https://twitter.com/intent/tweet?text="' + $.parseHTML(quote)[0].innerHTML + '"&hashtags=' + authorHash);
    });
}
function newQuote() {
    var quote, author, authorHash;
    $.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(json) {
        quote = json[0].content;
        author = json[0].title;
        authorHash = hashtagFromName(author);
        $('blockquote').fadeOut('slow', function(){
            $('blockquote').html(quote + '<footer>' + author + '</footer>');
            $('blockquote').fadeIn('slow');
        }); // toggle display of quote divs
        $('#tweet').attr('href', 'https://twitter.com/intent/tweet?text="' + $.parseHTML(quote)[0].innerHTML + '"&hashtags=' + authorHash);
    });
}
