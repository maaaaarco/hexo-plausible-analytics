/*
 * Copyright (c) 2021 Marco
 * Licensed under MIT license.
 * For full license text, see LICENSE file in the repo root or https://opensource.org/licenses/MIT
 * If you would like to contribute https://github.com/maaaaarco/hexo-plausible-analytics
 */

module.exports = (hexo) => () => {
  const { domain, subdomain, exclude, src } = hexo.config.plausible;

  const dataExclude = Array.isArray(exclude)
    ? exclude.join(',')
    : typeof exclude === 'string'
    ? exclude
    : undefined;

  let srcAttr = src;

  if (!srcAttr) {
    let host, path;

    if (subdomain) {
      // first-party connection
      host = `${subdomain}.${domain}`;
      path = exclude ? '/js/index.exclusions.js' : '/js/index.js';
    } else {
      host = 'plausible.io';
      path = exclude ? '/js/plausible.exclusions.js' : '/js/plausible.js';
    }

    srcAttr = `https://${host}${path}`;
  }

  return `<script async defer data-domain="${domain}" src="${srcAttr}" ${
    exclude ? `data-exclude="${dataExclude}"` : ''
  }></script>`;
};
