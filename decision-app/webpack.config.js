const path = require("path");

module.exports = {
  target: "web",
  entry: { app: "./src/index.jsx" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.(js|jsx)$/,
        exclude: /node_module/,
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    static: "./dist",
    port: 3000,
    proxy: {
      // when a requst to /api is done, we want to apply a proxy
      "/api": {
        changeOrigin: true,
        target: "http://localhost:3001",
        pathRewrite: { "^/api": "" },
      },
    },
  },
  devtool: "source-map",
};
