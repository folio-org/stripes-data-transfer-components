import {
  forEach,
  noop,
} from 'lodash';

import { createOkapiHeaders } from '../../utils';

const addXHRHeaders = (xhr, headers) => {
  forEach(headers, (value, key) => xhr.setRequestHeader(key, value));
};

export async function uploadFile({
  xhr,
  file,
  url,
  okapi,
  onFileUploadProgress = noop,
}) {
  return new Promise((resolve, reject) => {
    try {
      xhr.open('POST', url);

      addXHRHeaders(xhr, {
        ...createOkapiHeaders(okapi),
        'Content-Type': 'application/octet-stream',
      });

      xhr.upload.onprogress = event => onFileUploadProgress(file, event);

      xhr.onreadystatechange = () => {
        const {
          status,
          readyState,
          responseText,
        } = xhr;

        if (readyState !== 4) return;

        try {
          const parsedResponse = JSON.parse(responseText);

          if (status === 200) {
            resolve(parsedResponse);
          } else {
            reject(parsedResponse);
          }
        } catch (error) {
          reject(error);
        }
      };

      xhr.send(file);
    } catch (error) {
      reject(error);
    }
  });
}
