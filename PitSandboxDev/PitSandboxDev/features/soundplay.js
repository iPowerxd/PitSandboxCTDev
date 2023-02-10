/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from '../config'

import { onSandbox } from '../functions/onSandbox'
import { inMid } from '../functions/inMid'

register("soundPlay", (pos, name, vol, pitch, cat, event) => {
    if (!onSandbox()) return
    if (Settings.fishAlert) {
        if (name.toLowerCase().includes("random.splash")) {
            if (Player.getPlayer().field_71104_cf instanceof Java.type("net.minecraft.entity.projectile.EntityFishHook")) {

                let hook = Player.getPlayer().field_71104_cf;
                let distance = Math.sqrt(Math.pow(hook.field_70165_t - pos.x, 2) + Math.pow(hook.field_70163_u - pos.y, 2) + Math.pow(hook.field_70161_v - pos.z, 2));
                if (distance < 0.6) {
                    lastsplashsound = Date.now();

                }
            }
        }
    } if (inMid(Player.asPlayerMP())) {
        if (name.toLowerCase().includes("game.player.hurt") && inMid(Player.asPlayerMP()) && Settings.removeMidHit) cancel(event)
        if (name.toLowerCase().includes("random.orb") && pitch.toFixed(2) == "0.71" && inMid(Player.asPlayerMP()) && Settings.removeMidBill) cancel(event)
        if (name.toLowerCase().includes("mob.guardian.curse") && pitch.toFixed(2) == "1.05" && !Settings.toggleMegastreakSounds) cancel(event)
        if ((name.toLowerCase().includes("random.bow") || name.toLowerCase().includes("random.bowhit") || name.toLowerCase().includes("random.successful_hit")) && Settings.removeMidBow) cancel(event)
        if (Settings.removeExeSounds && name.toLowerCase().includes("mob.villager.death")) return cancel(event)
        if (Settings.removeGambleSounds && name.toLowerCase().includes("note.pling")) return cancel(event)
        if (Settings.removePerunSounds && name.toLowerCase().includes("random.explode")) return cancel(event)
        if (Settings.removeStunSounds && name.toLowerCase().includes("random.anvil_land")) return cancel(event)
    }
    if (name.toLowerCase().includes("mob.wither.spawn") && pitch.toFixed(1) == "1.8" && !Settings.toggleBountyBumps) cancel(event)
    if (name.toLowerCase().includes("mob.wither.spawn") && pitch.toFixed(1) == "1.6" && !Settings.toggleMegastreakSounds) cancel(event)
})