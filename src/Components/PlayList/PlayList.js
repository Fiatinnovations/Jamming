import React, {Components} from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';

class PlayList extends React.Component{
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);

  }
  //This method handles the name change updatePlaylistName method passed down from the parent component App.
  handleNameChange(event){
    this.props.onNameChange(event.target.value);
  }
  render(){
    return(
      <div className="Playlist">
        <input onChange ={this.handleNameChange} value={this.props.playlistName}/>
        <TrackList onRemove = {this.props.onRemove} tracks={this.props.playlistTracks} isRemoval={true}/>
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
};

export default PlayList;
