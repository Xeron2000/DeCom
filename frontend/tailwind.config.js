/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accents: {
          1: "var(--accents-1)",
          2: "var(--accents-2)",
          3: "var(--accents-3)",
          4: "var(--accents-4)",
          5: "var(--accents-5)",
          6: "var(--accents-6)",
          7: "var(--accents-7)",
          8: "var(--accents-8)",
        },
        success: {
          DEFAULT: "var(--success)",
          lighter: "var(--success-lighter)",
          darker: "var(--success-darker)",
        },
        error: {
          DEFAULT: "var(--error)",
          lighter: "var(--error-lighter)",
          darker: "var(--error-darker)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          lighter: "var(--warning-lighter)",
          darker: "var(--warning-darker)",
        },
        violet: {
          DEFAULT: "var(--violet)",
          lighter: "var(--violet-lighter)",
          darker: "var(--violet-darker)",
        },
        cyan: {
          DEFAULT: "var(--cyan)",
          lighter: "var(--cyan-lighter)",
          darker: "var(--cyan-darker)",
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Menlo', 'Monaco', 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'sm': '0 2px 4px rgba(0,0,0,0.12)',
        'md': '0 5px 10px rgba(0,0,0,0.12)',
        'lg': '0 8px 30px rgba(0,0,0,0.12)',
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        normal: '0',
        wide: '0.02em',
        wider: '0.04em',
        widest: '0.1em',
      },
    },
  },
  plugins: [],
}
