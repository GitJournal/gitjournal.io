module.exports = {
  plugins: [
    require("tailwindcss")("assets/config/tailwind.config.js"),

    process.env.HUGO_ENV === "production"
      ? require("@fullhuman/postcss-purgecss")({
          content: ["layouts/**/*.html", "content/**/*.md"],
          css: ["public/css/*.css"],
          extractors: [
            {
              extractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
              extensions: ["html"],
            },
          ],
        })
      : null,

    require("autoprefixer")(),
  ],
};
