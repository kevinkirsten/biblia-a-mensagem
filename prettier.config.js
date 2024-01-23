/** @type {import("prettier").Options} */
module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx'],
};
