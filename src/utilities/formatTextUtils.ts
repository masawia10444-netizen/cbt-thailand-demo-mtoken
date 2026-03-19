export type TDataAddressProps = {
    hno?: string
    moo?: string
    villageName?: string
    soiName?: string
    roadName?: string
    tamName?: string
    ampName?: string
    provName?: string
    postCode?: string
    provCode?: string
}

export const formatAddress = (dataAddress: TDataAddressProps, lang: string) => {
    const { hno, moo, villageName, soiName, roadName, tamName, ampName, provName, postCode, provCode } = dataAddress

    switch (lang) {
        case 'EN':
            // return `${hno} moo ${moo} ${villageName}, soi ${soiName}, ${roadName} Road, ${tamName} Subdistrict, ${ampName} District, ${provName} ${postCode}`
            let AddressEN = ``
            if (hno) AddressEN += `${hno}`
            if (moo) AddressEN += ` moo ${moo}`
            if (villageName) AddressEN += ` ${villageName},`
            if (soiName) AddressEN += ` soi ${soiName},`
            if (roadName) AddressEN += ` ${roadName} Road,`
            if (tamName) AddressEN += ` ${tamName} Subdistrict,`
            if (ampName) AddressEN += ` ${ampName} District,`
            if (provName) AddressEN += ` ${provName}`
            if (postCode) AddressEN += ` ${postCode}`
            return AddressEN.trim()
        case 'TH':
            // return `${hno} หมู่ ${moo} ${villageName} ซอย${soiName} ถนน ${roadName} ตำบล${tamName} อำเภอ${ampName} จังหวัด${provName} ${postCode}`
            const isBKK = Boolean(provCode === '10')

            let AddressTH = ``
            if (hno) AddressTH += `${hno}`
            if (moo) AddressTH += ` หมู่ ${moo}`
            if (villageName) AddressTH += ` ${villageName}`
            if (soiName) AddressTH += ` ซอย${soiName}`
            if (roadName) AddressTH += ` ถนน${roadName}`
            if (tamName) AddressTH += isBKK ? ` แขวง${tamName}` : ` ตำบล${tamName}`
            if (ampName) AddressTH += isBKK ? ` เขต${ampName}` : ` อำเภอ${ampName}`
            if (provName) AddressTH += isBKK ? ` ${provName}` : ` จังหวัด${provName}`
            if (postCode) AddressTH += ` ${postCode}`

            return AddressTH.trim()
        default:
            return
    }
}

export const formatNumberWithComma = (str: string | number) => {
    let res: string = ''
    if (str?.toString()) {
        res = str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    return res
}

export const isJsonString = (str: string) => {
    try {
        JSON.parse(str)
    } catch (e) {
        return false
    }
    return true
}
