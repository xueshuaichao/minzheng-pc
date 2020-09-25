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
            '/apii': {
                target:
                    'http://mz-resource-server.testing1.svc.k8s.bjo.wdcloud.cc',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '/apii': '',
                },
            },
            '/apis': {
                target:
                    'http://mz-course-server.testing1.svc.k8s.bjo.wdcloud.cc',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '/apis': '',
                },
            },
            '/api/v1': {
                target: 'http://gateway-server.testing1.svc.k8s.bjo.wdcloud.cc',
                ws: true,
                changeOrigin: true,
                pathRewrite: {},
            },
            '/\\w+/api/': {
                target: 'http://gateway-server.testing1.svc.k8s.bjo.wdcloud.cc',
                ws: true,
                changeOrigin: true,
                pathRewrite: {},
            },
            '/user/': {
                target: 'http://gateway-server.testing1.svc.k8s.bjo.wdcloud.cc',
                ws: true,
                changeOrigin: true,
                pathRewrite: {},
            },
            // '/course/': {
            //     target: 'http://gateway-server.testing1.svc.k8s.bjo.wdcloud.cc',
            //     ws: true,
            //     changeOrigin: true,
            //     pathRewrite: {},
            // },
            // '/courseItem/': {
            //     target: 'http://gateway-server.testing1.svc.k8s.bjo.wdcloud.cc',
            //     ws: true,
            //     changeOrigin: true,
            //     pathRewrite: {},
            // },
            // '/courseOrder/': {
            //     target: 'http://gateway-server.testing1.svc.k8s.bjo.wdcloud.cc',
            //     ws: true,
            //     changeOrigin: true,
            //     pathRewrite: {},
            // },
            // '/courseLearningLog/': {
            //     target: 'http://gateway-server.testing1.svc.k8s.bjo.wdcloud.cc',
            //     ws: true,
            //     changeOrigin: true,
            //     pathRewrite: {},
            // },
            // '/category/': {
            //     target: 'http://gateway-server.testing1.svc.k8s.bjo.wdcloud.cc',
            //     ws: true,
            //     changeOrigin: true,
            //     pathRewrite: {},
            // },
            // '/scene/': {
            //     target: 'http://gateway-server.testing1.svc.k8s.bjo.wdcloud.cc',
            //     ws: true,
            //     changeOrigin: true,
            //     pathRewrite: {},
            // },
            // '/job/': {
            //     target: 'http://gateway-server.testing1.svc.k8s.bjo.wdcloud.cc',
            //     ws: true,
            //     changeOrigin: true,
            //     pathRewrite: {},
            // },
            // '/notice/': {
            //     target: 'http://gateway-server.testing1.svc.k8s.bjo.wdcloud.cc',
            //     ws: true,
            //     changeOrigin: true,
            //     pathRewrite: {},
            // },
            // '/resource/': {
            //     target: 'http://gateway-server.testing1.svc.k8s.bjo.wdcloud.cc',
            //     ws: true,
            //     changeOrigin: true,
            //     pathRewrite: {},
            // },
            '/\\w+/': {
                target: 'http://gateway-server.testing1.svc.k8s.bjo.wdcloud.cc',
                ws: true,
                changeOrigin: true,
                pathRewrite: {},
            },
        },
    },
};
