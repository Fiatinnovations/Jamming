//Attach the clientId to a variable
const clientId = '';
//const redirectUri = "http://localhost:3000/";
const redirectUri = "wejamming.surge.sh";
//Spotify authorize uri
const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`

let accessToken = undefined;
let expiresIn = undefined;

const Spotify = {
//  Check to see if the user Access Token is set, if it is, return the Access Token.
  getAccessToken(){
    if(accessToken){
      return accessToken;
    }
// If the access token is not already set, check the URL to see if it has just been obtained.
    let urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    let urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if(urlAccessToken && urlExpiresIn){
      accessToken = urlAccessToken[1];
      expiresIn = urlExpiresIn[1];
      //Set the Access token to expire at the value of the expiration time.
      window.setTimeout(()=>accessToken = '', expiresIn * 1000);
      //clear the parameter from the URL, so that the app doesn't try grabbing the access token after it has expired
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    }else{
      window.location = spotifyUrl;
    }

  },

  search(term){
    accessToken = Spotify.getAccessToken();
    //console.log(accessToken);
    const thisUrl = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    return fetch(thisUrl,{
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response=>{
      if(response.ok){
        return response.json();
      }else{
        console.log('Error! Failed to return Request')
      }
    }).then(jsonResponse=>{
      //console.log(jsonResponse);
      if(!jsonResponse.tracks) {
        return [];
    }else {
      //Set the URIs parameter to an array of track URIs.
      return jsonResponse.tracks.items.map(track=>{
        return  {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
            coverArt: track.album.images[2].url
          }
    }
    );

    }

    });
  },
  //This Method saves the playlist to a user profile on spotify
  savePlaylist(name, trackUris) {

  		if (!name || !trackUris || trackUris.length === 0) return;

      const accessToken = Spotify.getAccessToken();

  		//user URL
  		const userUrl = 'https://api.spotify.com/v1/me';
  		let userId = undefined;
  		let playlistId = undefined;

  		const headers = {
  		  Authorization: `Bearer ${accessToken}`
  		};

  		return fetch(userUrl, {headers: headers})
  		.then(response => response.json())
  		.then(jsonResponse => userId = jsonResponse.id)
  		.then(() => {
  			const createPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
  			return fetch(createPlaylistUrl, {
  				method: 'POST',
  				headers: headers,
  				body: JSON.stringify({
  					name: name
  				})
  			})
  			.then(response => response.json())
  			.then(jsonResponse => playlistId = jsonResponse.id)
  			.then(() => {
  				const addPlaylistTracksUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
  				return fetch(addPlaylistTracksUrl, {
  					method: 'POST',
  					headers: headers,
  					body: JSON.stringify({
  						uris: trackUris
  					})
  			  });
  			})
  		})
    }
};

export default Spotify
