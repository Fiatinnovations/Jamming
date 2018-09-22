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
  }
  //this method adds a song to the playlist state with the + button, this is passed down as an event to the track component.
  addTrack(track){
    if (this.state.PlayListTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
  }
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
            <PlayList onRemove={this.removeTrack} playlistName={this.state.PlayListName} playlistTracks={this.state.PlayListTracks} />
          </div>
        </div>
      </div>
    );
  }

}

export default App;
