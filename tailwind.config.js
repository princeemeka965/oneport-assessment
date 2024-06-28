/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      colors: {
        shinyBlack: "#1F2937",
        shinyGreen: "#00861E",
        shinyGrey: "#969696",
        tagGreen: "rgba(152, 255, 155, 0.25)",
        shinyBlue: "rgba(0, 91, 194, 1)",
        darkActive: "rgba(31, 41, 55, 1)",
        blueFold: "#3B82F6",
        lightFur: "#D0F5FF",
        darkCrayola: "#374151"
      }
    },
  },
  plugins: [],
});

