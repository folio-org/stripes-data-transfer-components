import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';

import { mountWithContext } from '../../../test/bigtest/helpers';
import { FileUploader } from '../FileUploader';
import { fileUploaderInteractor } from './interactor';

describe('FileUploader', () => {
  describe('rendering file uploader with children passed as is', () => {
    const titleText = 'Title text';
    const buttonText = 'Button text';
    let onDragEnterSpy;
    let onDragLeaveSpy;
    let onDropSpy;

    beforeEach(async () => {
      onDragEnterSpy = sinon.spy();
      onDragLeaveSpy = sinon.spy();
      onDropSpy = sinon.spy();

      await mountWithContext(
        <FileUploader
          title={titleText}
          uploadButtonText={buttonText}
          activeClassName="active"
          isDropZoneActive={false}
          onDragEnter={onDragEnterSpy}
          onDragLeave={onDragLeaveSpy}
          onDrop={onDropSpy}
        >
          <div data-test-children>Children</div>
        </FileUploader>
      );
    });

    it('should display correct title', () => {
      expect(fileUploaderInteractor.title).to.equal(titleText);
    });

    it('should display correct button wording', () => {
      expect(fileUploaderInteractor.uploadBtn.text).to.equal(buttonText);
    });

    it('should display children when inactive', () => {
      expect(fileUploaderInteractor.children.isPresent).to.be.true;
    });

    it('should display secondary area when inactive', () => {
      expect(fileUploaderInteractor.secondaryArea.isVisible).to.be.true;
    });

    describe('triggering drag enter on file upload area', () => {
      beforeEach(async () => {
        await fileUploaderInteractor.triggerDragEnter();
      });

      it('should add correct class', () => {
        expect(fileUploaderInteractor.hasActiveClass).to.be.true;
      });

      it('should call callback on drag enter', () => {
        expect(onDragEnterSpy.called).to.be.true;
      });
    });

    describe('triggering drag leave on file upload area', () => {
      beforeEach(async () => {
        await fileUploaderInteractor.triggerDragEnter();
        await fileUploaderInteractor.triggerDragLeave();
      });

      it('should have correct class', () => {
        expect(fileUploaderInteractor.hasActiveClass).to.be.false;
      });

      it('should call on drag leave callback', () => {
        expect(onDragLeaveSpy.called).to.be.true;
      });
    });

    describe('drag file drop on file upload area', () => {
      beforeEach(async () => {
        await fileUploaderInteractor.triggerDrop({
          dataTransfer: {
            types: ['Files'],
            files: [new File([], 'file.js')],
          },
        });
      });

      it('should call callback on drop files', () => {
        expect(onDropSpy.called).to.be.true;
      });
    });
  });

  describe('rendering file uploader with children passed as render prop', () => {
    beforeEach(async () => {
      await mountWithContext(
        <FileUploader
          activeClassName="active"
          isDropZoneActive={false}
        >{() => <div data-test-children>Children</div>}
        </FileUploader>
      );
    });

    it('should display children', () => {
      expect(fileUploaderInteractor.children.isVisible).to.be.true;
    });
  });

  describe('rendering file uploader with active drop area', () => {
    beforeEach(async () => {
      await mountWithContext(
        <FileUploader
          activeClassName="active"
          isDropZoneActive
        >{() => <div data-test-children>Children</div>}
        </FileUploader>
      );
    });

    it('should not render children', () => {
      expect(fileUploaderInteractor.children.isVisible).to.be.false;
    });

    it('should not render secondary area', () => {
      expect(fileUploaderInteractor.secondaryArea.isVisible).to.be.false;
    });
  });
});
