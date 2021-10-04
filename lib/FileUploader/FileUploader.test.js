import React from 'react';
import {
  screen, render, fireEvent,
} from '@testing-library/react';

import '../../test/jest/__mock__';

import { FileUploader } from './FileUploader';

const titleText = 'Title text';
const buttonText = 'Button text';

const onDragEnterMock = jest.fn();
const onDragLeaveMock = jest.fn();
const onDropMock = jest.fn();

describe('FileUploader', () => {
  describe('rendering file uploader with children passed as is', () => {
    function flushPromises(container) {
      return new Promise(resolve => setImmediate(() => {
        renderFileUploader();
        resolve(container);
      }));
    }

    function dispatchEvt(node, type, data) {
      const event = new Event(type, { bubbles: true });

      Object.assign(event, data);
      fireEvent(node, event);
    }

    function mockData(files) {
      return {
        dataTransfer: {
          files,
          items: files.map(file => ({
            kind: 'file',
            type: file.type,
            getAsFile: () => file,
          })),
          types: ['Files'],
        },
      };
    }

    const renderFileUploader = (isDropZoneActive = false) => render(
      <FileUploader
        title={titleText}
        uploadButtonText={buttonText}
        isDropZoneActive={isDropZoneActive}
        onDragEnter={onDragEnterMock}
        onDragLeave={onDragLeaveMock}
        onDrop={onDropMock}
      >
        {isDropZoneActive ?
          () => <div data-testid="children">Children</div>
          : <div data-testid="children">Children</div>}
      </FileUploader>
    );

    afterEach(() => jest.clearAllMocks());

    it('should display correct title and button wording', () => {
      renderFileUploader();

      expect(screen.getByText(titleText)).toBeVisible();
      expect(screen.getByText(buttonText)).toBeVisible();
    });

    it('should display children when inactive', () => {
      renderFileUploader();

      expect(screen.getByTestId('children')).toBeVisible();
    });

    it('should not render children with active drop area', () => {
      renderFileUploader(true);

      expect(screen.getByTestId('children')).not.toBeVisible();
    });

    describe('triggering drag enter on file upload area', () => {
      it('should call callback on drag enter', async () => {
        const file = new File([
          JSON.stringify({ ping: true }),
        ], 'ping.json', { type: 'application/json' });
        const data = mockData([file]);

        const { container } = renderFileUploader();

        const fileInput = screen.getByTestId('fileUploader-input');

        dispatchEvt(fileInput, 'dragenter', data);
        await flushPromises(container);

        expect(onDragEnterMock).toHaveBeenCalled();
      });
    });
  });
});
