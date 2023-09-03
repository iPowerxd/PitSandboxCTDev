/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { generalInfoHud } from "./gui"

const firstMessage = [
    `&d&l&nPit Sandbox 69.420.0`,
    "",
    "&aThank you for using &dPitSandbox&a!",
    "&7Use &e/pbox &7to open the settings GUI",
    "",
    "&6&lThis ChatTrigger has been verified by the &cO&lwner&6!",
    "",
    "&aIf you found a bug or have any suggestions,",
    "&aDM &dJMB#0001 &7& &biPower#4441",
    ""
]

function welcome() {
    if (!generalInfoHud.firstTime) return
    setTimeout(() => {
        World.playSound("random.levelup", 1, 1)
        ChatLib.chat(`&b&m${ChatLib.getChatBreak(" ")}`)
        firstMessage.forEach(message => {
            ChatLib.chat(ChatLib.getCenteredText(message))
        })
        ChatLib.chat(`&b&m${ChatLib.getChatBreak(" ")}`)
        generalInfoHud.firstTime = false
        generalInfoHud.save()
    }, 1000)
}

register("worldLoad", () => {
    welcome()
})