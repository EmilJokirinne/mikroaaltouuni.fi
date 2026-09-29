/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.ts", "./app.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
      },
      colors: {
        navy: {
          50: "#f1f5fa",
          100: "#e1e9f3",
          200: "#c5d3e6",
          300: "#9bb2d2",
          400: "#6a88b6",
          500: "#48679b",
          600: "#36507f",
          700: "#2c4168",
          800: "#1f2f4e",
          900: "#14213a",
          950: "#0c1528",
        },
        accent: {
          50: "#fff8eb",
          100: "#ffecc7",
          200: "#ffd88a",
          300: "#ffbf4d",
          400: "#fba626",
          500: "#f08a0c",
          600: "#d46a06",
          700: "#b04d09",
          800: "#8f3c0f",
        },
        ink: {
          DEFAULT: "#262b33",
          soft: "#4a515c",
          muted: "#5f6773",
        },
        surface: "#f6f7f9",
        line: "#e6e8ec",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,.04), 0 1px 3px rgba(16,24,40,.06)",
        lift: "0 4px 10px -2px rgba(16,24,40,.08), 0 12px 24px -8px rgba(16,24,40,.10)",
      },
      maxWidth: { prose: "46rem" },
    },
  },
  plugins: [],
};
