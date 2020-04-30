export const buildParentResources = ({
  resourceName,
  records = [],
  hasLoaded = true,
  isPending = false,
}) => {
  const parentResources = {
    query: {},
    [resourceName]: {
      records,
      hasLoaded,
      isPending,
      other: { totalRecords: records.length },
    },
  };

  Object.defineProperty(parentResources.query, 'sort', { get: () => new URLSearchParams(window.location.search).get('sort') || '' });
  Object.defineProperty(parentResources.query, 'query', { get: () => new URLSearchParams(window.location.search).get('query') || '' });

  return parentResources;
};

export const parentMutator = {
  resultCount: { replace: () => { } },
  resultOffset: { replace: () => { } },
};
