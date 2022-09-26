/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cor: {
          green: "#95CD41",
          yellow: "#FFF323",
          orange: "#FFCA03",
          red: "#FF7F3F",
          pink: "#FA7070",
          purple: "#E80F91",
        },
        white: "#fefeff",
        black: "#2c2c2c",
      },
    },
  },
  plugins: [],
};
