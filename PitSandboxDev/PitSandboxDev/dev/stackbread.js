import { onSandbox } from "../functions/onSandbox"

let autoStackBread = false

let toggleStackBread = new KeyBind("Toggle Auto Bread", "", "!PitSandbox")

register("tick", () => {
    if (toggleStackBread.isPressed()) {
        if (autoStackBread) {
            autoStackBread = false
            ChatLib.chat("&cDisabled auto Stack Bread!")
        } else {
            autoStackBread = true
            ChatLib.chat("&aEnabled auto Stack Bread")
        }
    }
})

register("step", () => {
    if (onSandbox() && autoStackBread && !Client.isInGui()) {
        let slots = [];
        for (let i = 0; i < 9; i++) {
            if (Player.getInventory().getStackInSlot(i) && Player.getInventory().getStackInSlot(i).getID() == 296) {
                if (Player.getInventory().getStackInSlot(i).getStackSize() == 64) {
                    slots.push(i);
                }
            }
        }
        if (slots.length > 0) {
            lastBreadslot = Player.getHeldItemIndex();
            rightclicking = true;
            slots.forEach((slot, i) => {
                setTimeout(() => {
                    if (Player.getHeldItemIndex() != slot) {
                        Player.setHeldItemIndex(slot);
                    }
                    if (i == slots.length - 1) {
                        setTimeout(() => {
                            rightclicking = false;
                            if (Player.getHeldItemIndex() != lastBreadslot) Player.setHeldItemIndex(lastBreadslot);
                        }, 100);
                    }
                }, i * 50);
            });
        }
    }
}).setFps(3)