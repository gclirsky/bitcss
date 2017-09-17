// exports the configuration objects

const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const distRoot = '';
const mainCSS = distRoot + 'bitcss.raw.css';
const mainSASS = distRoot + 'bitcss.css';

const extractCSS = new ExtractTextPlugin(mainCSS);
const extractSASS = new ExtractTextPlugin(mainSASS);

module.exports = {
    resolve: {
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules')
        ]
    },
    entry: {
        app: ['./src/js/index.js', './src/scss/itcss/bitcss.scss'],
    },
    devtool: "source-map",
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 9000,
        open: true,
        openPage: "index.html"
        // hot: true,
        // inline: true,
        // watchContentBase: true,
        // watchOptions: {
        //     ignored: /node_modules/,
        //     poll: 1000
        // }
    },
    output: {
        filename: 'assets/js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        //publicPath: './dist'
    },
    module: {
        rules: [{
                // regular css files
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?sourceMap&url=true', 'resolve-url-loader']
                })
            },
            {
                // sass / scss loader for webpack
                test: /\.(scss|sass)$/,
                include: [
                    path.resolve(__dirname, 'src/scss/itcss'),
                ],
                exclude: [
                    path.resolve(__dirname, 'src/scss/app')
                ],
                use: extractSASS.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader?sourceMap&url=true', 'resolve-url-loader', 'sass-loader?sourceMap']
                })
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        //root: path.resolve(__dirname, 'src')
                    }
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        //context: 'assets/images/',
                        //root: path.resolve(__dirname, 'src'),
                        outputPath: 'assets/images/'
                        //useRelativePath: true
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/fonts/'
                    }
                }]
            },
            {
                test: /\.exec\.js$/,
                use: ['script-loader']
            }
        ]
    },
    plugins: [
        extractCSS,
        extractSASS,
        // new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['assets/**', './**.css', './**.html'], {
            root: path.resolve(__dirname, 'dist'),
            verbose: true,
            dry: false,
            exclude: ['.keep']
        }),
        new HtmlWebpackPlugin({
            title: 'showcase-page',
            template: 'src/index.html',
            filename: './index.html'
        })
    ]
};
