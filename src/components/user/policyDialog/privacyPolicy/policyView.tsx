import { useState, FC } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Field } from 'formik'
import { useTranslation } from 'react-i18next'
import { checkboxRequired } from '../../../../utilities/shareValidate'
import Checkbox from '../../../../controls/checkbox/formikCheckbox'
import { detail } from './policyText'

type PolicyViewPropsType = {
    renderContent: (detail: any, key: number) => JSX.Element
    handleCheck: (values: boolean) => void
    classes?: any
}
const PolicyView: FC<PolicyViewPropsType> = ({ renderContent, handleCheck, classes }) => {
    const [displayDetail, setDisplayDetail] = useState(false)
    const { t, i18n } = useTranslation()

    const toggleViewDetail = () => {
        setDisplayDetail(!displayDetail)
    }

    return (
        <Grid item xs={12}>
            <Typography className={classes.policyTitle} variant='h3' align='left'>
                {
                    //t('POLICY.DIALOG.TERMS_OF_SERVICE')
                    'เงื่อนไขการใช้บริการ'
                }
            </Typography>
            <Typography variant='h5' align='left' className={classes.policyDesc}>
                {
                    //t('POLICY.DIALOG.TERMS_OF_SERVICE_DESC')
                    'นโยบายการคุ้มครองข้อมูลส่วนบุคคล (Privacy Policy) ขององค์การบริหารการพัฒนาพื้นที่พิเศษเพื่อการท่องเที่ยวอย่างยั่งยืน (องค์การมหาชน)'
                }
            </Typography>

            <Typography variant='h5' align='left' className={classes.detailTitle}>
                {detail[0].title}
            </Typography>

            <Typography variant='h5' align='left' className={classes.detailContent}>
                {detail[0].content}
            </Typography>

            <Typography variant='h5' align='left' className={classes.viewDetail} onClick={toggleViewDetail}>
                {/* {displayDetail ? t('POLICY.DIALOG.HIDE_DETAIL') : t('POLICY.DIALOG.VIEW_DETAIL')} */}
                {displayDetail ? 'ซ่อนรายละเอียด' : 'ดูรายละเอียด'}
            </Typography>

            {displayDetail &&
                detail.map((item, index) => {
                    if (index > 0) {
                        return (
                            <div key={index} className={classes.detail}>
                                <Typography variant='h5' align='left' className={classes.detailTitle}>
                                    {item.title}
                                </Typography>

                                {item.content.map((detail, j) => {
                                    return renderContent(detail, j)
                                })}
                            </div>
                        )
                    }
                })}
            <Field
                name='isAcceptPolicy'
                component={Checkbox}
                type='checkbox'
                label={
                    <Typography className={classes.checkbox} variant='h5' align='left'>
                        {/* {t('POLICY.DIALOG.ACCEPT_TERMS')} */}
                        {'ยอมรับเงื่อนไขการใช้บริการ'}
                    </Typography>
                }
                color='secondary'
                validate={checkboxRequired}
                pointerEvents='auto'
                iconStyle={{
                    fontSize: 22,
                }}
                errorTextStyle={{
                    textAlign: 'left',
                }}
                onCheckboxChange={handleCheck}
            />
        </Grid>
    )
}

export default PolicyView
