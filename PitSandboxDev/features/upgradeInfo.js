/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from '../config'

import { onSandbox } from '../functions/onSandbox'
import { getRoman } from '../functions/roman'

import { getMegaColor } from './perks'
import { firstSync } from "./perks"

import { megastreak } from './perks'
import { perks } from './perks'
import { killstreaks } from './perks'

import { generalInfoHud } from './gui'
import { upgradesInfoHud } from "./gui"
let info = [`${Settings.hudGroupColor}§nUpgrades`]
register('step', () => {
    if (!onSandbox() || !firstSync() || !Settings.toggleSandboxHUD) return
    info = [`${Settings.hudGroupColor}§nUpgrades`]
    for (let i = 0; i < perks().length; i++) if (perks()[i][0] !== 'Nothing') info.push(`§c${perks()[i][0]} §7${getRoman(perks()[i][1])}`)
    for (let i = 0; i < killstreaks().length; i++) info.push(`§6${killstreaks()[i]}`)
    info.push(getMegaColor(megastreak()))
}).setFps(4)

register("renderOverlay", () => {
    if (!onSandbox() || !firstSync() || !Settings.toggleSandboxHUD) return
    let y = upgradesInfoHud.textY
    info.forEach(line => {
        const text = new Text(line, upgradesInfoHud.textX, y).setShadow(true).setScale(generalInfoHud.textScale)
        y += 11.5 * generalInfoHud.textScale
        if (info.length > 1 || Settings.generalInfoHud.isOpen()) text.draw()
    })
})