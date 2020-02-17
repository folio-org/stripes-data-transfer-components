import {
  describe,
  it,
  beforeEach,
  afterEach,
} from '@bigtest/mocha';
import { expect } from 'chai';
import Pretender from 'pretender';

import { uploadFile } from '../uploadFile';

function createUploadResponse(server, response, status = 200) {
  server.post('/uploadUrl', () => [
    status,
    { 'content-type': 'application/json' },
    JSON.stringify(response),
  ]);
}

function initiateFileUpload(url = '/uploadUrl') {
  return uploadFile({
    xhr: new XMLHttpRequest(),
    url,
    file: new File([], 'file.js'),
    okapi: {},
  });
}

describe('uploadFile', () => {
  let pretender;

  beforeEach(() => {
    pretender = new Pretender();
  });

  afterEach(() => {
    pretender.shutdown();
  });

  describe('getting successful response upon upload', () => {
    let response;
    const responsePayload = { message: 'success' };

    beforeEach(() => {
      createUploadResponse(pretender, responsePayload);
    });

    beforeEach(async () => {
      response = await initiateFileUpload();
    });

    it('should be handled correctly', () => {
      expect(response.message).to.equal(responsePayload.message);
    });
  });

  describe('getting API error upon file upload', () => {
    let response;
    const responsePayload = { message: 'error' };

    beforeEach(() => {
      createUploadResponse(pretender, responsePayload, 500);
    });

    beforeEach(async () => {
      try {
        response = await initiateFileUpload();
      } catch (error) {
        response = error;
      }
    });

    it('should be handled correctly', () => {
      expect(response.message).to.equal(responsePayload.message);
    });
  });

  describe('getting invalid API response error upon upload', () => {
    let response;

    beforeEach(() => {
      createUploadResponse(pretender, undefined, 500);
    });

    beforeEach(async () => {
      try {
        response = await initiateFileUpload();
      } catch (error) {
        response = error;
      }
    });

    it('should be handled correctly', () => {
      expect(response instanceof Error).to.be.true;
    });
  });

  describe('calling without proper params', () => {
    let response;

    beforeEach(async () => {
      try {
        response = await initiateFileUpload(undefined);
      } catch (error) {
        response = error;
      }
    });

    it('should be handled correctly', () => {
      expect(response instanceof Error).to.be.true;
    });
  });
});
