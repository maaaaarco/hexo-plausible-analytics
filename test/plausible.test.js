/*
 * Copyright (c) 2021 Marco
 * Licensed under MIT license.
 * For full license text, see LICENSE file in the repo root or https://opensource.org/licenses/MIT
 * If you would like to contribute https://github.com/maaaaarco/hexo-plausible-analytics
 */

const htmlParser = require('node-html-parser');

const DEFAULT_PLAUSIBLE_URL = 'https://plausible.io/js/plausible.js';
const DEFAULT_PLAUSIBLE_EXCLUSIONS_URL =
  'https://plausible.io/js/plausible.exclusions.js';
const DOMAIN = 'example.com';

beforeEach(() => {
  hexo = {
    config: {
      plausible: {
        enable: true,
        domain: DOMAIN,
      },
    },
  };
});

describe('When src is set', () => {
  test('Ignores other parameters', () => {
    const src = 'https://custom.url';
    hexo.config.plausible.subdomain = 'custom';
    hexo.config.plausible.exclude = ['/test'];
    hexo.config.plausible.src = src;

    const res = require('../lib/plausible')(hexo)();
    const scriptElement = htmlParser.parse(res);

    expect(scriptElement.firstChild.getAttribute('src')).toBe(src);
    expect(scriptElement.firstChild.getAttribute('data-domain')).toBe(DOMAIN);
  });
});

describe('When src is not set', () => {
  describe('When subdomain is not set', () => {
    test('Loads script from plausible.io', () => {
      const res = require('../lib/plausible')(hexo)();
      const scriptElement = htmlParser.parse(res);

      expect(scriptElement.firstChild.getAttribute('src')).toBe(
        DEFAULT_PLAUSIBLE_URL
      );
      expect(scriptElement.firstChild.getAttribute('data-domain')).toBe(DOMAIN);
    });

    test('Loads exclusions script from plausible.io if exclude is set', () => {
      hexo.config.plausible.exclude = ['/test'];

      const res = require('../lib/plausible')(hexo)();
      const scriptElement = htmlParser.parse(res);

      expect(scriptElement.firstChild.getAttribute('src')).toBe(
        DEFAULT_PLAUSIBLE_EXCLUSIONS_URL
      );
      expect(scriptElement.firstChild.getAttribute('data-domain')).toBe(DOMAIN);
    });
  });

  describe('When subdomain is set', () => {
    test('Loads script from subdomain', () => {
      hexo.config.plausible.subdomain = 'plausible';
      const res = require('../lib/plausible')(hexo)();
      const scriptElement = htmlParser.parse(res);

      expect(scriptElement.firstChild.getAttribute('src')).toBe(
        `https://${hexo.config.plausible.subdomain}.${DOMAIN}/js/index.js`
      );
      expect(scriptElement.firstChild.getAttribute('data-domain')).toBe(DOMAIN);
    });

    test('Loads exclusions script from subdomain if exclude is set', () => {
      hexo.config.plausible.exclude = ['/test'];
      hexo.config.plausible.subdomain = 'plausible';

      const res = require('../lib/plausible')(hexo)();
      const scriptElement = htmlParser.parse(res);

      expect(scriptElement.firstChild.getAttribute('src')).toBe(
        `https://${hexo.config.plausible.subdomain}.${DOMAIN}/js/index.exclusions.js`
      );
      expect(scriptElement.firstChild.getAttribute('data-domain')).toBe(DOMAIN);
    });
  });

  describe('When exclude is set', () => {
    test('Works correctly if value is a comma-separated string', () => {
      hexo.config.plausible.exclude = '/test, /test2, /test3';

      const res = require('../lib/plausible')(hexo)();
      const scriptElement = htmlParser.parse(res);

      expect(scriptElement.firstChild.getAttribute('data-exclude')).toBe(
        hexo.config.plausible.exclude
      );
    });

    test('Works correctly if value is a string array', () => {
      hexo.config.plausible.exclude = ['/test', '/test2', '/test3'];

      const res = require('../lib/plausible')(hexo)();
      const scriptElement = htmlParser.parse(res);

      expect(scriptElement.firstChild.getAttribute('data-exclude')).toBe(
        hexo.config.plausible.exclude.join(',')
      );
    });
  });
});
