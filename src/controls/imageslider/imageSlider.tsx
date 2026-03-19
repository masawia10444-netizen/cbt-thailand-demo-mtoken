import React from 'react'
import Carousel from 'nuka-carousel'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import UseImageSlider from './useImageSlider'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            flexGrow: 1,
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            height: 50,
            paddingLeft: 20,
            backgroundColor: 'wheat',
        },
        img: {
            height: '400px',
            width: '100%',
            display: 'inline',
            overflow: 'hidden',
            //objectFit: 'cover',
            objectFit: 'cover',
            objectPosition: 'top',
        },
        icon_btn: {
            color: 'rgba(255,255,255,0.8)',
            backgroundColor: 'rgba(255,255,255,0.2)',
        },
    }),
)

type UseimageSliderProps = {}
type ReturnTypeUseimageSlider = ReturnType<typeof UseImageSlider>

type imageSliderViewProps = ReturnTypeUseimageSlider & { imageData: string[] }
let ImageSliderView: React.FC<imageSliderViewProps> = ({ imageData }) => {
    const classes = useStyles()
    const theme = useTheme()
    const isIpadView = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <Carousel
                    slidesToShow={isIpadView ? 1 : imageData.length <= 1 ? 1 : 2}
                    slidesToScroll={isIpadView ? 1 : 2}
                    autoplay={imageData.length <= 1 ? false : true}
                    autoplayInterval={2000}
                    wrapAround
                    defaultControlsConfig={{
                        pagingDotsStyle: {
                            fill: 'rgba(255,255,255,0.5)',
                        },
                    }}
                    renderCenterLeftControls={({ previousSlide }) => (
                        <IconButton onClick={previousSlide}>
                            <KeyboardArrowLeft fontSize='large' className={classes.icon_btn} />
                        </IconButton>
                    )}
                    renderCenterRightControls={({ nextSlide }) => (
                        <IconButton onClick={nextSlide}>
                            <KeyboardArrowRight fontSize='large' className={classes.icon_btn} />
                        </IconButton>
                    )}
                >
                    {imageData.map((path, index) => (
                        <img loading='lazy' key={index} className={classes.img} src={path} alt={'img'} />
                    ))}
                </Carousel>
            </Grid>
        </Grid>
    )
}

type imageSliderProps = UseimageSliderProps &
    Omit<imageSliderViewProps, keyof ReturnTypeUseimageSlider> & { imageData: string[] }
let ImageSlider: React.FC<imageSliderProps> = ({ ...others }) => {
    const imageSlider = UseImageSlider()
    return <ImageSliderView {...imageSlider} {...others} />
}

export default ImageSlider
