import { onSandbox } from "../functions/onSandbox"

let rightclicking = false

let autoSuperegg = false
let lasteggslot = 0
let useEggs = new KeyBind("Use All Eggs", "", "!PitSandbox")
let toggleSuperegg = new KeyBind("Toggle Auto SuperEgg", "", "!PitSandbox")
let KeyBinding = Java.type("net.minecraft.client.settings.KeyBinding")

register("step", () => {
    if (rightclicking) {
        KeyBinding.func_74510_a(Client.settings.getSettings().field_74313_G.func_151463_i(), true);
        KeyBinding.func_74510_a(Client.settings.getSettings().field_74313_G.func_151463_i(), false);
        KeyBinding.func_74507_a(Client.settings.getSettings().field_74313_G.func_151463_i());
    }
}).setFps(30)

register("tick", () => {
    if (!onSandbox()) return
    if (toggleSuperegg.isPressed()) {
        if (autoSuperegg) {
            autoSuperegg = false
            ChatLib.chat("&cDisabled auto SuperEgg!")
        } else {
            autoSuperegg = true
            ChatLib.chat("&aEnabled auto SuperEgg!")
        }
    }
})

register("tick", () => {
    if (onSandbox() && useEggs.isPressed()) {
        let slots = [];
        for (let i = 0; i < 9; i++) {
            if (Player.getInventory().getStackInSlot(i) && Player.getInventory().getStackInSlot(i).getID() == 383) {
                if (Player.getInventory().getStackInSlot(i).getNBT() && Player.getInventory().getStackInSlot(i).getNBT().getCompoundTag("tag")) {
                    if (Player.getInventory().getStackInSlot(i).getNBT().getCompoundTag("tag").get("superegg") && Player.getInventory().getStackInSlot(i).getDamage() != 0) {
                        slots.push(i);
                    }
                }
            }
        }
        if (slots.length > 0) {
            lasteggslot = Player.getHeldItemIndex();
            rightclicking = true;
            slots.forEach((slot, i) => {
                setTimeout(() => {
                    if (Player.getHeldItemIndex() != slot) {
                        Player.setHeldItemIndex(slot);
                    }
                    if (i == slots.length - 1) {
                        setTimeout(() => {
                            rightclicking = false;
                            if (Player.getHeldItemIndex() != lasteggslot) Player.setHeldItemIndex(lasteggslot);
                        }, 100);
                    }
                }, i * 50);
            });
        }
    }
})

register("step", () => {
    if (onSandbox() && autoSuperegg) {
        let slots = [];
        for (let i = 0; i < 9; i++) {
            if (Player.getInventory().getStackInSlot(i) && Player.getInventory().getStackInSlot(i).getID() == 383) {
                if (Player.getInventory().getStackInSlot(i).getNBT() && Player.getInventory().getStackInSlot(i).getNBT().getCompoundTag("tag")) {
                    if (Player.getInventory().getStackInSlot(i).getNBT().getCompoundTag("tag").get("superegg") && Player.getInventory().getStackInSlot(i).getDamage() != 0) {
                        slots.push(i);
                    }
                }
            }
        }
        if (slots.length > 0) {
            lasteggslot = Player.getHeldItemIndex();
            rightclicking = true;
            slots.forEach((slot, i) => {
                setTimeout(() => {
                    if (Player.getHeldItemIndex() != slot) {
                        Player.setHeldItemIndex(slot);
                    }
                    if (i == slots.length - 1) {
                        setTimeout(() => {
                            rightclicking = false;
                            if (Player.getHeldItemIndex() != lasteggslot) Player.setHeldItemIndex(lasteggslot);
                        }, 100);
                    }
                }, i * 50);
            });
        }
    }
}).setFps(3)