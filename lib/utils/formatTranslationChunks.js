import { isArray } from 'lodash';

/**
 * Joins translation chunks from array into single string.
 *
 * @param {array} chunks
 * @return {string} joined translation string
 */

export const formatTranslationChunks = (chunks = []) => {
  if (isArray(chunks)) {
    return chunks.join('');
  }

  return chunks;
};
