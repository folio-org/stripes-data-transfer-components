import React from 'react';
import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import {
  mount,
  mountWithContext,
} from '../../../test/bigtest/helpers';
import EndOfItemInteractor from './interactor';
import EndOfItem from '../EndOfItem';

describe('EndOfItem', () => {
  const endOfItem = new EndOfItemInteractor();
  const myClass = 'my-class';

  describe('rendering EndOfItem with title', () => {
    const titleValue = 'Title value';

    beforeEach(async () => {
      await mount(
        <EndOfItem
          title={titleValue}
          className={myClass}
        />
      );
    });

    it('should display centered layout container', () => {
      expect(endOfItem.isLayoutContainerPresent).to.be.true;
      expect(endOfItem.isLayoutCentered).to.be.true;
    });

    it('should add custom class style to layout container', () => {
      expect(endOfItem.hasCustomClassOnLayout(myClass)).to.be.true;
    });

    it('should display "end mark" svg icon', () => {
      expect(endOfItem.isIconPresent).to.be.true;
      expect(endOfItem.hasIconEndMarkClass).to.be.true;
    });

    it('should display label', () => {
      expect(endOfItem.label.isPresent).to.be.true;
    });

    it('should display passed title value', () => {
      expect(endOfItem.label.text).to.equal(titleValue);
    });
  });

  describe('rendering EndOfItem without properties', () => {
    beforeEach(async () => {
      await mountWithContext(
        <EndOfItem />
      );
    });

    it('should display label', () => {
      expect(endOfItem.label.isPresent).to.be.true;
    });

    it('should not add custom class style to layout container', () => {
      expect(endOfItem.hasCustomClassOnLayout(myClass)).to.be.false;
    });

    it('should display passed title value', () => {
      expect(endOfItem.label.text).to.equal('stripes-components.endOfList');
    });
  });
});
