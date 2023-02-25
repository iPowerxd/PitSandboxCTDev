import { onSandbox } from "../functions/onSandbox";

const NBTTagString = Java.type("net.minecraft.nbt.NBTTagString")

register("itemTooltip", (lore, item, event) => {
    if (!onSandbox()) return;
    if (lore.find(l => ChatLib.removeFormatting(l).startsWith("Player: ")) && !lore.find(l => ChatLib.removeFormatting(l).startsWith("Player: OFFLINE (DO NOT CLICK)"))) {
        let player = ChatLib.removeFormatting(lore.find(l => ChatLib.removeFormatting(l).startsWith("Player: ")).split(" ")[1]);
        if (player && !onlinePlayers().includes(player)) {
            let list = new NBTTagList(item.getNBT().getCompoundTag("tag").getCompoundTag("display").getTagMap().get("Lore"));
            let text = ChatLib.addColor("&2Player: &c&l&nOFFLINE&8 (DO NOT CLICK)");
            list.set(0, new NBTTagString(text));
        }
    }
})