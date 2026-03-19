import React from 'react'
import { Formik, Form, Field, FieldArray, FieldArrayRenderProps, FormikProps } from 'formik'
import { Grid, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import AccordionSearchResult from './accordionSearchResult'
import FieldArrayAttractionItem from './fieldArrayAttractionItem'
import {
    DayTripAttractionStructure,
    DayTripCommunityStructure,
    DayTripStructure,
    FormDayTripStructure,
} from './FormDayTripStructure'

type FormSearchResultViewProps = {
    formDayTripProps: FormikProps<FormDayTripStructure>
    fieldDayTripArray: FieldArrayRenderProps
    name: string
} & DayTripStructure

const FormSearchResultView: React.FC<FormSearchResultViewProps> = ({ ...props }) => {
    const { attractionSelect = [], name, community = [] } = props
    const { t, i18n } = useTranslation()
    return (
        <>
            {community?.length > 0 && (
                /** ผลการค้นหา */
                <Grid
                    item
                    xs={12}
                    style={{
                        padding: 18,
                        paddingTop: 50,
                        border: '2px solid #D4E8DC',
                        borderTop: 'none',
                    }}
                >
                    <Grid item xs={12} style={{ marginBottom: 20 }}>
                        <Typography variant='h3' style={{ color: '#166936', fontFamily: 'Prompt-SemiBold' }}>
                            {t('TRIP.SEARCH_RESULT_TEXT')}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        style={{
                            maxHeight: 800,
                            overflow: 'auto',
                        }}
                    >
                        <FieldArray name={`${name}.community`}>
                            {(fieldCommunityArrayProps: FieldArrayRenderProps) => {
                                return (
                                    <>
                                        {community?.map(
                                            (
                                                { attractionList = [], ...item }: DayTripCommunityStructure,
                                                index: number,
                                            ) => {
                                                // filter อันที่ติ๊กเลือกไปแล้วออก
                                                const attractionNewList = attractionSelect?.length
                                                    ? attractionList.filter((item: DayTripAttractionStructure) => {
                                                          const isChecked = attractionSelect.every(
                                                              (select: DayTripAttractionStructure) =>
                                                                  item.attracID !== select.attracID,
                                                          )
                                                          return isChecked
                                                      })
                                                    : attractionList

                                                return (
                                                    <AccordionSearchResult
                                                        key={item.communID}
                                                        title={
                                                            i18n.language === 'th'
                                                                ? item.communNameTH
                                                                : item.communNameEN
                                                        }
                                                        defaultExpanded={index === 0}
                                                        expandIndex={index}
                                                        disabled={attractionNewList?.length === 0}
                                                        children={
                                                            <FieldArrayAttractionItem
                                                                {...props}
                                                                attractionList={attractionNewList}
                                                                communityFieldArray={fieldCommunityArrayProps}
                                                                name={`${name}.community[${index}]`}
                                                                nameAttractionSelect={`${name}.attractionSelect`}
                                                            />
                                                        }
                                                    />
                                                )
                                            },
                                        )}
                                    </>
                                )
                            }}
                        </FieldArray>
                    </Grid>
                </Grid>
            )}
        </>
    )
}

type FormSearchResultProps = {} & FormSearchResultViewProps
const FormSearchResult: React.FC<FormSearchResultProps> = (props) => {
    return <FormSearchResultView {...props} />
}

export default FormSearchResult
