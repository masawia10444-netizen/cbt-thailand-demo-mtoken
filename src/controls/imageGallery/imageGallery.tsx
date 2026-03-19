import React, { FC, Fragment, MouseEvent } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import AwesomeSlider from 'react-awesome-slider'
import withAutoplay from 'react-awesome-slider/dist/autoplay'

//constanst
import FontSize from '../../constants/fontSize'
import ColorWeb from '../../constants/colorWeb'
import { Typography } from '@material-ui/core'

// import './imageGallery.scss'
// import './imageGallery.css'

type Props = {
    options: {
        image: string
        caption?: string | null
    }[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        caption: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate( -50%, -50% )',
            textAlign: 'center',
            color: theme.colors.white,
            fontSize: theme.fontStyle.prompt.h1.fontSize,
            fontWeight: FontSize.weight.regular,
            fontFamily: 'Prompt-Regular',
            width: '90%',
            [theme.breakpoints.down('xs')]: {
                fontSize: 22,
            },
        },
    }),
)

const AutoplaySlider = withAutoplay(AwesomeSlider)

const ImageGallery: FC<Props> = (props) => {
    const classes = useStyles()
    return (
        <AutoplaySlider
            style={{ maxHeight: '500px', height: '100%' }}
            animation='openAnimation'
            //cssModule={[CaptionedStyles]}
            play={true}
            cancelOnInteraction={false} // should stop playing on user interaction
            interval={6000}
            bullets={false}
        >
            {props.options.map((item, i) => {
                return (
                    <div key={i} data-src={item.image} className='img-content'>
                        {item.caption ? (
                            <Typography variant='h1' className={classes.caption}>
                                {item.caption}
                            </Typography>
                        ) : (
                            <></>
                        )}
                    </div>
                )
            })}
        </AutoplaySlider>
    )
}

export default ImageGallery
