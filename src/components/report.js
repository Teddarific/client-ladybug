import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import Collapsible from 'react-collapsible';
import Toggle from 'react-toggle';
import Fade from 'react-reveal/Fade';
import Pulse from 'react-reveal/Pulse';

import 'react-dropdown/style.css';
import 'react-toggle/style.css';

import ModalController from './modalController';

/* eslint no-continue: 0 */
/* eslint jsx-a11y/label-has-for: 0 */
/* eslint no-unused-vars: 0 */

// Sort Type:
// 0: Sort by Type
// 1: Sort by URL
// 3: Sort by Warning Type

class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortBy: 0,
      includeSuccess: false,
      modal: false,
      selectedItem: null,
    };

    this.onSelect = this.onSelect.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.calcTable = this.calcTable.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  onSelect(option) {
    this.setState({
      sortBy: option.value,
    });
  }

  closeModal() {
    this.setState({
      modal: false,
    });
  }

  toggleSuccess() {
    this.setState({
      includeSuccess: !this.state.includeSuccess,
    });
  }

  calcTable() {
    const table = {};
    for (let i = 0; i < this.props.items.length; i += 1) {
      const item = this.props.items[i];
      if (item.severity === 'info' || (item.severity === 'success' && !this.state.includeSuccess)) {
        continue;
      }

      let key = null;
      switch (this.state.sortBy) {
        case 0:
          key = item.type;
          break;
        case 1:
          key = item.URL;
          break;
        case 2:
          key = item.severity;
          break;
        default:
          key = item.type;
      }

      if (!(key in table)) {
        table[key] = [];
      }

      table[key].push(item);
    }

    return table;
  }

  openModal(item) {
    this.setState({
      modal: true,
      selectedItem: item,
    });
  }

  render() {
    const options = [
      { value: 0, label: 'Type' },
      { value: 1, label: 'URL' },
      { value: 2, label: 'Severity' },
    ];

    const indexerMap = {
      0: 'type',
      1: 'URL',
      2: 'severity',
    };

    const secondaryIndexerMap = {
      0: 'URL',
      1: 'type',
      2: 'type',
    };

    const indexer = indexerMap[this.state.sortBy];
    const secondaryIndexer = secondaryIndexerMap[this.state.sortBy];

    const renderItem2 = (item) => {
      const cn = `cp-${item.severity}`;
      let content = null;
      if (item.severity !== 'success') {
        content = (
          <React.Fragment>
            <div>
              <span> Info: </span>
              <span> {item.text} </span>
            </div>
            <div>
              <span> Meta: </span>
              <span> {item.meta} </span>
            </div>
          </React.Fragment>
        );
      }
      return (
        <Collapsible className={cn} openedClassName={cn} transitionTime={120} trigger={item[secondaryIndexer]}>
          <div>
            <div>
              <span> URL: </span>
              <span> {item.URL} </span>
            </div>
            <div>
              <span> Type: </span>
              <span> {item.type} </span>
            </div>
            {content}
          </div>
        </Collapsible>
      );
    };

    const renderItem = (item) => {
      const cn = `Collapsible cp-${item.severity}`;
      return (
        <div className={cn} onClick={() => { this.openModal(item); }} role="button" tabIndex={0}>
          <span className="Collapsible__trigger__secondary is-closed"> {item[secondaryIndexer]} </span>
        </div>
      );
    };

    const renderGroup = (key, list) => {
      return (
        <Pulse>
          <Collapsible transitionTime={120} trigger={key}>
            {list.map(item => renderItem(item))}
          </Collapsible>
        </Pulse>
      );
    };

    const table = this.calcTable();

    return (
      <div className="report">
        <div className="report-filter">
          <div className="report-sortby"> Group by </div>
          <Dropdown className="report-dropdown" options={options} onChange={this.onSelect} value={options[this.state.sortBy]} placeholder="Sort by" />
          <label htmlFor="toggle" className="report-toggle">
            <Toggle
              defaultChecked={this.state.includeSuccess}
              icons={false}
              onChange={this.toggleSuccess}
            />
            <span> Include successes </span>
          </label>
        </div>
        <div className="report-data">
          {Object.keys(table).map(key => renderGroup(key, table[key]))}
        </div>
        <ModalController
          open={this.state.modal}
          onClose={this.closeModal}
          item={this.state.selectedItem}
        />
      </div>
    );
  }
}

export default Report;
