import { Grid, Typography, Divider, Avatar } from '@material-ui/core'
import React from 'react'
// import { Formik, Form, Field, FieldArray } from 'formik'
import Checkbox from '../../../controls/checkbox/checkbox'
import { DayTripAttractionStructure } from './FormDayTripStructure'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { formatNumberWithComma } from '../../../utilities/formatTextUtils'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            marginTop: 5,
            lineHeight: 2,
            maxHeight: 58,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            marginRight: 15,
        },
        containerImage: {
            width: '200px',
            [theme.breakpoints.down('sm')]: {
                width: '100%',
            },
        },
        containerContent: {
            width: 'calc(100% - 250px)',
            paddingTop: 15,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            [theme.breakpoints.down('sm')]: {
                width: 'calc(100% - 50px)',
            },
        },
        containerCheckbox: {
            width: '50px',
            height: 110,
        },
        image: {
            width: '100%',
            height: 110,
            [theme.breakpoints.down('sm')]: {
                width: 'auto',
                height: '200px',
            },
        },
    }),
)

const activityNoImage = process.env.NEXT_PUBLIC_WEB_URL + '/images/trip/Activity@2x.png'

type AccordionItemProps = {
    index: number
    data: DayTripAttractionStructure[]
    onChecked: (evt: React.ChangeEvent<HTMLInputElement>, values: DayTripAttractionStructure, index: number) => void
    isChecked?: boolean
} & DayTripAttractionStructure

const AccordionItem: React.FC<AccordionItemProps> = ({ index, data, onChecked, isChecked = false, ...item }) => {
    const { t, i18n } = useTranslation()

    const classes = useStyles()
    return (
        <Grid
            container
            style={{ width: '100%', paddingTop: 15 }}
            spacing={2}
            justify='space-between'
            alignItems='flex-start'
        >
            <Grid item className={classes.containerImage}>
                <Avatar
                    alt={item.attracNameEN}
                    src={item.image ? (process.env.NEXT_PUBLIC_UPLOAD_URL as string) + item.image : activityNoImage}
                    variant='square'
                    className={classes.image}
                />
            </Grid>
            <Grid item className={classes.containerContent}>
                <Grid container direction='column' justify={'space-between'}>
                    <Grid item xs={12}>
                        <Typography
                            variant='h5'
                            component='div'
                            style={{
                                fontFamily: 'Prompt-Bold',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                            }}
                        >
                            {i18n.language === 'th' ? item.attracNameTH : item.attracNameEN}
                        </Typography>{' '}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h5' component='div' className={classes.content}>
                            {i18n.language === 'th' ? item.attracDescTH : item.attracDescEN}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container direction='row' justify='space-between' alignItems='center'>
                            <Grid item>
                                <Typography
                                    variant='body1'
                                    style={{
                                        color: '#009687',
                                        fontFamily: 'Sarabun',
                                        letterSpacing: 0,
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        lineHeight: '30px',
                                    }}
                                >
                                    {t('TRIP.ACTIVITY_DURATION_TEXT') + ' : '}
                                    {(item.attracTime || '-') + ' ' + t('TRIP.UNIT_MINUTE_TEXT')}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant='body1'
                                    style={{
                                        color: '#009687',
                                        fontFamily: 'Sarabun',
                                        letterSpacing: 0,
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        marginRight: 20,
                                        whiteSpace: 'nowrap',
                                        lineHeight: '30px',
                                    }}
                                >
                                    {t('TRIP.ESTIMATE_COST_TEXT') + ' : '}
                                    {(formatNumberWithComma(item.attracFee) || '-') + ' ' + t('TRIP.UNIT_BATH_TEXT')}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item className={classes.containerCheckbox} container alignItems='center'>
                <Grid item xs style={{ height: 30, width: 30 }}>
                    <Checkbox
                        filledIcon
                        iconStyle={{
                            width: 30,
                            height: 30,
                        }}
                        //@ts-ignore
                        handleChange={(evt, values, index) => {
                            onChecked && onChecked(evt, values, index)
                        }}
                        value={item}
                        checked={isChecked}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} style={{ paddingLeft: 0, paddingRight: 0 }}>
                {data?.length !== index + 1 && <Divider />}
            </Grid>
        </Grid>
    )
}

export default AccordionItem
