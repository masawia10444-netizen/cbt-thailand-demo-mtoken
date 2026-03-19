import React from 'react'
import jsonp from 'jsonp'
import querystring from 'querystring'
import _ from 'lodash'

// import TextField from '@material-ui/core/TextField'
// import Autocomplete from '@material-ui/lab/Autocomplete'
// import LocationOnIcon from '@material-ui/icons/LocationOn'
// import Grid from '@material-ui/core/Grid'
// import Typography from '@material-ui/core/Typography'
// import { makeStyles } from '@material-ui/core/styles'
// import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle'

type SearchResultType = { results: any[] }

// const autocompleteService = { current: null }

const useSearch = (view: any, initialKeyword: string = ' ') => {
    const [keyword, setKeyword] = React.useState(initialKeyword)
    const [options, setOptions] = React.useState<any>([])
    const [isLoading, setLoading] = React.useState<boolean>(false)
    const [value, setValue] = React.useState(null)
    // const [inputValue, setInputValue] = React.useState('');

    // const fetch = React.useMemo(
    //     () =>
    //         throttle((request: any, callback: any) => {
    //             search(request, callback)
    //         }, 200),
    //     [],
    // )

    const fetch = React.useMemo(
        () =>
            throttle((request: any, callback: any) => {
                search(request, callback)
            }, 4000),
        [],
    )

    React.useEffect(() => {
        let active = true
        if (!view) return

        // if (!autocompleteService.current && window.google) {
        //     autocompleteService.current = new window.google.maps.places.AutocompleteService()
        // }
        // if (!autocompleteService.current) {
        //     return undefined
        // }
        if (keyword?.length < 3) return

        if (keyword === '') {
            setOptions(value ? [value] : [])
            return undefined
        }

        fetch(keyword, (results: any) => {
            if (active) {
                let newOptions: any[] = []

                if (value) {
                    newOptions = [value]
                }

                if (results) {
                    newOptions = [...newOptions, ...results]
                }

                setOptions(newOptions)
            }
        })

        return () => {
            active = false
        }
    }, [view, keyword, fetch])

    const search = (keyword: any, callback: any) => {
        const params = {
            key: process.env.REACT_APP_NOSTRA_MAP_KEY,
            keyword: keyword,
            // catCode: '',
            // delay: 5, // time in seconds after which data should be returned
        }
        setLoading(true)
        const q = querystring.encode(params)
        jsonp(
            `${process.env.REACT_APP_NOSTRA_MAP_SERVICE_URL}/Location/Search?` + q,
            { name: 'search' },
            (err, results) => {
                setLoading(false)
                if (err) return
                if (_.isEmpty(results)) return
                callback(results.results)
            },
        )
    }

    return { keyword, setKeyword, options, setOptions, setValue, isLoading }
}

export default useSearch
