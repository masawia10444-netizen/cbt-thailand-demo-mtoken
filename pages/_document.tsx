import React, { Fragment, useEffect } from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'
import IEnoSupported from './ieNoSupported'

export default class MyDocument extends Document {
    isProduction = process.env.NODE_ENV === 'production'

    render() {
        return (
            <Html lang='th'>
                <Head>
                    {this.isProduction && (
                        <meta name='google-site-verification' content='hTP1MSS5hpBcPLq6ad_dlKjKUMUdv_Ufd-mK-VCUzPA' />
                    )}
                    <link rel='icon' href={`${process.env.NEXT_PUBLIC_WEB_URL || ''}/favicon.ico`} />

                    <meta
                        name='viewport'
                        content='width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'
                    />
                    <link
                        rel='stylesheet'
                        href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
                    ></link>
                    <script src='https://d.line-scdn.net/r/web/social-plugin/js/thirdparty/loader.min.js'></script>
                    <script src='https://czp.dga.or.th/cportal/sdk/iu/v4/sdk.js'></script>
                    {/* <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            console.log(window.location);
                            var nameToReplaceGloble = /[\\]?fbclid.+/;
                                    window.location.replace(location.href.replace(nameToReplaceGloble, ''));
                                    `,
                        }}
                    /> */}
                    {this.isProduction && (
                        <Fragment>
                            <script
                                dangerouslySetInnerHTML={{
                                    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                                        })(window,document,'script','dataLayer','GTM-PXDQCLV');`,
                                }}
                            />
                            <script async src='https://www.googletagmanager.com/gtag/js?id=UA-181760215-1' />
                            <script
                                dangerouslySetInnerHTML={{
                                    __html: `
                                    window.dataLayer = window.dataLayer || [];
                                    function gtag(){dataLayer.push(arguments);}
                                    gtag('js', new Date());
                                    gtag('config', 'UA-181760215-1');
                                    `,
                                }}
                            />

                            {/* <script async src='https://www.googletagmanager.com/gtag/js?id=G-9K2MVTE7TQ' />
                            <script
                                dangerouslySetInnerHTML={{
                                    __html: `
                                    window.dataLayer = window.dataLayer || [];
                                    function gtag(){dataLayer.push(arguments);}
                                    gtag('js', new Date());
                                    gtag('config', 'G-9K2MVTE7TQ');
                                    `,
                                }}
                            /> */}
                        </Fragment>
                    )}

                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            document.addEventListener("DOMContentLoaded", function(event) {
                                var isIE = navigator.userAgent.indexOf('Trident') !== -1
                                        if (isIE) {
                                            document.getElementById('notSupportDiv').style.display = ''
                                        } else {
                                            document.getElementById('root').style.display = ''
                                        }
                            });
                                    `,
                        }}
                    />
                </Head>
                {/* @ts-ignore */}
                <body id='myBodyWapp' style={{ display: 'block' }}>
                    <div id='notSupportDiv' style={{ display: 'none' }}>
                        <IEnoSupported />
                    </div>

                    <div id='root' style={{ display: 'none' }}>
                        <Main />
                        <NextScript />
                    </div>
                </body>
                {this.isProduction && (
                    <noscript
                        dangerouslySetInnerHTML={{
                            __html: `<iframe
                        src='https://www.googletagmanager.com/ns.html?id=GTM-PXDQCLV'
                        height='0'
                        width='0'
                        style='display:none;visibility:hidden'
                    ></iframe>`,
                        }}
                    />
                )}
            </Html>
        )
    }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
        })

    const initialProps = await Document.getInitialProps(ctx)

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    }
}
