import { z } from 'zod';
import dev from './config.development.json';
import prod from './config.production.json';
import staging from './config.staging.json';
import test from './config.test.json';

let rawConfig = {};

switch (window.location.hostname) {
  case 'production.app.com':
    rawConfig = prod;
    break;
  case 'staging.app.com':
    rawConfig = staging;
    break;
  case 'test.app.com':
    rawConfig = test;
    break;
  case 'development.app.com':
    rawConfig = dev;
    break;
  default:
    rawConfig = dev;
}

const config = z
  .object({
    API_URL: z.string(),
    appIcon: z.string(),
    appName: z.string(),
    settings: z.object({
      defaultLang: z.string(),
      defaultFontSize: z.string(),
      defaultTheme: z.string(),
    }),
    dev: z.boolean().default(false),
    themes: z.record(
      z.string(),
      z.object({
        background: z.object({
          main: z.string(),
          sidebar: z.string(),
          topbar: z.string(),
          activeTab: z.string(),
        }),
        text: z.object({
          primary: z.string(),
          secondary: z.string(),
          disabled: z.string(),
          buttonHover: z.string(),
        }),
        button: z.object({
          color: z.string(),
          hover: z.string(),
          disabled: z.string(),
        }),
        input: z.object({
          primary: z.string(),
          secondary: z.string(),
        }),
        border: z.object({
          primary: z.string(),
          secondary: z.string(),
        }),
      })
    ),
  })
  .parse(rawConfig);

export default config;
