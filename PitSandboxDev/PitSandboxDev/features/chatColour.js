/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from '../config'
import { onSandbox } from '../functions/onSandbox'
import { nomvp } from '../functions/nomvp'

let quickMaths = false
let unscramble = false

register("chat", event => { // Quick Maths
    if (!onSandbox()) return
    quickMaths = true
}).setChatCriteria("QUICK MATHS! First 5 players to answer gain ${*}")

register("chat", (player, event) => {
    if (!onSandbox() || !quickMaths) return
    if (player === Player.getName()) quickMaths = false
}).setChatCriteria("QUICK MATHS! #${*} ${player} answered in ${*}s")

register("chat", event => {
    if (!onSandbox()) return
    quickMaths = false
}).setChatCriteria("QUICK MATHS OVER! ${*}")

register("chat", event => {
    if (!onSandbox()) return
    quickMaths = false
}).setChatCriteria("QUICK MATHS ENDED! Took too long to answer!")

register("chat", event => { // Unscramble
    if (!onSandbox()) return
    unscramble = true
}).setChatCriteria("UNSCRAMBLE! First 5 players to answer gain ${*}")

register("chat", (player, event) => {
    if (!onSandbox() || !unscramble) return
    if (player === Player.getName()) unscramble = false
}).setChatCriteria("UNSCRAMBLE! #${*} ${player} answered in ${*}")

register("chat", event => {
    if (!onSandbox()) return
    unscramble = false
}).setChatCriteria("UNSCRAMBLE OVER! ${*}")

register("chat", event => {
    if (!onSandbox()) return
    unscramble = false
}).setChatCriteria("UNSCRAMBLE ENDED! Took too long to answer!")

register('worldUnload', () => {
    quickMaths = false
    unscramble = false
})

register("messageSent", (message, event) => {
    if (!onSandbox()) return
    if (nomvp()) return
    if (message.startsWith("!") || message.startsWith("@") || message.startsWith("#")) return
    if (quickMaths || unscramble) return
    if (!message.startsWith("/")) {
        if (Settings.chatColor != "" && /^&.$/g.test(Settings.chatColor)) {
            if (message.startsWith("\\")) return cancel(event), ChatLib.say(message.substring(1)), Client.getChatGUI().func_146239_a(message)
            cancel(event)
            ChatLib.say(Settings.chatColor + message)
            Client.getChatGUI().func_146239_a(message)
        }
    }
})