let airblockcd = 0

let airBlock = new KeyBind("Create Ghost Air", "", "!PitSandbox")
const BlockPos1 = Java.type("net.minecraft.util.BlockPos")

register("tick", () => {
    if (airBlock.isKeyDown()) {
        if (Date.now() - airblockcd > 50) {
            try {
                World.getWorld().func_175698_g(new BlockPos1(Player.lookingAt().x, Player.lookingAt().y, Player.lookingAt().z));
            } catch (err) {

            }
            airblockcd = Date.now()
        }
    } else {
        airblockcd = 0
    }
})