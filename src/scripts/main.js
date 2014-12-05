$(document).ready(function(){

  var SONG_KICK_API_KEY = "8y5HTUEItSCdxL0v";

  var $searchArtistForm = $("#search-artist-form");
  var $searchArtistName = $("#search-artist-name");
  var $searchTerm = $("#search-term");
  var $artistResults = $('#artist-results')
  var $gigListing = $("#gig-listing")
  var $searchTermDiv = $('#search-term-div')
  var $artistResultsDiv = $('#artist-results-div')
  var $gigListingDiv = $('#gig-listing-div')

  $searchTermDiv.hide();
  $artistResultsDiv.hide();
  $gigListingDiv.hide();

  var searchSongKick = function(artistName) {
    $.ajax({
      type: "GET",
      url: "http://api.songkick.com/api/3.0/search/artists.json",
      data: {
        query: artistName,
        apikey: SONG_KICK_API_KEY
      },
      success: function(resp) {
        if (typeof resp.resultsPage.results.artist === 'undefined') {
          console.log("boooo");
          $artistResults.html("Unable to find: " + artistName + ". Please search again");
          $artistResultsDiv.fadeIn(1500).show();
        } else {
          console.info("success!!!!!", resp);
          createArtistList(resp.resultsPage.results.artist);
        };
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error("NOOOO!!!!", jqXHR, textStatus, errorThrown);
        // Display an error
      }
    });
  };

  var createArtistList = function(artists) {
    var bestMatches = artists.slice(0,5)

    var artistTemplate = "<tr> <td> <a data-artist-id='{{id}}' class='confirm-artist'> {{displayName}} </a> </td> <tr>";

    $.each(bestMatches, function(i, item){
      var artistId = bestMatches[i].id
      var renderedArtists = Mustache.render(artistTemplate, item);

      $artistResults.append(renderedArtists);
      $artistResultsDiv.fadeIn(2500).show()
    });

    $('.confirm-artist').on("click", function(event) {
      event.preventDefault();
      var $clickedArtist = $(event.currentTarget);
      var artistID = $clickedArtist.data('artist-id');
      getArtistCalender(artistID);
    });
  };

  var getArtistCalender = function(artistID){
    $.ajax({
      type: 'GET',
      url: "http://api.songkick.com/api/3.0/artists/"+artistID+"/calendar.json",
      data: {
        apikey: SONG_KICK_API_KEY
      },
      success: function(resp) {
        if (typeof resp.resultsPage.results.event === 'undefined') {
          $gigListing.html(" Not currently touring");
          $artistResultsDiv.fadeOut();
          $gigListingDiv.fadeIn(3000).show();
        } else {
          createArtistGigListings(resp.resultsPage.results.event);
          $artistResultsDiv.fadeOut();
          console.log(resp.resultsPage.results);
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error("Nooo!!", jqXHR, textStatus, errorThrown);
        // Display an error
      }
    });
  }; 

  var createArtistGigListings = function(listings){
    var listingTemplate = "<tr> <td> <a href='{{uri}}'> {{venue.displayName}} </a></td> <td> {{location.city}} </td> <td> {{start.date}} </td></tr>";
    $.each(listings, function(i, item){
      var renderedGigs = Mustache.render(listingTemplate, item);
      $gigListing.append(renderedGigs);
    });
    $gigListingDiv.fadeIn(2500).show()
  };

  $searchArtistForm.on("submit", function(event){
    event.preventDefault();
    $artistResults.empty();
    $gigListing.empty();
    $gigListingDiv.hide();
    $searchTermDiv.fadeIn(1500).show()

    var artistName = $searchArtistName.val();
    $searchTerm.html(artistName);
    console.info("Searched for", artistName);

    searchSongKick(artistName);
    
  });

});

