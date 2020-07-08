import { useIntl } from 'react-intl';

import { combineMCLProps } from './combineMCLProps';

export const useFormattedMCLProps = (defaultProps, customProps = {}) => {
  const intl = useIntl();
  const combinedProps = combineMCLProps(defaultProps)(customProps);
  const formattedColumnMappingMessages = Object.keys(combinedProps.columnMapping).reduce((memo, currentKey) => {
    memo[currentKey] = intl.formatMessage({ id: combinedProps.columnMapping[currentKey] });

    return memo;
  }, {});

  combinedProps.columnMapping = formattedColumnMappingMessages;

  return combinedProps;
};
