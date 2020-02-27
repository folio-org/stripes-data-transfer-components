import {
  interactor,
  Interactor,
  text,
  property,
} from '@bigtest/interactor';

export default interactor(class FileNameButtonInteractor {
  button = new Interactor('[data-test-file-name-button]');
  text = text('[data-test-file-name-button]');
  hrefValue = property('[data-test-file-name-button]', 'href');
  targetValue = property('[data-test-file-name-button]', 'target');
  buttonStyleValue = property('[data-test-file-name-button]', 'tagName');
});
