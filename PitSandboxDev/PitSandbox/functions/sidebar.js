/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

let sidebar = []

export const getSidebar = () => {
    if (Scoreboard.getLines(false).length > 0) {
        return Scoreboard.getLines(false).map(l => l.getName());
    } else {
        return sidebar
    }
}

export const storeSidebar = () => {
    if (Scoreboard.getLines(false).length > 0) {
        sidebar = Scoreboard.getLines(false).map(l => l.getName());
    }
}