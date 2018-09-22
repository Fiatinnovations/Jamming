import React, {Component} from 'react';
import './Track.css';

class Track extends React.Component{
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);

  }
  //This method adds a song to the playlist state with the + button, this is inherited from the parent component on App.
  addTrack(event){
    this.props.onAdd(this.props.track);
//This method adds a song to the playlist state with the + button, this is inherited from the parent component on App.
  }
  removeTrack(event){
    this.props.onRemove(this.props.track);

  }
  //This method is called when there is a click event to add or remove tracks from playlist and tracks to playlist from searchresult.
  renderAction(){
    return(this.props.isRemoval === true ? <a onClick={this.removeTrack}>-</a> : <a onClick={this.addTrack}>+</a>);
  }
  render(){
    return(
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} {this.props.track.album}</p>
        </div>
        <a className="Track-action">{this.renderAction()}</a>
      </div>
    );
  }
}

export default Track;
