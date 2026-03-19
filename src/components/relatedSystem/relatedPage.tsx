import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { useTranslation } from 'react-i18next'

const RelatedPage: React.FC<{}> = () => {
    const { t } = useTranslation()
    const classes = useStyles()

    const handleClickLink = (link: string) => {
        if (process.browser) window.open(link)
    }

    return (
        <Grid className={classes.container} container justify='center' alignItems='flex-start'>
            <Grid item xs={10} sm={8} md={6}>
                <Button fullWidth className={classes.btn} onClick={() => handleClickLink(process.env.NEXT_PUBLIC_WEB_SELF_URL)}>
                    <Typography variant='h5' style={{ fontFamily: 'Prompt-Regular' }}>
                        {t('FOOTER.SYSTEM_REF.COMMUNITY_WORK')}
                    </Typography>
                </Button>
                <Button fullWidth className={classes.btn} onClick={() => handleClickLink(process.env.NEXT_PUBLIC_WEB_CMS_URL)}>
                    <Typography variant='h5' style={{ fontFamily: 'Prompt-Regular' }}>
                        {t('FOOTER.SYSTEM_REF.REPORT_MANAGE')}
                    </Typography>
                </Button>
                <Button fullWidth className={classes.btn} onClick={() => handleClickLink(process.env.NEXT_PUBLIC_API_DEV_URL)}>
                    <Typography variant='h5' style={{ fontFamily: 'Prompt-Regular' }}>
                        {t('FOOTER.SYSTEM_REF.DEVELOPER_PUBLIC')}
                    </Typography>
                </Button>
            </Grid>
        </Grid>
    )
}

export default RelatedPage

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '100%',
            background: '#FFFFFF',
            paddingTop: '10%',
            paddingBottom: 100,
        },
        containerDialog: {
            width: 273,
        },
        containerFullPage: {
            width: '100%',
            height: '100%',
        },
        btn: {
            height: 42,
            background: '#f5d01a',
            color: '#FFFFFF',
            marginBottom: '50px',
            '&:hover': {
                backgroundColor: '#ab9112'
            },
        },
    }),
)
