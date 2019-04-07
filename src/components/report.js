import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import Collapsible from 'react-collapsible';

import 'react-dropdown/style.css';
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
    };

    this.onSelect = this.onSelect.bind(this);
    this.calcTable = this.calcTable.bind(this);
  }

  onSelect(option) {
    this.setState({
      sortBy: option.value,
    });
  }

  calcTable() {
    const table = {};
    for (let i = 0; i < this.props.items.length; i += 1) {
      const item = this.props.items[i];
      if (item.severity === 'info') {
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
    console.log(table);

    return (
      <div className="report">
        <div className="report-filter">
          <div className="report-sortby"> Group by </div>
          <Dropdown className="report-dropdown" options={options} onChange={this.onSelect} value={options[this.state.sortBy]} placeholder="Sort by" />
        </div>
        <div className="report-data">
          {Object.keys(table).map(key => renderGroup(key, table[key]))}
        </div>

      </div>
    );
  }
}

export default Report;
