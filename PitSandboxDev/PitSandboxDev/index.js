import './features/main'
import './features/keybinds'

import './features/generalInfo'
import './features/playerInfo'
import './features/perks'
import './features/gui'
import './features/upgradeInfo'
import './features/boosterInfo'
import './features/targetInfo'
import './features/cooldownInfo'
import './features/soundplay'
import './features/render'
import './features/chatColour'
import './features/guildchat'
import './features/autooof'
import './features/pingxp'
import './features/welcome'
import './features/changelog'
import './features/tablist'
import './features/death'
import './features/antioof'
import './features/cloak'
import './features/coinflip'
import './features/fishalert'
import './features/bounty'
import './features/botnametags'
import './features/removePartInMid'
import './features/hidelowpay'

import './commands/pinglb'
import './commands/setbal'
import './commands/usefulbox'

import './functions/onSandbox'
import './functions/world'
import './functions/inSpawn'
import './functions/inMid'
import './functions/enchant'
import './functions/playerInformation'
import './functions/strength'
import './functions/streak'
import './functions/nomvp'
import './functions/msToTime'
import './functions/onlinePlayers'
import './functions/roman'
import './functions/formatNumber'
import './functions/sidebar'
import './functions/inMenu'
import './functions/pingcolour'
import './functions/runecolour'

import './dev/randomshit'
import './dev/command'
import './dev/airblock'
import './dev/autols'
import './dev/hunt'
import './dev/stackbread'
import './dev/autosupperegg'
import './dev/autoquickmaths'
import './dev/autounscramble'

import { prestigeinfo } from './features/generalInfo'
import { prestigexp } from './features/generalInfo'
import { formatNumber } from './functions/formatNumber'
import { inMid } from './functions/inMid'
import { inSpawn } from './functions/inSpawn'
import { msToTime } from './functions/msToTime'
import { romanToInt } from './functions/roman'
import { getRoman } from './functions/roman'

///////////////////////////////////////////////////////////

register("messageSent", (message, event) => {
    if (message.startsWith("@")) {
        return (
            cancel(event),
            ChatLib.chat(!message.includes("getColourOfName") ? "\n" + eval(message.substring(1)) + "\n" : "\n" + eval(message.substring(1)) + "Colour \n"),
            Client.getChatGUI().func_146239_a(message)
        )
    }
})