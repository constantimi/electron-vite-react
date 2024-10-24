import { z } from 'zod';
import dev from './config.development.json';
import prod from './config.production.json';
import test from './config.test.json';

let rawConfig = {};

switch (window.location.hostname) {
  case 'development.app':
    rawConfig = dev;
    break;
  case 'test.app':
    rawConfig = test;
    break;
  case 'production.app':
    rawConfig = prod;
    break;
  default:
    rawConfig = dev;
}

const config = z
  .object({
    API_URL: z.string(),
    app: z.object({
      icon: z.object({
        light: z.string(),
        dark: z.string(),
      }),
      name: z.string(),
    }),
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
          button: z.string(),
        }),
        button: z.object({
          color: z.string(),
          hover: z.string(),
          disabled: z.string(),
        }),
        input: z.object({
          primary: z.string(),
          default: z.string(),
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
