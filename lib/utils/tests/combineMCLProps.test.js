import { combineMCLProps } from '../combineMCLProps';

describe('combineMCLProps', () => {
  it('should work correctly with empty default and custom props', () => {
    expect(combineMCLProps({})({})).toEqual({
      columnWidths: {},
      columnMapping: {},
      visibleColumns: [],
    });
  });

  it('should work correctly with default and custom props', () => {
    const defaultProps = {
      columnWidths: {
        preservedWidth: '100',
        toBeOverrideWidth: '200',
      },
      columnMapping: {
        preservedMapping: 'initial',
        toBeOverrideMapping: 'initial',
      },
      visibleColumns: ['column1ToBeOverride', 'column2ToBeOverride'],
    };

    const customProps = {
      columnWidths: { toBeOverrideWidth: '300' },
      columnMapping: { toBeOverrideMapping: 'override' },
      visibleColumns: ['column1', 'column2'],
    };

    expect(combineMCLProps(defaultProps)(customProps)).toEqual({
      columnWidths: {
        preservedWidth: '100',
        toBeOverrideWidth: '300',
      },
      columnMapping: {
        preservedMapping: 'initial',
        toBeOverrideMapping: 'override',
      },
      visibleColumns: ['column1', 'column2'],
    });
  });

  it('should contain default visibleColumns if custom ones are not provided', () => {
    const defaultProps = { visibleColumns: ['column1', 'column2'] };

    expect(combineMCLProps(defaultProps)({}).visibleColumns).toEqual(defaultProps.visibleColumns);
  });
});
