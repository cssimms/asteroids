const path = require("path");

module.exports = {
  entry: "./app.js",
  mode: "development",
  resolve: {
    extensions: [".ts", ".js"],
    modules: [path.join(__dirname, "node_modules")],
  },
  output: {
    path: `${__dirname}/dist`,
    filename: "bundle.js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "/dist"),
    },
    port: 9000,
  },
};
