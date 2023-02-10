/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from '../config'
import { onSandbox } from "../functions/onSandbox"
import { onlinePlayersFormatted } from '../functions/onlinePlayers'

register("chat", event => {
    if (!onSandbox() || !Settings.toggleGNotification) return
    let umsg = ChatLib.removeFormatting(ChatLib.getChatMessage(event))
    if (umsg.startsWith("Guild > ")) return World.playSound("random.orb", 2, 1)
})

register("chat", (event) => {
    if (!onSandbox() || !Settings.customGuildChat) return
    let regex = /Guild > \[([A-Z]*)\] ([A-z0-9]{3,16}): (.*)/g
    if (regex.test(ChatLib.removeFormatting(ChatLib.getChatMessage(event)))) {
        let args = regex.exec(ChatLib.removeFormatting(ChatLib.getChatMessage(event)))
        args = regex.exec(ChatLib.removeFormatting(ChatLib.getChatMessage(event)))
        let rank = args[1]
        let player = args[2]
        let message = args[3]
        cancel(event)
        ChatLib.chat("&aG > &e[" + (rank == "MEMBER" ? "M" : (rank == "OFFICER" ? "O" : "L")) + "] " + (onlinePlayersFormatted.find(p => ChatLib.removeFormatting(p.split(" ")[1]) == player) ? onlinePlayersFormatted.find(p => ChatLib.removeFormatting(p.split(" ")[1]) == player).split(" ")[1] : "&7" + player) + "&r: " + message)
    }
})