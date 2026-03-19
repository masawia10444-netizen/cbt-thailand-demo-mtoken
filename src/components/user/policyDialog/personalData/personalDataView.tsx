import { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Field } from 'formik'
import RadioButton from '../radioButton'
import { personalData } from './personalData'

type PersonalDataViewPropsType = {
    handleCheckPDPA_1: (values: string) => void
    handleCheckPDPA_2: (values: string) => void
    classes?: any
}
const PersonalDataView = ({ handleCheckPDPA_1, handleCheckPDPA_2, classes }: PersonalDataViewPropsType) => {
    // ============================================================================== //
    const [PDPA1, setPDPA1] = useState(false)
    const [PDPA2, setPDPA2] = useState(false)
    // ============================================================================== //
    const renderContent = (detail: any, key: number, className?: string) => {
        if (typeof detail === 'string') {
            return (
                <Typography variant='h5' align='left' className={className || classes.detailContent} key={key}>
                    {detail}
                </Typography>
            )
        } else if (typeof detail === 'object') {
            return (
                <div key={key}>
                    <Typography variant='h5' align='left' className={className || classes.detailContent}>
                        {detail.title}
                    </Typography>
                    {Array.isArray(detail)
                        ? detail.map((item) => renderContent(item, key))
                        : renderContent(detail, key)}
                </div>
            )
        } else {
            return <div>{detail}</div>
        }
    }

    return (
        <>
            <Grid item xs={12}>
                <Typography className={classes.policyTitle} variant='h3' align='left'>
                    {'ความยินยอมข้อมูลส่วนบุคคล'}
                </Typography>

                {/* {personalData['TH'].detail.map((item, index) => {
                    return [
                        item.subTitle.map((itm, j) => renderContent(itm, index)),
                        item.content.map((itm, j) =>
                            renderContent(
                                itm,
                                index,
                                typeof itm === 'string' ? classes.personalTitle : classes.personalDetail,
                            ),
                        ),
                    ]
                })} */}
                <Typography variant='h5' align='left' className={classes.detailContent}>
                    {
                        'CBT Thailand Web Application ให้บริการและเผยแพร่ข้อมูลการท่องเที่ยวภายในชุมชน ไม่ว่าจะเป็นข้อมูลรีวิวการท่องเที่ยว ข้อมูลชุมชน เทศกาลงานประเพณี เส้นทางแนะนำ กิจกรรม ที่พัก รวมไปถึงการสร้างเส้นทางการท่องเที่ยวด้วยตนเอง'
                    }
                </Typography>
                <Typography variant='h5' align='left' className={classes.detailContent}>
                    {
                        'เราได้ชี้แจงรายละเอียดเกี่ยวกับข้อมูลส่วนบุคคลของคุณที่จะทำการเก็บรวบรวมและนำไปใช้งานผ่านเว็บไซต์ http://cbtthailand.dasta.or.th (“นโยบายการคุ้มครองข้อมูลส่วนบุคคล”)'
                    }
                </Typography>
                <Typography variant='h5' align='left' className={classes.detailContent}>
                    {
                        'หลักปฏิบัติของเราคือให้ความเป็นส่วนตัวตลอดการใช้งานบน CBT Thailand Web Application กับคุณและความปลอดภัยของข้อมูลส่วนบุคคลของคุณ รวมถึงการติดต่อขอลบ หรือเปลี่ยนแปลงข้อมูลส่วนบุคคลตามสิทธิในพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 ประเทศไทย.'
                    }
                </Typography>
                <Typography variant='h5' align='left' className={classes.detailContent}>
                    {
                        'โดยความยินยอมและการจัดการข้อมูลส่วนบุคคลของคุณที่เราจะเก็บรวบรวม และนำไปใช้งาน เพื่อให้สิทธิในการใช้งานบน CBT Thailand Web Application มีรายละเอียดดังนี้'
                    }
                </Typography>

                {/* ############### Title 1 ############### */}
                <Typography variant='h5' align='left' className={classes.personalTitle}>
                    {
                        '1. ความยินยอมในการเก็บรวบรวมและใช้ข้อมูลส่วนบุคคลของคุณ เพื่อพัฒนาฯการใช้บริการของ CBT Thailand Web Application'
                    }
                </Typography>
                <Typography variant='h5' align='left' className={classes.personalDetail}>
                    {
                        'เพื่ออำนวยความสะดวกในการใช้งานฟังก์ชั่นทั้งหมดในบริการของ CBT  และเพื่อตรวจสอบปัญหาที่อาจเกิดจากการใช้งาน เราอาจเก็บข้อมูลประวัติการใช้งานของคุณนำมาเรียกใช้ วิเคราะห์ และปรับปรุงพัฒนาคุณภาพการให้บริการของ CBT Thailand Web Application ให้ดียิ่งขึ้น'
                    }
                </Typography>
                <Typography variant='h5' align='left' className={classes.personalDetail}>
                    {
                        'คุณยินยอมให้ CBT Thailand Web Application เก็บรวบรวม นำไปใช้ และเปิดเผยข้อมูลของคุณเพื่อจุดประสงค์ที่กล่าวมาข้างต้น   '
                    }
                </Typography>

                <Grid item xs={12} sm={10} md={6} style={{ marginLeft: 34, marginTop: 10 }}>
                    <Field
                        name='isAcceptPDPA'
                        component={RadioButton}
                        options={[
                            {
                                label: 'ยินยอม',
                                value: 'true',
                            },
                            {
                                label: 'ไม่ยินยอม',
                                value: 'false',
                            },
                        ]}
                        onRadioChange={(value) => {
                            handleCheckPDPA_1 && handleCheckPDPA_1(value)
                            setPDPA1(value === 'false')
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={10} md={6} />
                {PDPA1 && (
                    <Typography align='left' className={classes.personalDetail} color='error'>
                        {
                            ' บริการ CBT Thailand Web Application ของเราเคารพการตัดสินใจของคุณ คุณสามารถใช้งาน CBT Thailand Web Application ได้ตามปกติ ทั้งนี้ หากคุณยินยอมให้ข้อมูลกับเรา โปรดมั่นใจได้ว่าเราจะไม่นำข้อมูลของคุณไปใช้นอกเหนือจากจุดประสงค์ดังกล่าวอย่างแน่นอน'
                        }
                    </Typography>
                )}

                {/* ############### Title 2 ############### */}
                <Typography variant='h5' align='left' className={classes.personalTitle}>
                    {'2. ความยินยอมในการใช้ข้อมูลส่วนบุคคลของคุณ เพื่อแจ้งเตือนข่าวสารและอัพเดทข้อมูลใหม่ๆ'}
                </Typography>
                <Typography variant='h5' align='left' className={classes.personalDetail}>
                    {
                        'เพื่อให้เราได้อัพเดทข้อมูลข่าวสาร แหล่งท่องเที่ยวภายในชุมชนใหม่ ๆ กิจกรรมหรืออีเวนท์สำคัญต่าง ๆ กับคุณผ่านอีเมล์ติดต่อที่คุณให้กับเราไว้'
                    }
                </Typography>
                <Typography variant='h5' align='left' className={classes.personalDetail}>
                    {
                        'คุณยินยอมให้ CBT Thailand Web Application เก็บรวบรวม นำไปใช้ และเปิดเผยข้อมูลของคุณเพื่อจุดประสงค์ที่กล่าวมาข้างต้น'
                    }
                </Typography>

                <Grid item xs={12} sm={10} md={6} style={{ marginLeft: 34, marginTop: 10 }}>
                    <Field
                        name='isAcceptPDPA2'
                        component={RadioButton}
                        options={[
                            {
                                label: 'ยินยอม',
                                value: 'true',
                            },
                            {
                                label: 'ไม่ยินยอม',
                                value: 'false',
                            },
                        ]}
                        onRadioChange={(value) => {
                            handleCheckPDPA_2 && handleCheckPDPA_2(value)
                            setPDPA2(value === 'false')
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={10} md={6} />
                {PDPA2 && (
                    <Typography align='left' className={classes.personalDetail} color='error'>
                        {
                            ' บริการ CBT Thailand Web Application ของเราเคารพการตัดสินใจของคุณ คุณสามารถใช้งาน CBT Thailand Web Application ได้ตามปกติ ทั้งนี้ หากคุณยินยอมให้ข้อมูลกับเรา โปรดมั่นใจได้ว่าเราจะไม่นำข้อมูลของคุณไปใช้นอกเหนือจากจุดประสงค์ดังกล่าวอย่างแน่นอน'
                        }
                    </Typography>
                )}
            </Grid>
        </>
    )
}

export default PersonalDataView
