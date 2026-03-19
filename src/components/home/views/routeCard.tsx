import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';

const Review01 = process.env.NEXT_PUBLIC_WEB_URL + '/images/home/review_01.png'
const Review02 = process.env.NEXT_PUBLIC_WEB_URL + '/images/home/review_02_cropped@2x.png'
const Review03 = process.env.NEXT_PUBLIC_WEB_URL + '/images/home/review_03.png'

type UseRouteCardProps = {}
// type ReturnTypeUseRouteCard = ReturnType<typeof useRouteCard>

type RouteCardViewProps = {}
let RouteCardView: React.FC<RouteCardViewProps> = ({ }) => {

    const classes = useStyles()

    return (
        <>
            <Card className={classes.root}>
                <CardMedia
                    className={classes.cover}
                    image={Review01}
                    title="Live from space album cover"
                />
                <div className={classes.details}>

                    <CardContent className={classes.content}>

                        <Typography variant="h3" className={classes.title}>{'2 วัน 1 คืน'}</Typography>
                        <Typography variant="h5" className={classes.desc}>{'มองเชียงคานผ่านหน้าต่าง ชุมชนไทดำ'}</Typography>

                    </CardContent>

                    <div className={classes.location}>
                        <Typography variant="body1" >{'บ้านนาป่าหนาด จังหวัดเลย'}</Typography>
                    </div>
                </div>



            </Card>
        </>
    )
}

type RouteCardProps = UseRouteCardProps & RouteCardViewProps
// Omit<RouteCardViewProps, keyof ReturnTypeUseRouteCard>
let RouteCard: React.FC<RouteCardProps> = ({ ...others }) => {
    //    const RouteCard = useRouteCard({})
    return <RouteCardView {...RouteCard} {...others} />
}

export default RouteCard

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            width: "100%",
            height: 155,
            boxShadow: '0px 0px 20px #00000024',
            borderRadius: 0
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
            width: "100%"
        },
        content: {
            // flex: '1 0 auto',
        },
        cover: {
            width: 154,
        },
        controls: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        playIcon: {
            height: 38,
            width: 38,
        },
        location: {
            paddingLeft: 25,
            paddingTop: 15,
            color: '#B8B6B6'
        },
        title: {
            color: '#80BD01',
            paddingLeft: 10
        },
        desc: {
            color: '#090909',
            fontWeight: 'bold',
            width: 160,
            paddingLeft: 10,
            paddingTop: 10
        }
    }),
);
