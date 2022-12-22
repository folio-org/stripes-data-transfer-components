import React from 'react';
import { render } from '@testing-library/react';

import '../../../../test/jest/__mock__';

import { TagsColumn } from './TagsColumn';

const recordWithTags = { tags: { tagList: ['test1, test2'] } };
const recordWithoutTags = { tags: { tagList: [] } };

const renderTagsColumn = record => {
  const component = (
    <TagsColumn record={record} />
  );

  return render(component);
};

describe('TagsColumn', () => {
  describe('when tagList is not empty', () => {
    it('tags should be rendered', () => {
      const { getByText } = renderTagsColumn(recordWithTags);

      expect(getByText('test1, test2')).toBeDefined();
    });
  });

  describe('when tagList is empty', () => {
    it('no value should be rendered', () => {
      const { getByText } = renderTagsColumn(recordWithoutTags);

      expect(getByText('-')).toBeDefined();
    });
  });
});
