import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import fetchSongs from '../queries/fetchSongs';
import deleteSong from '../queries/deleteSong';

class SongList extends Component {
    constructor() {
        super();
    }
    
    onSongDelete(id) {
        this.props.mutate({ 
          variables: { id }
        })
        .then(({ data }) => {
          this.props.data.refetch();
          console.log('got data', data);
        }).catch((error) => {
          console.log('there was an error sending the query', error);
        });
    }
    
    onSongDetail(id) {
      
    }
    
    renderSongs() {
      return this.props.data.songs.map(({id, title}) => {
        return <li key={id} className="collection-item" onClick={ this.onSongDetail(id) }>
        <Link to={`/song/${id}`}>{title}</Link>
        <i className="material-icons delete" onClick={() => this.onSongDelete(id)}>delete</i>
        </li>;
      });
    }
    
    render() {
      if (this.props.data.loading) return <div>Loading . . .</div>;

        return (
          <div>
            <ul className="collection">
              {this.renderSongs()}
            </ul>
            <Link to="/songs/new" className="btn-floating btn-large blue right">
            <i className="material-icons">add</i>
            </Link>
          </div>
        );
    }
}

export default graphql(deleteSong)(graphql(fetchSongs)(SongList));

