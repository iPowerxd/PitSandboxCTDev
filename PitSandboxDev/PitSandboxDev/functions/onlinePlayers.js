/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { onSandbox } from "./onSandbox"

export const onlinePlayers = () => {
    return oPlayers
}

export const onlinePlayersFormatted = () => {
    return oPlayersFormatted
}

let oPlayers = TabList.getUnformattedNames().filter(n => !n.includes("§") && !n.startsWith("CIT-"))
let oPlayersFormatted = TabList.getNames().filter(n => n.split(" ").length > 1)

register('tick', () => {
    if (!onSandbox()) return
    oPlayers = TabList.getUnformattedNames().filter(n => !n.includes("§") && !n.startsWith("CIT-"))
    oPlayersFormatted = TabList.getNames().filter(n => n.split(" ").length > 1)
})