import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

import Terminal from './terminal';

let socket;

class Analyze extends Component {
  constructor(props) {
    super(props);

    this.state = {
      endpoint: 'http://0.0.0.0:5000',
      data: [],
      successes: 0,
      warnings: 0,
      errors: 0,
    };
  }

  componentDidMount() {
    socket = socketIOClient(this.state.endpoint);
    socket.emit('init', this.props.links);
    socket.on('data', (data) => {
      const joined = this.state.data.concat(data);
      let { successes, warnings, errors } = this.state;

      if (data.severity === 'success') {
        successes += 1;
      } else if (data.severity === 'warning') {
        warnings += 1;
      } else if (data.severity === 'error') {
        errors += 1;
      }

      this.setState({
        data: joined,
        successes,
        warnings,
        errors,
      });
    });
  }

  render() {
    return (
      <div className="analyze-container">
        <div className="nav">
          <div className="nav-title"> Ladybug </div>
        </div>
        <Terminal
          className="terminal"
          items={this.state.data.concat({ severity: 'space' })}
          successes={this.state.successes}
          warnings={this.state.warnings}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    links: state.links,
  }
);

export default withRouter(connect(mapStateToProps)(Analyze));
