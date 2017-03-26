import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import likeLyric from '../queries/likeLyric';

class LyricList extends Component {
  onLike(id, likes) {
    this.props.mutate({ 
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id: id,
          __typename: "LyricType",
          likes: likes + 2
        }
      }
    })
    .then(({ data }) => {
      console.log('got data', data);
    }).catch((error) => {
      console.log('there was an error sending the query', error);
    });
  }
  
  render() {
    return (<ul className="collection">
      {this.props.lyrics.map(({id, content, likes}) => (
        <li className="collection-item row" key={id}>
          <div className="col s9">
          <span>{content}</span>
          </div>
          <div className="col s2">
          <span>Likes: {likes}</span>
          </div>
          <div className="col s1">
          <i className="material-icons like pointer"
            onClick={ () => this.onLike(id, likes) }>
            thumb_up
          </i>
          </div>
        </li>
      ))}
    </ul>);
  }
}

export default graphql(likeLyric)(LyricList);
