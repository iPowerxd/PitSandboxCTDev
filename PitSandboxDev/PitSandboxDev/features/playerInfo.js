/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from '../config'

import { onSandbox } from '../functions/onSandbox'
import { inSpawn } from '../functions/inSpawn'
import { getSidebar } from '../functions/sidebar'
import { hasEnchant } from "../functions/enchant"

import { equipedUpgrades } from './perks'
import { hasPerk } from './perks'
import { hasKillstreak } from './perks'

import { getMega } from '../functions/playerInformation'
import { strengthLevel } from '../functions/strength'
import { strengthTime } from '../functions/strength'
import { activeStreak } from '../functions/streak'

import { generalInfoHud } from './gui'
import { playerInfoHud } from "./gui"

let currentCoins

let shark = 0
let notglad
let solisBroken
let soliLevel

let worldotherplayers = World.getAllEntitiesOfType(Java.type("net.minecraft.client.entity.EntityOtherPlayerMP")).map(e => new EntityLivingBase(e.entity))

const BossStatus = Java.type("net.minecraft.entity.boss.BossStatus")

function getBossName() {
    return BossStatus.field_82827_c
}

const inEvent = () => {
    if (ChatLib.removeFormatting(getBossName()).toString().includes(`Starting in`)) return false
    if (ChatLib.removeFormatting(getBossName()).toString().includes(`BLOOD BATH!`)) return "bloodbath"
    else if (ChatLib.removeFormatting(getBossName()).toString().includes(`GAMBLE!`)) return "gamble"
    else if (ChatLib.removeFormatting(getBossName()).toString().includes(`2X REWARDS!`)) return "rewards"
    else if (ChatLib.removeFormatting(getBossName()).toString().startsWith(`W: `)) return "teamdestroy"
    else return false
}

const runes = {
    unholy: {
        uncommon: 0.01,
        rare: 0.02,
        epic: 0.05,
        legendary: 0.1
    },
    haymaker: {
        uncommon: 1,
        rare: 1.5,
        epic: 2,
        legendary: 2.5
    },
    archer: {
        uncommon: 1,
        rare: 3,
        epic: 5,
        legendary: 10
    },
    warrior: {
        uncommon: 1,
        rare: 3,
        epic: 5,
        legendary: 10
    },
    crossbow: {
        legendary: 2.5
    },
    piercing: {
        uncommon: 1,
        rare: 2.5,
        epic: 5,
        legendary: 10
    },
    justice: {
        uncommon: 1,
        rare: 2,
        epic: 3,
        legendary: 5
    }

}

register("tick", () => {
    if (!onSandbox()) return
    setTimeout(() => {
        let scoreboard = getSidebar().map(l => ChatLib.removeFormatting(l))
        if (scoreboard.find(l => l.startsWith("Coins: "))) {
            currentCoins = scoreboard.find(l => l.startsWith("Coins: ")).split("Coins: ")[1].replace(/,/g, "")
        }
    }, 0)
})

register("step", () => {
    if (!onSandbox()) return;
    if (!Settings.toggleSandboxHUD) return;
    if (Player.getHeldItem() && hasEnchant("shark", Player.getHeldItem().getNBT()) && hasEnchant("shark", Player.getHeldItem().getNBT()) != NaN) {
        let sharkmult = 0;
        let sharkpeople = 0;
        switch (hasEnchant("shark", Player.getHeldItem().getNBT())) {
            case 1:
                sharkmult = 2;
                break;
            case 2:
                sharkmult = 4;
                break;
            case 3:
                sharkmult = 7;
                break;
            default:
                break;
        }
        worldotherplayers.forEach(e => {
            if (e.getUUID() != Player.getUUID() && e.distanceTo(Player.asPlayerMP()) < 7 && e.getHP() < 12) sharkpeople++;
        });
        shark = (sharkpeople * sharkmult > 56 ? 56 : sharkpeople * sharkmult);
    } else shark = 0;
}).setFps(1);

register("tick", () => {
    if (!onSandbox()) return
    if (Player.armor.getLeggings() && hasEnchant("notgladiator", Player.armor.getLeggings().getNBT()) && hasEnchant("notgladiator", Player.armor.getLeggings().getNBT()) != NaN) {
        let ngMult = 0
        let ngPeople = 0
        switch (hasEnchant("notgladiator", Player.armor.getLeggings().getNBT())) {
            case 1:
                ngMult = 2
                break
            case 2:
                ngMult = 4
                break
            case 3:
                ngMult = 6
                break
            default:
                break
        }
        World.getAllEntities().forEach((e) => {
            if (e.getEntity().class.toString().includes("Player") && e.getUUID() != Player.getUUID() && e.distanceTo(World.getPlayerByName(Player.getName())) < 7) ngPeople++
        })
        notglad = (ngPeople > 5 ? ngMult * 5 : ngMult * ngPeople)
    } else notglad = 0
})

register("step", () => {
    if (Player.armor.getLeggings() && hasEnchant("solitude", Player.armor.getLeggings().getNBT()) && hasEnchant("solitude", Player.armor.getLeggings().getNBT()) != NaN) {
        let soliPeople = 0
        World.getAllEntities().forEach((e) => {
            if (e.getEntity().class.toString().includes("Player") && e.getUUID() != Player.getUUID() && e.distanceTo(World.getPlayerByName(Player.getName())) < 7) soliPeople++
        })
        switch (hasEnchant("solitude", Player.armor.getLeggings().getNBT())) {
            case 1:
                soliLevel = 40
                if (soliPeople < 2) solisBroken = false
                else solisBroken = true
                break
            case 2:
                soliLevel = 50
                if (soliPeople < 3) solisBroken = false
                else solisBroken = true
                break
            case 3:
                soliLevel = 60
                if (soliPeople < 3) solisBroken = false
                else solisBroken = true
                break
            default:
                break
        }
    } else solisBroken = undefined
})

register("renderOverlay", () => {
    let info = [`${Settings.hudGroupColor}&nPlayer Info`]
    let scoreboard = getSidebar().map(l => ChatLib.removeFormatting(l))
    let megastreak
    let killaura
    if (onSandbox()) megastreak = scoreboard.find(l => l.startsWith("Status: ")).split("Status: ")[1]
    let ubermilestone = ChatLib.removeFormatting(Player.getDisplayName().getText().split(" ")[0])
    let teamdestroyteam = ChatLib.removeFormatting(Player.getDisplayName().getText().split(" ")[0])
    let strength = strengthLevel() * 8
    if (!inSpawn(Player.asPlayerMP()) && onSandbox()) {
        hasPerk("Killaura") ? killaura = 1 - hasPerk("Killaura") * 0.15 : killaura = 1
        if (getMega(Player.getName()) != "premega" && !inMid(Player.asPlayerMP()) && inMenu) {
            info.push(`&c&lMegastreak: ${getMegaFormatted(Player.getName())}`)
        } if (strengthLevel() != 0) {
            info.push("&c&lStrength&c: +" + strength + "%" + " &7(" + strengthTime() + "s)")
        } if (hasPerk("Bodybuilder") != 0 && strengthLevel() == 5) {
            info.push("&4&lBody Builder&4: &c+" + bodybuilderDamage + "%")
        } if (getMega(Player.getName()) == "overdrive" && activeStreak() >= 55) {
            info.push(`&c&lOverdrive True Damage: &e+${Math.round(0.2 * Math.floor((activeStreak() - 50) / 5) * 10) / 10}&c❤`)
        } if (getMega(Player.getName()) == "highlander" && activeStreak() >= 55) {
            info.push(`&6&lHighlander Damage: &b+${Math.floor(3 * Math.floor((activeStreak() - 50) / 5))}%`)
        } if (getMega(Player.getName()) == "moon" && activeStreak() >= 105) {
            info.push(`&b&lTo The Moon Damage: &b+${Math.floor(3 * Math.floor((activeStreak() - 100) / 5))}%`)
            if (activeStreak() >= 220) info.push(`&b&lTo The Moon True Damage: &e+${Math.round(0.1 * Math.floor((activeStreak() - 200) / 20) * 10) / 10}&c❤`)
        } if (getMega(Player.getName()) == "nightmare" && activeStreak() >= 55) {
            info.push(`&9&lNightmare Damage: &b+${Math.floor(5 * Math.floor((activeStreak() - 40) / 15))}%`)
        } if (getMega(Player.getName()) == "hermit") {
            info.push(`&9&lHermit Damage: &b+${Math.floor(10 * Math.floor((activeStreak() - 100) / 15))}%`)
        } if (activeStreak() >= 6 * killaura) {
            if (hasKillstreak('Tough Skin')) 3 * Math.floor(activeStreak() / Math.floor(6 * killaura)) >= 24 ? info.push(`&9&lTough Skin: &b-24%`) : info.push(`&9&lTough Skin: &b-${3 * Math.floor(activeStreak() / Math.floor(6 * killaura))}%`)
        } if (activeStreak() >= 25 * killaura) {
            if (hasKillstreak('Monster')) Math.floor(activeStreak() / Math.floor(25 * killaura)) >= 2 ? info.push(`&4&lMonster: &c+2&c❤`) : info.push(`&4&lMonster: &c+1&c❤`)
        } if (activeStreak() >= 10 * killaura) {
            if (hasKillstreak('Khanate')) 5 * Math.floor(activeStreak() / Math.floor(10 * killaura)) >= 25 ? info.push(`&6&lKhanate: &c+25% &6$`) : info.push(`&6&lKhanate: &c+${5 * Math.floor(activeStreak() / Math.floor(10 * killaura))}% &6$`)
        } if (hasPerk("Berserker Brew") != 0 && scoreboard.find(l => l.startsWith("Bers Brew: "))) {
            const bersLevel = scoreboard.find(l => l.startsWith("Bers Brew: ")).split("Bers Brew: ")[1]
            info.push("&f&lBers Brew&r: &c" + bersLevel)
        } if (equipedUpgrades()[2][0] == 'Uberstreak') {
            if (activeStreak() >= 100) info.push("&d&lUBER100 Bot Damage&d: &c-30%")
            if (activeStreak() >= 200) info.push("&d&lUBER200 Healing&d: &c-40%")
            if (activeStreak() >= 300) info.push("&d&lUBER300 Dirty Duration & Spongesteve&d: &c-50%")
            if (activeStreak() >= 400) info.push("&d&lUBER400: No Longer Gain Health")
        } if (megastreak == "Hermit") {
            info.push("&9&lHERMIT Block Duration&9: &a+100%")
            if (Player.armor.getLeggings() && hasEnchant("mirror", Player.armor.getLeggings().getNBT()) && hasEnchant("mirror", Player.armor.getLeggings().getNBT()) != NaN) info.push("&9&lHERMIT: &cMirrors Disabled")
        } if (Player.armor.getLeggings() && hasEnchant("solitude", Player.armor.getLeggings().getNBT()) && hasEnchant("solitude", Player.armor.getLeggings().getNBT()) != NaN) {
            if (solisBroken) {
                info.push("&a&lSolitude: &cBroken")
            } else {
                info.push(`&a&lSolitude: &b-${soliLevel}%`)
            }
        } if (notglad != 0) {
            info.push('&b&l"Not" Glad&b: -' + notglad + "%")
        } if (Player.armor.getLeggings() && hasEnchant("frac", Player.armor.getLeggings().getNBT()) && hasEnchant("frac", Player.armor.getLeggings().getNBT()) != NaN && currentCoins != undefined) {
            switch (hasEnchant("frac", Player.armor.getLeggings().getNBT())) {
                case 1:
                    frac = 1.5 * currentCoins.length
                    break
                case 2:
                    frac = 2 * currentCoins.length
                    break
                case 3:
                    frac = 3 * currentCoins.length
                    break
                default:
                    break
            }
            info.push(`&9&lFractional Reserve: &b-${frac}%`)
        } if (shark) {
            info.push("&c&lShark: &c+" + shark + "%")
        } if (inEvent() == "bloodbath") {
            info.push("&4&lBlood Bath: &c+30% Damage")
            info.push("&4&lBlood Bath: &d+20% Healing")

        } if (inEvent() == "rewards") {
            info.push("&2&l2x Rewards: &6Gold &7& &bXP &a+100%")
        } if (inEvent() == "teamdestroy") {
            if (teamdestroyteam == "WATER") {
                info.push("&e&lTEAM DESTROY: &c+30% Damage &bTo &cFire")
                info.push("&e&lTEAM DESTROY: &b+30% Damage &bFrom &aNature")
            } if (teamdestroyteam == "FIRE") {
                info.push("&e&lTEAM DESTROY: &c+30% Damage &cTo &aNature")
                info.push("&e&lTEAM DESTROY: &b+30% Damage &cFrom &bWater")
            } if (teamdestroyteam == "NATURE") {
                info.push("&e&lTEAM DESTROY: &c+30% Damage &aTo &bWater")
                info.push("&e&lTEAM DESTROY: &b+30% Damage &aFrom &cFire")
            } if (teamdestroyteam == "ELEMENTAL") {
                info.push("&e&lTEAM DESTROY: &c10% Damage &bTo &eEveryone")
            }
        }
        /* if (megastreak == "Nightmare") {
            info.push("&1&lNGHTMRE Bot Damage&1: &c+10%") */
        //if (info.length > 0 || Settings.generalInfoHud.isOpen()) info.splice(0, 0, `${Settings.hudGroupColor}&nPlayer Info`)
        //else if (Settings.generalInfoHud.isOpen()) new Text(`${Settings.hudGroupColor}&nPlayer Info`, playerInfoHud.textX, playerInfoHud.textY).setScale(playerInfoHud.textScale).setShadow(true).draw()
    }
    let y = playerInfoHud.textY
    info.forEach(line => {
        const text = new Text(line, playerInfoHud.textX, y)
        text.setScale(generalInfoHud.textScale)
        text.setShadow(true)
        y += 11.5 * generalInfoHud.textScale
        if ((info.length > 1 && Settings.playerInfo && onSandbox()) || Settings.generalInfoHud.isOpen()) text.draw()
    })
})