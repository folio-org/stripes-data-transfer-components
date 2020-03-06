import { listTemplate } from './listTemplate';

const getItemFormatter = (externalFormatter = {}) => ({
  ...listTemplate,
  ...externalFormatter,
});

export default getItemFormatter;
