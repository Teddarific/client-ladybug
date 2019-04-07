import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import Modal from 'react-responsive-modal';

// Props:
// open
// onClose
// item

const RECOMMENDATION_MAP = {};

class ModalController extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let content = null;
    if (!this.props.item) {
      content = null;
    } else {
      let modalTitle = (<div className="modal-title title-success"> ✓ Success Details </div>);
      if (this.props.item.severity === 'warning') {
        modalTitle = (<div className="modal-title title-warning"> ⚠ Warning Details </div>);
      } else if (this.props.item.severity === 'error') {
        modalTitle = (<div className="modal-title title-error"> ⚠ Error Details </div>);
      }

      let meta = null;
      if (this.props.item.severity !== 'success') {
        meta = (
          <React.Fragment>
            <div className="modal-meta-helper"> The code in question (if applicable): </div>
            <SyntaxHighlighter language="html" style={docco}>
              {this.props.item.meta}
            </SyntaxHighlighter>
          </React.Fragment>
        );
      }

      content = (
        <div className="modal-content">
          {modalTitle}
          <div className="modal-c">
            <div className="modal-sect modal-fields">
              <div className="modal-field">
                <span className="modal-field-title"> URL: </span>
                <span className="modal-field-resp"> {this.props.item.URL} </span>
              </div>
              <div className="modal-field">
                <span className="modal-field-title"> Type: </span>
                <span className="modal-field-resp"> {this.props.item.type} </span>
              </div>
              <div className="modal-field">
                <span className="modal-field-title"> Info: </span>
                <span className="modal-field-resp"> {this.props.item.text} </span>
              </div>
            </div>
            <div className="modal-sect modal-meta">
              {meta}
            </div>
          </div>
        </div>
      );
    }
    return (
      <Modal
        open={this.props.open}
        onClose={this.props.onClose}
        classNames={{
                modal: 'modal-resp',
              }}
        center
        closeOnOverlayClick
        showCloseIcon
      >
        {content}
      </Modal>
    );
  }
}

export default ModalController;
