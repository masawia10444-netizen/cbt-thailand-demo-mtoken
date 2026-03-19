import React from 'react'
import { observer } from 'mobx-react-lite'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import Avatar from '@material-ui/core/Avatar'
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import Button from '../../../controls/button/button'
import TextField from '../../../controls/textField/formikTextField'
import Checkbox from '../../../controls/checkbox/formikCheckbox'
import { Formik, Form, Field } from 'formik'
import { useStylesEditMode } from './style'
import { ReturnTypeUseProfile } from './useProfile'
import Dialog from '../../../controls/dialog/dialog'
import { mobileNumber, required } from '../../../utilities/shareValidate'
import UploadAvatar from './controls/uploadAvatar'

const publicPath = process.env.NEXT_PUBLIC_WEB_URL

type updateViewProps = ReturnTypeUseProfile & {}
let UpdateView: React.FC<updateViewProps> = observer(
    ({
        handleSubmit: onSubmit,
        userInfo,
        handleClickEdit,
        openDialog,
        handleSubmitDialog,
        handleCloseDialog,
        menuList,
        interests,
    }) => {
        const classes = useStylesEditMode()
        const { t, i18n } = useTranslation()

        let dialogContent = (
            <div>
                <Typography variant='h2' color='primary' style={{ fontFamily: 'Prompt-Bold', marginBottom: 25 }}>
                    {t('PROFILE.EDIT_PROFILE')}
                </Typography>
                <Typography variant='h5' style={{ color: '#6B716B' }}>
                    {t('PROFILE.CONFIRM_EDIT')}
                </Typography>
            </div>
        )

        return (
            <Formik
                initialValues={{
                    //@ts-ignore
                    interests: interests,
                    email: userInfo.email ?? '',
                    firstName: userInfo.firstName ?? '',
                    lastName: userInfo.lastName ?? '',
                    tel: userInfo.tel ?? '',
                    profileImage: {
                        url: userInfo.profileImageUrl,
                        tokenFile: null,
                    },
                }}
                onSubmit={onSubmit}
                enableReinitialize={true}
            >
                {({ handleSubmit }) => {
                    return (
                        <Grid className={classes.container} container alignItems='flex-start' justify='flex-start'>
                            <Grid item xs={12} container alignItems='center' justify='center'>
                                <Grid item xs={12} style={{ background: '#D4E8DC', height: 124 }} />
                                <Grid item sm={10} md={8} lg={6} container justify='center' className={classes.gridContainer}>
                                    <Grid item sm={4} xs={12} className={classes.avatar} >
                                        <UploadAvatar name='profileImage' />
                                        {/* <input
                                    accept='image/*'
                                    id='icon-button-file'
                                    type='file'
                                    style={{ display: 'block' }}
                                />

                                <Badge
                                    overlap='circle'
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    badgeContent={
                                        <label htmlFor='icon-button-file'>
                                            <IconButton
                                                aria-label='upload picture'
                                                className={classes.uploadBadge}
                                                component='span'
                                            >
                                                <img loading='lazy'
                                                    src={publicPath + '/images/profile/photo.svg'}
                                                    alt='upload'
                                                    className={classes.smallAvatar}
                                                />
                                            </IconButton>
                                        </label>
                                    }
                                >
                                    <Avatar
                                        alt='Remy Sharp'
                                        src={process.env.NEXT_PUBLIC_WEB_URL + '/images/profile/avatar.svg'}
                                        className={classes.avatarImg}
                                    />
                                </Badge> */}
                                    </Grid>

                                    {/* ################### User Info ################### */}
                                    <Grid item sm={8} xs={12} container className={classes.userInfo} spacing={3}>
                                        <Grid item sm={6} xs={12} className={classes.userName}>
                                            <div>
                                                <Field
                                                    name='firstName'
                                                    component={TextField}
                                                    variant='outlined'
                                                    type='text'
                                                    validate={required}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item sm={6} xs={12} className={classes.userName}>
                                            <div>
                                                <Field
                                                    name='lastName'
                                                    component={TextField}
                                                    variant='outlined'
                                                    type='text'
                                                    validate={required}
                                                />
                                            </div>
                                        </Grid>

                                        <Grid item sm={6} xs={12} className={classes.userName}>
                                            <div>
                                                <Field
                                                    name='tel'
                                                    component={TextField}
                                                    variant='outlined'
                                                    type='text'
                                                    leftIcon={<PhoneOutlinedIcon className={classes.icon} />}
                                                    validate={mobileNumber}
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>
                                    {/* ################### End User Info ################### */}

                                    {/* ################### สิ่งที่สนใจ ################### */}
                                    <Grid item xs={12} container>
                                        <Grid item xs={12}>
                                            <Typography variant='h3' style={{ fontFamily: 'Prompt-Bold' }}>
                                                {t('PROFILE.INTERESTED')}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} container className={classes.chip}>
                                            {menuList.map((item, index) => {
                                                return (
                                                    <Grid item sm={4} xs={6} key={index} style={{ marginBottom: 10 }}>
                                                        <Field
                                                            name={`interests.${item.menuID}`}
                                                            component={Checkbox}
                                                            type='checkbox'
                                                            label={
                                                                i18n.language === 'th'
                                                                    ? item.menuNameTH
                                                                    : item.menuNameEN
                                                            }
                                                            color='secondary'
                                                            filledIcon
                                                        />
                                                    </Grid>
                                                )
                                            })}
                                        </Grid>
                                    </Grid>
                                    {/* ################### End สิ่งที่สนใจ ################### */}

                                    <Grid item xs={12} container justify='center'>
                                        <Button
                                            label={t('PROFILE.BTN_SAVE')}
                                            btnType='save'
                                            style={{ width: 367, height: 48, marginTop: 90, marginBottom: 30 }}
                                            //@ts-ignore
                                            onClick={handleSubmit}
                                        // type='submit'
                                        />
                                    </Grid>
                                    <Grid item xs={12} container justify='center'>
                                        <Button
                                            label={t('PROFILE.BTN_CANCEL_TEXT')}
                                            btnType='cancel'
                                            style={{ width: 367, height: 48, marginBottom: 30 }}
                                            onClick={() => handleClickEdit(false)}
                                            type='reset'
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Dialog
                                open={openDialog}
                                content={dialogContent}
                                submitText={t('PROFILE.BTN_CONFIRM')}
                                cancelText={t('PROFILE.BTN_CANCEL_TEXT')}
                                handleSubmit={handleSubmitDialog}
                                handleCancel={handleCloseDialog}
                            />
                        </Grid>
                    )
                }}
            </Formik>
        )
    },
)

type UpdateProps = updateViewProps
let Update: React.FC<UpdateProps> = (others) => {
    return <UpdateView {...others} />
}

export default observer(Update)
