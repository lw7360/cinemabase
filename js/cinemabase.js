var searchMovie = function () {
    var key = '951666d97c55c0056c047864524a2e6b';
    var movie = $('#query').val();
    if (movie.length > 0) {
        $('#poster').text('Searching for "' + movie + '".');
        $.getJSON('http://api.themoviedb.org/3/search/movie?api_key=' + key + '&query=' + movie,
            function (json) {
                if (json.total_results === 0) {
                    $('#poster').text('Could not find a poster for "' + movie + '".');
                } else {
                    var posterpath = 'http://cf2.imgobject.com/t/p/original' + json.results[0].poster_path;
                    $('#poster').html('<a href="' + posterpath + '"><img id="thePoster" src="' + posterpath + '"></a>')
                }
            });
    } else {
        $("#poster").html("Please enter something.")
    };
}

$("#search").click(searchMovie);

$('#query').keyup(function (event) {
    if (event.keyCode == 13) {
        searchMovie();
    }
});