import Settings from '../config'
import { onSandbox } from "../functions/onSandbox"
import { isAFK } from '../functions/playerInformation'

let alert = 0

register("step", () => {
    if (alert > 0) {
        World.playSound("note.pling", 1, 1);
        World.playSound("note.pling", 1, 2);
        alert--
    }
})

register("chat", (math, event) => {
    if (!onSandbox() || !Settings.autoquickmaths) return
    if (math.includes("func") || math.includes(".") || math.includes("_")) alert = 170;
    if (math.includes("+") || math.includes("-") || math.includes("x")) {
        if (alert === 0) {
            let problem = math
            math = math.replace(/x/g, "*")
            let result = eval(math)
            cancel(event)
            ChatLib.chat("&d&lQUICK MATHS!&e " + problem + " &7= &c&l" + result)
            ChatLib.chat("&aAnswer copied to clipboard.")
            net.minecraft.client.gui.GuiScreen.func_146275_d(result)
            if (Settings.aqmGuild) ChatLib.command(`gc Answer is: ${result}`)
            if (isAFK(Player.getName()) && Settings.aqmAFK) {
                setTimeout(() => {
                    ChatLib.say(result)
                }, Math.floor(Math.random() * 5555) + 5555)
            }
        }
    } else alert = 170
    if (alert === 170) {
        ChatLib.chat("\n&4&kaaaaaaaaaaaaaaaaaaaa\n\n&4&lQuick Maths Warning!\n\n&c" + math + "\n\n&4&kaaaaaaaaaaaaaaaaaaaa\n");
        Client.showTitle("&4&lQUICK MATHS WARNING!", "&c" + math, 5, 50, 5);
    }
}).setChatCriteria("QUICK MATHS! Solve: ${math}")