import {
  interactor,
  isPresent,
} from '@bigtest/interactor';

import MultiColumnListInteractor from '@folio/stripes-components/lib/MultiColumnList/tests/interactor';

import PreloaderInteractor from '../../Preloader/tests/interactor';

@interactor
export class SearchResultsInteractor {
  list = new MultiColumnListInteractor('#search-results-list');
  preloader = new PreloaderInteractor();
  notLoadedMessagePresent = isPresent('[data-test-not-loaded-message]');

  getCellContent(row, cell) {
    return this.list.rows(row).cells(cell).content;
  }
}
