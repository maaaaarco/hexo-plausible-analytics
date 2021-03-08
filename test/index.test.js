/*
 * Copyright (c) 2021 Marco
 * Licensed under MIT license.
 * For full license text, see LICENSE file in the repo root or https://opensource.org/licenses/MIT
 * If you would like to contribute https://github.com/maaaaarco/hexo-plausible-analytics
 */

beforeEach(() => {
  global.__registerMock = jest.fn();
  hexo = {
    extend: {
      injector: {
        register: __registerMock,
      },
    },
    config: {},
  };
});

test('Does nothing if plugin is disabled', () => {
  hexo.config.plausible = {
    enable: false,
  };

  jest.isolateModules(() => {
    require('../index.js');
  });

  expect(__registerMock.mock.calls.length).toBe(0);
});

test('Throws error if domain is not defined', () => {
  hexo.config.plausible = {
    enable: true,
  };

  expect(() => {
    jest.isolateModules(() => {
      require('../index.js');
    });
  }).toThrow();
});

test('Registers specified pages correctly', () => {
  const pages = ['post', 'page', 'archive'];

  hexo.config.plausible = {
    enable: true,
    domain: 'example.com',
    pages,
  };

  jest.isolateModules(() => {
    require('../index.js');
  });

  expect(__registerMock.mock.calls.length).toBe(3);
  __registerMock.mock.calls.forEach((call, idx) => {
    expect(call[0]).toBe('head_end');
    expect(call[1]).toBeTruthy();
    expect(call[2]).toBe(pages[idx]);
  });
});

test('When pages is undefined registers all pages correctly', () => {
  hexo.config.plausible = {
    enable: true,
    domain: 'example.com',
  };

  jest.isolateModules(() => {
    require('../index.js');
  });

  expect(__registerMock.mock.calls.length).toBe(1);
  __registerMock.mock.calls.forEach((call) => {
    expect(call.length).toBe(2);
  });
});

test('When pages is set to _default_ registers all pages correctly', () => {
  hexo.config.plausible = {
    enable: true,
    domain: 'example.com',
  };

  jest.isolateModules(() => {
    require('../index.js');
  });

  expect(__registerMock.mock.calls.length).toBe(1);
  __registerMock.mock.calls.forEach((call) => {
    expect(call.length).toBe(2);
  });
});


