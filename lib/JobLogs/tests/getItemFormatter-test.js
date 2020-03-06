import { expect } from 'chai';
import {
  describe,
  it,
} from '@bigtest/mocha';

import jobExecution from '../../tests/jobExecution';
import { listTemplate } from '../listTemplate';
import getItemFormatter from '../getItemFormatter';

const externalFormatter = {
  customField: () => 'customField',
  fileName: () => 'custom',
};

describe('getItemFormatter', () => {
  describe('getting item formatter with link and without external formatter', () => {
    const itemFormatter = getItemFormatter();

    it('should support only fields from listTemplate by default', () => {
      const listTemplateKeys = Object.keys(listTemplate);
      const itemFormatterKeys = Object.keys(itemFormatter);

      expect(itemFormatterKeys.length).to.equal(listTemplateKeys.length);
      expect(itemFormatterKeys.toString()).to.equal(listTemplateKeys.toString());
    });
  });

  describe('getting item formatter with link and without external formatter', () => {
    const customItemFormatter = getItemFormatter(externalFormatter);

    it('should support add custom fields to formatter', () => {
      const externalFormatterKeys = Object.keys(externalFormatter);

      externalFormatterKeys.forEach(key => {
        expect(customItemFormatter[key]).to.not.equal(undefined);
      });
    });

    it('should override file name formatter', () => {
      expect(customItemFormatter.fileName(jobExecution)).to.equal('custom');
    });
  });
});
