/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      colors: {
        shinyBlack: "#1F2937",
      }
    },
  },
  plugins: [],
});

