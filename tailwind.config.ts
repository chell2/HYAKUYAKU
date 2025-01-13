import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      zIndex: {
        sideDrawer: '10',
        globalMenu: '100',
        modal: '50',
      },
    },
  },
  plugins: [daisyui, typography],
  daisyui: {
    themes: ['light', 'dark', 'cupcake', 'fantasy', 'winter'],
  },
};
export default config;
