import React, { Component } from "react";
import OneGraphAuth from 'onegraph-auth';

import Config from './Config';

const auth = new OneGraphAuth({
  appId: Config.appId,
  service: 'twitter'
})

export default class AuthTwitter extends Component {
  constructor(props) {
    super()

    const logged = '';
    // const logged = localStorage.getItem('logged');
    this.state = { 
      // string -> boolean
      logged: logged ? (logged === 'true') : false 
    };
  }

  login = async () => {
    try {
      await auth.login();
      const isLoggedIn = await auth.isLoggedIn();

      if (isLoggedIn) {
        console.log('Successfully logged in to ' + auth.service);
        this.setState({ logged: true })
      } else {
        console.log('Did not grant auth for service ' + auth.service);
        this.setState({ logged: false })
      }
    } catch (e) {
      console.error('Problem logging in', e);
    }
  }

  isAuthenticated() {
    return this.state.logged;
  }

  render() {
    return (
      <div>
        <h1 className="title">My Tweets via OneGraph</h1>
        {
          this.isAuthenticated() &&
          <div>
            <article class="message is-success">
              <div class="message-header">
                <p>Success</p>
                <button class="delete" aria-label="delete"></button>
              </div>
              <div class="message-body">
                You are logged in! 
              </div>
            </article>
            {this.props.children}
          </div>
        }
        {
          !this.isAuthenticated() && 
          <div>
            <a
              style={{ cursor: 'pointer' }}
              onClick={this.login}
              className="button"
            >
              Log in to continue
            </a>
          </div>
        }
      </div>
    );
  }
}
