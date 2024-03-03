/* eslint-disable func-names */
// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom';

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
    };
  };
