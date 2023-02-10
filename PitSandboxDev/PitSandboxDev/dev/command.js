register("command", () => {
    ChatLib.chat(ChatLib.removeFormatting(Player.getHeldItem().getNBT()))
}).setName("nbtlol")

register("command", () => {
    ChatLib.chat(`${helmet("MysticWell")} ${chestplate("MysticWell")} ${boots("MysticWell")}`)
}).setName("none")