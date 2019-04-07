import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import LightSpeed from 'react-reveal/LightSpeed';
import Rotate from 'react-reveal/Rotate';
import Typing from 'react-typing-animation';

import { submitLinks } from '../actions/index';
import Logo from '../img/final_logo.png';
import LadybugTitle from '../img/ladybug.png';
import LeafLeft from '../img/leaf-left.png';
import LeafTop from '../img/leaf-top.png';

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
    this.props.submitLinks(this.state.frontendLink, this.state.backendLink)
      .then(() => {
        this.props.history.push('/analyze');
      });
  }

  // need logic on checking whether you get 200
  render() {
    const inputContainer = this.state.renderFrontend ?
      (
        <Fade bottom cascade>
          <div className="landing-input-container">
            <Rotate top left when={this.state.renderFrontEnd}>
              <div className="landing-input-label"> Frontend URL: </div>
            </Rotate>
            <input className="landing-input" onChange={this.handleChange} type="text" name="frontendLink" value={this.state.frontendLink} />
            <button className="toggle-input" onClick={this.toggleInput}><i className="fas fa-retweet" /> Backend API URL: </button>
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
            <button className="toggle-input" onClick={this.toggleInput}><i className="fas fa-retweet" /> Frontend URL: </button>
          </div>
          <button className="find-bugs hvr-rectangle-out" onClick={this.submitLinks}> Find bugs </button>
        </Fade>
      );

    return (
      <div className="container">
        <img className="lower-left" alt="leaf-upper" src={LeafLeft} />
        <img className="top-right" alt="leaf-top" src={LeafTop} />
        <div className="landing-container">
          <Fade top cascade>
            <img className="landing-logo" alt="logo" src={Logo} />
            <img className="landing-title" alt="title" src={LadybugTitle} />
          </Fade>
          <Typing className="typer" loop>
            <span> Your own QA team, one click away. </span>
            <Typing.Backspace delay={800} count={34} />
            <span> Full-stack automated testing suite, all for free. </span>
            <Typing.Backspace delay={800} count={50} />
            <span> Built on proven research. </span>
            <Typing.Backspace delay={800} count={26} />
          </Typing>
          {inputContainer}
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, {
  submitLinks,
})(Landing));
