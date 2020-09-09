module.exports = {
  purge: [],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-debug-screens"),
  ],
  future: {
    removeDeprecatedGapUtilities: true,
  },
};
