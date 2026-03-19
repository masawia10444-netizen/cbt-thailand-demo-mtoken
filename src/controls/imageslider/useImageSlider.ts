import { useCallback, useState } from 'react'

const useImageSlider = () => {
    const [activeStep, setActiveStep] = useState(0)

    const handleChangeIndex = useCallback((step: number) => {
        setActiveStep(step)
    }, [])

    const handleClickPreviousSlide = useCallback(() => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }, [])

    const handleClickNextSlide = useCallback(() => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }, [])

    return {
        activeStep,
        handleChangeIndex,
        handleClickPreviousSlide,
        handleClickNextSlide,
    }
}
export default useImageSlider
