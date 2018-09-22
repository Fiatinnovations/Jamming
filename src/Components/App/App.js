import React, {Component} from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';



class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      SearchResults:['name', 'artist', 'album', 'id'],
      PlayListName:'myPlayList',
      PlayListTracks:['name','artist','id']
    };
      this.addTrack= this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }
  // This method updates the sate of the playlist name. It is passed down to the playlist component as an event
  updatePlaylistName(name){
    this.setState({PlayListName:name});

  }
  //This method adds a song to the playlist, this is passed down as an event to the track component.
  addTrack(track){
    if (this.state.PlayListTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
  }
    //This method removes a song from the playlist, this is passed down as an event to the track component as well.
  removeTrack(track){
    if (this.state.PlayListTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
  }
  render(){
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar/>
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.SearchResults}/>
            <PlayList onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.PlayListName} playlistTracks={this.state.PlayListTracks} />
          </div>
        </div>
      </div>
    );
  }

}

export default App;
