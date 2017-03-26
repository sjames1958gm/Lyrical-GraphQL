import React, { Component, PropTypes } from 'react';import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import addLyricToSong from '../queries/addLyricToSong';

class LyricCreate extends Component {
    constructor(props) {
      super(props);
      this.state = {content: ""};
    }
    
    onSubmit(event) {
      event.preventDefault();
      this.props.mutate({ 
        variables: { 
          content: this.state.content,
          songId: this.props.songId
        },
      })
      .then(({ data }) => {
        this.setState({content: ""});
        console.log('got data', data);
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
    }
    
    render() {
        return (
        <div>
          <form onSubmit={ this.onSubmit.bind(this) }>
              <label>Add Lyric</label>
              <input
                  onChange={ (event) => this.setState({ content: event.target.value }) }
                  value={ this.state.content }
              />
          </form>
        </div>
        );
    }
}

export default graphql(addLyricToSong)(LyricCreate);