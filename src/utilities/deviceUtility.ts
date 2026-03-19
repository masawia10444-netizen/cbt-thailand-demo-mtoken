/**
 * Detect current browser support touch device or not.
 *
 * @returns boolean
 */
export const isTouchDeviceSupported = (): boolean => {
    var isTouchDevice = false
    if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
    ) {
        isTouchDevice = true
    }
    return isTouchDevice
}

/**
 * Detect current browser support IOS or not.
 *
 * @return boolean
 */
export const isIOSDevice = (): boolean => {
    const iOS = /iPad|iPhone/.test(navigator.userAgent)
    return iOS
}