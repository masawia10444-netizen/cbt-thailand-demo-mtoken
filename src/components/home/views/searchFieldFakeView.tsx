import { useState, FC, Dispatch, SetStateAction } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'

const Search = process.env.NEXT_PUBLIC_WEB_URL + '/images/home/search.svg'

type SearchFieldFakeViewPropsType = {
    placeholder?: string
    setFocused?: Dispatch<SetStateAction<boolean>>
}
const SearchFieldFakeView: FC<SearchFieldFakeViewPropsType> = ({ placeholder, setFocused }) => {
    const classes = useStyles()

    const searhButton = () => {
        return (
            <IconButton
                className={classes.btnSearch}
                onClick={() => {
                    setFocused && setFocused(true)
                }}
            >
                <img loading='lazy' src={Search} alt='Search' className={classes.iconSearch} />
            </IconButton>
        )
    }

    return (
        <InputBase
            endAdornment={searhButton()}
            className={classes.search}
            inputProps={{ input: classes.input }}
            classes={{ input: classes.input }}
            placeholder={placeholder}
            onFocus={() => {
                setFocused && setFocused(true)
            }}
        />
    )
}

export default SearchFieldFakeView

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        search: {
            width: '100%',
            height: 40,
            backdropFilter: 'blur(30px)',
            borderRadius: 10,
            color: 'white',
            paddingLeft: 20,
            background: 'rgba(255,255,255,0.2)',
            [theme.breakpoints.up('sm')]: {
                height: 56,
            },
        },
        btnSearch: {
            height: '100%',
            width: 70,
            background: '#80BD01',
            borderRadius: '0px 10px 10px 0px',
            color: 'white',
            '&:hover': {
                background: '#80BD01',
            },
            [theme.breakpoints.up('sm')]: {
                width: 75,
            },
            [theme.breakpoints.up('md')]: {
                width: 80,
            },
            [theme.breakpoints.up('lg')]: {
                width: 85,
            },
        },
        btnClear: {
            height: '100%',
            width: 70,
            background: 'transparent',
            borderRadius: '0px 10px 10px 0px',
            color: 'white',
            '&:hover': {
                background: 'transparent',
            },
            [theme.breakpoints.up('sm')]: {
                width: 75,
            },
            [theme.breakpoints.up('md')]: {
                width: 80,
            },
            [theme.breakpoints.up('lg')]: {
                width: 85,
            },
        },
        iconSearch: {
            width: 18,
            height: 18,
            [theme.breakpoints.up('sm')]: {
                width: 22,
                height: 22,
            },
            [theme.breakpoints.up('md')]: {
                width: 25,
                height: 25,
            },
            [theme.breakpoints.up('lg')]: {
                width: 25,
                height: 25,
            },
        },
        iconClear: {
            width: 16,
            height: 16,
            [theme.breakpoints.up('sm')]: {
                width: 18,
                height: 18,
            },
            [theme.breakpoints.up('md')]: {
                width: 20,
                height: 20,
            },
            [theme.breakpoints.up('lg')]: {
                width: 20,
                height: 20,
            },
        },
        input: {
            paddingRight: 10,
            textOverflow: 'ellipsis',
            width: '100%',
            height: '100%',
            color: 'white',
            fontSize: 14,
            fontWeight: 'normal',
            '&::placeholder': {
                color: 'white',
                opacity: 1,
                fontSize: 14,
            },
        },
    }),
)
