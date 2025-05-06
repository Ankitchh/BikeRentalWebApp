/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ecf9f1",
          100: "#d0f0dc",
          200: "#a6e4ba", // Main theme color
          300: "#7ad098",
          400: "#4eba77",
          500: "#339f59",
          600: "#248045",
          700: "#1a6035",
          800: "#144025",
          900: "#0c2015",
        },
        secondary: {
          50: "#eef8ff",
          100: "#d9edff",
          200: "#bcdfff",
          300: "#8ecbff",
          400: "#5aaeff",
          500: "#3488ff",
          600: "#1a68f5",
          700: "#1354e5",
          800: "#1544b8",
          900: "#163c91",
        },
        accent: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        neutral: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      animation: {
        scroll: "scroll 25s linear infinite",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
