import React from 'react';
import {
  screen, render,
} from '@testing-library/react';

import '../../../test/jest/__mock__';
import '../../../test/jest/__new_mock__';

import { Job } from '.';

const childText = 'Child text';
const renderJob = () => {
  render(
    <Job>
      {childText}
    </Job>
  );
};

describe('rendering Job', () => {
  it('should display Job component', () => {
    renderJob();

    expect(screen.getByTestId('job-item')).toBeVisible();
  });

  it('should display children', () => {
    renderJob();

    expect(screen.getByText(childText)).toBeVisible();
  });
});
