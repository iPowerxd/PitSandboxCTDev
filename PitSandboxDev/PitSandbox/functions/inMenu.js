/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

let menu = undefined

register("worldLoad", () => {
    menu = true
})

register("worldUnload", () => {
    menu = false
})

export const inMenu = () => {
    return menu
}