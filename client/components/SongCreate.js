import React, { Component, PropTypes } from 'react';
import { Link, hashHistory } from 'react-router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import fetchSongs from '../queries/fetchSongs';
import createSong from '../queries/createSong';

class SongCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {title: ""};
    }
    
    onSubmit(event) {
        event.preventDefault();
        this.props.mutate({ 
          variables: { title: this.state.title },
          refetchQueries: [{ query: fetchSongs }]
        })
        .then(({ data }) => {
          console.log('got data', data);
          hashHistory.push('/')
        }).catch((error) => {
          console.log('there was an error sending the query', error);
        });
    }
    
    render() {
        return (
        <div>
          <Link to="/">Back</Link>
          <h3>Create a new song</h3>
          <form onSubmit={ this.onSubmit.bind(this) }>
              <label>Song Title</label>
              <input
                  onChange={ (event) => this.setState({ title: event.target.value }) }
                  value={ this.state.title }
              />
          </form>
        </div>
        );
    }
}

SongCreate.propTypes = {
  mutate: PropTypes.func.isRequired,
};

export default graphql(createSong)(SongCreate);