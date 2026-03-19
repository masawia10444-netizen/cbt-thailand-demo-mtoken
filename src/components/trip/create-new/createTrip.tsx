import React from 'react'
import FormManageAttraction, { FormManageAttractionView } from '../form/formManageAttraction'
import useCreateTrip from './useCreateTrip'
import PreviewTrip from '../preview/previewTrip'
import { useTranslation } from 'react-i18next'
import Meta from '../../../controls/meta/meta'

type ReturnHookCreateTrip = ReturnType<typeof useCreateTrip>
type CreateTripViewProps = {} & ReturnHookCreateTrip
const CreateTripView: React.FC<CreateTripViewProps> = ({ renderCurrentPage, setRenderCurrentPage }) => {
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
                <FormManageAttraction setRenderCurrentPage={setRenderCurrentPage} />
            ) : (
                <PreviewTrip
                    setRenderCurrentPage={setRenderCurrentPage}
                    renderCurrentPage={renderCurrentPage}
                    activeMode='create'
                />
            )}
        </>
    )
}

const CreateTrip: React.FC = () => {
    const state = useCreateTrip({})
    return <CreateTripView {...state} />
}

export default CreateTrip
