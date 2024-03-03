module.exports = {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      mobile: { max: '550px' },
      sm: '551px',
      md: '912px',
      lg: '1440px',
    },
    fontSize: {
      xs: '0.625rem',
      sm: '0.75rem',
      base: '0.75rem',
      md: '0.875rem',
      lg: '1rem',
      xl: '1.125rem',
      '2xl': '1.25rem',
    },
  },
};
