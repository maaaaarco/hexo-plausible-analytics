/*
 * Copyright (c) 2021 Marco
 * Licensed under MIT license.
 * For full license text, see LICENSE file in the repo root or https://opensource.org/licenses/MIT
 * If you would like to contribute https://github.com/maaaaarco/hexo-plausible-analytics
 */

/* global hexo */
const injector = require('./lib/plausible');
const { enable, pages, domain } = hexo.config.plausible;

if (enable) {
  if (!domain) {
    throw new Error(
      '[hexo-plausible-analytics - ERROR]: _domain_ cannot be blank'
    );
  }

  if (Array.isArray(pages)) {
    // registers injector only on specified pages
    pages.forEach((page) => {
      hexo.extend.injector.register('head_end', injector(hexo), page);
    });
  }

  if (!pages || pages === 'default') {
    // registers injector on all pages
    hexo.extend.injector.register('head_end', injector(hexo));
  }
}
