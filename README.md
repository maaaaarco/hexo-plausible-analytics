# hexo-plausible-analytics

A simple Hexo plugin to inject [Plausible Analytics](https://plausible.io) script in your pages.

## General

Compatibility: Hexo 3 and above

- [Features](#Features)
- [Install](#Install)
- [Configurations](#Configurations)
  - [Enable the plugin](#Enable-the-plugin)
  - [Specify page types](#Specify-page-types)
  - [Serve as first-party connection](#Serve-as-first-party-connection)
  - [Exclude pages from being tracked](#Exclude-pages-from-being-tracked)
  - [Self-hosting](#Self-hosting)

## Features

- Extremely simple configuration
- Supports custom domain
- Supports *exclude* directive
- Supports self-hosting
- Inject the script only on specific page types *(page, post, draft, archive, ...)*

## Install

In the root directory of your project run:

```shell
$ npm install hexo-plausible-analytics
```

## Configurations

### Enable the plugin

To enable the plugin add this to your `config.yml`:

```yml 
plausible:
  enable: true
  domain: YOUR_DOMAIN
```

`domain` is the domain name of your site and is the only required property. Be sure to remove `https` and `www` from the URL. If your site is `https://www.yourdomain.com` then your configuration should look like this:

```yml 
plausible:
  enable: true
  domain: yourdomain.com
```

Will result in:

```html
<script async defer data-domain="yourdomain.com" src="https://plausible.io/js/plausible.js"></script>
```

### Specify page types

The `pages` property is an array that allows you to specify on which page types to inject the script. Valid values are:

- `default`: Inject to every page. **This is the default configuration**.
- `home`: Only inject to home page (which has `is_home()` helper being `true`)
- `post`: Only inject to post pages (which has `is_post()` helper being `true`)
- `page`: Only inject to pages (which has `is_page()` helper being `true`)
- `archive`: Only inject to archive pages (which has `is_archive()` helper being `true`)
- `category`: Only inject to category pages (which has `is_category()` helper being `true`)
- `tag`: Only inject to tag pages (which has `is_tag()` helper being `true`)

The following configuration will inject the scripts only on the home page and all posts:

```yml 
plausible:
  enable: true
  domain: yourdomain.com
  pages:
    - home
    - post
```

### Serve as first-party connection

Add the `subdomain` property and specify your subdomain if you want to serve the Plausible script as a [first-party](https://plausible.io/docs/custom-domain) connection.

```yml
plausible:
  enable: true
  domain: yourdomain.com
  subdomain: stats
```

Will result in:

```html
<script async defer data-domain="yourdomain.com" src="https://stats.yourdomain.com/js/index.js"></script>
```

### Exclude pages from being tracked

Specify in the `exclude` property the pages that you don't want to be tracked. You can enter them as a comma-separated string or as an array. Check the [official guide](https://plausible.io/docs/excluding-pages#2-add-the-pages-youd-like-to-exclude-from-being-tracked) on how to format them.

```yml 
plausible:
  enable: true
  domain: yourdomain.com
  exclude: '/blog4, /rule/*, /how-to-*, /*/admin'
```

Or as an array:

```yml 
plausible:
  enable: true
  domain: yourdomain.com
  exclude: 
    - /blog4
    - /rule/*
    - /how-to-*
    - /*/admin'
```

Both these configurations will result in:

```html
<script async defer data-domain="yourdomain.com" src="https://plausible.io/js/plausible.exclusions.js" data-exclude="/blog4, /rule/*, /how-to-*, /*/admin"></script>
```

The `exclude` property also works if you configured a `subdomain`:

```yml 
plausible:
  enable: true
  domain: yourdomain.com
  subdomain: stats
  exclude: '/blog4, /rule/*, /how-to-*, /*/admin'
```

Will result in:

```html
<script async defer data-domain="yourdomain.com" src="https://stats.yourdomain.com/js/index.exclusions.js" data-exclude="/blog4, /rule/*, /how-to-*, /*/admin"></script>
```

### Self-hosting

In case you are [self hosting](https://plausible.io/docs/self-hosting) you can specify the `src` property:

```yml 
plausible:
  enable: true
  domain: yourdomain.com
  src: https://yourdomain.com/plausible.js
```

Will result in:

```html
<script async defer data-domain="yourdomain.com" src="https://yourdomain.com/plausible.js"></script>
```

In case set the `exclude` property:

```yml 
plausible:
  enable: true
  domain: yourdomain.com
  src: https://yourdomain.com/plausible.js
  exclude: '/blog4, /rule/*, /how-to-*, /*/admin'
```

Will result in:

```html
<script async defer data-domain="yourdomain.com" src="https://yourdomain.com/plausible.js" data-exclude="/blog4, /rule/*, /how-to-*, /*/admin"></script>
```
