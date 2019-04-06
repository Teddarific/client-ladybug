import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Analyze extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div> Testing 123 </div>
    );
  }
}

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
);

export default withRouter(connect(mapStateToProps)(Analyze));
