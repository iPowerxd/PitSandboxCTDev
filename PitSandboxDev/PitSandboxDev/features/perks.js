/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { onSandbox } from "../functions/onSandbox"
import { inSpawn } from "../functions/inSpawn"

let syncperks
let autoSyncCooldown
let spawn
let firstTimeSync = false
let autoSyncperks = true
let perks = JSON.parse(FileLib.read("PitSandboxDev", "perks.json")).sort()

export const equipedUpgrades = () => {
    return perks
}

export const hasPerk = (perk) => {
    for (let i = 0; i < 3; i++) {
        if (equipedUpgrades()[0][i].includes(perk)) return equipedUpgrades()[0][i][1]
    } return 0
}

export const hasKillstreak = (killstreak) => {
    for (let i = 0; i < 3; i++) {
        if (equipedUpgrades()[1][i].includes(killstreak)) return true
    } return false
}

export const getMegaColor = (mega) => {
    if (mega == "Overdrive") return '§c'
    else if (mega == "Highlander") return '§6'
    else if (mega == "To the Moon") return '§b'
    else if (mega == "Uberstreak") return '§d'
    else if (mega == "Grand Finale") return '§e'
    else if (mega == "Nightmare") return '§1'
    else if (mega == "Hermit") return '§9'
    else return '§7'
}

export const firstSync = () => {
    return firstTimeSync
}

const getMegastreak = () => {
    let NBT = Player.getContainer().getStackInSlot(23).getNBT().toString()
    if (ChatLib.removeFormatting(NBT.split("Megastreak: ")[1])) {
        if (ChatLib.removeFormatting(NBT.split("Megastreak: ")[1]).split('",1:"')) {
            return ChatLib.removeFormatting(NBT.split("Megastreak: ")[1]).split('",1:"')[0]
        }
    }
}

const getPerk = (NBT) => {
    if (ChatLib.removeFormatting(NBT.split("Selected: ")[1])) {
        if (ChatLib.removeFormatting(NBT.split("Selected: ")[1].split('"]'))) {
            let perk = ChatLib.removeFormatting(NBT.split("Selected: ")[1].split('"]')[0]).split(" I")
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

const getKillStreaks = () => {
    let NBT = Player.getContainer().getStackInSlot(23).getNBT().toString()
    let killstreak1
    let killstreak2
    let killstreak3
    if (ChatLib.removeFormatting(NBT.split("Killstreak #1:")[1])) {
        if (ChatLib.removeFormatting(NBT.split("Killstreak #1: ")[1].split('",2:'))) {
            killstreak1 = ChatLib.removeFormatting(NBT.split("Killstreak #1: ")[1].split('",2:"')[0])
        }
    } if (ChatLib.removeFormatting(NBT.split("Killstreak #2:")[1])) {
        if (ChatLib.removeFormatting(NBT.split("Killstreak #2: ")[1].split('",3:'))) {
            killstreak2 = ChatLib.removeFormatting(NBT.split("Killstreak #2: ")[1].split('",3:"')[0])
        }
    } if (ChatLib.removeFormatting(NBT.split("Killstreak #3:")[1])) {
        if (ChatLib.removeFormatting(NBT.split("Killstreak #3: ")[1].split('",2:'))) {
            killstreak3 = ChatLib.removeFormatting(NBT.split("Killstreak #3: ")[1].split('"],')[0])
            return ([killstreak1, killstreak2, killstreak3])
        }
    }
    return undefined
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

register("guiOpened", event => {
    if (!onSandbox() || !syncperks) return
    setTimeout(() => {
        if (ChatLib.removeFormatting(Player.getContainer().getName()).startsWith("Viewing " + Player.getName())) {
            let perk1 = getPerk(Player.getContainer().getStackInSlot(13).getNBT().toString())
            let perk2 = getPerk(Player.getContainer().getStackInSlot(14).getNBT().toString())
            let perk3 = getPerk(Player.getContainer().getStackInSlot(15).getNBT().toString())
            let killstreaks = getKillStreaks()
            let megastreak = getMegastreak()
            /* let blessing = getBlessing() */
            perks = [[perk1, perk2, perk3], killstreaks, [megastreak]]//, blessing
            FileLib.write("PitSandboxDev", "perks.json", JSON.stringify(perks))
            Client.scheduleTask(0, () => {
                Client.getCurrentGui().close()
            })
            ChatLib.chat("&aPerks synced.")
            syncperks = undefined
            firstTimeSync = true
        }
    }, 100)
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
        ChatLib.chat(`\n§c§lMegastreak:§b ${perks[2][0]} \n\n§cPerks:§b ${perks[0][0][0]} ${perks[0][0][1]}, ${perks[0][1][0]} ${perks[0][1][1]}, ${perks[0][2][0]} ${perks[0][2][1]} \n\n§cKillstreaks:§b ${perks[1][0]}, ${perks[1][1]}, ${perks[1][2]}\n`)
    }, 400)
}).setName("perks")