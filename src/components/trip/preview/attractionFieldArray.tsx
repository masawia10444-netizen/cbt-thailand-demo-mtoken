import { Grid, Typography, Avatar } from '@material-ui/core'
import React, { useRef, useMemo } from 'react'
import { Formik, Form, Field, FieldArray, FieldArrayRenderProps, FormikProps } from 'formik'

import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineContent from '@material-ui/lab/TimelineContent'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import useAttractionFieldArray from './useAttractionFieldArray'
// import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import { DayTripAttractionStructure, DayTripStructure, FormDayTripStructure } from '../form/FormDayTripStructure'
import SvgIcon from '@material-ui/core/SvgIcon'
import { useTranslation } from 'react-i18next'
import { formatNumberWithComma } from '../../../utilities/formatTextUtils'
import useScreenSize from '../../../hook/useScreenSize'
// import useResizeObserver from '../../../hook/useResizeObserver'
// import useResizeObserver from 'use-resize-observer'
// import { toJS } from 'mobx'

function DeleteIconSVG(props: any) {
    return (
        <SvgIcon {...props}>
            <g id='ic_list_delete' transform='translate(-1370.006 -700.086)'>
                <path
                    id='Path_3030'
                    data-name='Path 3030'
                    d='M1386.006,720.086a1,1,0,0,1-1,1h-10a1,1,0,0,1-1-1v-14h-2v14a3,3,0,0,0,3,3h10a3,3,0,0,0,3-3v-14h-2Z'
                    fill='#b8b6b6'
                />
                <path
                    id='Path_3031'
                    data-name='Path 3031'
                    d='M1385.006,702.086a2,2,0,0,0-2-2h-6a2,2,0,0,0-2,2v1h-5v2h20v-2h-5Zm-8,0h6v1h-6Z'
                    fill='#b8b6b6'
                />
                <rect
                    id='Rectangle_2386'
                    data-name='Rectangle 2386'
                    width='2'
                    height='12'
                    transform='translate(1379.006 707.086)'
                    fill='#b8b6b6'
                />
                <rect
                    id='Rectangle_2387'
                    data-name='Rectangle 2387'
                    width='2'
                    height='12'
                    transform='translate(1376.006 707.086)'
                    fill='#b8b6b6'
                />
                <rect
                    id='Rectangle_2388'
                    data-name='Rectangle 2388'
                    width='2'
                    height='12'
                    transform='translate(1382.006 707.086)'
                    fill='#b8b6b6'
                />
            </g>
        </SvgIcon>
    )
}

const getItemStyle = (isDragging: any, draggableStyle: any, heightBox: number) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: 0,
    marginBottom: 25,
    // margin: `0 0 ${grid}px 0`,
    // height: 'auto',
    height: heightBox,
    background: '#FFFFFF',
    // change background colour if dragging
    // background: isDragging ? 'lightgreen' : 'transparent',
    boxShadow: isDragging ? '0px 10px 20px #ebfafc' : 'none',
    border: isDragging ? '3px dashed #15C9DE' : '1px solid #D4E8DC',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    // styles we need to apply on draggables
    ...draggableStyle,
})

// const pinImageGreen = process.env.NEXT_PUBLIC_WEB_URL + '/images/pin/pin_day1.png'
const pinImagePurple = process.env.NEXT_PUBLIC_WEB_URL + '/images/pin/pin_purple_activity.png'
const pinImageYellow = process.env.NEXT_PUBLIC_WEB_URL + '/images/pin/pin_LinkTravel.png'
const ic_switch = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/ic_switch.png'
const ic_switch_press = process.env.NEXT_PUBLIC_WEB_URL + '/images/icon/ic_switch_press.png'
const activityNoImage = process.env.NEXT_PUBLIC_WEB_URL + '/images/trip/Activity@2x.png'

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
        square: {
            height: 200,
            width: '100%',
        },
        timelineDot: {
            width: 55,
            height: 55,
            backgroundColor: 'transparent',
            textAlign: 'center',
            backgroundImage: `url(${pinImagePurple})`,
            marginLeft: -17,
            marginRight: -16,
        },
        timelineDotPurple: {
            width: 55,
            height: 55,
            backgroundColor: 'transparent',
            textAlign: 'center',
            backgroundImage: `url(${pinImageYellow})`,
            marginLeft: -17,
            marginRight: -16,
        },
        dot: {
            height: '12px',
            width: '12px',
            backgroundColor: '#bbb',
            borderRadius: '50%',
            display: 'inline-block',
            marginLeft: -5,
        },
        containerImage: {
            width: '350px',
            [theme.breakpoints.down('sm')]: {
                width: '100%',
            },
        },
        containerContent: {
            width: 'calc(100% - 400px)',
            paddingTop: 15,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            [theme.breakpoints.down('sm')]: {
                width: 'calc(100% - 60px)',
                marginLeft: 10,
            },
        },
        containerCheckbox: {
            width: '50px',
            height: 110,
        },
        txt_estimateCost: {
            marginRight: 88,
            [theme.breakpoints.down('xs')]: {
                fontSize: 18,
                marginRight: 0,
            },
        },
    }),
)

const AttractionField: React.FC<
    DayTripAttractionStructure & { isDragging: Boolean; isMobileSize: Boolean; heightBox: number }
> = (item) => {
    const { t, i18n } = useTranslation()
    const classes = useStyles()
    return (
        <Grid
            container
            alignItems='center'
            spacing={2}
            justify='space-between'
        // style={{
        //     height: item.heightBox,
        // }}
        >
            <Grid item className={classes.containerImage}>
                <Avatar
                    alt={item.attracNameEN}
                    src={item.image ? (process.env.NEXT_PUBLIC_UPLOAD_URL as string) + item.image : activityNoImage}
                    variant='square'
                    className={classes.square}
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
                                lineHeight: 1.5,
                            }}
                        >
                            {i18n.language === 'th' ? item.attracNameTH : item.attracNameEN}
                        </Typography>{' '}
                    </Grid>

                    {!item.isMobileSize && (
                        <Grid item xs={12}>
                            <Typography variant='h5' component='div' className={classes.content}>
                                {i18n.language === 'th' ? item.attracDescTH : item.attracDescEN}
                            </Typography>
                        </Grid>
                    )}
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
                    <img loading='lazy' alt={item.attracNameEN} src={item.isDragging ? ic_switch_press : ic_switch} />
                </Grid>
            </Grid>
        </Grid>
    )
}

export type AttractionFieldArrayViewProps = {
    formDayTripProps: FormikProps<FormDayTripStructure>
    fieldDayTripArray: FieldArrayRenderProps
    name: string
} & DayTripStructure &
    ReturnType<typeof useAttractionFieldArray>
const AttractionFieldArrayView: React.FC<AttractionFieldArrayViewProps> = ({
    name,
    dayOfTrip,
    attractionSelect = [],
    onDragEnd,
    onDeleteRoute,
    ...props
}) => {
    const { t, i18n } = useTranslation()
    const classes = useStyles()
    const { isMobileSize } = useScreenSize()
    const heightBox = isMobileSize ? 317 : 200

    return (
        <Grid container spacing={2}>
            <Grid item style={{ width: '70px', padding: 0 }} container justify='center'>
                {attractionSelect.map((attraction: DayTripAttractionStructure, index: number) => {
                    const distanceDisplay = attraction?.distance && (attraction?.distance / 1000).toFixed(1)
                    return (
                        <Grid item key={index}>
                            <div
                                style={{
                                    marginTop: isMobileSize ? (index === 0 ? 55 : -190) : index === 0 ? 60 : -125,
                                }}
                            >
                                {index > 0 && (
                                    <Typography variant='body1' style={{ color: '#009687' }}>
                                        {distanceDisplay + ' ' + t('TRIP.UNIT_KM_TEXT')}
                                    </Typography>
                                )}
                                <TimelineSeparator>
                                    <div
                                        className={
                                            attraction.isRelAttraction ? classes.timelineDotPurple : classes.timelineDot
                                        }
                                    >
                                        <Typography
                                            component='div'
                                            style={{
                                                fontSize: 22,
                                                color: '#FFFFFF',
                                                marginLeft: -3,
                                                marginRight: -3,
                                                marginTop: 10,
                                            }}
                                        >
                                            {index + 1}
                                        </Typography>
                                    </div>
                                </TimelineSeparator>
                                {attractionSelect?.length - 1 !== index && (
                                    <TimelineContent style={{ padding: '5px 16px' }}>
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                width: 5,
                                                marginLeft: 10,
                                                marginRight: 10,
                                            }}
                                        >
                                            <span className={classes.dot}></span>
                                            <div
                                                style={{
                                                    height: index === 0 ? heightBox - 120 : heightBox - 112,
                                                    marginTop: 2,
                                                    marginBottom: 5,
                                                    borderLeft: '3px dashed #B8B6B6',
                                                    textAlign: 'center',
                                                }}
                                            ></div>
                                            <span className={classes.dot}></span>
                                        </div>
                                    </TimelineContent>
                                )}
                            </div>
                        </Grid>
                    )
                })}
            </Grid>

            <FieldArray name={`${name}.attractionSelect`}>
                {({ remove, form, ...props }: FieldArrayRenderProps) => {
                    const attractionSelectCurrent = form.getFieldProps(`${name}.attractionSelect`)?.value ?? []
                    const totalCost = attractionSelectCurrent
                        .filter((item: DayTripAttractionStructure) => typeof item.attracFee === 'number')
                        .map((item: DayTripAttractionStructure) => item.attracFee)
                        .reduce((acc: number, crr: number) => acc + crr, 0)

                    // console.log('attractionSelect', toJS(attractionSelect))

                    return (
                        <>
                            {/* <Grid item xs={8} sm={8} md={10} xl={10} lg={10}> */}
                            <Grid item style={{ width: 'calc(100% - 115px)' }}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <DragDropContext onDragEnd={onDragEnd}>
                                            <Droppable droppableId='droppable'>
                                                {(provided, snapshot) => (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                    // style={getListStyle(snapshot.isDraggingOver)}
                                                    >
                                                        {attractionSelect.map(
                                                            (attraction: DayTripAttractionStructure, index) => (
                                                                <Draggable
                                                                    key={index}
                                                                    draggableId={String(index)}
                                                                    index={index}
                                                                >
                                                                    {(provided, snapshot) => (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={getItemStyle(
                                                                                snapshot.isDragging,
                                                                                provided.draggableProps.style,
                                                                                heightBox,
                                                                            )}
                                                                        >
                                                                            <AttractionField
                                                                                {...attraction}
                                                                                isDragging={snapshot.isDragging}
                                                                                isMobileSize={isMobileSize}
                                                                                heightBox={heightBox}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </Draggable>
                                                            ),
                                                        )}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </DragDropContext>
                                        {/* <DragDropContext onDragEnd={onDragEnd}>
                                            <Droppable droppableId='droppable'>
                                                {(provided: any, snapshot: any) => {
                                                    return (
                                                        <div {...provided.droppableProps} ref={provided.innerRef}>
                                                            {attractionSelect.map(
                                                                (
                                                                    attraction: DayTripAttractionStructure,
                                                                    index: number,
                                                                ) => {
                                                                    return (
                                                                        <Draggable
                                                                            key={index}
                                                                            draggableId={String(attraction.attracID)}
                                                                            index={index}
                                                                        >
                                                                            {(provided: any, snapshot: any) => {
                                                                                return (
                                                                                    <div
                                                                                        ref={provided.innerRef}
                                                                                        {...provided.draggableProps}
                                                                                        {...provided.dragHandleProps}
                                                                                        style={getItemStyle(
                                                                                            snapshot.isDragging,
                                                                                            provided.draggableProps
                                                                                                .style,
                                                                                        )}
                                                                                    >
                                                                                        <AttractionField
                                                                                            {...attraction}
                                                                                            isDragging={
                                                                                                snapshot.isDragging
                                                                                            }
                                                                                            isMobileSize={isMobileSize}
                                                                                            heightBox={heightBox}
                                                                                        />
                                                                                    </div>
                                                                                )
                                                                            }}
                                                                        </Draggable>
                                                                    )
                                                                },
                                                            )}
                                                            {provided.placeholder}
                                                        </div>
                                                    )
                                                }}
                                            </Droppable>
                                        </DragDropContext> */}
                                    </Grid>
                                    {attractionSelect?.length > 0 && (
                                        <Grid
                                            item
                                            container
                                            xs={12}
                                            style={{
                                                backgroundColor: '#D4E8DC',
                                                minHeight: 66,
                                            }}
                                            justify='flex-end'
                                            alignItems='center'
                                        >
                                            <Typography variant='h3' className={classes.txt_estimateCost}>
                                                {`${t('TRIP.ESTIMATE_COST_TEXT') + ': '} ${formatNumberWithComma(totalCost)} ${t(
                                                    'TRIP.UNIT_BATH_TEXT',
                                                )}`}
                                            </Typography>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid item style={{ width: '45px' }}>
                                {attractionSelect.map((attraction: DayTripAttractionStructure, index: number) => {
                                    return (
                                        <Grid
                                            key={index}
                                            container
                                            alignItems='center'
                                            style={{
                                                // height: isMobileSize ? 300 : 192,
                                                height: heightBox - 6,
                                                marginBottom: 25,
                                                // backgroundColor: 'red',
                                            }}
                                        >
                                            <Grid item>
                                                <IconButton
                                                    aria-label='delete'
                                                    onClick={async (
                                                        evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                                                    ) => {
                                                        evt.stopPropagation()
                                                        await onDeleteRoute(index, attraction)
                                                        // remove(index)
                                                    }}
                                                >
                                                    <DeleteIconSVG fontSize='small' />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </>
                    )
                }}
            </FieldArray>
        </Grid>
    )
}

export type AttractionFieldArrayProps = {
    formDayTripProps: FormikProps<FormDayTripStructure>
    fieldDayTripArray: FieldArrayRenderProps
    name: string
} & DayTripStructure

const AttractionFieldArray: React.FC<AttractionFieldArrayProps> = (props) => {
    // console.log('props', props)
    const state = useAttractionFieldArray(props)
    return <AttractionFieldArrayView {...props} {...state} />
}

export default AttractionFieldArray
