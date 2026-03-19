const Banner = process.env.NEXT_PUBLIC_WEB_URL + '/images/home/banner@2x.png'
const iconSpBrowser = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon_ie_not_supported/ic_spbrowser.svg'

const iconGoogleChrome = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon_ie_not_supported/ic_browser_ch.svg'
const iconFirefox = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon_ie_not_supported/ic_browser_Firefox.svg'
const iconEdge = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon_ie_not_supported/ic_browser_ie.svg'
const IEnoSupported = () => {
    return (
        <div>
            <div
                style={{
                    background: `url(${Banner}) no-repeat 0 0`,
                    backgroundSize: 'cover',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    filter: 'blur(8px)',
                    position: 'absolute',
                    opacity: 0.7,
                    fontFamily: 'Prompt-Regular',
                }}
            />
            <div
                style={{
                    resize: 'horizontal',
                    width: 600,
                    height: 320,
                    padding: '10px',
                    display: 'inline-block',
                    position: 'absolute',
                    overflow: 'hidden',
                    alignItems: 'center',
                    top: '0',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    margin: 'auto',
                    paddingBottom: 20,
                    backgroundColor: 'rgb(250, 250, 250)',
                    textAlign: 'center',
                    boxShadow:
                        '4px 4px 4px 4px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 1px 3px 0px rgba(0, 0, 0, 0.12) !important',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                        loading='lazy'
                        src={iconSpBrowser}
                        style={{ height: 'auto', width: 200, verticalAlign: 'middle', marginTop: 5 }}
                    />
                </div>
                <div
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        fontSize: 16,
                        letterSpacing: 0,
                        fontWeight: 'bold',
                        color: '#666666',
                        fontFamily: 'Prompt-Regular',
                    }}
                >
                    <div>ใช้งานเว็บไซต์ อพท. เต็มความสามารถบนเบราว์เซอร์ที่รองรับ</div>
                </div>
                <div
                    style={{
                        backgroundColor: '#fdd600',
                        width: '60%',
                        minWidth: '160px',
                        height: '3px',
                        display: 'inline-flex',
                        marginTop: 15,
                        marginBottom: 15,
                    }}
                />

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        padding: '0 2vw',
                    }}
                >
                    <a
                        href='https://www.google.com/intl/th/chrome'
                        style={{ color: '#666666', textDecoration: 'none' }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <img loading='lazy' src={iconGoogleChrome} style={{ verticalAlign: 'middle', width: 70 }} />
                            <div
                                style={{
                                    textAlign: 'center',
                                    fontSize: '16px',
                                    fontFamily: 'Prompt-Regular',
                                    marginTop: 10,
                                }}
                            >
                                Google Chrome
                            </div>
                        </div>
                    </a>
                    <a
                        href='https://www.mozilla.org/th/firefox/download'
                        style={{ color: '#666666', textDecoration: 'none' }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <img loading='lazy' src={iconFirefox} style={{ verticalAlign: 'middle', width: 70 }} />
                            <div
                                style={{
                                    textAlign: 'center',
                                    fontSize: '16px',
                                    fontFamily: 'Prompt-Regular',
                                    marginTop: 10,
                                }}
                            >
                                Mozilla Firefox
                            </div>
                        </div>
                    </a>
                    <a href='https://www.microsoft.com/th-th/edge' style={{ color: '#666666', textDecoration: 'none' }}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <img loading='lazy' src={iconEdge} style={{ verticalAlign: 'middle', width: 70 }} />
                            <div
                                style={{
                                    textAlign: 'center',
                                    fontSize: '16px',
                                    fontFamily: 'Prompt-Regular',
                                    marginTop: 10,
                                }}
                            >
                                Microsoft Edge
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default IEnoSupported
