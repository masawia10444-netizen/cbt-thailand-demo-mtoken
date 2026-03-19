import React from 'react'

// Messages
const requiredText = 'Required'
const maxLengthText = 'Your input exceed maximum length'

// Error Component
export const errorMessage = (error: string | boolean) => {
    return <div className='invalid-feedback'>{error}</div>
}
export const validateUserName = (value: string) => {
    let error
    if (!value) {
        error = requiredText
    } else if (value?.length > 12) {
        error = maxLengthText
    }
    return error
}

export const validateTextField = (value: string) => {
    let error
    if (!value) {
        error = requiredText
    } else if (value?.length > 12) {
        error = maxLengthText
    }
    return error
}

export const validateMobileNumber = (value: string | number[]) => {
    let error
    if (value?.length > 11) {
        error = maxLengthText
    }
    return error
}
export const required = (value: string) => {
    let error
    if (!value || value?.length <= 0) {
        error = requiredText
    }
    return error
}

export const validateRequired = (value: string) => {
    let error
    if (!value || value?.length <= 0) {
        error = 'VALIDATE.REQUIRED'
    }
    return error
}

export const validatePassword = (value: string) => {
    let error
    if (!value) {
        error = requiredText
    }
    return error
}

export const validateEmail = (value: string) => {
    let error
    if (!value) {
        error = requiredText
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'VALIDATE.WRONG_EMAIL_FORMAT'
    }
    return error
}

export const validateDateOfBirth = (value: string) => {
    let error
    if (!value) {
        error = requiredText
    } else if (!/(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/i.test(value)) {
        error = 'Please use the following format MM/DD/YYYY'
    }
    return error
}

export const checkboxRequired = (value: boolean) => {
    let error = undefined

    if (!value) error = 'VALIDATE.ACCEPT_POLICY'

    return error
}

export const composeValidators = (...validators) => (value) =>
    validators.reduce((error, validator) => error || validator(value), undefined)

export const password = (value: string) => {
    let error = undefined
    const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(value)
    const foundNotWord = /\W/g.test(value)
    const len = value?.length
    //Englist, non special word, case insensitive, 6-20 letter
    if (!value || !regExp || foundNotWord || len < 6 || len > 20 || /_/g.test(value)) {
        error = 'VALIDATE.WRONG_PASSWORD_FORMAT'
    }

    return error
}

export const mustMatch = (password: string, confirm: string) => {
    let error = ''

    if (password !== confirm) {
        error = 'VALIDATE.PASSWORD_NOT_MATCH'
    }

    return error
}

export const mustBeNumber = (value) => {
    return isNaN(value ? value : 0) ? 'VALIDATE.MUST_BE_NUMBER' : undefined
}

export const mobileNumber = (value) => {
    let isNotNumber = mustBeNumber(value)
    let isNotInLength = validateMobileNumber(value)

    return isNotNumber ? isNotNumber : isNotInLength ? isNotInLength : undefined
}
