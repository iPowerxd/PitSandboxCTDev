import Settings from '../config'
import { onSandbox } from '../functions/onSandbox'

register("chat", (player, amount, event) => {
    if (!onSandbox() || !Settings.hideLowPay) return
    amount = amount.replace(/[,]/g, "")
    amount = parseFloat(amount)
    if (amount == undefined || amount == NaN) return
    if (amount < Settings.minPay) cancel(event), ChatLib.actionBar("&8&oReceived $" + amount + " from " + player)
}).setChatCriteria("${player} paid you $${amount}!")