import React, { useState, useCallback } from 'react'

//Material UI
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import ScrollToTopIcon from '@material-ui/icons/ExpandLess'
import SvgIcon from '@material-ui/core/SvgIcon'

//constants
import ColorWeb from '../../constants/colorWeb'
// import FontSize from '../../constants/fontSize'
// import { CodeSharp } from '@material-ui/icons'

//controls
import MyAccordion from '../../controls/accordion/myAccordion'

import UseFooter from './useFooter'
import { allPageList } from '../../configs/menuConfig'

import { useTranslation } from 'react-i18next'

const ic_cbt_th = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/svg/cbt_logo_th.svg'
const ic_cbt_en = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/svg/ic_logo_cbt_en.svg'
const ic_footer_telephone_home = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/svg/ic_footer_telephone_home.svg'
const ic_footer_fax = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/svg/ic_footer_fax.svg'
const ic_footer_telephone = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/svg/ic_footer_telephone.svg'
const ic_footer_email = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/svg/ic_footer_email.svg'
const ic_footer_facebook = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/svg/ic_footer_facebook.svg'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // width: '100%',
            minHeight: '435px',
            backgroundColor: '#555A56',
            position: 'relative',
            marginTop: -5,
            zIndex: 1,
            overflowY: 'hidden',
        },
        txt_footer_title: {
            // fontSize: FontSize.minimum,
            fontFamily: 'Prompt-Regular',
            color: theme.colors.gray,
            margin: '15px',
            marginLeft: 0,
            fontSize: 20,
        },
        txt_footer_title_secondary: {
            // fontSize: FontSize.minimum1,
            color: theme.colors.textBlack,
            margin: '5px',
            fontWeight: 'bold',
        },
        txt_footer_detail_hover: {
            // fontSize: FontSize.minimum1,
            color: theme.colors.textBlack,
            margin: '5px',
            cursor: 'pointer',
            '&:hover': {
                color: '#ffffff',
            },
        },
        txt_footer_detail: {
            // fontSize: FontSize.minimum1,
            // color: theme.colors.textBlack,
            margin: '5px',

            // cursor: 'pointer',
        },
        footerContent: {
            marginTop: '40px',
            [theme.breakpoints.up('md')]: {
                marginTop: '90px',
            },
        },

        footerBottom: {
            width: '100%',
            bottom: 0,
            // marginTop: 10,
            color: theme.colors.gray,
            backgroundColor: theme.colors.textBlack,
            minHeight: '50px',
            [theme.breakpoints.down('xs')]: {
                //minHeight: '70px',
                padding: 15,
            },
        },
        scrollToTop: {
            position: 'fixed',
            top: '85%',
            left: '90%',
            zIndex: 100,
            [theme.breakpoints.up('md')]: {
                left: '95%',
            },
            [theme.breakpoints.down('xs')]: {
                left: '80%',
            },
        },
        btnScrollToTop: {
            cursor: 'pointer',
            marginRight: '40px',
            backgroundColor: 'RGBA(255, 255, 255, 0.4)',
            borderRadius: '25px',
            width: '40px',
            height: 'auto',
        },
        iconFooter: {
            width: 32,
            height: 32,
            verticalAlign: 'middle',
        },
        containerMyAccordion: {
            backgroundColor: theme.colors.textBlack,
            position: 'relative',
        },
        copyRight: {
            textAlign: 'center',
            color: theme.colors.gray,
        },
    }),
)

const useFooterMenu = () => {
    const [isShowCommunity, setShowCommunity] = useState(false)
    const [isShowOwnerCbt, setShowOwnerCbt] = useState(false)
    const [isShowDeveloper, setShowDeveloper] = useState(false)

    const onClickShowCommunity = useCallback(() => {
        setShowCommunity(!isShowCommunity)
    }, [isShowCommunity])

    const onClickShowOwnerCbt = useCallback(() => {
        setShowOwnerCbt(!isShowOwnerCbt)
    }, [isShowOwnerCbt])

    const onClickShowDeveloper = useCallback(() => {
        setShowDeveloper(!isShowDeveloper)
    }, [isShowDeveloper])

    return {
        isShowCommunity,
        isShowOwnerCbt,
        isShowDeveloper,
        onClickShowCommunity,
        onClickShowOwnerCbt,
        onClickShowDeveloper,
    }
}

type UsefooterProps = {}
type ReturnTypeUsefooter = ReturnType<typeof UseFooter>
// function Usefooter(props: UsefooterProps) {
//     const { } = props
//     // const showBtnScrollToTop =
//     return {showBtnScrollToTop}
// }

type footerViewProps = ReturnTypeUsefooter & ReturnType<typeof useFooterMenu> & {}
let FooterView: React.FC<footerViewProps> = ({
    showBtnScrollToTop,
    handleClickMenu,
    handleClickGoToTop,
    isShowCommunity,
    isShowOwnerCbt,
    isShowDeveloper,
    onClickShowCommunity,
    onClickShowOwnerCbt,
    onClickShowDeveloper,
    onClickLink,
}) => {
    const classes = useStyles()
    const { t, i18n } = useTranslation()

    return (
        <>
            <Grid
                container
                item
                xs={12}
                justify='flex-end'
                alignItems='center'
                className={classes.scrollToTop}
                style={{ display: showBtnScrollToTop ? 'block' : 'none' }}
            >
                <ScrollToTopIcon onClick={handleClickGoToTop} className={classes.btnScrollToTop} />
            </Grid>
            <Grid container className={classes.root} justify='center' alignItems='flex-start' spacing={2}>
                <Grid item xs={8}>
                    <img loading='lazy'
                        src={i18n.language === 'th' ? ic_cbt_th : ic_cbt_en}
                        alt='ic_cbt'
                        style={{
                            width: 150,
                            padding: '10px 0px 10px 0px',
                        }}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Grid container justify='space-between' spacing={4}>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Typography variant='h5' className={classes.txt_footer_title_secondary}>
                                {t('FOOTER.CONTACT_TEXT')}
                            </Typography>

                            <Typography variant='h5' className={classes.txt_footer_detail}>
                                {t('FOOTER.COMPANY_NAME')}
                            </Typography>

                            <Typography variant='h5' className={classes.txt_footer_detail}>
                                {t('FOOTER.COMPANY_ADDRESS')}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            {allPageList
                                .filter((item) => [1, 3, 4, 5, 6, 7, 8].some((menuID) => item.id === menuID))
                                .map((item, index) => {
                                    return (
                                        <Typography
                                            variant='h5'
                                            className={classes.txt_footer_detail_hover}
                                            key={index}
                                            onClick={() => handleClickMenu(item)}
                                        >
                                            {t(`${item.name}`)}
                                        </Typography>
                                    )
                                })}
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Typography variant='h5' className={classes.txt_footer_title_secondary}>
                                {t('FOOTER.SYSTEM_REF_TEXT')}
                            </Typography>

                            <Typography
                                variant='h5'
                                className={classes.txt_footer_detail_hover}
                                onClick={onClickLink(process.env.NEXT_PUBLIC_WEB_CMS_URL)}
                            >
                                {t('FOOTER.SYSTEM_REF.REPORT_MANAGE')}
                            </Typography>
                            <Typography
                                variant='h5'
                                className={classes.txt_footer_detail_hover}
                                onClick={onClickLink(process.env.NEXT_PUBLIC_WEB_SELF_URL)}
                            >
                                {t('FOOTER.SYSTEM_REF.COMMUNITY_WORK')}
                            </Typography>
                            {/* 
                            <Typography
                                variant='h5'
                                className={classes.txt_footer_detail_hover}
                                onClick={onClickShowOwnerCbt}
                            >
                                {t('FOOTER.SYSTEM_REF.OWNER_CBT')}
                            </Typography>
                            {isShowOwnerCbt && (
                                <Typography component='ul'>
                                    <Typography
                                        component='li'
                                        className={classes.txt_footer_detail_hover}
                                        onClick={onClickLink(process.env.NEXT_PUBLIC_WEB_CMS_URL)}
                                    >
                                        {t('FOOTER.SYSTEM_REF.WEB_SELF')}
                                    </Typography>
                                    <Typography
                                        component='li'
                                        className={classes.txt_footer_detail_hover}
                                        onClick={onClickLink(process.env.NEXT_PUBLIC_WEB_CMS_URL)}
                                    >
                                        {t('FOOTER.SYSTEM_REF.WEB_CMS')}
                                    </Typography>
                                </Typography>
                            )} */}

                            <Typography
                                variant='h5'
                                className={classes.txt_footer_detail_hover}
                                // onClick={onClickShowDeveloper}
                                onClick={onClickLink(process.env.NEXT_PUBLIC_API_DEV_URL)}
                            >
                                {t('FOOTER.SYSTEM_REF.DEVELOPER_PUBLIC')}
                            </Typography>
                            {/* {isShowDeveloper && (
                                <Typography component='ul'>
                                    <Typography
                                        component='li'
                                        className={classes.txt_footer_detail_hover}
                                        onClick={onClickLink(process.env.NEXT_PUBLIC_API_DEV_URL)}
                                    >
                                        {t('FOOTER.SYSTEM_REF.DEVELOPER_API')}
                                    </Typography>
                                </Typography>
                            )} */}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={8}>
                    <Grid container justify='space-between' spacing={4} alignItems='flex-end'>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Typography component='div' className={classes.txt_footer_detail}>
                                <img loading='lazy' src={ic_footer_facebook} alt='ic_footer_facebook' className={classes.iconFooter} />
                                <Typography
                                    variant='h5'
                                    className={classes.txt_footer_detail_hover}
                                    display='inline'
                                    onClick={onClickLink(process.env.NEXT_PUBLIC_FACEBOOK_URL)}
                                >
                                    {t('FOOTER.CONTACT.FACEBOOK')}
                                </Typography>
                            </Typography>
                            <Typography component='div' className={classes.txt_footer_detail}>
                                <img loading='lazy' src={ic_footer_email} alt='ic_footer_email' className={classes.iconFooter} />
                                <Typography variant='h5' className={classes.txt_footer_detail} display='inline'>
                                    {t('FOOTER.CONTACT.EMAIL')}
                                </Typography>
                            </Typography>
                            <Typography component='div' className={classes.txt_footer_detail}>
                                <img loading='lazy' src={ic_footer_telephone} alt='ic_footer_telephone' className={classes.iconFooter} />
                                <a href={`tel:${t('FOOTER.CONTACT.TEL')}`}>
                                    <Typography variant='h5' className={classes.txt_footer_detail} display='inline'>
                                        {t('FOOTER.CONTACT.TEL')}
                                    </Typography>
                                </a>
                            </Typography>

                            <Typography component='div' className={classes.txt_footer_detail}>
                                <img loading='lazy' src={ic_footer_fax} alt='ic_footer_fax' className={classes.iconFooter} />
                                <a href={`tel:${t('FOOTER.CONTACT.FAX')}`}>
                                    <Typography variant='h5' className={classes.txt_footer_detail} display='inline'>
                                        {t('FOOTER.CONTACT.FAX')}
                                    </Typography>
                                </a>
                            </Typography>

                            <Typography component='div' className={classes.txt_footer_detail}>
                                <img loading='lazy' src={ic_footer_telephone_home} alt='ic_footer_telephone_home' className={classes.iconFooter} />
                                <a href={`tel:${t('FOOTER.CONTACT.TEL_HOME')}`}>
                                    <Typography variant='h5' className={classes.txt_footer_detail} display='inline'>
                                        {t('FOOTER.CONTACT.TEL_HOME')}
                                    </Typography>
                                </a>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Typography variant='h5' className={classes.txt_footer_title_secondary}>
                                {t('FOOTER.WEB_SITE_POLICY.TITLE')}
                            </Typography>
                            {/* <Typography
                                variant='h5'
                                className={classes.txt_footer_detail_hover}
                                onClick={onClickLink(process.env.NEXT_PUBLIC_WEBSITE_PRIVACY_POLICY_URL)}
                            >
                                {t('FOOTER.WEB_SITE_POLICY.WEBSITE_POLICY')}
                            </Typography> */}
                            <Typography
                                variant='h5'
                                className={classes.txt_footer_detail_hover}
                                onClick={onClickLink(process.env.NEXT_PUBLIC_WEBSITE_PRIVACY_POLICY_URL)}
                            >
                                {/* {t('FOOTER.WEB_SITE_POLICY.PRIVACY_POLICY')} */}
                                {t('FOOTER.WEB_SITE_POLICY.WEBSITE_PRIVACY_POLICY')}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Typography variant='h5' className={classes.txt_footer_title_secondary}>
                                {t('FOOTER.LINK_REF_TEXT')}
                            </Typography>
                            <Typography
                                variant='h5'
                                className={classes.txt_footer_detail_hover}
                                onClick={onClickLink(process.env.NEXT_PUBLIC_WEB_STIS_URL)}
                            >
                                {t('FOOTER.LINK_REF.SYSTEM_STIS')}
                            </Typography>
                            <Typography
                                variant='h5'
                                className={classes.txt_footer_detail_hover}
                                onClick={onClickLink(process.env.NEXT_PUBLIC_WEB_DASTA_KNOWLEDGE_URL)}
                            >
                                {t('FOOTER.LINK_REF.TOURISM')}
                            </Typography>
                            <Typography
                                variant='h5'
                                className={classes.txt_footer_detail_hover}
                                onClick={onClickLink(process.env.NEXT_PUBLIC_WEB_DASTA_URL)}
                            >
                                {t('FOOTER.LINK_REF.CBT_WEB')}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item xs={12} alignItems='center' justify='center' className={classes.footerBottom}>
                    <Typography variant='h5' className={classes.copyRight}>
                        {t('FOOTER.COPYRIGHT')}
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

let FooterMobileView: React.FC<footerViewProps> = ({
    showBtnScrollToTop,
    handleClickMenu,
    isShowCommunity,
    isShowOwnerCbt,
    isShowDeveloper,
    onClickShowCommunity,
    onClickShowOwnerCbt,
    onClickShowDeveloper,
    onClickLink
}) => {
    const classes = useStyles()
    const { t, i18n } = useTranslation()

    const handleClickGoToTop = () => {
        if (process.browser) window.scrollTo(0, 0)
    }

    return (
        <>
            <Grid
                container
                item
                xs={12}
                justify='flex-end'
                alignItems='center'
                className={classes.scrollToTop}
                style={{ display: showBtnScrollToTop ? 'block' : 'none' }}
            >
                <ScrollToTopIcon onClick={handleClickGoToTop} className={classes.btnScrollToTop} />
            </Grid>
            <Grid container className={classes.containerMyAccordion}>
                <MyAccordion
                    title={i18n.language === 'th' ? 'อพท' : 'CBT'}
                    styleMyAccordion={{ backgroundColor: 'red' }}
                    children={
                        <Grid container alignItems='center' justify='center'>
                            <Grid item xs={12}>
                                <Typography
                                    variant='h5'
                                    className={classes.txt_footer_title_secondary}
                                    style={{
                                        marginTop: 21,
                                    }}
                                >
                                    {t('FOOTER.CONTACT_TEXT')}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='h5' className={classes.txt_footer_detail}>
                                    {t('FOOTER.COMPANY_NAME')}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='h5' className={classes.txt_footer_detail}>
                                    {t('FOOTER.COMPANY_ADDRESS')}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography component='div'>
                                    <Typography component='div' className={classes.txt_footer_detail}>
                                        <img loading='lazy' src={ic_footer_facebook} alt='ic_footer_facebook' className={classes.iconFooter} />
                                        <Typography
                                            variant='h5'
                                            className={classes.txt_footer_detail}
                                            display='inline'
                                            onClick={onClickLink(process.env.NEXT_PUBLIC_FACEBOOK_URL)}
                                        >
                                            {t('FOOTER.CONTACT.FACEBOOK')}
                                        </Typography>
                                    </Typography>
                                    <Typography component='div' className={classes.txt_footer_detail}>
                                        <img loading='lazy' src={ic_footer_email} alt='ic_footer_email' className={classes.iconFooter} />
                                        <Typography variant='h5' className={classes.txt_footer_detail} display='inline'>
                                            {t('FOOTER.CONTACT.EMAIL')}
                                        </Typography>
                                    </Typography>
                                    <Typography component='div' className={classes.txt_footer_detail}>
                                        <img loading='lazy' src={ic_footer_telephone} alt='ic_footer_telephone' className={classes.iconFooter} />
                                        <a href={`tel:${t('FOOTER.CONTACT.TEL')}`}>
                                            <Typography
                                                variant='h5'
                                                className={classes.txt_footer_detail}
                                                display='inline'
                                            >
                                                {t('FOOTER.CONTACT.TEL')}
                                            </Typography>
                                        </a>
                                    </Typography>

                                    <Typography component='div' className={classes.txt_footer_detail}>
                                        <img loading='lazy' src={ic_footer_fax} alt='ic_footer_fax' className={classes.iconFooter} />
                                        <a href={`tel:${t('FOOTER.CONTACT.FAX')}`}>
                                            <Typography
                                                variant='h5'
                                                className={classes.txt_footer_detail}
                                                display='inline'
                                            >
                                                {t('FOOTER.CONTACT.FAX')}
                                            </Typography>
                                        </a>
                                    </Typography>

                                    <Typography component='div' className={classes.txt_footer_detail}>
                                        <img loading='lazy' src={ic_footer_telephone_home} alt='ic_footer_telephone_home' className={classes.iconFooter} />
                                        <a href={`tel:${t('FOOTER.CONTACT.TEL_HOME')}`}>
                                            <Typography
                                                variant='h5'
                                                className={classes.txt_footer_detail}
                                                display='inline'
                                            >
                                                {t('FOOTER.CONTACT.TEL_HOME')}
                                            </Typography>
                                        </a>
                                    </Typography>
                                </Typography>
                            </Grid>
                            {/* <Grid item xs={12}>
                                <Typography variant='h5' className={classes.txt_footer_detail}>
                                    องค์การบริหารการพัฒนาพื้นที่พิเศษเพื่อการท่องเที่ยวอย่างยั่งยืน (องค์การมหาชน)
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='h5' className={classes.txt_footer_detail}>
                                    ๑๑๘/๑ อาคารทิปโก้ ชั้น ๓๐-๓๑ ถนนพระราม ๖ แขวงพญาไท เขตพญาไท กรุงเทพฯ ๑๐๔๐๐
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='h5' className={classes.txt_footer_detail}>
                                    โทรศัพท์ : ๐ ๒๓๕๗ ๓๕๘๐-๗
                                    <br />
                                    โทรสาร : ๐ ๒๓๕๗ ๓๕๙๙
                                    <br /> อีเมล : contact@dasta.or.th
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography style={{ fontSize: '22px', color: theme.colors.textBlack }}>
                                    call center
                                </Typography>{' '}
                                <Typography style={{ fontSize: '22px', color: theme.colors.white }}>
                                    0 2357 3580-402
                                </Typography>
                            </Grid> */}
                        </Grid>
                    }
                />

                <MyAccordion
                    title='Site map'
                    styleMyAccordion={{ backgroundColor: 'red' }}
                    children={
                        <Grid container>
                            {allPageList
                                .filter((item) => [1, 3, 4, 5, 6, 7, 8].some((menuID) => item.id === menuID))
                                .map((item, index) => {
                                    return (
                                        <Grid key={index} item xs={8} onClick={() => handleClickMenu(item)}>
                                            <Typography variant='h5' className={classes.txt_footer_detail_hover}>
                                                {t(`${item.name}`)}
                                            </Typography>
                                        </Grid>
                                    )
                                })}
                            {/* <Grid item xs={8}>
                                <Typography variant='h5' className={classes.txt_footer_detail}>
                                    รีวิวท่องเที่ยวโดยชุมชน
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant='h5' className={classes.txt_footer_detail}>
                                    ท่องเที่ยวชุมชนตามฤดู
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant='h5' className={classes.txt_footer_detail}>
                                    กิจกรรมน่าสนใจ
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant='h5' className={classes.txt_footer_detail}>
                                    เส้นทางแนะนำ
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant='h5' className={classes.txt_footer_detail}>
                                    เทศกาลและประเพณี
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant='h5' className={classes.txt_footer_detail}>
                                    เข้าสู่ระบบ
                                </Typography>
                            </Grid> */}
                        </Grid>
                    }
                />
                <MyAccordion
                    title={t('FOOTER.WEB_SITE_POLICY.TITLE')}
                    styleMyAccordion={{ backgroundColor: 'red' }}
                    children={
                        <Grid container>
                            <Grid item xs={8}>
                                <Typography component='div'>
                                    {/* <Typography variant='h5' className={classes.txt_footer_title_secondary}>
                                        {t('FOOTER.WEB_SITE_POLICY.TITLE')}
                                    </Typography> */}
                                    {/* <Typography
                                        variant='h5'
                                        className={classes.txt_footer_detail_hover}
                                        onClick={onClickLink(process.env.NEXT_PUBLIC_WEBSITE_PRIVACY_POLICY_URL)}
                                    >
                                        {t('FOOTER.WEB_SITE_POLICY.WEBSITE_POLICY')}
                                    </Typography> */}
                                    <Typography
                                        variant='h5'
                                        className={classes.txt_footer_detail_hover}
                                        onClick={onClickLink(process.env.NEXT_PUBLIC_WEBSITE_PRIVACY_POLICY_URL)}

                                    >
                                        {/* {t('FOOTER.WEB_SITE_POLICY.PRIVACY_POLICY')} */}
                                        {t('FOOTER.WEB_SITE_POLICY.WEBSITE_PRIVACY_POLICY')}
                                    </Typography>
                                </Typography>
                            </Grid>
                            {/* <Grid item xs={8}>
                                <Typography variant='h5' className={classes.txt_footer_detail}>
                                    การปฏิเสธความรับผิด (Disclaimer)
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant='h5' className={classes.txt_footer_detail}>
                                    นโยบายเว็บไซต์ (Website Policy)
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant='h5' className={classes.txt_footer_detail}>
                                    นโยบายการคุ้มครองข้อมูลส่วนบุคคล (Privacy Policy)
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant='h5' className={classes.txt_footer_detail}>
                                    นโยบายการรักษาความมั่นคงปลอดภัยของเว็บไซต์ (Website Security Policy)
                                </Typography>
                            </Grid> */}
                        </Grid>
                    }
                />
                <MyAccordion
                    title={t('FOOTER.SYSTEM_REF_TEXT')}
                    styleMyAccordion={{ backgroundColor: 'red' }}
                    children={
                        <Grid container>
                            <Grid item xs={8}>
                                {/* <Typography variant='h5' className={classes.txt_footer_title_secondary}>
                                    {t('FOOTER.SYSTEM_REF_TEXT')}
                                </Typography> */}
                                <Typography variant='h5' className={classes.txt_footer_detail_hover}
                                    onClick={onClickLink(process.env.NEXT_PUBLIC_WEB_CMS_URL)}>
                                    {t('FOOTER.SYSTEM_REF.REPORT_MANAGE')}
                                </Typography>
                                <Typography
                                    variant='h5'
                                    className={classes.txt_footer_detail_hover}
                                    onClick={onClickLink(process.env.NEXT_PUBLIC_WEB_SELF_URL)}
                                >
                                    {t('FOOTER.SYSTEM_REF.COMMUNITY_WORK')}
                                </Typography>

                                {/* <Typography
                                    variant='h5'
                                    className={classes.txt_footer_detail_hover}
                                    onClick={onClickShowOwnerCbt}
                                >
                                    {t('FOOTER.SYSTEM_REF.OWNER_CBT')}
                                </Typography> */}
                                {isShowOwnerCbt && (
                                    <Typography component='ul'>
                                        <Typography
                                            component='li'
                                            className={classes.txt_footer_detail_hover}
                                            onClick={onClickLink(process.env.NEXT_PUBLIC_WEB_CMS_URL)}
                                        >
                                            {t('FOOTER.SYSTEM_REF.WEB_SELF')}
                                        </Typography>
                                        <Typography
                                            component='li'
                                            className={classes.txt_footer_detail_hover}
                                            onClick={onClickLink(process.env.NEXT_PUBLIC_WEB_CMS_URL)}
                                        >
                                            {t('FOOTER.SYSTEM_REF.WEB_CMS')}
                                        </Typography>
                                    </Typography>
                                )}

                                <Typography
                                    variant='h5'
                                    className={classes.txt_footer_detail_hover}
                                    onClick={onClickLink(process.env.NEXT_PUBLIC_API_DEV_URL)}
                                >
                                    {t('FOOTER.SYSTEM_REF.DEVELOPER_PUBLIC')}
                                </Typography>
                                {/* {isShowDeveloper && (
                                    <Typography component='ul'>
                                        <Typography
                                            component='li'
                                            className={classes.txt_footer_detail_hover}
                                            onClick={onClickLink(process.env.NEXT_PUBLIC_API_DEV_URL)}
                                        >
                                            {t('FOOTER.SYSTEM_REF.DEVELOPER_API')}
                                        </Typography>
                                    </Typography>
                                )} */}
                            </Grid>

                            {/* <Grid item xs={8} className={classes.txt_footer_detail}>
                                สื่อโทรทัศน์/วิดีโอ
                            </Grid>
                            <Grid item xs={8} className={classes.txt_footer_detail}>
                                วิทยุ/คลิปเสียง
                            </Grid>
                            <Grid item xs={8} className={classes.txt_footer_detail}>
                                สื่อสิ่งพิมพ์
                            </Grid>
                            <Grid item xs={8} className={classes.txt_footer_detail}>
                                อพท. Travel
                            </Grid>
                            <Grid item xs={8} className={classes.txt_footer_detail}>
                                E- book
                            </Grid>
                            <Grid item xs={8} className={classes.txt_footer_detail}>
                                คลังภาพ
                            </Grid> */}
                        </Grid>
                    }
                />

                <MyAccordion
                    title={t('FOOTER.LINK_REF_TEXT')}
                    styleMyAccordion={{ backgroundColor: 'red' }}
                    children={
                        <Grid container>
                            <Grid item xs={8}>
                                <Typography component='div'>
                                    <Typography
                                        variant='h5'
                                        className={classes.txt_footer_detail_hover}
                                        onClick={onClickLink(process.env.NEXT_PUBLIC_WEB_STIS_URL)}
                                    >
                                        {t('FOOTER.LINK_REF.SYSTEM_STIS')}
                                    </Typography>
                                    <Typography
                                        variant='h5'
                                        className={classes.txt_footer_detail_hover}
                                        onClick={onClickLink(process.env.NEXT_PUBLIC_WEB_DASTA_KNOWLEDGE_URL)}
                                    >
                                        {t('FOOTER.LINK_REF.TOURISM')}
                                    </Typography>
                                    <Typography
                                        variant='h5'
                                        className={classes.txt_footer_detail_hover}
                                        onClick={onClickLink(process.env.NEXT_PUBLIC_WEB_DASTA_URL)}
                                    >
                                        {t('FOOTER.LINK_REF.CBT_WEB')}
                                    </Typography>
                                </Typography>
                            </Grid>
                        </Grid>
                    }
                />
                <Grid container item xs={12} alignItems='center' justify='center' className={classes.footerBottom}>
                    <Typography variant='h5' className={classes.copyRight}>
                        {t('FOOTER.COPYRIGHT')}
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

type footerProps = {}
let Footer: React.FC<footerProps> = ({ ...others }) => {
    const footer = UseFooter()
    const theme = useTheme()
    const isMobileView = useMediaQuery(theme.breakpoints.down('xs'))
    const stateFooterMenu = useFooterMenu()

    return (
        <>
            {isMobileView ? (
                <FooterMobileView {...footer} {...others} {...stateFooterMenu} />
            ) : (
                    <FooterView {...footer} {...others} {...stateFooterMenu} />
                )}
        </>
    )
}

export default Footer
