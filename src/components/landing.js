import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { submitLinks } from '../actions/index';
import Logo from '../img/final_logo.png';
import LadybugTitle from '../img/ladybug.png';


import '../style.scss';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      frontendLink: '',
      backendLink: '',
      renderFrontend: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitLinks = this.submitLinks.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
  }

  toggleInput() {
    this.setState(prevState => ({
      renderFrontend: !prevState.renderFrontend,
    }));
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitLinks() {
    console.log(this.state.frontendLink);
    console.log(this.state.backendLink);
    this.props.submitLinks(this.state.frontendLink, this.state.backendLink)
      .then(() => {
        this.props.history.push('/analyze');
      });
  }

  // need logic on checking whether you get 200
  render() {
    if (this.state.renderFrontend) {
      return (
        <div className="container">
          <div className="landing-container">
            <img className="landing-logo" alt="logo" src={Logo} />
            <img className="landing-title" alt="title" src={LadybugTitle} />
            <div className="landing-motto"> Your own Q&A team, one click away. </div>
            <div className="landing-input-container">
              <div className="landing-input-label"> Link to frontend: </div>
              <input className="landing-input" onChange={this.handleChange} type="text" name="frontendLink" value={this.state.frontendLink} />
            </div>
            <div> MAKE SURE YOUR HTTPS VS HTTP IS CORRECT </div>
            <button className="toggle-input" onClick={this.toggleInput}><i className="fas fa-retweet" /> Backend </button>
            <button className="find-bugs" onClick={this.submitLinks}> Find bugs! </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="landing-container">
            <img className="landing-logo" alt="logo" src={Logo} />
            <img className="landing-title" alt="title" src={LadybugTitle} />
            <div className="landing-motto"> Your own Q&A team, one click away. </div>
            <div className="landing-input-container">
              <div className="landing-input-label"> Link to backend API: </div>
              <input className="landing-input" onChange={this.handleChange} type="text" name="backendLink" value={this.state.backendLink} />
            </div>
            <button className="toggle-input" onClick={this.toggleInput}><i className="fas fa-retweet" /> Frontend </button>
            <button className="find-bugs" onClick={this.submitLinks}> Find bugs! </button>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(connect(null, {
  submitLinks,
})(Landing));
