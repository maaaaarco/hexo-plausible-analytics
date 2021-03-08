/*
 * Copyright (c) 2021 Marco
 * Licensed under MIT license.
 * For full license text, see LICENSE file in the repo root or https://opensource.org/licenses/MIT
 * If you would like to contribute https://github.com/maaaaarco/hexo-plausible-analytics
 */

/* global hexo */
const injector = require('./lib/plausible');

function run(config) {
  if (!config) {
    // plugin is not configured
    return;
  }

  const { enable, pages, domain } = config;

  if (!enable) {
    return;
  }

  if (!domain) {
    console.log('ERROR  hexo-plausible-analytics: _domain_ cannot be blank');
    return;
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

run(hexo.config.plausible);
