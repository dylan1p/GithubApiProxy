module.exports = {
  extends: ["airbnb", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "no-console": ["error", { allow: ["debug", "error"] }]
  }
}
