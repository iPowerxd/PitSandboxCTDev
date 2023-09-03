/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { onlinePlayers } from "./onlinePlayers";
import { onlinePlayersFormatted } from "./onlinePlayers";

export function playerInfo(player) {
    for (let i = 0; i < onlinePlayers().length; i++) {
        if (player == onlinePlayers()[i]) {
            if (onlinePlayersFormatted()[i] == undefined) return ["§7" + onlinePlayers()[i]];
            else return onlinePlayersFormatted()[i].split(" ");
        }
    }
}

export function getMega(player) {
    let info = playerInfo(player)
    if (info[0].includes("OVRDRV")) return "overdrive"
    else if (info[0].includes("HIGH")) return "highlander"
    else if (info[0].includes("MOON")) return "moon"
    else if (info[0].includes("UBER100")) return "uberstreak100"
    else if (info[0].includes("UBER200")) return "uberstreak200"
    else if (info[0].includes("UBER300")) return "uberstreak300"
    else if (info[0].includes("UBER400")) return "uberstreak400"
    else if (info[0].includes("NGHTMRE")) return "nightmare"
    else if (info[0].includes("HERMIT")) return "hermit"
    else if (info[0].includes("TIME")) return "madeoftime"
    else if (info[0].includes("GILDED")) return "gilded"
    else return "premega"
}

export function getMegaFormatted(player) {
    let mega = getMega(player)
    if (mega == "overdrive") return ("§cOverdrive")
    else if (mega == "highlander") return ("§6Highlander")
    else if (mega == "moon") return ("§bTo the Moon")
    else if (mega == "uberstreak100") return ("§dUberstreak100")
    else if (mega == "uberstreak200") return ("§dUberstreak200")
    else if (mega == "uberstreak300") return ("§dUberstreak300")
    else if (mega == "uberstreak400") return ("§dUberstreak400")
    else if (mega == "nightmare") return ("§1Nightmare")
    else if (mega == "hermit") return ("§9Hermit")
    else if (mega == "gilded") return ("&6&lGilded")
    else if (mega == "madeoftime") return ("§5&lMade of Time")
    else return "§cPremega"
}

export function getLevelUnformatted(player) {
    let level = ChatLib.removeFormatting(getLevel(player));
    if (level == "none") return undefined;
    return parseInt(level.replace(/[[\]]/g, ''));
}

export function getLevel(player) {
    let info = playerInfo(player);
    if (ChatLib.removeFormatting(info[0]).startsWith("[")) return info[0];
    else return "none";
}

export function getNameColour(player) {
    let info = playerInfo(player);
    for (let i = 0; i < info.length; i++) {
        if (info[i].includes(player)) return info[i]
    }
}

export function getColourOfName(player) {
    return getNameColour(player).replace("§", "&").replace(player, "");
}

export function getGuild(player) {
    let info = playerInfo(player);
    for (let i = 0; i < info.length; i++) {
        if (info[i].includes(player)) {
            if (info[i + 1].startsWith("[")) return info[i + 1]
        }
    } return "none";
}

export function getBountyUnformatted(player) {
    let bounty = getBounty(player);
    if (bounty == "none") return 0;
    return parseInt(ChatLib.removeFormatting(bounty.replace(/[$,]/g, '')));
}

export function getBounty(player) {
    let info = playerInfo(player);
    for (let i = 0; i < info.length; i++) {
        if (info[i].includes("$")) return info[i];
    } return "none";
}

export function isAFK(player) {
    let info = playerInfo(player)
    if (info.length < 2) return false
    else if (info[info.length - 1].includes("AFK")) return true
    else return false
}