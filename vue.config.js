const merge = require('deepmerge');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');

module.exports = {
    publicPath: '/',
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',

                jQuery: 'jquery',
                'windows.jQuery': 'jquery',
            }),
        ],
    },
    // tweak internal webpack configuration.
    chainWebpack: (config) => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(options => merge(options, {
                loaders: {
                    i18n: '@kazupon/vue-i18n-loader',
                },
            }))
            .end()
            .use('iview-loader')
            .loader('iview-loader')
            .tap(() => ({
                prefix: true,
            }))
            .end();
    },

    css: {
        // 配置高于chainWebpack中关于css loader的配置
        loaderOptions: {
            // css预设器配置项
            less: {
                javascriptEnabled: true,
            },
        },
    },

    transpileDependencies: [/\biview\/src\/locale\/lang\b/],

    devServer: {
        open: true,
        compress: true,
        // 解决 Webpack "Invalid Host Header"
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'http://mapi.testing1.wdeduc.com',
                ws: true,
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
            },
        },
    },
};
