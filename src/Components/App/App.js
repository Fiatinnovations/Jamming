import React, {Component} from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';
import Spotify from '../../util/Spotify';



class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      SearchResults:[],
      PlayListName:'myPlayList',
      PlayListTracks:[]
    };
      this.addTrack= this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this);
      this.savePlaylist = this.savePlaylist.bind(this);
      this.search = this.search.bind(this);
  }

  //This method adds a song to the playlist, this is passed down as an event to the Track component.
  addTrack(track){
    let tracks = this.state.PlayListTracks;
    tracks.push(track);
    this.setState({PlayListTracks:tracks});
  }
    //This method removes a song from the playlist, this is passed down as an event to the Track component as well.
  removeTrack(track){
    let tracks = this.state.PlayListTracks;
    tracks = tracks.filter(currentTrack =>currentTrack.id !== track.id);
    this.setState({PlayListTracks:tracks});

    }

  // This method updates the sate of the playlist name. It is passed down to the playlist component as an event
  updatePlaylistName(name){
    this.setState({PlayListName:name});

  }
  //This method saves the user playlist to his account.
  savePlaylist(){
    const trackUris = this.state.PlayListTracks.map(track=>track.uri);
    Spotify.savePlaylist(this.state.PlayListName,trackUris).then(()=>{
      this.setState({
        PlayListName: 'New PlayList Name',
        PlayListTracks: []
      });
    });
  }
  //This method displays the search result of the spotify API search.
  search(term){
    Spotify.search(term).then(searchResults=>{
      this.setState({SearchResults: searchResults});
    })
  }
  render(){
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch = {this.search}/>
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.SearchResults}/>
            <PlayList onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.PlayListName} playlistTracks={this.state.PlayListTracks} />
          </div>
        </div>
      </div>
    );
  }

}

export default App;
