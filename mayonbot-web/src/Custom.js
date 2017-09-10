import React, { Component } from 'react';
import { Loading } from 'react-simple-chatbot';

class Custom extends Component {
  state = {
    loading: true,
    result: '',
    trigger: false,
  };

  componentWillMount() {
    this.countStar();
  }

  async countStar() {
    const self = this;
    const { steps } = this.props;
    const username = steps.username.value;
    let lastPage = false;
    let page = 1;
    let stars = 0;

    while(lastPage === false) {
      try {
        let res = await fetch(`https://api.github.com/users/${username}/repos?page=${page}&per_page=100`);
        let result = await res.json();
        if (result.message) throw new Error(result.message);
        lastPage = result.length === 0;
        stars += result.reduce((acc, curr) => acc + curr.stargazers_count, 0);
        if (lastPage) {
          self.setState({
            loading: false,
            result: `${username} has ${stars} stars total`
          });
        } else {
          page++;
        }
      } catch (err) {
        self.setState({
          loading: false,
          result: err.message
        });
        lastPage = true;
      }
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
      { loading ? <Loading /> : result }
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

export default Custom;
