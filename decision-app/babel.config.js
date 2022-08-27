module.exports = (api) => {
  api.cache(true);

  return ({
      presets: [
          '@babel/preset-env',
          [
              "@babel/preset-react", {
              "runtime": "automatic"
          }
          ]
      ],
      plugins: [
          "@babel/plugin-syntax-dynamic-import",
          "@babel/proposal-class-properties",
          "@babel/proposal-object-rest-spread",
          "@babel/plugin-proposal-optional-chaining",
          "@babel/plugin-proposal-nullish-coalescing-operator"
      ],
  });
};