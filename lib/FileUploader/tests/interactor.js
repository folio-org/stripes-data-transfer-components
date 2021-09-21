import {
  interactor,
  triggerable,
  hasClass,
  Interactor,
} from '@bigtest/interactor';

@interactor class FileUploader {
  static defaultScope = '#ModuleContainer';

  title = new Interactor('[data-test-title]');
  children = new Interactor('[data-test-children]');
  secondaryArea = new Interactor('[data-test-secondary-area]');
  uploadBtn = new Interactor('[data-test-upload-btn]');
  triggerDrop = triggerable('drop');
  triggerDragEnter = triggerable('dragenter');
  triggerDragLeave = triggerable('dragleave');
  hasActiveClass = hasClass('active');
}

export const fileUploaderInteractor = new FileUploader('[data-test-file-uploader] [class*=upload]');
