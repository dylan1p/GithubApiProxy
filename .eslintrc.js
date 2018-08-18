module.exports = {
  extends: ["airbnb", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "no-console": ["error", { allow: ["debug", "error"] }],
    "no-underscore-dangle": ["error", { "allow": ["_id"] }],
    "prefer-destructuring": ["error", {
      "VariableDeclarator": {
        "array": true,
        "object": false
      }
    }]
  }
}
