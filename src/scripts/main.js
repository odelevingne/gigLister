$(document).ready(function(){

  var SONG_KICK_API_KEY = "8y5HTUEItSCdxL0v";

  var $searchArtistForm = $("#search-artist-form");
  var $searchArtistName = $("#search-artist-name");
  var $searchTerm = $("#search-term");

  var searchSongKick = function(artistName) {
    $.ajax({
      type: "GET",
      url: "http://api.songkick.com/api/3.0/search/artists.json",
      data: {
        query: artistName,
        apikey: SONG_KICK_API_KEY
      },
      success: function(resp) {
        console.info("success!!!!!", resp);
        // Display results in a list somewhere

        createArtistList(resp.resultsPage.results.artist);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error("NOOOO!!!!", jqXHR, textStatus, errorThrown);
        // Display and error
      }
    });
  };

  var createArtistList = function(artists) {
    var bestMatches = artists.slice(0,5)

    var template = "<li> {{displayName}} </li>";

    $.each(bestMatches, function(i, item){

      var renderedArtists = Mustache.render(template, item)
      $('#artist-results').append(renderedArtists);

    });
    console.log(artists);
  };

  $searchArtistForm.on("submit", function(event){
    event.preventDefault();

    var artistName = $searchArtistName.val();
    $searchTerm.html(artistName);

    console.info("Searched for", artistName);

    searchSongKick(artistName);
    
  });
  

});

