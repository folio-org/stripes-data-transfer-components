// mimics the StripesTranslationPlugin in @folio/stripes-core
export default function prefixKeys(obj) {
  const res = {};

  for (const key of Object.keys(obj)) {
    res[`stripes-data-transfer-components.${key}`] = obj[key];
  }

  return res;
}
