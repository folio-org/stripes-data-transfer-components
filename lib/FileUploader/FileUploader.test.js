import React from 'react';
import {
  screen, render, fireEvent,
} from '@testing-library/react';

import '../../test/jest/__mock__';
import '../../test/jest/__new_mock__';

import { FileUploader } from './FileUploader';

describe('FileUploader', () => {
  describe('rendering file uploader with children passed as is', () => {
    const titleText = 'Title text';
    const buttonText = 'Button text';

    const onDragEnterMock = jest.fn();
    const onDragLeaveMock = jest.fn();
    const onDropMock = jest.fn();

    function flushPromises(ui, container) {
      return new Promise(resolve => setImmediate(() => {
        render(ui, { container });
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

    const fileUploader = (
      <FileUploader
        title={titleText}
        uploadButtonText={buttonText}
        isDropZoneActive={false}
        onDragEnter={onDragEnterMock}
        onDragLeave={onDragLeaveMock}
        onDrop={onDropMock}
      >
        <div data-testid="children">Children</div>
      </FileUploader>
    );

    afterEach(() => jest.clearAllMocks());

    it('should display correct title and button wording', () => {
      render(fileUploader);

      expect(screen.getByText(titleText)).toBeVisible();
      expect(screen.getByText(buttonText)).toBeVisible();
    });

    it('should display children when inactive', () => {
      render(fileUploader);

      expect(screen.getByTestId('children')).toBeVisible();
    });

    describe('triggering drag enter on file upload area', () => {
      it('should call callback on drag enter', async () => {
        const file = new File([
          JSON.stringify({ ping: true }),
        ], 'ping.json', { type: 'application/json' });
        const data = mockData([file]);

        const { container } = render(fileUploader);
        const fileInput = screen.getByTestId('fileUploader-input');

        dispatchEvt(fileInput, 'dragenter', data);
        await flushPromises(fileUploader, container);

        expect(onDragEnterMock).toHaveBeenCalled();
      });
    });
  });

  describe('rendering file uploader with active drop area', () => {
    it('should not render children', () => {
      render(
        <FileUploader
          activeClassName="active"
          isDropZoneActive
        >{() => <div data-testid="children">Children</div>}
        </FileUploader>
      );

      expect(screen.getByTestId('children')).not.toBeVisible();
    });
  });
});
