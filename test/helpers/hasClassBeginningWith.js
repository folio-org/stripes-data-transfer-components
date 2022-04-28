import { computed } from '@bigtest/interactor';

export function hasClassBeginningWith(selector, className) {
  return computed(function checkHasClassBeginningWith() {
    return this.$(selector).className.includes(className);
  });
}
