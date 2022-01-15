import React, { Component } from 'react';
import axios from 'axios';

class PictureApp extends Component {
  constructor(props) {
    super(props);
    // const fetchUrl = `https://api.unsplash.com/search/photos?client_id=${client_id}&query=${query}&page=${page}`;

    this.state = {
      url: '',
      client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
      secret: process.env.REACT_APP_UNSPLASH_SECRET_KEY,
      query: '',
      page: '1',
      pics: [],
    };
  }

  // componentDidMount() {
  //   axios
  //     .get('https://source.unsplash.com/random')
  //     .then((response) => this.setState({ url: response.request.responseURL }));
  // }

  handleClick = async (e) => {
    e.preventDefault();
    await axios
      .get(
        `https://api.unsplash.com/search/photos?query=${this.state.query}&page=${this.state.page}&client_id=${this.state.client_id}`
      )
      .then((response) => this.setState({ pics: response.data.results }));
  };

  render() {
    console.log(this.state.pics);
    return (
      <div className="container">
        <h1 className="title">React Photo Search</h1>
        <form className="form" onSubmit={this.handleClick}>
          <label className="label" htmlFor="query">
            {' '}
            📷
          </label>
          <input
            type="text"
            name="query"
            className="input"
            placeholder={`Try "dog" or "apple"`}
            value={this.state.query}
            onChange={(e) => this.setState({ query: e.target.value })}
          />
          <button type="submit" className="button">
            Search
          </button>
        </form>
        <div className="card-list">
          <img alt="" src={this.state.url}></img>
          {this.state.pics.map((pic) => (
            <div className="card" key={pic.id}>
              <img
                className="card--image"
                alt={pic.alt_description}
                src={pic.urls.small}
                width="50%"
                height="50%"
              ></img>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default PictureApp;
