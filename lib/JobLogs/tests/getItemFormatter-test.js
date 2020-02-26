import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { expect } from 'chai';
import {
  describe,
  it,
  beforeEach,
} from '@bigtest/mocha';

import FileNameButtonInteractor from './FileNameButtonInteractor';
import jobExecution from '../../tests/jobExecution';
import { mount } from '../../../test/bigtest/helpers';
import { listTemplate } from '../listTemplate';
import getItemFormatter from '../getItemFormatter';

const fileNameButton = new FileNameButtonInteractor();
const externalFormatter = {
  customField: () => 'customField',
  fileName: () => 'custom',
};
const link = '/link/';

describe('getItemFormatter', () => {
  describe('getting item formatter with link and without external formatter', () => {
    const itemFormatter = getItemFormatter(link);

    it('should support only fields from listTemplate by default', () => {
      const listTemplateKeys = Object.keys(listTemplate);
      const itemFormatterKeys = Object.keys(itemFormatter);

      expect(itemFormatterKeys.length).to.equal(listTemplateKeys.length);
      expect(itemFormatterKeys.toString()).to.equal(listTemplateKeys.toString());
    });

    describe('rendering file name link button', () => {
      beforeEach(async () => {
        await mount(
          <Router>
            {itemFormatter.fileName(jobExecution)}
          </Router>
        );
      });

      it('should render file name button with the correct properties', () => {
        expect(fileNameButton.button.isPresent).to.be.true;
        expect(fileNameButton.targetValue).to.equal('_blank');
        expect(fileNameButton.buttonStyleValue).to.equal('A');
      });

      it('should set the correct text to file name button', () => {
        expect(fileNameButton.text).to.equal(jobExecution.fileName);
      });

      it('should set the correct text to file name button', () => {
        expect(fileNameButton.text).to.equal(jobExecution.fileName);
      });

      it('should set the correct link', () => {
        expect(fileNameButton.hrefValue.endsWith(link + jobExecution.id)).to.be.true;
      });
    });
  });

  describe('getting item formatter with link and without external formatter', () => {
    const customItemFormatter = getItemFormatter(link, externalFormatter);

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
