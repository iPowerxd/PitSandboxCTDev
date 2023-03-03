import Settings from '../config'
import { onSandbox } from "../functions/onSandbox"
import { inSpawn } from '../functions/inSpawn'
import { inMid } from '../functions/inMid'

import { worldotherplayers } from '../functions/world'

register("renderEntity", (entity, pos, ticks, event) => {
    if (!onSandbox()) return
    if (Settings.stopRenderSpawn && inSpawn(entity) && !inSpawn(Player.asPlayerMP())) return cancel(event)
    if (Settings.hideBotNametags && entity.getName().includes("'s Apprentice") && inMid(entity)) return cancel(event)
})

register("step", () => {
    if (Settings.hideBotNametags) {
        worldotherplayers().forEach(e => {
            if (inMid(e) && (e.getName().startsWith("§7") || e.getName().startsWith("CIT-")) && World.getAllPlayers().find(p => p.getUUID() == e.getUUID())) World.getAllPlayers().find(p => p.getUUID() == e.getUUID()).setNametagName(new TextComponent(""));
        })
    }
}).setFps(2)