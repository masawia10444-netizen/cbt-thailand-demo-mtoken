import React from 'react'
import { observer } from 'mobx-react-lite'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import Card from '@material-ui/core/Card'
import MailOutlinedIcon from '@material-ui/icons/MailOutlined'
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import AddIcon from '@material-ui/icons/Add'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '../../../controls/button/button'
import useProfile, { UseProfileProps, ReturnTypeUseProfile } from './useProfile'
import { useStylesViewMode } from './style'
import Router from 'next/router'
import UpdateProfile from './update'
import Meta from '../../../controls/meta/meta'
import Hidden from '@material-ui/core/Hidden'

const publicPath = process.env.NEXT_PUBLIC_WEB_URL
const bg = publicPath + '/images/home/Rectangle_1954/Rectangle_1954@2x.png'
const editIcon = publicPath + '/images/profile/edit.svg'
const deleteIcon = publicPath + '/images/profile/delete.svg'

import Theme from '../../../theme'

type ProfileViewProps = ReturnTypeUseProfile & {}
let ProfileView: React.FC<ProfileViewProps> = observer(({ ...props }) => {
    const { onRemoveTrip } = props
    const classes = useStylesViewMode()
    const { t, i18n } = useTranslation()

    const handleRemoveTrip = ({ tripID, tripName }) => {
        if (onRemoveTrip) {
            onRemoveTrip({ tripID, tripName })
        }
    }

    if (!props.userInfo?.email) return <div style={{ height: 500 }}></div>
    if (props.editMode) return <UpdateProfile {...props} />
    else
        return (
            <Grid className={classes.container} container alignItems='flex-start' justify='flex-start'>
                <Meta
                    data={{
                        title: t('PROFILE.PROFILE'),
                        description: t('PROFILE.PROFILE'),
                        image: '',
                    }}
                />
                <Grid item xs={12} container alignItems='center' justify='center'>
                    <Grid item xs={12} style={{ background: '#D4E8DC', height: 124 }} />
                    <Grid item sm={10} md={8} lg={6} container className={classes.gridContainer}>
                        {/* <Grid item xs={4} className={classes.avatar}> */}
                        <Grid className={classes.avatar}>
                            <Avatar
                                alt='Remy Sharp'
                                src={
                                    props.userInfo.profileImageUrl
                                        ? props.userInfo.profileImageUrl
                                        : process.env.NEXT_PUBLIC_WEB_URL + '/images/profile/avatar.svg'
                                }
                                className={classes.avatarImg}
                            />
                        </Grid>

                        {/* ################### User Info ################### */}
                        {/* <Grid item xs={8} container className={classes.userInfo}> */}
                        <Hidden smUp>
                            <Grid container className={classes.userInfo}>
                                <Grid item xs={12} sm={12} style={{ marginBottom: 32 }}>
                                    <Typography variant='h2' noWrap align='center' style={{ lineHeight: 1.5 }}>
                                        {props.userInfo.firstName + ' ' + props.userInfo.lastName}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}></Grid>

                                <Grid item style={{ width: '25px' }}>
                                    <MailOutlinedIcon className={classes.icon} />
                                </Grid>
                                <Grid item style={{ width: 'calc(100% - 25px)' }}>
                                    <Typography variant='h5' noWrap>
                                        {props.userInfo.email}
                                    </Typography>
                                </Grid>

                                <Grid item style={{ width: '25px' }}>
                                    <PhoneOutlinedIcon className={classes.icon} />
                                </Grid>
                                <Grid item style={{ width: 'calc(100% - 25px)' }}>
                                    <Typography variant='h5' noWrap>
                                        {props.userInfo.tel || '-'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Hidden>

                        <Hidden xsDown>
                            <Grid container className={classes.userInfo}>
                                <Grid item xs={12} sm={12} style={{ marginBottom: 32 }}>
                                    <Typography variant='h2' noWrap style={{ lineHeight: 1.5 }}>
                                        {props.userInfo.firstName + ' ' + props.userInfo.lastName}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}></Grid>

                                <Grid item style={{ width: '25px' }}>
                                    <MailOutlinedIcon className={classes.icon} />
                                </Grid>
                                <Grid item style={{ width: 'calc(100% - 25px)' }}>
                                    <Typography variant='h5' noWrap>
                                        {props.userInfo.email}
                                    </Typography>
                                </Grid>

                                <Grid item style={{ width: '25px' }}>
                                    <PhoneOutlinedIcon className={classes.icon} />
                                </Grid>
                                <Grid item style={{ width: 'calc(100% - 25px)' }}>
                                    <Typography variant='h5' noWrap>
                                        {props.userInfo.tel || '-'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Hidden>

                        {/* ################### End User Info ################### */}

                        {/* ################### สิ่งที่สนใจ ################### */}
                        <Grid item xs={12} container>
                            <Grid item xs={12}>
                                <Typography variant='h3' style={{ fontFamily: 'Prompt-Bold' }}>
                                    {t('PROFILE.INTERESTED')}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                {props.interested.map((item, index) => (
                                    <Chip
                                        key={index}
                                        label={item[i18n.language]}
                                        variant='outlined'
                                        className={classes.chip}
                                    />
                                ))}
                            </Grid>
                        </Grid>
                        {/* ################### End สิ่งที่สนใจ ################### */}

                        {
                            /* ################### แก้ไขข้อมูลส่วนตัว ################### */
                            !props.editMode && (
                                <Grid item xs={12} container justify='flex-end'>
                                    <Grid item className={classes.editInfoText}>
                                        <Button
                                            label={t('PROFILE.EDIT_PROFILE')}
                                            btnType='transparent'
                                            leftIcon={<EditOutlinedIcon className={classes.editInfoIcon} />}
                                            style={{ height: 40, width: 200 }}
                                            onClick={() => props.handleClickEdit(true)}
                                        />
                                    </Grid>
                                </Grid>
                            )
                            /* ################### End แก้ไขข้อมูลส่วนตัว ################### */
                        }

                        <Grid item xs={12}>
                            <Card
                                style={{
                                    width: '100%',
                                    boxShadow: '0px 0px 6px #0000001A',
                                    borderRadius: 8,
                                }}
                            >
                                <Grid
                                    container
                                    style={{
                                        padding: 20,
                                    }}
                                    justify='center'
                                    alignItems='center'
                                >
                                    <Grid
                                        item
                                        sm={8}
                                        xs={12}
                                        className={classes.containerMyTrip}
                                        container
                                        alignItems='center'
                                    >
                                        <IconButton
                                            disabled
                                            aria-label='LocationOnOutlinedIcon'
                                            className={classes.fabPinIcon}
                                        >
                                            <LocationOnOutlinedIcon className={classes.pinIcon} />
                                        </IconButton>

                                        <Typography variant='h2' className={classes.myTrip}>
                                            {props.tripName}
                                        </Typography>

                                        <Typography variant='h3' className={classes.tripCount}>
                                            {props.userInfo.myTrip?.length + '/10'}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={4} xs={12} className={classes.containerBtnMyTrip}>
                                        <div style={{ width: '100%', height: 40 }}>
                                            <Button
                                                label={t('PROFILE.CREATE_NEW_TRIP')}
                                                btnType='rounded'
                                                leftIcon={<AddIcon />}
                                                onClick={() => {
                                                    Router.push('/trip/create')
                                                }}
                                                disabled={props.userInfo.myTrip?.length === 10}
                                            />
                                        </div>{' '}
                                    </Grid>
                                </Grid>

                                <Divider className={classes.divider} />

                                <div
                                    style={{
                                        height: 560,
                                        overflowY: 'auto',
                                    }}
                                >
                                    <Grid container style={{ padding: 20 }}>
                                        {props?.userInfo?.myTrip?.map((item, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <Grid item xs={12} className={classes.cardTripDetails}>
                                                        <div
                                                            style={{
                                                                width: 'calc(100% - 85px)',
                                                                height: '100%',
                                                            }}
                                                        >
                                                            <Typography
                                                                variant='h3'
                                                                color='primary'
                                                                className={classes.tripName}
                                                                noWrap
                                                            >
                                                                {item.tripName}
                                                            </Typography>
                                                            <Typography
                                                                variant='h4'
                                                                className={classes.tripLocation}
                                                                noWrap
                                                            >
                                                                {(item.day || '-') + ' วัน'}
                                                            </Typography>
                                                        </div>

                                                        <div
                                                            style={{
                                                                position: 'absolute',
                                                                right: 0,
                                                                top: 0,
                                                                width: '85px',
                                                            }}
                                                        >
                                                            <Tooltip title='Edit' placement='top'>
                                                                <IconButton
                                                                    aria-label='edit'
                                                                    style={{ marginRight: 5 }}
                                                                    onClick={() => {
                                                                        Router.push(`/trip/edit/${item.tripID}`)
                                                                    }}
                                                                >
                                                                    <img loading='lazy'
                                                                        src={editIcon}
                                                                        alt='editIcon'
                                                                        style={{ width: 15, height: 15 }}
                                                                    />
                                                                </IconButton>
                                                            </Tooltip>

                                                            <Tooltip title='Delete' placement='top'>
                                                                <IconButton
                                                                    aria-label='delete'
                                                                    // onClick={() =>
                                                                    //     onRemoveTrip({
                                                                    //         tripID: item.tripID,
                                                                    //         tripName: item.tripName,
                                                                    //     })
                                                                    // }
                                                                    onClick={() =>
                                                                        handleRemoveTrip({
                                                                            tripID: item.tripID,
                                                                            tripName: item.tripName,
                                                                        })
                                                                    }
                                                                >
                                                                    <img loading='lazy'
                                                                        src={deleteIcon}
                                                                        alt='deleteIcon'
                                                                        style={{ width: 15, height: 15 }}
                                                                    />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </div>
                                                    </Grid>

                                                    {index !== props.userInfo.myTrip?.length - 1 && (
                                                        <Divider className={classes.divider} />
                                                    )}
                                                </React.Fragment>
                                            )
                                        })}
                                    </Grid>
                                </div>
                            </Card>
                        </Grid>

                        <Grid item xs={12} style={{ marginTop: 40 }} container justify='center'>
                            <Grid container justify='center' item sm={4} xs={12}>
                                <Button
                                    label={t('PROFILE.DEACTIVATE_ACCOUNT')}
                                    btnType='rounded'
                                    onClick={props.handleCloseAccount}
                                    style={{
                                        backgroundColor: Theme.colors.white,
                                        color: Theme.colors.textBlack,
                                        boxShadow: 'none',
                                        height: 40,
                                    }}
                                />
                            </Grid>
                            {/* <div style={{ width: '100%', height: 40 }}>

                            </div>{' '} */}
                        </Grid>
                    </Grid>
                    <img loading='lazy' src={bg} alt='background' style={{ zIndex: 0, marginTop: -500 }} />
                </Grid>
            </Grid>
        )
})

type ProfileProps = UseProfileProps & Omit<ProfileViewProps, keyof ReturnTypeUseProfile>
let Profile: React.FC<ProfileProps> = ({ ...others }) => {
    const profile = useProfile({})
    return <ProfileView {...profile} {...others} />
}

export default observer(Profile)
