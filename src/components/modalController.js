import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import Modal from 'react-responsive-modal';

/* eslint no-unused-vars: 0 */
// Props:
// open
// onClose
// item

// maps type to recommendation
const RECOMMENDATION_MAP =
{
  'inaccessible colors': 'Consider avoiding strong red and green colors, which are inaccessible for colorblind users and may seem your page differently.',
  'accessibility for colorblind users': 'A high contrast ratio is important for accessbility, so that your website can be read by people with moderately low vision. This is standardized by the W3 - Web Accessiblity Initiative. Follow their rules.',
  'small text': 'We recommend a font-size of at least 12px, so that users do not have to zoom in on your page.',
  'possible broken link': 'A broken link signals that your website may stil be in development. Ensure all links are valid to avoid an unprofessional feel.',
  'too many header elements': 'Win at marketing! Google and other search engines recommend to only have one h1 element for the best SEO results.',
  'inline styles': 'Inline styles are bad practice. We recommend using a seperate style sheet. Always be consistent!',
  'broken button': 'A button that leads to nowhere may throw off your users. Ensure all your buttons have an action.',
  'basic password security': 'Always use extremely long, unique, and randomly generated passwords. This is critical.',
  'response time': 'Slow response times may make you lose users. Check the logic of your backend service and ensure it has solid connectivity.',
};

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
            <div className="modal-meta-helper"> The item in question (if applicable): </div>
            <SyntaxHighlighter language="html" style={docco}>
              {this.props.item.meta}
            </SyntaxHighlighter>
          </React.Fragment>
        );
      }

      const rec = this.props.item.type in RECOMMENDATION_MAP ?
        (
          <div className="modal-field">
            <span className="modal-field-title"> Recommendation: </span>
            <span className="modal-field-resp"> {RECOMMENDATION_MAP[this.props.item.type]} </span>
          </div>
        ) : null;

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
              {rec}
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
