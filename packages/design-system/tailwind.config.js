const { tokens } = require('./tokens');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: tokens.colors,
      spacing: tokens.spacing,
      animation: tokens.animation,
    },
  },
  plugins: [],
};
