import Dotenv from "dotenv-webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import { DefinePlugin } from "webpack";

const isProduction = process.env.NODE_ENV === "production";

const config = {
  entry: "./src/index.tsx",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", ["@babel/preset-react"], "@babel/preset-typescript"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: ["css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css", ".scss"],
    fallback: { url: false },
  },
  output: {
    publicPath: isProduction ? "/control_panel_ui/" : "/",
    filename: "[name].js",
  },
  devServer: {
    static: path.join(__dirname, "build"),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 4000,
  },
  mode: "development",
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
    new HtmlWebpackPlugin({
      hash: true,
      inject: false,
      template: path.join(__dirname, "./src/index.html"),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
    new Dotenv(),

    new DefinePlugin({
      "process.env.BASE_URL": JSON.stringify(process.env.BASE_URL),
    }),
  ],
};

export default config;
