$(document).ready(function(){
  var $searchArtistForm = $("#search-artist-form");
  $searchArtistForm.on("submit", function(event){
    event.preventDefault();
    console.info("submitted form");
  })
});