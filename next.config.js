module.exports = {
    devIndicators: {
        autoPrerender: false,
    },
    plugins: [['@babel/plugin-proposal-decorators', { legacy: true }], ['babel-plugin-styled-components']],
    compress: false,
    trailingSlash: true,
    basePath: '/webapp',
    //basePath: '/wapp',
    //assetPrefix: '/wapp-stg-web',
    // i18n: {
    //     locales: ['en', 'th'],
    //     defaultLocale: 'th',
    //     localeDetection: false,
    // },
}
