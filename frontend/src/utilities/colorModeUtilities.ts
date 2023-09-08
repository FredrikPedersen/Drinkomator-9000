const localStorageKey = "colorMode";

export enum COLOR_MODES {
    DARK = "dark",
    LIGHT = "light"
}

export const initColorMode = () => {
    const currentMode = localStorage.getItem(localStorageKey);
    if (!currentMode) {
        setColorMode(COLOR_MODES.DARK);
    }

    if (currentMode === COLOR_MODES.DARK || currentMode === COLOR_MODES.LIGHT) {
        setColorMode(currentMode)
    } else {
        throw Error()
    }
}

export const switchColorMode = () => {
    const currentMode = localStorage.getItem(localStorageKey);
    if (currentMode === COLOR_MODES.DARK) {
        setColorMode(COLOR_MODES.LIGHT)
    } else {
        setColorMode(COLOR_MODES.DARK)
    }
}

export const getColorMode = (): string => {
    const currentMode = localStorage.getItem(localStorageKey);
    if (!currentMode) {
        setColorMode(COLOR_MODES.DARK)
        return COLOR_MODES.DARK
    }

    return currentMode
}

const setColorMode = (mode: COLOR_MODES) => {
    localStorage.setItem(localStorageKey, mode)
    const colorModeAttribute = document.documentElement.attributes.getNamedItem("data-bs-theme");
    colorModeAttribute!.value = mode;
}