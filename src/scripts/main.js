$(document).ready(function(){

  var $searchArtistForm = $("#search-artist-form");
  var $searchArtistName = $("#search-artist-name");
  var $searchTerm = $("#search-term");
  var artistName;

  $searchArtistForm.on("submit", function(event){
    event.preventDefault();

    artistName = $searchArtistName.val();
    $searchTerm.html(artistName);
    
    console.info("Searched for", artistName);
  });
   


});

