module.exports = {
  purge: [],
  theme: {
    typography: {
      default: {
        css: {
          h1: {
            "margin-top": "2em",
          },
        },
      },
    },
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
    purgeLayersByDefault: true,
  },
};
