/** @type {import("prettier").Options} */
module.exports = {
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["clsx"],
};
