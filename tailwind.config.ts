import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        surface: '#fafafa',
        'surface-2': '#f5f5f5',
        border: '#eaeaea',
        'border-subtle': '#f2f2f2',
        muted: '#666666',
        accent: '#0070f3',
        'accent-hover': '#0060df',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
