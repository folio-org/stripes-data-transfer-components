import React from 'react';
import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import { mount } from '../../../../test/bigtest/helpers';
import Job from '../Job';
import JobInteractor from './interactor';

describe('Job', () => {
  const job = new JobInteractor();
  const childText = 'Child text';

  describe('rendering Job', () => {
    beforeEach(async () => {
      await mount(
        <Job>
          { childText }
        </Job>
      );
    });

    it('should display Job component', () => {
      expect(job.isPresent).to.be.true;
    });

    it('should display children', () => {
      expect(job.text).to.equal(childText);
    });
  });
});
