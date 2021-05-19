const path = require ('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    watch: true,
    resolve: {
        extensions: ['.js'],
        alias: {
          '@utils': path.resolve(__dirname, 'src/utils/'),
          '@templates': path.resolve(__dirname, 'src/templates/'),
          '@styles': path.resolve(__dirname, 'src/styles/'),
          '@images': path.resolve(__dirname, 'src/assets/images/'),
        },
    },
    module: {
        rules: [
          {
            // Test declara que extensión de archivos aplicara el loader
            test: /\.m?js$/,
            // Use es un arreglo u objeto donde dices que loader aplicaras
            use: {
              loader: "babel-loader"
            },
            // Exclude permite omitir archivos o carpetas especificas
            exclude: /node_modules/
          },
          {
            test: /\.css|.styl$/i,
            use: [ MiniCssExtractPlugin.loader, 'css-loader' , 'stylus-loader' ]
          },
          {
            test: /\.png/,
            type: "asset/resource"
          },
          {
            test: /\.(woff|woff2)$/,
            use: {
                loader: 'url-loader', // NOMBRE DEL LOADER
                options: {
                    limit: false, // O LE PASAMOS UN NUMERO
                    // Habilita o deshabilita la transformación de archivos en base64.
                    mimetype: 'aplication/font-woff',
                    // Especifica el tipo MIME con el que se alineará el archivo. 
                    name: "[name].[contenthash].[ext]",
                    // EL NOMBRE INICIAL DEL PROYECTO + SU EXTENSIÓN
                    outputPath: './assets/fonts/', 
                    // EL DIRECTORIO DE SALIDA (SIN COMPLICACIONES)
                    publicPath: '../assets/fonts/',
                    // EL DIRECTORIO PUBLICO (SIN COMPLICACIONES)
                    esModule: false
                }
            }
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({ // CONFIGURACIÓN DEL PLUGIN
            inject: true, // INYECTA EL BUNDLE AL TEMPLATE HTML
            template: './public/index.html', // LA RUTA AL TEMPLATE HTML
            filename: './index.html' // NOMBRE FINAL DEL ARCHIVO
        }),
        new MiniCssExtractPlugin({
          filename : "assets/[name].[contenthash].css"
        }), // INSTANCIAMOS EL PLUGIN
        new CopyPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, "src", "assets/images"),
              to: "assets/images"
            }
          ]
      }),
      new Dotenv(),
    ], 
}
