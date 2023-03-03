import Settings from '../config'
import { onSandbox } from "../functions/onSandbox"

register("chat", (event) => {
    if (!onSandbox()) return
    let umsg = ChatLib.removeFormatting(ChatLib.getChatMessage(event))
    if (umsg.startsWith("CLOAK!")) return cancel(event)
    if (Settings.hideStash && umsg.startsWith("STASH!")) return cancel(event)
})