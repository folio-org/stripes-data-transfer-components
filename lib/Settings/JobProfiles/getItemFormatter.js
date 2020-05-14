import { listTemplate } from '../../ListTemplate';

const getItemFormatter = (externalFormatter = {}) => ({
  ...listTemplate,
  ...externalFormatter,
});

export default getItemFormatter;
