import { computed } from '@bigtest/interactor';

export function hasClassBeginningWith(selector, className) {
  return computed(function () {
    return this.$(selector).className.includes(className);
  });
}
