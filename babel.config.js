module.exports = {
  presets: ["module:metro-react-native-babel-preset", "@babel/preset-typescript"],
  env: {
    production: {},
  },
  plugins: [
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    // ["@babel/plugin-proposal-class-properties", { loose: true }],
    ["@babel/plugin-proposal-optional-catch-binding"],
  ],
};
