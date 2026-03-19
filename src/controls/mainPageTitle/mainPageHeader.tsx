import { FC } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { CSSProperties } from '@material-ui/core/styles/withStyles'

type MainPageHeaderPropsType = {
    title?: string
    arrangement?: string
    containerStyle?: CSSProperties
    gridItemTitleStyle?: CSSProperties
    titleTextStyle?: CSSProperties
    gridItemArrangementStyle?: CSSProperties
}
const MainPageHeader: FC<MainPageHeaderPropsType> = ({
    title,
    arrangement,
    containerStyle,
    gridItemTitleStyle,
    titleTextStyle,
    gridItemArrangementStyle,
}) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const isMobileView = useMediaQuery(theme.breakpoints.down('xs'))

    return (
        <Grid container alignItems='center' justify='space-between' style={isMobileView ? { marginBottom: 20, ...containerStyle } : containerStyle}>
            <Grid item sm={7} xs={8} style={isMobileView ? gridItemTitleStyle : { marginTop: 5, marginBottom: 40, ...gridItemTitleStyle }}>
                <Typography variant='h1' color='primary' style={isMobileView ? { fontSize: 28, ...titleTextStyle } : titleTextStyle}>
                    {title}
                </Typography>
            </Grid>
            <Grid
                item
                sm={4}
                xs={8}
                style={isMobileView ? { textAlign: 'left', ...gridItemArrangementStyle } : { marginTop: '-30px', textAlign: 'right', ...gridItemArrangementStyle }}
            >
                <Typography
                    variant='h5'
                    align='right'
                    style={{ marginTop: 10, display: 'inline-flex', marginRight: 15 }}
                >
                    {t('ACCOMMODATION.ARRANGEMENT')}
                </Typography>
                <Typography
                    variant='h5'
                    align='right'
                    style={{ fontFamily: 'Prompt-Medium', display: 'inline-flex' }}
                    color='secondary'
                >
                    {arrangement || t('ACCOMMODATION.LATEST')}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default MainPageHeader
