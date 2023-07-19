import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  screen,
  render,
  fireEvent,
} from '@testing-library/react';

import '../../test/jest/__mock__';
import { ViewAllLogsFilters } from '.';

const activeFiltersMock = {
  singleRecordImports: ['yes'],
  completedDate: [
    '2021-12-01:2021-12-28',
  ],

};

const onChangeMock = jest.fn();

const jobProfilesMock = [
  {
    name: 'TestJobProfile',
    id: '1',
  },
];

const usersMock = [
  {
    userId: '2',
    firstName: 'Jhon',
    lastName: 'Doe',
  },
];

const renderViewAllLogsFilters = () => {
  render(
    <Router>
      <ViewAllLogsFilters
        closedByDefault={false}
        jobProfiles={jobProfilesMock}
        users={usersMock}
        activeFilters={activeFiltersMock}
        onChange={onChangeMock}
      />
    </Router>
  );
};

describe('ViewAllLogsFilters', () => {
  it('should contain Search and filter section', () => {
    renderViewAllLogsFilters();

    expect(screen.getByTestId('viewAllLogsFilters')).toBeInTheDocument();
  });

  it('should be enabled filter buttons', () => {
    renderViewAllLogsFilters();

    const filterButton = [
      /filter.errors/,
      /filter.startedDate/,
      /filter.endedDate/,
      /filter.jobProfile/,
      /filter.chooseJobProfile/,
      /filter.user/,
    ];

    filterButton.forEach(el => expect(screen.getByRole('button', { name: el })).toBeEnabled());
  });

  it('should have error messages', () => {
    renderViewAllLogsFilters();

    const dateFrom = screen.getAllByRole('textbox', { name: /from/i });
    const dateTo = screen.getAllByRole('textbox', { name: /to/i });
    const applyButton = screen.getAllByRole('button', { name: /apply/i });

    dateFrom.forEach(el => {
      fireEvent.change(el, { target: { value: '2021-20-01' } });
    });
    dateTo.forEach(el => {
      fireEvent.change(el, { target: { value: '2021-20-01' } });
    });
    applyButton.forEach(el => {
      fireEvent.click(el);
    });

    dateFrom.forEach(el => {
      expect(el).toHaveValue('2021-20-01');
    });
    dateTo.forEach(el => {
      expect(el).toHaveValue('2021-20-01');
    });
  });
});
