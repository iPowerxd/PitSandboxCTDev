import Settings from '../config'
import { onSandbox } from "../functions/onSandbox"
import { inMid } from '../functions/inMid'

let lastrenderdistance = Client.settings.getSettings().field_151451_c

register("spawnParticle", (particle, type, event) => {
    if (!onSandbox()) return
    if (Settings.removeParticlesInMid && inMid(Player.asPlayerMP())) cancel(event)
    if (Settings.lowerRenderDistanceInMid) {
        if (inMid(Player.asPlayerMP()) && Client.settings.getSettings().field_151451_c != 2) {
            lastrenderdistance = Client.settings.getSettings().field_151451_c
            Client.settings.getSettings().field_151451_c = 2
        } else if (!inMid(Player.asPlayerMP())) {
            if (lastrenderdistance != undefined && Client.settings.getSettings().field_151451_c == 2) {
                Client.settings.getSettings().field_151451_c = lastrenderdistance
            } else {
                lastrenderdistance = Client.settings.getSettings().field_151451_c
            }
        }
    }
})