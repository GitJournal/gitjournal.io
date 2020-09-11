module.exports = {
  purge: [],
  theme: {
    fontFamily: {
      mono: [
        '"Roboto Mono"',
        '"Menlo"',
        '"Monaco"',
        '"Consolas"',
        '"Liberation Mono"',
        '"Courier New"',
        '"monospace"',
      ],
    },
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
