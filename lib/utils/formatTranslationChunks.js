import { isArray } from 'lodash';

export const formatTranslationChunks = (chunks = []) => {
  if (isArray(chunks)) {
    return chunks.join('');
  }

  return chunks;
};
