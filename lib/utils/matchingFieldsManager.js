import {
  HTML_LANG_DIRECTIONS,
  MARC_FIELD_CONSTITUENT,
} from './constants';

const getFieldFromResources = (fieldFromConfig, fields, resources) => {
  const {
    recordsName,
    fieldToSend,
    fieldToDisplay,
  } = fieldFromConfig.fromResources;

  const records = resources[recordsName] || [];
  const fieldValue = fields[fields.length - 1].value;

  return records?.find(record => record[fieldToSend] === fieldValue)?.[fieldToDisplay];
};

const getField = ({
  fields,
  recordType,
  formatMessage,
  resources,
  fieldsConfig,
}) => {
  if (!fields.length || !recordType) {
    return {};
  }

  const fieldValue = fields?.find(field => field.label === MARC_FIELD_CONSTITUENT.FIELD)?.value;
  const fieldFromConfig = fieldsConfig?.find(item => item.value === fieldValue);

  if (fieldFromConfig?.fromResources) {
    const fieldFromResources = getFieldFromResources(fieldFromConfig, fields, resources);

    return {
      fieldFromConfig,
      fieldLabel: fieldFromResources || undefined,
    };
  }

  const fieldLabel = fieldFromConfig ? formatMessage({ id: fieldFromConfig.label }) : undefined;

  return {
    fieldFromConfig,
    fieldLabel,
  };
};

const getCategory = (field, fieldCategoriesConfig) => fieldCategoriesConfig?.find(category => category.id === field.categoryId);

export const getFieldMatchedWithCategory = ({
  fields,
  recordType,
  formatMessage,
  resources,
  fieldCategoriesConfig,
  fieldsConfig,
}) => {
  const {
    fieldFromConfig,
    fieldLabel,
  } = getField({
    fields,
    recordType,
    formatMessage,
    resources,
    fieldsConfig,
  });

  if (!fieldFromConfig) {
    return undefined;
  }

  const category = getCategory(fieldFromConfig, fieldCategoriesConfig);
  const categoryLabel = category ? formatMessage({ id: category.label }) : '';

  return `${categoryLabel}: ${fieldLabel}`;
};

export const getFieldMatchedLabel = ({
  fields,
  recordType,
  formatMessage,
  resources,
  fieldsConfig,
}) => {
  const isMarcRecord = recordType.toLowerCase().includes('marc');

  if (isMarcRecord) {
    const fieldsMatched = fields.map(item => item.value || '');

    if (document.dir === HTML_LANG_DIRECTIONS.RIGHT_TO_LEFT) {
      fieldsMatched.reverse();
    }

    return fieldsMatched.join('.');
  }

  const { fieldLabel } = getField({
    fields,
    recordType,
    formatMessage,
    resources,
    fieldsConfig,
  });

  return fieldLabel;
};
