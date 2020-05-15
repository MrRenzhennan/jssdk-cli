const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin  = require('uglifyjs-webpack-plugin');
const config = {
    mode: 'production',
    entry: {
        'zahb.cropper.min': './src/index.js'//  /dist/cropper.min.js
    },
    output: {
        path: path.resolve(__dirname, 'dist'),//目标输出目录 path 的绝对路径
        filename: 'js/[name].js',//输出文件的文件名
        library: 'zahbSDKcropper',//爆露在全局的对象名称
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),//诉服务器从哪里提供内容
        host: '0.0.0.0',//服务器外部可访问
        //openPage: '/dist',//指定打开浏览器时要导航到的页面。
        compress: true, //gzip
        port: 9000,
        hot: true,
        inline: true
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, //  不包括node_modules文件夹
                loader: 'babel-loader',
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    //"style-loader",
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.resolve(__dirname, './postcss.config.js')
                            }
                        },
                    },
                    'sass-loader',
                ]
            },
            {
                test: /\.(eot|ttf|svg)$/,
                use: {
                    loader: 'file-loader'
                }
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].min.[ext]',
                            limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                            publicPath: 'fonts/',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            allChunks: true,
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            minify: {
                // 压缩 HTML 文件
                removeComments: true, // 移除 HTML 中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                minifyCSS: true // 压缩内联 css
            },
            template: path.join(__dirname) + '/src/index.html'
        }),
    ],
    optimization: {
        minimizer: [
            // 有时候webpack会默认优化z-index值，设置默认不优化
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    safe: true
                }
            }),
            new UglifyJsPlugin({
                //返回true以uglify块，否则返回false。
                chunkFilter: (chunk) => {
                    return true;
                  }
                }),
        ]
    },

};








module.exports = config;