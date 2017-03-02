var quotes = [
    {
        "quote":"We must be willing to get rid of the life we've planned, so as to have the life that is waiting for us.",
        "author":"Joseph Campbell"
    },
    {
        "quote":"Follow your bliss and the universe will open doors for you where there were only walls.",
        "author":"Joseph Campbell"
    },
    {
        "quote":"The cave you fear to enter holds the treasure you seek.",
        "author":"Joseph Campbell"
    }
];

$(document).ready(function() {
    $("#newQuote").on("click", newQuote));
});

function hashtagFromName(name) {
    var hash = name.split(' ').join('');
    return hash;
}

function newQuote() {
    var index = Math.floor(Math.random() * quotes.length);
    var quote = quotes[index].quote;
    var author = quotes[index].author;
    var authorHash = hashtagFromName(author);
    $('#quote-text').html(quote);
    $('#quote-author').html(author);
    $('#tweet').attr('href', 'https://twitter.com/intent/tweet?text=' + quote + '&hashtags=' + authorHash);
}
