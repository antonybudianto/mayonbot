import React, { Component } from 'react';
import { Loading } from 'react-simple-chatbot';

class GitHubBotResponder extends Component {
  state = {
    loading: false,
    loadingStar: false,
    repos: [],
    result: '',
    trigger: false,
  };

  componentWillMount() {
    const { steps } = this.props;
    this.fetchUser(steps.username.value);
    this.countStar();
  }

  async countStar() {
    const self = this;
    const { steps } = this.props;
    const username = steps.username.value;
    let lastPage = false;
    let page = 1;
    let repos = [];
    this.setState({
      loadingStar: true
    });

    while(lastPage === false) {
      try {
        let res = await fetch(`https://api.github.com/users/${username}/repos?page=${page}&per_page=100`);
        let result = await res.json();
        if (result.message) throw new Error(result.message);
        lastPage = result.length === 0;
        repos = [...repos, ...result];
        if (lastPage) {
          self.setState({
            loadingStar: false,
            repos
          });
        } else {
          page++;
        }
      } catch (err) {
        self.setState({
          loadingStar: false
        });
        lastPage = true;
      }
    }
  }

  async fetchUser(username) {
    this.setState({
      loading: true
    });
    try {
      let res = await fetch(`https://api.github.com/users/${username}`);
      let result = await res.json();
      this.setState({
        loading: false,
        result
      });
    } catch (e) {
      this.setState({
        loading: false,
        result: e.message
      });
    }
  }

  triggetNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

  render() {
    const { trigger, loading, result } = this.state;

    return (
      <div>
      { loading ? <Loading /> : (
        <div>
          <div style={{
            textAlign: 'center'
          }}>
          <img alt={result.name} src={result.avatar_url} width="100" height="100"/> <br/>
          <strong>{this.state.loadingStar ? 'loading' : this.state.repos.reduce((a, c) => a + c['stargazers_count'], 0)}</strong> stars <br/>
          </div>
          <table>
            <tbody>
              <tr>
                <th>Name:</th><td> {result.name}</td>
              </tr>
              <tr>
                <th>Location:</th><td> {result.location || '-'}</td>
              </tr>
              <tr>
                <th>Company:</th><td> {result.company || '-'}</td>
              </tr>
              <tr>
                <th>Followers:</th><td> {result.followers}</td>
              </tr>
              <tr>
                <th>Following:</th><td> {result.following}</td>
              </tr>
              <tr>
                <th>Repos:</th>
                <td>
                  All: {this.state.repos.length} <br/>
                  Forks: {this.state.repos.filter(r => r.fork).length} <br/>
                  Sources: {this.state.repos.filter(r => !r.fork).length}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) }
      {
          !loading &&
          <div
            style={{
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            {
              !trigger &&
              <button
                onClick={() => this.triggetNext()}
              >
                Search Again
              </button>
            }
          </div>
        }
      </div>
    );
  }
}

export default GitHubBotResponder;
