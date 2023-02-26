import Settings from '../config'
import { onSandbox } from "../functions/onSandbox"

export const isPre = () => {
    let nametag = ChatLib.removeFormatting(Player.getDisplayName().getText().split(" ")[0])
    if (nametag.includes("[")) return true
    else if (nametag.startsWith("UBER") && !nametag.endsWith("400")) return true
    else return false
}

register("messageSent", (message, event) => {
    if (onSandbox() && message == "/oof" && isPre() && Settings.togglePreOOF) return cancel(event), ChatLib.chat("&c&lOOF!&7 You are premega!"), Client.getChatGUI().func_146239_a("/oof")
})