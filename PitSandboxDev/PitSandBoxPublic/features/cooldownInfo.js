/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from '../config'

import { onSandbox } from '../functions/onSandbox'
import { hasPerk } from './perks'
import { generalInfoHud } from "./gui"
import { cooldownInfoHud } from "./gui"

let firstaideggCooldown = 0
let pullCooldown = 0
let leapCooldown = 0
let moonStickCooldown = 0

register("soundPlay", (pos, name, vol, pitch, cat, event) => {
    if (!onSandbox()) return
    if (name.toLocaleLowerCase().includes("mob.cat.hiss") && pitch.toFixed(1) == "2.0") firstaideggCooldown = 9.8 * 10
    if (name.toLocaleLowerCase().includes("mob.wither.idle") && pitch.toFixed(1) == "2.0") leapCooldown = (10.4 - (10 * hasPerk("Power Surge") * 10 / 100)) * 10
    if (name.toLocaleLowerCase().includes("mob.bat.takeoff") && pitch.toFixed(1) == "1.0") pullCooldown = (5.9 - (6 * hasPerk("Power Surge") * 10 / 100)) * 10
})

register("chat", event => {
    if (!onSandbox()) return
    moonStickCooldown = 19.9 * 10
}).setChatCriteria("WHOHOO! Launched ${*} player(s) into the sky!")

register("step", () => {
    firstaideggCooldown > 0 ? firstaideggCooldown-- : firstaideggCooldown = 0
    pullCooldown > 0 ? pullCooldown-- : pullCooldown = 0
    leapCooldown > 0 ? leapCooldown-- : leapCooldown = 0
    moonStickCooldown > 0 ? moonStickCooldown-- : moonStickCooldown = 0
}).setFps(10)

register("renderOverlay", () => {
    let info = [`${Settings.hudGroupColor}§nCooldowns`]
    if (firstaideggCooldown > 0) info.push(`§c§lFirst Aid Egg: §e${Math.floor(firstaideggCooldown) / 10}s`)
    if (pullCooldown > 0) info.push(`§2§lPullbow: §e${Math.floor(pullCooldown) / 10}s`)
    if (leapCooldown > 0) info.push(`§e§lLeap: §e${Math.floor(leapCooldown) / 10}s`)
    if (moonStickCooldown > 0) info.push(`§9§lMoon Stick: §e${Math.floor(moonStickCooldown) / 10}s`)
    let y = cooldownInfoHud.textY
    info.forEach(line => {
        const text = new Text(line, cooldownInfoHud.textX, y).setShadow(true).setScale(generalInfoHud.textScale)
        y += 11.5 * generalInfoHud.textScale
        if ((info.length > 1 && Settings.cooldownInfo && onSandbox()) || Settings.generalInfoHud.isOpen()) text.draw()
    })
})