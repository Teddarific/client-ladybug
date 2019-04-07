import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import Collapsible from 'react-collapsible';
import Toggle from 'react-toggle';

import 'react-dropdown/style.css';
import 'react-toggle/style.css';
/* eslint no-continue: 0 */

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
    };

    this.onSelect = this.onSelect.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.calcTable = this.calcTable.bind(this);
  }

  onSelect(option) {
    this.setState({
      sortBy: option.value,
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

    const renderItem = (item) => {
      const cn = `cp-${item.severity}`;
      return (
        <Collapsible className={cn} openedClassName={cn} transitionTime={120} trigger={item[secondaryIndexer]}>
          <div> Test </div>
        </Collapsible>
      );
    };

    const renderGroup = (key, list) => {
      return (
        <Collapsible transitionTime={120} trigger={key}>
          {list.map(item => renderItem(item))}
        </Collapsible>
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

      </div>
    );
  }
}

export default Report;
