import { makeStyles, Theme, createStyles, Grid } from '@material-ui/core'
import React from 'react'
import useEditTrip from './useEditTrip'
import { PreviewTripView } from '../preview/previewTrip'
import { FormManageAttractionView } from '../form/formManageAttraction'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import Meta from '../../../controls/meta/meta'

type ReturnHookEditTripProps = ReturnType<typeof useEditTrip>
type EditTripViewProps = {} & ReturnHookEditTripProps

let EditTripView: React.FC<EditTripViewProps> = ({
    renderCurrentPage,
    stateHookPreviewTrip,
    stateHookFormManageAttraction,
}) => {
    const classes = useStyles()
    const { t } = useTranslation()
    return (
        <>
            <Meta
                data={{
                    title: t('PROFILE.CREATE_TRIP'),
                    description: t('PROFILE.CREATE_TRIP'),
                    image: '',
                }}
            />
            {renderCurrentPage === 'search-attraction' ? (
                <FormManageAttractionView {...stateHookFormManageAttraction} />
            ) : (
                <PreviewTripView {...stateHookPreviewTrip} activeMode={'edit'} />
            )}
        </>
    )
}
EditTripView = observer(EditTripView)

type EditTripProps = {}
let EditTrip: React.FC<EditTripProps> = () => {
    const state = useEditTrip({})
    return <EditTripView {...state} />
}

EditTrip = observer(EditTrip)
export default EditTrip

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '100%',
            background: '#FFFFFF',
            paddingTop: 0,
            paddingBottom: 100,
            [theme.breakpoints.up('sm')]: {
                paddingTop: 40,
            },
            [theme.breakpoints.up('md')]: {
                paddingTop: 60,
            },
            [theme.breakpoints.up('lg')]: {
                paddingTop: 70,
            },
        },
        content: {
            marginTop: 75,
        },
    }),
)
