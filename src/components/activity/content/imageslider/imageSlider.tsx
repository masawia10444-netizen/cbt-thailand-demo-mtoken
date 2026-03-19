import React from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Carousel from "nuka-carousel";

import UseImageSlider from './useImageSlider'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            // maxWidth: 400,
            flexGrow: 1
        },
        header: {
            display: "flex",
            alignItems: "center",
            height: 50,
            paddingLeft: 20,
            backgroundColor: 'wheat'
        },
        img: {
            height: '380px',
            width: '100%',
            display: "inline",
            overflow: "hidden",
        },
        icon_btn: {
            color: 'rgba(255,255,255,0.8)',
            backgroundColor: 'rgba(255,255,255,0.2)'
        }
    }))

const imageData2 = [
    { imgID: 238, imgOrder: 1, imgPath: "/Community/Images/CM0111001/img_111.png" },
    { imgID: 239, imgOrder: 2, imgPath: "/Community/Images/CM0111001/img_113.png" },
    { imgID: 240, imgOrder: 3, imgPath: "/Community/Images/CM0111001/img_114.png" },
    { imgID: 241, imgOrder: 4, imgPath: "/Community/Images/CM0111001/img_115.png" },
    { imgID: 242, imgOrder: 5, imgPath: "/Community/Images/CM0111001/img_2.png" }
]


type UseimageSliderProps = {}
type ReturnTypeUseimageSlider = ReturnType<typeof UseImageSlider>
function useimageSlider(props: UseimageSliderProps) {
    const { } = props
    return {}
}

type imageSliderViewProps = ReturnTypeUseimageSlider & { imageData: any[] }
let ImageSliderView: React.FC<imageSliderViewProps> = ({
    imageData
}) => {
    const classes = useStyles()
    // console.log('imageData', imageData)


    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <Carousel
                    slidesToShow={2}
                    slidesToScroll={2}
                    autoplay
                    autoplayInterval={2000}
                    wrapAround
                    defaultControlsConfig={{
                        pagingDotsStyle: {
                            fill: 'rgba(255,255,255,0.5)',
                        },
                    }}
                    renderCenterLeftControls={({ previousSlide }) => (
                        <KeyboardArrowLeft onClick={previousSlide} fontSize='large' className={classes.icon_btn} />
                    )}
                    renderCenterRightControls={({ nextSlide }) => (
                        <KeyboardArrowRight onClick={nextSlide} fontSize='large' className={classes.icon_btn} />
                    )}
                >
                    {
                        imageData.map((item, index) => (
                            item.imgOrder !== 1 &&
                            <img loading='lazy' className={classes.img} src={process.env.NEXT_PUBLIC_UPLOAD_URL + item.imgPath} alt={item.imgID} />
                        ))
                    }
                </Carousel>
            </Grid>
        </Grid >

    )
}

type imageSliderProps = UseimageSliderProps & Omit<imageSliderViewProps, keyof ReturnTypeUseimageSlider> & { imageData: any[] }
let ImageSlider: React.FC<imageSliderProps> = ({ ...others }) => {
    const imageSlider = UseImageSlider()
    return <ImageSliderView {...imageSlider} {...others} />
}

export default ImageSlider
