import React from 'react';

import {
  screen, render,
} from '@testing-library/react';

import '../../test/jest/__mock__';
import '../../test/jest/__new_mock__';

import { Progress } from './Progress';

describe('Progress', () => {
  const currentValue = 10;
  const totalValue = 100;
  const renderDefaultProgress = () => render(
    <Progress
      current={currentValue}
      total={totalValue}
    />
  );

  it('should display progress component', () => {
    renderDefaultProgress();

    expect(screen.getByTestId('progress-bar')).toBeVisible();
  });

  it('should display correct current progress position', () => {
    renderDefaultProgress();

    expect(screen.getByTestId('progress-current')).toHaveAttribute('style', `width: ${totalValue / currentValue}%;`);
  });

  it('should display correct progress info', () => {
    renderDefaultProgress();

    expect(screen.getByText(`${totalValue / currentValue}%`)).toBeVisible();
  });

  describe('rendering Progress with "messagedPercentage" progress info type', () => {
    it('should display correct progress info', () => {
      const testMessage = 'TestMessage';

      render(<Progress
        current={currentValue}
        total={totalValue}
        progressInfoType="messagedPercentage"
        payload={{ message: testMessage }}
      />);

      expect(screen.getByTestId('progress-bar')).toBeVisible();
      expect(screen.getByText(`${testMessage} ${totalValue / currentValue}%`)).toBeVisible();
    });
  });
  describe('rendering Progress with "messagedPercentage" progress and full progress', () => {
    it('should display preloader', () => {
      const testMessage = 'TestMessage';

      render(
        <Progress
          current={totalValue}
          total={totalValue}
          progressInfoType="messagedPercentage"
          payload={{ message: testMessage }}
        />
      );

      expect(screen.getByTestId('preloader')).toBeVisible();
    });
  });
  describe('rendering Progress with "none" progress', () => {
    it('should not display progress message and percentages', () => {
      render(
        <Progress
          current={currentValue}
          total={totalValue}
          progressInfoType="none"
        />
      );
      expect(screen.getByTestId('progress-info')).not.toHaveTextContent();
    });
  });
});
