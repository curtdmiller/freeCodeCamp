$(document).ready(function() {
    $.ajaxSetup({ cache: false }); // disable cache for getJSON calls
    firstQuote();
    $(".refresh-btn").on("click", newQuote);
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
        $('.tweet-btn').attr('href', 'https://twitter.com/intent/tweet?text="' + $.parseHTML(quote)[0].innerHTML + '"&hashtags=' + authorHash);
    });
}
function newQuote() {
    var quote, author, authorHash;
    // change refresh button to spinner until ajax operation complete
    $('.refresh-btn').html('<i class="fa fa-spinner fa-lg fa-spin"></i>');
    $.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(json) {
        quote = json[0].content;
        author = json[0].title;
        authorHash = hashtagFromName(author);
        $('.refresh-btn').html('<i class="fa fa-refresh fa-lg"></i>');
        $('blockquote').fadeOut('slow', function(){
            $('blockquote').html(quote + '<footer>' + author + '</footer>');
            $('blockquote').fadeIn('slow');
        }); // toggle display of quote divs
        $('.tweet-btn').attr('href', 'https://twitter.com/intent/tweet?text="' + $.parseHTML(quote)[0].innerHTML + '"&hashtags=' + authorHash);
    });
}
