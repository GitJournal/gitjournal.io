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
  important: "html", // For https://github.com/tailwindlabs/tailwindcss-typography/issues/32
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-debug-screens"),
  ],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
