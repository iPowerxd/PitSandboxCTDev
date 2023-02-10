import { onSandbox } from "../functions/onSandbox"

let toggleBots = new KeyBind("Toggle Bots", "", "!PitSandbox")

register('tick', () => {
    if (!onSandbox()) return
    if (toggleBots.isPressed()) {
        ChatLib.command("togglebots")
    }
})