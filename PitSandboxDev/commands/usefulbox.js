import { onSandbox } from "../functions/onSandbox"

register("command", () => {
    if (!onSandbox()) return
    ChatLib.command("usefulbox")
}).setName("box")