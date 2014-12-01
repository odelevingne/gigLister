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

    var artistTemplate = "<li> <a href='{{id}}' id='confirm-artist'> {{displayName}} </a> </li>";

    $.each(bestMatches, function(i, item){
      var artistId = bestMatches[i].id
      var renderedArtists = Mustache.render(artistTemplate, item);

      $('#artist-results').append(renderedArtists);

      $('#confirm-artist').on("click", function(event) {
        event.preventDefault();
        getArtistCalender(href);

      }); 

      var href = $("#confirm-artist").attr('href');


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

  getArtistCalender = function(href){
    $.ajax({
      type: 'GET',
      url: "http://api.songkick.com/api/3.0/artists/"+href+"/calendar.json?apikey=",
      data: {
        apikey: SONG_KICK_API_KEY
      },
      success: function(resp) {
        console.log(resp.resultsPage.results.event);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error("Nooo!!", jqXHR, textStatus, errorThrown);
      }
    });
  };

});

