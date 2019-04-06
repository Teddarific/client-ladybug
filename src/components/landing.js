import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { submitLinks } from '../actions/index';

import '../style.scss';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      frontendLink: '',
      backendLink: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitLinks() {
    this.props.submitLinks(this.state.frontendLink, this.state.backendLink).then(() => {
      this.props.history.push('/analyze');
    });
  }

  render() {
    return (
      <div className="landing-container">
        <div className="landing-title"> Ladybug </div>
        <div className="landing-motto"> Your own Q&A team, one click away. </div>
        <div className="landing-input-container">
          <div className="landing-input-label"> Link to frontend: </div>
          <input className="landing-input" onChange={this.handleChange} type="text" name="frontendLink" value={this.state.frontendLink} />
        </div>
        <div className="landing-input-container">
          <div className="landing-input-label"> Link to backend API: </div>
          <input className="landing-input" onChange={this.handleChange} type="text" name="backendLink" value={this.state.backendLink} />
        </div>
        <button className="landing-start" onClick={this.submitLinks}> Find bugs! </button>
      </div>
    );
  }
}

export default withRouter(connect(null, {
  submitLinks,
})(Landing));
