module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    "plugins": [
      ["module-resolver", {
        "root": ["./src"],
        "alias": {
          "@assets": "./src/assets"
        },
        "alias": {
          "@screens": "./src/screens"
        },
        "alias": {
          "@routes": "./src/routes"
        },
        "alias": {
          "@components": "./src/components"
        }
      }]
    ]
  };
};
