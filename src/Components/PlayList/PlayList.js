import React, {Components} from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';

class PlayList extends React.Component{
  render(){
    return(
      <div className="Playlist">
        <input value={'New Playlist'}/>
        <TrackList onRemove = {this.props.onRemove} tracks={this.props.playlistTracks} isRemoval={true}/>
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
};

export default PlayList;
