import React, { Component } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong';
import LyricCreate from '../components/LyricCreate'
import LyricList from '../components/LyricList'

class SongDetail extends Component {
  
  render() {
    let song = this.props.data.song;
    let title = song ? song.title : "";
    let lyricList = song ? <LyricList lyrics={song.lyrics}/> : "";
    return (
    <div>
      <Link to="/">Back</Link>
      <h3>{title}</h3>
      {lyricList}
      <LyricCreate songId={this.props.params.id}/>
    </div>);
  }
}


export default graphql(fetchSong, {
  options: (props) =>  { return {variables: {id: props.params.id }}}
})(SongDetail);