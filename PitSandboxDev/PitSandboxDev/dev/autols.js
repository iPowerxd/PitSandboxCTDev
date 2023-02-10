import Settings from '../config'
import { onSandbox } from "../functions/onSandbox"
import { inMid } from "../functions/inMid"
import { hasEnchant } from '../functions/enchant'

let lastslot = undefined

register("tick", () => {
    if (!onSandbox()) return
    if (Settings.toggleAutoLS && inMid(Player.asPlayerMP())) {
        let lsslot = undefined;
        for (let i = 0; i < 9; i++) {
            let slot = undefined;
            if (Player.getInventory()) slot = Player.getInventory().getStackInSlot(i);
            if (slot && slot.getID() != 1 && slot.getNBT() && hasEnchant("billionaire", slot.getNBT()) && hasEnchant("lifesteal", slot.getNBT())) {
                lsslot = i;
                break;
            }
        }
        if (lsslot != undefined) {
            nols = false;
            if (Player.getHP() < Settings.autoLSHealth * 2 && Player.getHeldItemIndex() != lsslot) {
                lastslot = Player.getHeldItemIndex();
                Player.setHeldItemIndex(lsslot);
            } else if (Player.getHP() >= Settings.autoLSHealth * 2 && lastslot != undefined) {
                Player.setHeldItemIndex(lastslot);
                lastslot = undefined;
            }
        } else nols = true;
    } else nols = false;
})