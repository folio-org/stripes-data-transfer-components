import {
  interactor,
  scoped,
} from '@bigtest/interactor';

import MultiColumnListInteractor from '@folio/stripes-components/lib/MultiColumnList/tests/interactor';

import { SearchFormInteractor } from '../../../SearchForm/tests/interactor';

@interactor export class MappingProfilesInteractor {
  static defaultScope = '[data-test-mapping-profiles-pane]';

  searchForm = new SearchFormInteractor();
  paneTitle = scoped('[data-test-settings-label]');
  profilesList = scoped('#mapping-profiles-list', MultiColumnListInteractor);

  getCellContent(row, cell) {
    return this.profilesList.rows(row).cells(cell).content;
  }
}
