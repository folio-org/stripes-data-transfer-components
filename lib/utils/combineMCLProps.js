export const combineMCLProps = defaultProps => customProps => {
  return {
    columnWidths: Object.assign({}, defaultProps.columnWidths, customProps.columnWidths),
    columnMapping: Object.assign({}, defaultProps.columnMapping, customProps.columnMapping),
    visibleColumns: customProps.visibleColumns || defaultProps.visibleColumns || [],
  };
};
