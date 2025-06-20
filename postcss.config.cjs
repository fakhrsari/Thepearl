// postcss.config.cjs
// Include both Tailwind CSS and Autoprefixer in the PostCSS pipeline
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    // …other plugins…
  ],
};