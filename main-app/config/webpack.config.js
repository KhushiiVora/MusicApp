const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./src/index.js",
  output: {
    publicPath:
      process.env.NODE_ENV === "production" ? "auto" : "http://localhost:3000/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias:
      process.env.NODE_ENV === "production"
        ? {}
        : {
            music_library: path.resolve(__dirname, "../../music-library/src"),
          },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "main_app",
      remotes: {
        music_library:
          process.env.NODE_ENV === "production"
            ? "music_library@https://music-library-kv.netlify.app/remoteEntry.js"
            : "music_library@http://localhost:3001/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        "react-dom": { singleton: true, requiredVersion: false },
      },
    }),
  ],
  devServer: {
    port: 3000,
    hot: true,
  },
};
