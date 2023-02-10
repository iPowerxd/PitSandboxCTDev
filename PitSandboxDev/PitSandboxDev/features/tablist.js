import { onSandbox } from "../functions/onSandbox"
import { onlinePlayers } from "../functions/onlinePlayers"

const S47 = Java.type("net.minecraft.network.play.server.S47PacketPlayerListHeaderFooter")

register("packetReceived", (packet, event) => {
    if (!onSandbox()) return
    if (packet instanceof S47) {
        cancel(event);
        TabList.setFooter(packet.func_179701_b().func_150260_c().split("\n").map(line => ChatLib.removeFormatting(line).includes("Online Players") ? "§eOnline Players: §6§l§o" + onlinePlayers.length : line).join("\n"))
        TabList.setHeader(packet.func_179700_a().func_150260_c())
    }
})