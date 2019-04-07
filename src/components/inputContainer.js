import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import Rotate from 'react-reveal/Rotate';

import { submitLinks } from '../actions/index';

class InputContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      frontendLink: '',
      backendLink: '',
      renderFrontend: false,
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
    this.props.submitLinks(this.state.frontendLink, this.state.backendLink)
      .then(() => {
        this.props.history.push('/analyze');
      });
  }

  render() {
    const inputContainer = this.state.renderFrontend ?
      (
        <Fade bottom cascade>
          <div className="landing-input-container">
            <Rotate top left when={this.state.renderFrontEnd}>
              <div className="landing-input-label"> Frontend URL: </div>
            </Rotate>
            <input className="landing-input" onChange={this.handleChange} type="text" name="frontendLink" value={this.state.frontendLink} />
            <button className="toggle-input" onClick={this.toggleInput}><i className="fas fa-retweet" /> Backend API URL </button>
          </div>
          <button className="find-bugs hvr-rectangle-out" onClick={this.submitLinks}> Find bugs </button>
        </Fade>
      ) :
      (
        <Fade bottom cascade>
          <div className="landing-input-container">
            <Rotate top left when={!this.state.renderFrontEnd}>
              <div className="landing-input-label"> Backend API: </div>
            </Rotate>
            <input className="landing-input" onChange={this.handleChange} type="text" name="backendLink" value={this.state.backendLink} />
            <button className="toggle-input" onClick={this.toggleInput}><i className="fas fa-retweet" /> Frontend URL </button>
          </div>
          <button className="find-bugs hvr-rectangle-out" onClick={this.submitLinks}> Find bugs </button>
        </Fade>
      );

    return inputContainer;
  }
}

export default withRouter(connect(null, {
  submitLinks,
})(InputContainer));
