/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />
import Settings from '../config'

const isInMainServer = () => {
    let name = ChatLib.removeFormatting(Player.getDisplayName().getText())
    if (name.split(" ").length < 2) return false
    name = name.split(" ")[0]
    if (name.includes("[")) {
        if (/^\[[0-9]{1,3}\]$/g.test(name.split(" ")[0])) return true;
        else return false
    } else {
        if (World.getBlockAt(-14, 96, 0).toString().includes("enchanting_table")) kingsmap = true
        else kingsmap = false
        return true
    }
}

let kingsmap
let pitsandbox = (Server.getIP().toLowerCase().includes("harrys.network") || Server.getIP().toLowerCase().includes("pitsandbox.io") || Server.getIP().toLowerCase().includes("harrys.gg")) && isInMainServer()

register("worldLoad", () => {
    if (!Settings.toggleSandboxHUD) return Scoreboard.setShouldRender(true)
    setTimeout(() => {
        nomvp = false
        pitsandbox = (Server.getIP().toLocaleLowerCase().includes("harrys.network") || Server.getIP().toLocaleLowerCase().includes("pitsandbox.io") || Server.getIP().toLocaleLowerCase().includes("harrys.gg")) && isInMainServer()
        if (pitsandbox) Scoreboard.setShouldRender(false)
        else Scoreboard.setShouldRender(true)
    }, 1500)
})

register("worldUnload", () => {
    pitsandbox = false
})

export const onSandbox = () => {
    return pitsandbox
} // import { onSandbox } from "../functions/onSandbox"

export const onKingsMap = () => {
    return kingsmap
} // import { onKingsMap } from "../functions/onSandbox"