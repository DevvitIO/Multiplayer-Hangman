const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const outputDirectory = "dist";

module.exports = {
  mode: "development",
  entry: "./client/client.js",
  watch: true,
  output: {
    path: path.join(__dirname, "client", outputDirectory),
    filename: "bundle.js"
  },
  watchOptions: {
    ignored: ['server/**/*.js', 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: "assets/**/*", context: "client" },
      { from: "index.html", context: "client" }
    ]),
    new BrowserSyncPlugin({
      server: { baseDir: ['client/dist', 'server'] },
      watch: true
    })
  ]
};
