/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#000000",
        card: {
          DEFAULT: "#ffffff",
          foreground: "#000000",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#000000",
        },
        primary: {
          DEFAULT: "#000000",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#fafafa",
          foreground: "#000000",
        },
        muted: {
          DEFAULT: "#fafafa",
          foreground: "#666666",
        },
        accent: {
          DEFAULT: "#fafafa",
          foreground: "#000000",
        },
        destructive: {
          DEFAULT: "#ff0000",
          foreground: "#ffffff",
        },
        border: "#eaeaea",
        input: "#eaeaea",
        ring: "#000000",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'vercel': '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
