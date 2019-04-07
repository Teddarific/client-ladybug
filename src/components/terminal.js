import React from 'react';
import autoscroll from 'autoscroll-react';

/* eslint react/prefer-stateless-function: 0 */

const styles = {
  overflowY: 'scroll',
  height: '300px',
};

class Output extends React.Component {
  render() {
    const { items } = this.props;


    const renderItem = (item) => {
      let rendered = null;
      switch (item.severity) {
        case 'info':
          rendered = (
            <li>
              <span className="terminal-carrot"> {'> '} </span>
              <span className="terminal-info-text"> {item.text} </span>
            </li>
          );
          break;
        case 'success':
          rendered = (
            <li>
              <span className="terminal-success"> {item.text} </span>
            </li>
          );
          break;
        case 'warning':
          rendered = (
            <li>
              <span className="terminal-warning"> ⚠ </span>
              <span className="terminal-warning"> {item.text} </span>
            </li>
          );
          break;
        case 'error':
          rendered = (
            <li>
              <span className="terminal-error"> ⚠ </span>
              <span className="terminal-error"> {item.text} </span>
            </li>
          );
          break;
        case 'space':
          rendered = (
            <li className="terminal-space">
              <span className="terminal-success"> {this.props.successes} successes. </span>
              <span className="terminal-warning"> {this.props.warnings} warnings. </span>
              <span className="terminal-error"> {this.props.errors} errors. </span>
            </li>
          );
          break;
        default:
          rendered = null;
      }
      return rendered;
    };

    return (
      <ul style={styles} {...this.props}>
        {items.map(item => renderItem(item))}
      </ul>
    );
  }
}

export default autoscroll(Output, { isScrolledDownThreshold: 100 });
