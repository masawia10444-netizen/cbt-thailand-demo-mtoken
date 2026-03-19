import CryptoJS from 'crypto-js'
import cryptoConfig from '../configs/crypto'

const options = {
    keySize: 128 / 8,
    iv: CryptoJS.enc.Utf8.parse(cryptoConfig.path),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
}

export const encrypt = (value: string): string => {
    try {
        let key = CryptoJS.enc.Utf8.parse(cryptoConfig.privateKey)
        let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value), key, options)
        let str = encrypted.toString()
        return str
    } catch (error) {
        return null
    }
}

export const decrypt = (encryptText: string) => {
    try {
        let key = CryptoJS.enc.Utf8.parse(cryptoConfig.privateKey)
        let decrypted = CryptoJS.AES.decrypt(encryptText, key, options)
        let str = decrypted.toString(CryptoJS.enc.Utf8)
        return str
    } catch (error) {
        return null
    }
}
