module.exports = {
  purge: [],
  theme: {
    typography: {
      default: {
        css: {
          color: "#1a202c",
          h1: {
            "margin-top": "2em",
          },
          a: {
            "&:hover": {
              color: "#48bb78",
            },
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
  variants: {
    textColor: ["responsive", "hover", "focus", "group-hover"],
  },
  important: "html", // For https://github.com/tailwindlabs/tailwindcss-typography/issues/32
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-debug-screens"),
    require("tailwind-heropatterns")({
      variants: [],
      patterns: ["circuit-board"],
      colors: {
        default: "#9C92AC",
      },
      opacity: {
        default: "0.04",
      },
    }),
  ],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
