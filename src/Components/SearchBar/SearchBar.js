import React, {Component} from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      term: ''
    }
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  //This method binds to the
  search(){
    this.props.onSearch(this.state.term);
  }

  handleTermChange(event){
    this.setState({term:event.target.value});

  }


  render(){
    return(
      //The SearchBar listens for enter key and searches the spotify API
      <div className="SearchBar">
        <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, Artist"
          onKeyDown={(event)=>{
            if(event.keyCode === 13){
              document.getElementById('btnSearch').click();
            }
          }} />
          <a id="btnSearch" onClick={this.search}>SEARCH</a>

      </div>
    );
  }

};
export default SearchBar;
