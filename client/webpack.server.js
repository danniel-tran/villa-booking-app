const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    target: 'node',
    entry: './src/server.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js',
        libraryTarget: 'commonjs2',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        configFile: false,
                        sourceType: 'module',
                        presets: [
                            ['@babel/preset-env', { modules: 'commonjs' }],
                            '@babel/preset-react',
                        ],
                        plugins: ['@babel/plugin-transform-runtime'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['css-loader'], // style-loader không dùng được trên server, dùng css-loader để import css modules nếu cần
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    externals: [nodeExternals()], // loại bỏ node_modules khỏi bundle
};