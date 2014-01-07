$(document).ready(function(){
  $('#term').focus(function(){
    var full = $("#poster").has("img").length ? true : false;
    if(full == false){
      $('#poster').empty();
    }
  });

$.backstretch("./office.png", {fade: 670});
var moviedbkey = '951666d97c55c0056c047864524a2e6b';
var rottenkey = 'jz4zzubx6rgfgut8mjv8njdz';
var getData = function(searchterm){
  $.backstretch("./office.png", {fade: 670});
  var type = 'movie';
  var term = $(searchterm).val();
  if(term == ''){
      $('#poster').html("<h3 class='loading'>Please enter something.</h2>");
  } else {
    window.history.pushState('data', "Search", "?q="+encodeURIComponent(term).replace(/%20/g, '+'));
    document.getElementById('query').value=term;
    document.getElementById('query').placeholder="Enter a Movie.";
    $('#mainsearch').hide();
    $('#poster').html("<h3 class='loading'>Searching for " + term + "...</h2> <br>");
    $.getJSON("http://api.themoviedb.org/3/search/" + type + "?api_key=" + moviedbkey + "&query=" + term, function(json) {
      var totalresults = json['total_results'];
      if (totalresults != '0'){
        var posterpath = json['results']['0']['poster_path'];
        var backdrop_path = json['results']['0']['backdrop_path'];
        var profile_path = json['results']['0']['profile_path'];
        var movieid = json['results']['0']['id'];

        $.getJSON("http://api.themoviedb.org/3/" + type + "/" + movieid + "?api_key=" + moviedbkey, function(json2) {
          var imdbID = json2['imdb_id'];
          var title = json2['title'];
          var overview = json2['overview'];
          var runtime1 = json2['runtime'];
          var omdbvote = json2['vote_average'];
          var omdbvotecount = json2['vote_count'];
          var homepage = json2['homepage'];

            $('.data').show();
            $('.container').hide();

          $.getJSON("http://www.omdbapi.com/?i=" + imdbID + "&tomatoes=true", function(json3){
            var actors = json3['Actors'];
            var boxoffice = json3['BoxOffice'];
            var director = json3['Director'];
            var genre = json3['Genre'];
            var production = json3['Production'];
            var rated = json3['Rated'];
            var released = json3['Released'];
            var runtime = json3['Runtime'];
            var writer = json3['Writer'];
            var imdbRating = json3['imdbRating'];
            var imdbVotes = json3['imdbVotes'];
            var tomatoConsensus = json3['tomatoConsensus'];
            var tomatoMeter = json3['tomatoMeter'];
            var tomatoRating = json3['tomatoRating'];
            var tomatoReviews = json3['tomatoReviews'];
            var tomatoFresh = json3['tomatoFresh'];
            var tomatoRotten = json3['tomatoRotten'];
            var tomatoUserMeter = json3['tomatoUserMeter'];
            var tomatoUserRating = json3['tomatoUserRating'];
            var tomatoUserReviews = json3['tomatoUserReviews'];

            if (backdrop_path === null) {
              $.backstretch("./office.png", {fade: 670});
            }

            if (posterpath != null) {
              if (type === 'movie') {
                $.backstretch("http://cf2.imgobject.com/t/p/original" + backdrop_path, {fade: 670});
                var url = "http://cf2.imgobject.com/t/p/original" + posterpath;
                $('.data').append('<h3 id="title">'+title+' <a href="'+homepage+'"><i class="fa fa-external-link-square"></i></a> (' + released + ')</h3>'
                  +'<a id="img" href="'+url+'"><img id="thePoster" src=http://cf2.imgobject.com/t/p/w300'+posterpath+'/></a><br>');

                $('.data').append('<a href="http://www.themoviedb.org/movie/'+movieid+'">OMDB</a>: ')
                if (omdbvotecount !== 0) {
                  $('.data').append(omdbvote+'/10 ('+omdbvotecount+' votes)<br>');
                }
                else {
                  $('.data').append('No Ratings<br>');
                }

                if (imdbVotes !== 'N/A') {
                  $('.data').append('<a href="http://www.imdb.com/title/'+imdbID+'">IMDB</a>: ')
                  if (imdbVotes !== 0) {
                    $('.data').append('IMDB: '+imdbRating+'/10 ('+imdbVotes+' votes)<br>');
                  }
                  else {
                    $('.data').append('IMDB: ' + 'No Ratings<br>');
                  }
                }

                if (tomatoMeter !== 'N/A') {
                  $('.data').append('Rotten Tomatoes: ' + tomatoMeter+'% ('+tomatoReviews+')<br>');
                }
                if (tomatoConsensus !== 'N/A') {
                  $('.data').append('<i>"'+tomatoConsensus + '<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>');

                  // +'"</i><br>'+tomatoRating+'/10<br>'+tomatoReviews+'<br>'+tomatoFresh+'<br>'+tomatoRotten
                  // +'<br>'+tomatoUserMeter+'<br>'+tomatoUserRating+'<br>'+tomatoUserReviews+'<br><br><br><br><br><br><br><br><br><br><br>');
                }
                else {
                  $('.data').append('<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>');
                }

                document.getElementsByClassName('data')[0].setAttribute("id", "data");
              }
            }
            else {
              nothing();
            }
          });
          });
          } else {
            nothing();
          }
        });
    document.getElementById('query').value=term;
      }
      return false;
  }

$('#search').click(function() {
  getData('#term')
});
$('#term').keyup(function(event){
  if(event.keyCode == 13){
    getData('#term');
  }
});
$('#navbarclick').click(function() {
  getData('#navbarsearch')
});
$('#navbarsearch').keyup(function(event){
  if(event.keyCode == 13){
    getData('#navbarsearch');
  }
});

function get(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]).split('+').join(' ');
   return false;
}

var query = get('q');
if (query !== false) {
    document.getElementById('query').value=query;
    getData('#query');
   }
});



var nothing = function(){
  $('#poster').html("<h3 class ='loading'> I'm sorry, nothing could be found. Would you like to try again? </h2>");
  $.backstretch("./office.png", {fade: 670});
};

var imdbData = function(imdbID){
  $.ajaxSetup({
    async: false
  });
  json = 0;
  $.getJSON("http://www.omdbapi.com/?i=" + imdbID + "&tomatoes=true", function(imdbjson){
    json = imdbjson;
  });
  $.ajaxSetup({
    async: true
  });
  return json;
}