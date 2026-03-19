import React from 'react'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
// import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
// import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
// import DirectionsIcon from '@material-ui/icons/Directions'
import CircularProgress from '@material-ui/core/CircularProgress'
// import { UseAutocompleteProps } from '@material-ui/lab/useAutocomplete/useAutocomplete'

// import TextField from '@material-ui/core/TextField'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
            position: 'absolute',
            left: 16,
            top: 16,
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        inputbase: {
            fontFamily: 'prompt',
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
        endAdornment: {
            right: 4,
        },
    }),
)

type CustomizedInputBaseType = {
    handleInputChange: (value: any) => void
    handleSelect: (value: any) => void
    options: any[]
    setOptions: (value: any) => void
    setValue: (value: any) => void
    isSearching: boolean
    keyword: string
    disabled?: boolean
}

const CustomizedInputBase: React.FC<CustomizedInputBaseType> = ({
    handleInputChange,
    handleSelect,
    options,
    setOptions,
    setValue,
    isSearching,
    keyword,
    disabled,
}) => {
    const classes = useStyles()

    const [open, setOpen] = React.useState(false)
    // const [loading, setLoading] = React.useState(false)

    const onInputChange = (event: React.ChangeEvent<{}>, newValue: any) => {
        if (newValue?.length < 3) {
            setOpen(false)
            return
        }
        handleInputChange(newValue)
        setOpen(true)
    }

    const onChange = (event: React.ChangeEvent<{}>, newValue: any) => {
        handleSelect(newValue)
        setOptions(newValue ? [newValue, ...options] : options)
        setValue(newValue)
        setOpen(false)
    }

    const handleBlur = () => {
        setOpen(false)
    }

    return (
        <Paper className={classes.root}>
            <Autocomplete
                disabled={disabled}
                fullWidth
                id='search'
                getOptionLabel={(option) => option.Name_L || ''}
                filterOptions={(x) => x}
                options={options}
                autoComplete
                includeInputInList
                filterSelectedOptions
                onChange={onChange}
                onInputChange={onInputChange}
                // loading={isSearching}
                // openOnFocus={false}

                open={open}
                onBlur={handleBlur}
                forcePopupIcon={false}
                classes={{ endAdornment: classes.endAdornment }}
                renderInput={(params) => (
                    <InputBase
                        {...params.InputProps}
                        fullWidth
                        placeholder='ชื่อสถานที่'
                        classes={{ input: classes.inputbase }}
                        inputProps={{
                            ...params.inputProps,
                        }}
                        startAdornment={
                            <IconButton className={classes.iconButton} aria-label='search'>
                                <SearchIcon />
                            </IconButton>
                        }
                        endAdornment={
                            <React.Fragment>
                                {isSearching ? <CircularProgress color='inherit' size={20} /> : null}
                                {/* {true ? <CloseIcon fontSize="small" /> : null} */}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        }
                    />
                )}
                renderOption={(option) => {
                    const matches = match(option.Name_L, keyword)
                    const parts = parse(option.Name_L, matches)
                    return (
                        <Grid container alignItems='center' spacing={1}>
                            <Grid item>
                                <LocationOnIcon />
                            </Grid>
                            <Grid item xs>
                                <Typography variant='body2' className={classes.inputbase}>
                                    {parts.map((part, index) => (
                                        <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                            {part.text}
                                        </span>
                                    ))}
                                </Typography>
                                {/* <Typography variant="body2" className={classes.inputbase}>
                                    {option.Name_L}
                                </Typography> */}
                                <Typography variant='body2' color='textSecondary' className={classes.inputbase}>
                                    {option.AdminLevel1_L} {option.AdminLevel2_L} {option.AdminLevel3_L}
                                </Typography>
                            </Grid>
                        </Grid>
                    )
                }}
            />
        </Paper>
    )
}

export default CustomizedInputBase
