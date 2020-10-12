/**
  This is temp solution because stripes-components was released.
  TODO: Update solution during the next release: Move useDateFormatter
  and useTimeFormatter to stripes-components and remove them here.
 */
export const iso8601Timestamp = value => {
  let tweakedValue = value;

  if (typeof value !== 'string') {
    return tweakedValue;
  }

  if (value.length === 28 && (value[23] === '+' || value[23] === '-')) {
    tweakedValue = `${value.substring(0, 26)}:${value.substring(26, 28)}`;
  }

  return tweakedValue;
};
