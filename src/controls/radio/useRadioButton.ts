import { useState, ChangeEvent, MouseEvent } from 'react'

type props = {
    value?: number | string | null
    //onChange: (event: ChangeEvent<HTMLInputElement>) => void | undefined
    onClick: (event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
}

const useRadioButton = (props: props) => {
    const [value, setValue] = useState({ id: props.value })

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        // console.log(event.target)
        if ((event.target as HTMLInputElement).value === value.id) {
            setValue({ id: null })
        } else {
            setValue({ id: (event.target as HTMLInputElement).value })
        }
        props.onClick(event)
    }

    return { value, handleClick }
}

export default useRadioButton
