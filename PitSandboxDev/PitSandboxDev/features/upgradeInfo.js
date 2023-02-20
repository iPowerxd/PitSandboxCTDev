/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from '../config'

import { onSandbox } from '../functions/onSandbox'
import { getRoman } from '../functions/roman'

import { equipedUpgrades } from './perks'
import { getMegaColor } from './perks'
import { firstSync } from "./perks"

import { megastreak } from './perks'
import { perks } from './perks'
import { killstreaks } from './perks'

import { generalInfoHud } from './gui'
import { upgradesInfoHud } from "./gui"

new Thread(() => {
    register("renderOverlay", () => {
        if (!onSandbox() || !firstSync()) return
        let info = [`${Settings.hudGroupColor}§nUpgrades`]
        info.push(getMegaColor(megastreak()))
        for (let i = 0; i < perks().length; i++) {
            if (perks()[i][0] !== 'Nothing') info.push(`§c${perks()[i][0]} §7${getRoman(perks()[i][1])}`)
        }
        for (let i = 0; i < killstreaks().length; i++) {
            info.push(`§6${killstreaks()[i]}`)
        }
        /* if (!firstSync() || equipedUpgrades()[2][0] == 'DO /SYNCPERKS') {
            info.push(`§7DO /SYNCPERKS`)
        } else if (equipedUpgrades()[2][0] != 'DO /SYNCPERKS') {
            info.push(getMegaColor(equipedUpgrades()[2][0]) + equipedUpgrades()[2][0])
            if (equipedUpgrades()[0][0][0] != "Nothing") info.push(`§c${equipedUpgrades()[0][0][0] == "Nothing" ? '' : equipedUpgrades()[0][0][0] + '§7 ' + equipedUpgrades()[0][0][1]}`)
            if (equipedUpgrades()[0][1][0] != "Nothing") info.push(`§c${equipedUpgrades()[0][1][0] == "Nothing" ? '' : equipedUpgrades()[0][1][0] + '§7 ' + equipedUpgrades()[0][1][1]}`)
            if (equipedUpgrades()[0][1][0] != "Nothing") info.push(`§c${equipedUpgrades()[0][2][0] == "Nothing" ? '' : equipedUpgrades()[0][2][0] + '§7 ' + equipedUpgrades()[0][2][1]}`)
            if (equipedUpgrades()[1][0] != "Nothing") info.push("§6" + (equipedUpgrades()[1][0] == "Nothing" ? '' : equipedUpgrades()[1][0]))
            if (equipedUpgrades()[1][1] != "Nothing") info.push("§6" + (equipedUpgrades()[1][1] == "Nothing" ? '' : equipedUpgrades()[1][1]))
            if (equipedUpgrades()[1][2] != "Nothing") info.push("§6" + (equipedUpgrades()[1][2] == "Nothing" ? '' : equipedUpgrades()[1][2]))
            //if (equipedUpgrades()[3][0] != "Nothing") info.push("§a" + equipedUpgrades()[3][0] + (equipedUpgrades()[3][1] == "None" ? "" : "&7 " + equipedUpgrades()[3][1]))
        } */
        let y = upgradesInfoHud.textY
        info.forEach(line => {
            const text = new Text(line, upgradesInfoHud.textX, y).setShadow(true).setScale(generalInfoHud.textScale)
            y += 11.5 * generalInfoHud.textScale
            if (info.length > 1 || Settings.generalInfoHud.isOpen()) text.draw()
        })
    })
}).start()