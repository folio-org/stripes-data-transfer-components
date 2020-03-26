// mimics the StripesTranslationPlugin in @folio/stripes-core
export default function prefixKeys(obj, prefix = 'stripes-data-transfer-components') {
  const res = {};

  for (const key of Object.keys(obj)) {
    res[`${prefix}.${key}`] = obj[key];
  }

  return res;
}
