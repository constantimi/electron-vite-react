module.exports = {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      mobile: { max: '520px' },
      sm: '521px',
      md: '912px',
      lg: '1440px',
    },
    fontSize: {
      xs: '0.5rem',
      sm: '0.625rem',
      base: '0.75rem',
      md: '0.8125rem',
      lg: '0.9375rem',
      xl: '1rem',
      '2xl': '1.125rem',
      '3xl': '1.5rem',
      '4xl': '1.875rem',
    },
  },
};
