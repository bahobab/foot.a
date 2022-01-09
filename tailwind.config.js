module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
        'th-foreground': 'var(--foreground)',
        'th-background': 'var(--background)',
        'th-background-secondary': 'var(--background-secondary)',
        'th-background-tertiary': 'var(--background-tertiary)',
        'th-primary': 'var(--primary)',
        'th-primary-dark': 'var(--primary-dark)',
        'th-primary-medium': 'var(--primary-medium)',
        'th-primary-light': 'var(--primary-light)',
        'th-secondary': 'var(--secondary)',
        'th-secondary-dark': 'var(--secondary-dark)',
        'th-secondary-medium': 'var(--secondary-medium)',
        'th-primary-light': 'var(--secondary-light)',
        'th-tertiary': 'var(--tertiary)',
        'th-primary-dark': 'var(--primary-dark)',
        'th-tertiary-medium': 'var(--tertiary-medium)',
        'th-tertiary-light': 'var(--tertiary-light)',
        'th-accent': 'var(--accent)',
        'th-accent-primary': 'var(--accent-primary)',
        'th-accent-secondary': 'var(--accent-secondary)',
        'th-accent-tertiary': 'var(--accent-tertiary)',
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
