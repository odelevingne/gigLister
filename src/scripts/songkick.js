var SONG_KICK_API_KEY = "8y5HTUEItSCdxL0v";

var songKickApi = {
  searchArtist: function(artistName, options) {
    $.ajax({
      type: "GET",
      url: "http://api.songkick.com/api/3.0/search/artists.json",
      data: {
        query: artistName,
        apikey: SONG_KICK_API_KEY
      },
      success: options.success,
      error: options.error
    });
  },
  getArtistCalender: function(artistID, options){
    $.ajax({
      type: 'GET',
      url: "http://api.songkick.com/api/3.0/artists/"+artistID+"/calendar.json",
      data: {
        apikey: SONG_KICK_API_KEY
      },
      success: options.success,
      error: options.error
    });
  }    
};