import React from 'react'
import { FieldArray, FieldArrayRenderProps, FormikProps } from 'formik'
import AccordionItem from './accordionItem'
// import { Grid, Typography, Divider } from '@material-ui/core'
import { DayTripAttractionStructure, FormDayTripStructure, DayTripStructure } from './FormDayTripStructure'
import useFieldArrayAttractionItem from './useFieldArrayAttractionItem'

type FieldArrayAttractionItemViewProps = {
    attractionList: DayTripAttractionStructure[]
    communityFieldArray: FieldArrayRenderProps
    name: string
    nameAttractionSelect: string
    formDayTripProps: FormikProps<FormDayTripStructure>
    fieldDayTripArray: FieldArrayRenderProps
    dayOfTrip: number
} & DayTripStructure &
    ReturnType<typeof useFieldArrayAttractionItem>

const FieldArrayAttractionItemView: React.FC<FieldArrayAttractionItemViewProps> = ({
    attractionList,
    fieldDayTripArray,
    communityFieldArray,
    name,
    nameAttractionSelect,
    dayOfTrip,
    onAddRoute,
    ...item
}) => {
    return (
        <>
            <FieldArray name={nameAttractionSelect}>
                {({ ...fieldArray }: FieldArrayRenderProps) => {
                    const { values: valuesForm } = fieldArray.form
                    return (
                        <>
                            {attractionList.map((attraction, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <AccordionItem
                                            {...attraction}
                                            data={attractionList}
                                            index={index}
                                            onChecked={(evt, values) => {
                                                // ถ้าเคยมีไม่ต้องเพิ่มวัน
                                                // const newDayOfTrip = dayOfTrip + 1
                                                // const isNewDayTrip = valuesForm?.days?.some(
                                                //     (item: DayTripStructure) => item.dayOfTrip === newDayOfTrip,
                                                // )

                                                // if (!isNewDayTrip && newDayOfTrip < 6) {
                                                //     // เพิ่มได้สูงสุด 5 วัน
                                                //     fieldDayTripArray?.push({
                                                //         dayOfTrip: newDayOfTrip,
                                                //         attractionSelect: [],
                                                //         community: [],
                                                //         isDisplaySearched: false,
                                                //     })
                                                // }

                                                onAddRoute(fieldArray, attraction)
                                                // push(attraction)
                                            }}
                                        />
                                    </React.Fragment>
                                )
                            })}
                        </>
                    )
                }}
            </FieldArray>
        </>
    )
}

export type FieldArrayAttractionItemProps = {
    attractionList: DayTripAttractionStructure[]
    communityFieldArray: FieldArrayRenderProps
    name: string
    nameAttractionSelect: string
    formDayTripProps: FormikProps<FormDayTripStructure>
    fieldDayTripArray: FieldArrayRenderProps
    dayOfTrip: number
} & DayTripStructure

const FieldArrayAttractionItem: React.FC<FieldArrayAttractionItemProps> = (props) => {
    const state = useFieldArrayAttractionItem(props)
    return <FieldArrayAttractionItemView {...props} {...state} />
}

export default FieldArrayAttractionItem
