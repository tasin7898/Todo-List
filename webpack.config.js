import path from "node:path";
import { fileURLToPath } from "node:url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/index.js",

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  devtool: "eval-source-map",

  devServer: {
    static: path.resolve(__dirname, "dist"),
    watchFiles: ["./src/template.html"],
    port: 8080,
    open: true,
    client: {
      logging: "none",
    },
  },

  target: "web",

  resolve: {
    extensions: [".js", ".json"],
    mainFields: ["browser", "module", "main"],
    fallback: {
      path: require.resolve("path-browserify"),
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      url: require.resolve("url/"),
      util: require.resolve("util/"),
      assert: require.resolve("assert/"),
      os: require.resolve("os-browserify/browser"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      constants: require.resolve("constants-browserify"),
      vm: require.resolve("vm-browserify"),
      tty: require.resolve("tty-browserify"),
      zlib: require.resolve("browserify-zlib"),
      querystring: require.resolve("querystring-es3"),
      fs: false,
      module: false,
      pnpapi: false,
    },
    alias: {
      worker_threads: false,
      child_process: false,
      esbuild: false,
      "jest-worker": false,
      "loader-runner": false,
      "@swc/core": false,
      "@swc/wasm": false,
      pnpapi: false,
      inspector: false,
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),

    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),

    new webpack.IgnorePlugin({ resourceRegExp: /^jest-worker$/ }),
    new webpack.IgnorePlugin({ resourceRegExp: /^loader-runner$/ }),
    new webpack.IgnorePlugin({ resourceRegExp: /^@swc\/core/ }),
  ],

  module: {
    rules: [
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
      { test: /\.html$/i, use: ["html-loader"] },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: "asset/resource" },
      { test: /\.d\.ts$/, use: "ignore-loader" },
      { test: /\.node$/, use: "ignore-loader" },
    ],
  },

  // ✅ THIS IS WHAT ACTUALLY SILENCES YOUR WARNINGS
  stats: {
    warnings: false,
    moduleTrace: false,
  },

  infrastructureLogging: {
    level: "none",
  },

  ignoreWarnings: [
    {
      module: /node_modules/,
      message: /Critical dependency/,
    },
  ],
};