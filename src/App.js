import React from 'react';
import { graphql } from 'react-apollo';

import gql from 'graphql-tag';

import './App.css';

const tweetsQuery = gql`
query {
  me {
    twitter {
      name
      screenName
      timeline(limit: 5) {
        tweets {
          id
          idStr
          text
          createdAt
        }
      }
    }
  }
}
`;

const TweetList = ({ data: { loading, error, me }}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  // const { timeline: { tweets }, name, screenName } = me.twitter;

  const tweets = me.twitter.timeline.tweets;
  const name = me.twitter.name;
  const handle = me.twitter.screenName;

  return (
    <div>
      <h3>{name}</h3>
      <div className="columns is-multiline">
        { tweets.map( t => 
          <div key={t.id} className="column is-one-third">
            <div className="card content">
              <div className="card-content">
                <p>{t.text}</p>
              </div>
              <footer className="card-footer">
                <p className="card-footer-item">
                  <span>
                    View on <a href={`https://twitter.com/${handle}/status/${t.idStr}`}>Twitter</a>
                  </span>
                </p>
              </footer>
            </div>
          </div>
        )}
      </div>
    </div>
  )
};

const App = graphql(tweetsQuery)(TweetList)
export default App;
