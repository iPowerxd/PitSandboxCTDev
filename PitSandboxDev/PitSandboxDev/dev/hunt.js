import Settings from '../config'

import { onSandbox } from "../functions/onSandbox"
import { inSpawn } from '../functions/inSpawn'
import { inMid } from '../functions/inMid'
import { hasEnchant } from '../functions/enchant'
import { onlinePlayers } from '../functions/onlinePlayers'
import { onlinePlayersFormatted } from '../functions/onlinePlayers'

import { location } from '../functions/inSpawn'
import { worldotherplayers } from '../functions/world'

import { generalInfoHud } from "../features/gui"
import { huntInfoHud } from "../features/gui"

let huntingKey = new KeyBind("Toggle Hunting", "", "!PitSandbox")

let hunting = undefined

let huntinglines = []

let huntedPlayers = JSON.parse(FileLib.read("PitSandboxDev", "huntedPlayers.json"))
let huntedGuilds = JSON.parse(FileLib.read("PitSandboxDev", "huntedGuilds.json"))
let ignoredPlayers = []
if (!FileLib.exists("PitSandboxDev", "ignoredPlayers.json")) FileLib.write("PitSandboxDev", "ignoredPlayers.json", "[]")
else ignoredPlayers = JSON.parse(FileLib.read("PitSandboxDev", "ignoredPlayers.json"))

let onlineHunt = huntedPlayers.filter(n => onlinePlayers().includes(n))
let onlineHuntGuild = onlinePlayersFormatted().filter(n => n.split(" ")[2] && huntedGuilds.includes(ChatLib.removeFormatting(n.split(" ")[2].replace(/[\[\]]/g, "")).toUpperCase())).map(n => ChatLib.removeFormatting(n.split(" ")[1]))

register("renderEntity", (entity, pos, ticks, event) => {
    if (!onSandbox()) return
    if (hunting && entity.getEntity().class.toString().includes("EntityOtherPlayerMP") && inMid(entity) && !onlineHunt.includes(entity.getName()) && !onlineHuntGuild.includes(entity.getName())) return cancel(event)
})

register("tick", () => {
    if (!onSandbox()) return

    onlineHunt = huntedPlayers.filter(n => onlinePlayers().includes(n))
    onlineHuntGuild = onlinePlayersFormatted().filter(n => n.split(" ")[2] && huntedGuilds.includes(ChatLib.removeFormatting(n.split(" ")[2].replace(/[\[\]]/g, "")).toUpperCase())).map(n => ChatLib.removeFormatting(n.split(" ")[1])).filter(n => !ignoredPlayers.includes(n))

    if (huntingKey.isPressed()) {
        if (onlineHunt.length < 1 && onlineHuntGuild.length < 1) {
            hunting = false, ChatLib.chat("§7Hunting: §cNo players online!");
        } else {
            hunting = !hunting;
            ChatLib.chat("§7Hunting: " + (hunting ? "§aEnabled" : "§cDisabled"));
        }
    }

    let huntinfo = [`${Settings.hudGroupColor}&nHunted Players`]
    if (onlineHunt.length > 0) {
        onlineHunt.forEach(p => {
            let suffix = "";
            let prefix = "";
            let entity = worldotherplayers().filter(e => !e.getName().startsWith("§") && !e.getName().startsWith("CIT-")).find(e => e.getName() == p);
            let tabp = onlinePlayersFormatted().find(t => ChatLib.removeFormatting(t.split(" ")[1]) == p)
            if (!entity) suffix = " &cUnknown";
            else suffix += ` ${location(entity)}`
            //else if (inMid(entity)) suffix = " &4MID";
            //else if (inSpawn(entity)) suffix = " &aSpawn";
            //else suffix = " &6Outskirts";
            if (!tabp) prefix += "&cNotInTab &c";
            else if (tabp.split(" ")[0].includes("[")) prefix += "&4&nPRE&r &c";
            else prefix += tabp.split(" ")[0].replace(/§l/g, "") + " &c";
            if (entity && entity.getItemInSlot(2) && entity.getItemInSlot(2).getNBT() && !hasEnchant("mirror", entity.getItemInSlot(2).getNBT())) suffix += " &cNoMirrors";
            huntinfo.push(prefix + (tabp ? tabp.split(" ")[1] : p) + suffix);
        })
    } if (onlineHuntGuild.filter(h => !onlineHunt.includes(h)).length > 0) {
        huntinfo.push(Settings.hudGroupColor + "&nHunted Tags");
        onlineHuntGuild.filter(h => !onlineHunt.includes(h)).forEach(p => {
            let suffix = "";
            let prefix = "";
            let entity = worldotherplayers().filter(e => !e.getName().startsWith("§") && !e.getName().startsWith("CIT-")).find(e => e.getName() == p);
            let tabp = onlinePlayersFormatted().find(t => ChatLib.removeFormatting(t.split(" ")[1]) == p);
            if (tabp && tabp.split(" ")[2].includes("[")) suffix = " " + tabp.split(" ")[2];
            if (!entity) suffix += " &cUnknown";
            else suffix += ` ${location(entity)}`
            //else if (inMid(entity)) suffix += " &4MID";
            //else if (inSpawn(entity)) suffix += " &aSpawn";
            //else suffix += " &6Outskirts";
            if (!tabp) prefix += "&cNotInTab &c";
            else if (tabp.split(" ")[0].includes("[")) prefix += "&4&nPRE&r &c";
            else prefix += tabp.split(" ")[0].replace(/§l/g, "") + " &c";
            if (entity && entity.getItemInSlot(2) && entity.getItemInSlot(2).getNBT() && !hasEnchant("mirror", entity.getItemInSlot(2).getNBT())) suffix += " &cNoMirrors";
            huntinfo.push(prefix + (tabp ? tabp.split(" ")[1] : p) + suffix);
        });
    }
    huntinglines = huntinfo
})

register("renderOverlay", () => {
    if (!onSandbox()) return
    if (huntinglines.length > 0) {
        y = huntInfoHud.textY
        let huntinfo = huntinglines
        huntinfo.forEach(line => {
            const text = new Text(line, 0, y)
            text.setX(huntInfoHud.textX + (Renderer.screen.getWidth() / 10) - Renderer.getStringWidth(text.getString()) * generalInfoHud.textScale)
            text.setScale(generalInfoHud.textScale)
            text.setShadow(true)
            if (huntinfo.length > 1 || Settings.generalInfoHud.isOpen()) text.draw()
            y += 12 * generalInfoHud.textScale
        })
    }
})

register("command", (arg1, arg2) => {
    switch (arg1) {
        case "add":
            if (!arg2 || arg2.length < 3 || arg2.length > 16) return ChatLib.chat("&cInvalid name.");
            if (huntedPlayers.find(p => ChatLib.removeFormatting(p.toLowerCase()) == ChatLib.removeFormatting(arg2.toLowerCase()))) return ChatLib.chat("&cPlayer already hunted.");
            huntedPlayers.push(ChatLib.removeFormatting(arg2));
            ChatLib.chat("&aAdded " + ChatLib.removeFormatting(arg2) + " to hunted list.");
            FileLib.write("PitSandboxDev", "huntedPlayers.json", JSON.stringify(huntedPlayers));
            break;
        case "remove":
            if (!arg2 || arg2.length < 3 || arg2.length > 16) return ChatLib.chat("&cInvalid name.");
            if (!huntedPlayers.find(p => ChatLib.removeFormatting(p.toLowerCase()) == ChatLib.removeFormatting(arg2.toLowerCase()))) return ChatLib.chat("&cPlayer not hunted.");
            huntedPlayers.splice(huntedPlayers.findIndex(p => ChatLib.removeFormatting(p.toLowerCase()) == ChatLib.removeFormatting(arg2.toLowerCase())), 1);
            ChatLib.chat("&aRemoved " + ChatLib.removeFormatting(arg2) + " from hunted list.");
            FileLib.write("PitSandboxDev", "huntedPlayers.json", JSON.stringify(huntedPlayers));
            break;
        case "addguild":
            if (!arg2 || arg2.length > 4) return ChatLib.chat("&cInvalid name.");
            if (huntedGuilds.find(g => g.toLowerCase() == arg2.toLowerCase())) return ChatLib.chat("&cGuild already hunted.");
            huntedGuilds.push(arg2.toUpperCase());
            ChatLib.chat("&aAdded " + arg2.toUpperCase() + " to hunted guild list.");
            FileLib.write("PitSandboxDev", "huntedGuilds.json", JSON.stringify(huntedGuilds));
            break;
        case "removeguild":
            if (!arg2 || arg2.length > 4) return ChatLib.chat("&cInvalid name.");
            if (!huntedGuilds.find(g => g.toLowerCase() == arg2.toLowerCase())) return ChatLib.chat("&cGuild not hunted.");
            huntedGuilds.splice(huntedGuilds.findIndex(g => g.toLowerCase() == arg2.toLowerCase()), 1);
            ChatLib.chat("&aRemoved " + arg2.toUpperCase() + " from hunted guild list.");
            FileLib.write("PitSandboxDev", "huntedGuilds.json", JSON.stringify(huntedGuilds));
            break;
        case "ignore":
            if (!arg2 || arg2.length < 3 || arg2.length > 16) return ChatLib.chat("&cInvalid name.");

            if (ignoredPlayers.find(p => ChatLib.removeFormatting(p.toLowerCase()) == ChatLib.removeFormatting(arg2.toLowerCase()))) {
                ignoredPlayers.splice(ignoredPlayers.findIndex(p => ChatLib.removeFormatting(p.toLowerCase()) == ChatLib.removeFormatting(arg2.toLowerCase())), 1);
                ChatLib.chat("&cRemoved " + ChatLib.removeFormatting(arg2) + " from ignore list.");
            } else {
                ignoredPlayers.push(ChatLib.removeFormatting(arg2));
                ChatLib.chat("&aAdded " + ChatLib.removeFormatting(arg2) + " to ignore list.");
            }
            FileLib.write("PitSandboxDev", "ignoredPlayers.json", JSON.stringify(ignoredPlayers));
            break;
        case "clear":
            huntedPlayers = [];
            ChatLib.chat("&aCleared hunted list.");
            FileLib.write("PitSandboxDev", "huntedPlayers.json", JSON.stringify(huntedPlayers));
            break;
        case "list":
            ChatLib.chat("&aHunted players: " + (huntedPlayers.length > 0 ? huntedPlayers.map(p => "&b" + p).join("&a, ") : "&cNone"));
            ChatLib.chat("&aHunted guild tags: " + (huntedGuilds.length > 0 ? huntedGuilds.map(g => "&b" + g).join("&a, ") : "&cNone"));
            ChatLib.chat("&aIgnored players: " + (ignoredPlayers.length > 0 ? ignoredPlayers.map(g => "&b" + g).join("&a, ") : "&cNone"));
            break;
        default:
            ChatLib.chat("\n&e/hunt add <player> - Add a player to your hunt list\n&e/hunt remove <player> - Remove a player from your hunt list\n&e/hunt addguild <tag> - Add a guild tag to your hunt list\n&e/hunt removeguild <tag> - Remove a guild tag from your hunt list\n&e/hunt ignore - Hide a player in your hunted tags\n&e/hunt clear - Clear the hunted players list\n&e/hunt list - See all the players/guilds in your hunt list\n&e/hunt help - Show this help menu\n");
            break;
    }
}).setName("hunt")