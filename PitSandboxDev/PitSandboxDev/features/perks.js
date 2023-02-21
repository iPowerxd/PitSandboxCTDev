/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { onSandbox } from "../functions/onSandbox"
import { inSpawn } from "../functions/inSpawn"

let syncperks
let autoSyncCooldown
let spawn
let firstTimeSync = false
let autoSyncperks = true
let lperks = JSON.parse(FileLib.read("PitSandboxDev", "perks.json")).sort()

export const megastreak = () => {
    return equMegastreak
}

export const perks = () => {
    return equPerks
}

export const killstreaks = () => {
    return equKillstreaks
}

export const equipedUpgrades = () => {
    return lperks
}

export const hasPerk = (perk) => {
    for (let i = 0; i < equPerks.length; i++) {
        if (equPerks[i].includes(perk)) return equPerks[i][1]
    } return 0
}

export const hasKillstreak = (ks) => {
    for (let i = 0; i < equKillstreaks.length; i++) {
        if (equKillstreaks[i].includes(ks)) return true
    } return false
}

/* export const hasPerk = (perk) => {
    for (let i = 0; i < 3; i++) {
        if (equipedUpgrades()[0][i].includes(perk)) return equipedUpgrades()[0][i][1]
    } return 0
}

export const hasKillstreak = (killstreak) => {
    for (let i = 0; i < 3; i++) {
        if (equipedUpgrades()[1][i].includes(killstreak)) return true
    } return false
}
 */
export const getMegaColor = (mega) => {
    if (mega == "Overdrive") return '§cOverdrive'
    else if (mega == "Highlander") return '§6Highlander'
    else if (mega == "To the Moon") return '§bTo the Moon'
    else if (mega == "Uberstreak") return '§dUberstreak'
    else if (mega == "Grand Finale") return '§eFinale'
    else if (mega == "Nightmare") return '§1Nightmare'
    else if (mega == "Hermit") return '§9Hermit'
    else return '§7No Megastreak'
}

export const firstSync = () => {
    return firstTimeSync
}

const getPerk = (nbt) => {
    if (ChatLib.removeFormatting(nbt.split("Selected: ")[1])) {
        if (ChatLib.removeFormatting(nbt.split("Selected: ")[1].split('"]'))) {
            let perk = ChatLib.removeFormatting(nbt.split("Selected: ")[1].split('"]')[0]).split(" I")
            if (perk == "Nothing") return ["Nothing", 0]
            switch (perk[1]) {
                case "":
                    perk[1] = 1
                    return perk
                case "I":
                    perk[1] = 2
                    return perk
                case "II":
                    perk[1] = 3
                    return perk
            }
        }
    } else return false
}

const getKillStreaks = (nbt) => {
    let killstreaks = []
    if (ChatLib.removeFormatting(nbt.split("Killstreak #1:")[1])) {
        if (ChatLib.removeFormatting(nbt.split("Killstreak #1: ")[1].split('",2:'))) {
            let info = ChatLib.removeFormatting(nbt.split("Killstreak #1: ")[1].split('",2:"')[0])
            info !== 'Nothing' ? killstreaks.push(info) : ''
        }
    } if (ChatLib.removeFormatting(nbt.split("Killstreak #2:")[1])) {
        if (ChatLib.removeFormatting(nbt.split("Killstreak #2: ")[1].split('",3:'))) {
            let info = ChatLib.removeFormatting(nbt.split("Killstreak #2: ")[1].split('",3:"')[0])
            info !== 'Nothing' ? killstreaks.push(info) : ''
        }
    } if (ChatLib.removeFormatting(nbt.split("Killstreak #3:")[1])) {
        if (ChatLib.removeFormatting(nbt.split("Killstreak #3: ")[1].split('",2:'))) {
            let info = ChatLib.removeFormatting(nbt.split("Killstreak #3: ")[1].split('"],')[0])
            info !== 'Nothing' ? killstreaks.push(info) : ''
        }
    } return killstreaks === undefined ? [] : killstreaks
}

const getMegastreak = (nbt) => {
    if (ChatLib.removeFormatting(nbt.split("Megastreak: ")[1])) {
        if (ChatLib.removeFormatting(nbt.split("Megastreak: ")[1]).split('",1:"')) {
            return ChatLib.removeFormatting(nbt.split("Megastreak: ")[1]).split('",1:"')[0]
        }
    } return false
}

/* const getBlessing = () => {
    let NBT = Player.getContainer().getStackInSlot(22).getNBT().toString()
    let blessing
    let level
    if (Player.getContainer().getStackInSlot(22).getNBT().toString() == null) return "None"
    if (ChatLib.removeFormatting(NBT.split("Selected Blessing: ")[1])) {
        if (ChatLib.removeFormatting(NBT.split("Selected Blessing: ")[1]).split('"}},')) {
            blessing = ChatLib.removeFormatting(NBT.split("Selected Blessing: ")[1]).split('"}},')[0]
        } if (ChatLib.removeFormatting(NBT.split("Level: ")[1])) {
            if (ChatLib.removeFormatting(NBT.split("Level: ")[1]).split('"],Name')) {
                level = ChatLib.removeFormatting(NBT.split("Level: ")[1]).split('"],Name')[0]
            }
        }
    } else blessing = "None", level = "None"
    return [blessing, level]
} */

let equPerks = []
let equKillstreaks = []
let equMegastreak

register("guiOpened", event => {
    if (!onSandbox() || !syncperks) return
    setTimeout(() => {
        if (ChatLib.removeFormatting(Player.getContainer().getName()).startsWith("Viewing " + Player.getName())) {
            let perk1 = getPerk(Player.getContainer().getStackInSlot(13).getNBT().toString())
            let perk2 = getPerk(Player.getContainer().getStackInSlot(14).getNBT().toString())
            let perk3 = getPerk(Player.getContainer().getStackInSlot(15).getNBT().toString())

            equPerks = []

            for (let i = 0; i < 3; i++) {
                let perk = getPerk(Player.getContainer().getStackInSlot(i + 13).getNBT().toString())
                if (perk !== 'Nothing') equPerks.push(perk)
            }

            equKillstreaks = getKillStreaks(Player.getContainer().getStackInSlot(23).getNBT().toString())

            equMegastreak = getMegastreak(Player.getContainer().getStackInSlot(23).getNBT().toString())

            let killstreaks = getKillStreaks(Player.getContainer().getStackInSlot(23).getNBT().toString())
            let mega = getMegastreak(Player.getContainer().getStackInSlot(23).getNBT().toString())
            /* let blessing = getBlessing() */
            lperks = [[perk1, perk2, perk3], killstreaks, [mega]]//, blessing
            FileLib.write("PitSandboxDev", "perks.json", JSON.stringify(lperks))
            Client.scheduleTask(0, () => {
                Client.getCurrentGui().close()
            })
            ChatLib.chat("&aPerks synced.")
            syncperks = undefined
            firstTimeSync = true
        }
    }, 200)
})

register("guiOpened", event => {
    if (!onSandbox()) return
    setTimeout(() => {
        if (ChatLib.removeFormatting(Player.getContainer().getName()).startsWith("Upgrades")) {
            if (!autoSyncperks) autoSyncperks = true
        }
    }, 100)
})

register("tick", () => {
    if (!onSandbox()) return
    if (inSpawn(Player.asPlayerMP()) && !spawn) {
        spawn = true
    } else if (!inSpawn(Player.asPlayerMP()) && spawn) {
        spawn = undefined
        if ((!autoSyncCooldown || Date.now() - autoSyncCooldown > 3000) && autoSyncperks) {
            autoSyncCooldown = Date.now()
            ChatLib.command("view " + Player.getName())
            syncperks = true
            autoSyncperks = false
        }
    }
})

register("worldUnload", () => {
    autoSyncperks = true
})

register("command", () => {
    if (!onSandbox()) return
    ChatLib.command("view " + Player.getName())
    syncperks = true
}).setName("syncperks")

register("command", () => {
    ChatLib.command("syncperks", true)
    setTimeout(() => {
        ChatLib.chat(`\n§c§lMegastreak:§b ${equMegastreak} \n\n§cPerks:§b ${equPerks.join(', ')} \n\n§cKillstreaks:§b ${equKillstreaks.join(', ')}\n`)
    }, 400)
}).setName("perks")