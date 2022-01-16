import React, { Component } from 'react';
import axios from 'axios';
import Modal from './MyModal';
import Button from 'react-bootstrap/button';

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
      show: false,
      data: {},
      title: '',
      user: {},
    };
  }
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleClick = async (e) => {
    e.preventDefault();
    await axios
      .get(
        `https://api.unsplash.com/search/photos?query=${this.state.query}&page=${this.state.page}&client_id=${this.state.client_id}`
      )
      .then((response) =>
        this.setState({ pics: response.data.results, data: response.data })
      );
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
          {this.state.pics.map((pic) => (
            <div className="card" key={pic.id}>
              <img
                className="card--image"
                alt={pic.alt_description}
                src={pic.urls.small}
                width="50%"
                height="50%"
              ></img>
              {/* <div className="more-div"> */}
              <Button
                className="button my-btn"
                onClick={() =>
                  this.setState({
                    show: true,
                    url: pic.urls.regular,
                    title: pic.description,
                    user: pic.user,
                  })
                }
              >
                MORE
              </Button>
              {/* </div> */}
            </div>
          ))}
          <Modal
            title={this.state.title}
            onClose={() => this.setState({ show: false })}
            show={this.state.show}
            url={this.state.url}
            user={this.state.user}
          >
            <p>This is modal body</p>
          </Modal>
        </div>
      </div>
    );
  }
}

export default PictureApp;
