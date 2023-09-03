/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from '../config'

import { onSandbox } from '../functions/onSandbox'
import { msToTime } from '../functions/msToTime'
import { generalInfoHud } from "./gui"
import { boosterInfoHud } from "./gui"

let coinBooster = 0
let xpBooster = 0
let botsBooster = 0
let overflowBooster = 0
let fishingBooster = 0
let miningBooster = 0

register("chat", (booster, event) => {
    if (booster === "coin") coinBooster = 1800
    else if (booster === "XP") xpBooster = 1800
    else if (booster === "bots") botsBooster = 1800
    else if (booster === "Overflow") overflowBooster = 1800
    else if (booster === "fishing xp") fishingBooster = 1800
    else if (booster === "Mining xp") miningBooster = 1800
}).setChatCriteria("WOAH! ${*} just activated a ${booster} booster! GG!")

register("step", () => {
    coinBooster > 0 ? coinBooster-- : coinBooster = 0
    xpBooster > 0 ? xpBooster-- : xpBooster = 0
    botsBooster > 0 ? botsBooster-- : botsBooster = 0
    overflowBooster > 0 ? overflowBooster-- : overflowBooster = 0
    fishingBooster > 0 ? fishingBooster-- : fishingBooster = 0
    miningBooster > 0 ? miningBooster-- : miningBooster = 0
}).setFps(1)

let info = [`${Settings.hudGroupColor}§nBoosters`]

register('step', () => {
    if (!onSandbox() || !Settings.toggleSandboxHUD) return
    info = [`${Settings.hudGroupColor}§nBoosters`]
    if (coinBooster !== 0) {
        info.push(`§6Coin Booster§7: ${msToTime(coinBooster * 1000)}`)
    } if (xpBooster !== 0) {
        info.push(`§bXP Booster§7: ${msToTime(xpBooster * 1000)}`)
    } if (botsBooster !== 0) {
        info.push("§3Bots Booster§7: " + msToTime(botsBooster * 1000))
    } if (overflowBooster !== 0) {
        info.push("§cOverflow Booster§7: " + msToTime(overflowBooster * 1000))
    } if (fishingBooster !== 0) {
        info.push("§dFishing Booster§7: " + msToTime(fishingBooster * 1000))
    } if (miningBooster !== 0) {
        info.push("§8Mining Booster§7: " + msToTime(miningBooster * 1000))
    }
}).setFps(4)

register("renderOverlay", () => {
    if (!onSandbox() || !Settings.toggleSandboxHUD) return
    let y = boosterInfoHud.textY
    info.forEach(line => {
        const text = new Text(line, boosterInfoHud.textX, y).setShadow(true).setScale(generalInfoHud.textScale)
        y += 12
        if ((info.length > 1 && Settings.boostersInfo) || Settings.generalInfoHud.isOpen()) text.draw()
    })
})