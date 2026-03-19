export const filterAllKey = (data: Array<any>, key: string, searchingKey?: Array<string>) => {
    return data.filter(function(o) {
        if (searchingKey) {
            return searchingKey.some(function(k) {
                return (
                    o[k]
                        .toString()
                        .toLowerCase()
                        .indexOf(key) !== -1
                )
            })
        } else {
            return Object.keys(o).some(function(k) {
                return (
                    o[k]
                        .toString()
                        .toLowerCase()
                        .indexOf(key) !== -1
                )
            })
        }
    })
}
