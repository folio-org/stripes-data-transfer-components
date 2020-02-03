import React, { Component } from 'react';

import css from './Job.css';

export default class Job extends Component {
  render() {
    const { children } = this.props;

    return (
      <div
        data-test-job-item
        className={css.job}
      >
        { children }
      </div>
    );
  }
}
