import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';
import moment from 'moment';
import { uniqBy } from 'lodash';

import {
  AccordionSet,
  Accordion,
  FilterAccordionHeader,
  Selection,
} from '@folio/stripes/components';
import {
  createClearFilterHandler,
  DATE_FORMAT,
} from '@folio/stripes-acq-components';
import {
  CheckboxFilter,
  DateRangeFilter,
} from '@folio/stripes/smart-components';
import {
  Pluggable,
  useStripes
} from '@folio/stripes/core';

import {
  FILTERS,
  FILTER_OPTIONS,
} from './constants';
import { onFilter } from '../utils';

const getDateRange = filterValue => {
  let dateRange = {
    startDate: '',
    endDate: '',
  };

  if (filterValue) {
    const [startDateString, endDateString] = filterValue[0].split(':');
    const endDate = moment.utc(endDateString).add(1, 'days');
    const startDate = moment.utc(startDateString);

    dateRange = {
      startDate: startDate.isValid()
        ? startDate.format(DATE_FORMAT)
        : '',
      endDate: endDate.isValid()
        ? endDate.subtract(1, 'days').format(DATE_FORMAT)
        : '',
    };
  }

  return dateRange;
};

const getDateFilter = (startDate, endDate) => {
  const endDateCorrected = moment.utc(endDate).format(DATE_FORMAT);

  return `${startDate}:${endDateCorrected}`;
};

export const onChangeSelectionFilter = (onChange, filterName) => {
  return value => onChange({
    name: filterName,
    values: [value],
  });
};

export const ViewAllLogsFilters = ({
  activeFilters,
  closedByDefault,
  onChange,
  jobProfiles,
  users,
  showUsers,
}) => {
  const intl = useIntl();
  const { timezone } = useStripes();

  const getJobProfileOptions = uniqBy(jobProfiles.map(jobProfile => ({
    value: jobProfile?.id,
    label: jobProfile?.name,
  })), 'value');

  const getUsersOptions = uniqBy(users.map(user => ({
    value: user.userId,
    label: `${user.firstName} ${user.lastName}`,
  })), 'value');

  const onDateRangeChange = (filterData) => {
    // sets current tenant's timezone
    moment.tz.setDefault(timezone);
    onChange(filterData);
    // restore to a default timezone
    moment.tz.setDefault();
  };

  return (
    <div data-testid="viewAllLogsFilters">
      <AccordionSet>
        <Accordion
          closedByDefault={false}
          displayClearButton={!!activeFilters[FILTERS.ERRORS]}
          header={FilterAccordionHeader}
          id={FILTERS.ERRORS}
          label={<FormattedMessage id="stripes-data-transfer-components.filter.errors" />}
          onClearFilter={createClearFilterHandler(onChange, FILTERS.ERRORS)}
        >
          <CheckboxFilter
            dataOptions={FILTER_OPTIONS.ERRORS}
            name={FILTERS.ERRORS}
            selectedValues={activeFilters[FILTERS.ERRORS]}
            onChange={onChange}
          />
        </Accordion>
        <Accordion
          closedByDefault={closedByDefault}
          displayClearButton={!!activeFilters[FILTERS.STARTED_DATE]}
          header={FilterAccordionHeader}
          id={FILTERS.STARTED_DATE}
          label={<FormattedMessage id="stripes-data-transfer-components.filter.startedDate" />}
          onClearFilter={createClearFilterHandler(onChange, FILTERS.STARTED_DATE)}
        >
          <DateRangeFilter
            name={FILTERS.STARTED_DATE}
            selectedValues={getDateRange(activeFilters[FILTERS.STARTED_DATE])}
            makeFilterString={getDateFilter}
            dateFormat={DATE_FORMAT}
            onChange={onDateRangeChange}
          />
        </Accordion>
        <Accordion
          closedByDefault={closedByDefault}
          displayClearButton={!!activeFilters[FILTERS.ENDED_DATE]}
          header={FilterAccordionHeader}
          id={FILTERS.ENDED_DATE}
          label={<FormattedMessage id="stripes-data-transfer-components.filter.endedDate" />}
          onClearFilter={createClearFilterHandler(onChange, FILTERS.ENDED_DATE)}
        >
          <DateRangeFilter
            name={FILTERS.ENDED_DATE}
            selectedValues={getDateRange(activeFilters[FILTERS.ENDED_DATE])}
            makeFilterString={getDateFilter}
            dateFormat={DATE_FORMAT}
            onChange={onDateRangeChange}
          />
        </Accordion>
        <Accordion
          id={FILTERS.JOB_PROFILE}
          closedByDefault={closedByDefault}
          displayClearButton={!!activeFilters[FILTERS.JOB_PROFILE]}
          header={FilterAccordionHeader}
          label={<FormattedMessage id="stripes-data-transfer-components.filter.jobProfile" />}
          onClearFilter={createClearFilterHandler(onChange, FILTERS.JOB_PROFILE)}
        >
          <div data-test-job-profiles-filter>
            <Selection
              dataOptions={getJobProfileOptions}
              value={activeFilters[FILTERS.JOB_PROFILE] ? activeFilters[FILTERS.JOB_PROFILE][0] : ''}
              placeholder={intl.formatMessage({ id: 'stripes-data-transfer-components.filter.chooseJobProfile' })}
              onChange={onChangeSelectionFilter(onChange, FILTERS.JOB_PROFILE)}
              onFilter={onFilter}
            />
          </div>
        </Accordion>
        {showUsers ? (
          <Accordion
            id={FILTERS.USER}
            closedByDefault={closedByDefault}
            displayClearButton={!!activeFilters[FILTERS.USER]}
            header={FilterAccordionHeader}
            label={<FormattedMessage id="stripes-data-transfer-components.filter.user" />}
            onClearFilter={createClearFilterHandler(onChange, FILTERS.USER)}
          >
            <div data-test-users-filter>
              <Selection
                dataOptions={getUsersOptions}
                value={activeFilters[FILTERS.RUN_BY] ? activeFilters[FILTERS.RUN_BY][0] : ''}
                placeholder={intl.formatMessage({ id: 'stripes-data-transfer-components.filter.chooseUser' })}
                onChange={onChangeSelectionFilter(onChange, FILTERS.RUN_BY)}
                onFilter={onFilter}
              />
            </div>
          </Accordion>
        ) : (
          <Accordion
            id={FILTERS.RUN_BY}
            closedByDefault={closedByDefault}
            displayClearButton={!!activeFilters[FILTERS.RUN_BY]}
            header={FilterAccordionHeader}
            label={<FormattedMessage id="stripes-data-transfer-components.filter.user" />}
            onClearFilter={createClearFilterHandler(onChange, FILTERS.RUN_BY)}
          >
            <Pluggable
              aria-haspopup="true"
              type="find-user"
              id="clickable-find-user"
              searchLabel={intl.formatMessage({ id: 'stripes-data-transfer-components.filter.chooseUser' })}
              marginTop0
              searchButtonStyle="link"
              dataKey="patrons"
              selectUser={(user) => onChangeSelectionFilter(onChange, FILTERS.RUN_BY)(user.id)}
              visibleColumns={['status', 'name', 'patronGroup', 'username', 'barcode']}
            >
              <span>No plugin available!</span>
            </Pluggable>
          </Accordion>
        )}
      </AccordionSet>
    </div>
  );
};

ViewAllLogsFilters.propTypes = {
  activeFilters: PropTypes.object,
  closedByDefault: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  jobProfiles: PropTypes.arrayOf(PropTypes.object),
  users: PropTypes.arrayOf(PropTypes.object),
  showUsers: PropTypes.bool,
};

ViewAllLogsFilters.defaultProps = {
  activeFilters: [],
  closedByDefault: true,
  jobProfiles: [],
  users: [],
  showUsers: true,
};
