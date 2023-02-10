/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from '../config'
import { onSandbox } from './onSandbox'
import { inMid } from './inMid'

import { strength } from './strength'
import { bbDamage } from './strength'
import { strengthLevel } from './strength'
import { strengthTime } from './strength'

import { formatNumber } from './formatNumber'
import { msToTime } from './msToTime'
import { getSidebar } from './sidebar'
import { storeSidebar } from './sidebar'
import { hasEnchant } from './enchant'

import { generalInfoHud } from '../features/gui'
import { streakInfoHud } from '../features/gui'

let laststreakchange = Date.now()
let streaking = false
let streak = 0
let streakingkills = 0
let rawstreak = undefined
let startstreaktime = undefined
let lendstreak = 0

let streakinglines = []

let rngdamage = Date.now()

let goldrequire = undefined
let goldrequiremax = undefined
let goldreqrefresh = 5

export const lastendstreak = lendstreak
export const streakkills = streakingkills

export const goldreq = () => {
    return goldrequire
}
export const goldreqmax = () => {
    return goldrequiremax
}
export const greqrefresh = () => {
    return goldreqrefresh
}

export const activeStreak = () => {
    return streak
}

export const isStreaking = () => {
    return streaking
}

export let currentstreak = {
    killgold: 0,
    assgold: 0,
    othergold: 0,
    killxp: 0,
    assxp: 0,
    otherxp: 0,
    other: []
}

const recapStreak = () => {
    if (!Settings.toggleSandboxHUD) return;
    ChatLib.chat("\n&c&l&nStreak Recap\n");
    let scoreboard = getSidebar().map(l => ChatLib.removeFormatting(l));

    let streakinfo = ["Streak: &cUnknown", "Duration: &cUnknown", `Coins K/A/O: &6${currentstreak.killgold ? formatNumber(Math.floor(currentstreak.killgold)) : "?"}&r/&6${currentstreak.assgold ? formatNumber(Math.floor(currentstreak.assgold)) : "?"}&r/&6${currentstreak.othergold ? formatNumber(Math.floor(currentstreak.othergold)) : "?"}`, `XP K/A/O: &b${currentstreak.killxp ? formatNumber(Math.floor(currentstreak.killxp)) : "?"}&r/&b${currentstreak.assxp ? formatNumber(Math.floor(currentstreak.assxp)) : "?"}&r/&b${currentstreak.otherxp ? formatNumber(Math.floor(currentstreak.otherxp)) : "?"}`];

    streakinfo[0] = `Streak: &c${streak != 0 ? Math.floor(streak * 100) / 100 : "?"}&7 (${rawstreak ? rawstreak : "?"})`;

    if (startstreaktime) {
        let dif = Date.now() - startstreaktime;
        dif = msToTime(dif);
        streakinfo[1] = `Duration: &c${dif}`;
    }

    if (startstreaktime && streakingkills) {
        let kps = Math.floor(streakingkills / ((Date.now() - startstreaktime) / 1000) * 10) / 10;
        let kpm = formatNumber(Math.floor(streakingkills / ((Date.now() - startstreaktime) / 1000 / 60)));
        let kph = formatNumber(Math.floor(streakingkills / ((Date.now() - startstreaktime) / 1000 / 60 / 60)));
        streakinfo.push("Kills Per S/M/H: &c" + kps + "&r/&c" + kpm + "&r/&c" + kph);
    }

    if (currentstreak.assgold || currentstreak.killgold || currentstreak.othergold) {
        let gold = 0;
        if (currentstreak.killgold) gold += currentstreak.killgold;
        if (currentstreak.assgold) gold += currentstreak.assgold;
        if (currentstreak.othergold) gold += currentstreak.othergold;
        let gps = formatNumber(Math.floor(gold / ((Date.now() - startstreaktime) / 1000)));
        let gpm = formatNumber(Math.floor(gold / ((Date.now() - startstreaktime) / 1000 / 60)));
        let gph = formatNumber(Math.floor(gold / ((Date.now() - startstreaktime) / 1000 / 60 / 60)));
        streakinfo.push("Coins Per S/M/H: &6" + gps + "&r/&6" + gpm + "&r/&6" + gph);
    }

    if (currentstreak.assxp || currentstreak.killxp || currentstreak.otherxp) {
        let xp = 0;
        if (currentstreak.killxp) xp += currentstreak.killxp;
        if (currentstreak.assxp) xp += currentstreak.assxp;
        if (currentstreak.otherxp) xp += currentstreak.otherxp;
        let xps = formatNumber(Math.floor(xp / ((Date.now() - startstreaktime) / 1000)));
        let xpm = formatNumber(Math.floor(xp / ((Date.now() - startstreaktime) / 1000 / 60)));
        let xph = formatNumber(Math.floor(xp / ((Date.now() - startstreaktime) / 1000 / 60 / 60)));
        streakinfo.push("XP Per S/M/H: &b" + xps + "&r/&b" + xpm + "&r/&b" + xph);
    }

    if (scoreboard.find(l => l.startsWith("Status: ") && !l.startsWith("Status: Fighting") && !l.startsWith("Status: Idling") && !l.startsWith("Status: Bountied") && !l.startsWith("Status: Strength"))) {
        let megastreak = scoreboard.find(l => l.startsWith("Status: ")).split("Status: ")[1];
        if (megastreak == "Overdrive") megastreak = "&c" + megastreak;
        if (megastreak == "Highlander") megastreak = "&6" + megastreak;
        if (megastreak == "To the Moon") megastreak = "&b" + megastreak;
        if (megastreak == "Uberstreak") megastreak = "&d" + megastreak;
        if (megastreak == "Grand Finale") megastreak = "&e" + megastreak;
        if (megastreak == "Nightmare") megastreak = "&1" + megastreak;
        if (megastreak == "Hermit") megastreak = "&9" + megastreak;
        streakinfo.push("Megastreak: " + megastreak);
    }

    if (currentstreak.other.length > 0) {
        let other = currentstreak.other.map(o => o.color + o.amount + " " + o.id).join(" ");
        streakinfo.push("Other: " + other);
    }

    streakinfo.push("\n");

    streakinfo.map(l => ChatLib.chat(l));
    streak = 0;
    rawstreak = undefined;
    startstreaktime = undefined;
    streakingkills = 0;
    currentstreak = {
        killgold: 0,
        assgold: 0,
        othergold: 0,
        killxp: 0,
        assxp: 0,
        otherxp: 0,
        other: []
    };
};

const endStreak = () => {
    if (!streaking) return
    lendstreak = Date.now()
    streaking = false
    strengthLevel(0)
    strengthTime(0)
    bbDamage(0)
    recapStreak()
}

register("worldUnload", () => {
    endStreak()
})

register("chat", (grinded, required, event) => {
    if (!Settings.toggleSandboxHUD) return
    grinded = parseInt(parseFloat(grinded.replace(/[,]/g, "")).toFixed(0))
    required = parseInt(parseFloat(required.replace(/[,]/g, "")).toFixed(0))
    goldrequire = grinded
    goldrequiremax = required
    cancel(event)
}).setChatCriteria("GOLDREQ! Gold requirement: $${grinded}/$${required}")

register("step", () => {
    if (!onSandbox() || !Settings.toggleSandboxHUD) return
    goldreqrefresh--
    if (goldreqrefresh < 1) ChatLib.command("goldreq"), goldreqrefresh = (inMid(Player.asPlayerMP()) ? 15 : 30)
}).setFps(1)

register("step", () => {
    if (!onSandbox()) return
    if (!Settings.toggleSandboxHUD) return
    if (streaking && Date.now() - laststreakchange > 5000 && rawstreak && streak != rawstreak) {
        streak = rawstreak
        ChatLib.chat("&c&l!&7 Streak resynced with server scoreboard.")
    }
}).setFps(1)

register("chat", (percent, player, xp, gold, event) => {
    if (!onSandbox()) return;
    if (!Settings.toggleSandboxHUD) return;
    cancel(event);
    if (Date.now() - lendstreak < 2000) return;
    xp = xp.replace(/[,]/g, "");
    gold = gold.replace(/[,]/g, "");
    if (parseInt(percent) != NaN) streak += parseInt(percent) / 100, laststreakchange = Date.now();
    if (parseFloat(xp) != NaN && parseFloat(xp)) currentstreak.assxp += parseFloat(xp);
    if (parseFloat(gold) != NaN && parseFloat(gold)) currentstreak.assgold += parseFloat(gold), goldrequire += parseFloat(gold);
}).setChatCriteria("ASSIST! of ${percent}% on ${player} +${xp} +$${gold}");

register("chat", (player, xp, gold, event) => {
    if (!onSandbox()) return;
    if (!Settings.toggleSandboxHUD) return;
    cancel(event);
    strength()
    if (Date.now() - lendstreak < 2000) return;
    xp = xp.replace(/[,]/g, "");
    let str = 1;
    if (gold.split(" ").length > 1) str = parseFloat(gold.split(" ")[1]), gold = gold.split(" ")[0];
    gold = gold.replace(/[,]/g, "");
    streak += str;
    laststreakchange = Date.now();
    streakingkills += str;
    if (parseFloat(xp) != NaN && parseFloat(xp)) currentstreak.killxp += parseFloat(xp);
    if (parseFloat(gold) != NaN && parseFloat(gold)) currentstreak.killgold += parseFloat(gold), goldrequire += parseFloat(gold);
}).setChatCriteria("KILL! on ${player} +${xp} +$${gold}");

register("chat", (mult, player, xp, gold, event) => {
    if (!onSandbox()) return
    if (!Settings.toggleSandboxHUD) return;
    if (mult.split(" ").length > 1) return;
    cancel(event)
    strength()
    if (Date.now() - lendstreak < 2000) return
    xp = xp.replace(/[,]/g, "")
    let str = 1
    if (gold.split(" ").length > 1) str = parseFloat(gold.split(" ")[1]), gold = gold.split(" ")[0]
    gold = gold.replace(/[,]/g, "")
    streak += str
    laststreakchange = Date.now()
    streakingkills += str
    if (parseFloat(xp) != NaN && parseFloat(xp)) currentstreak.killxp += parseFloat(xp)
    if (parseFloat(gold) != NaN && parseFloat(gold)) currentstreak.killgold += parseFloat(gold), goldrequire += parseFloat(gold)
}).setChatCriteria("${mult} KILL! on ${player} +${xp} +$${gold}")

register("chat", (mult, player, xp, gold, event) => {
    if (!onSandbox()) return
    if (!Settings.toggleSandboxHUD) return
    cancel(event)
    strength()
    if (Date.now() - lendstreak < 2000) return
    xp = xp.replace(/[,]/g, "")
    let str = 1
    if (gold.split(" ").length > 1) str = parseFloat(gold.split(" ")[1]), gold = gold.split(" ")[0];
    gold = gold.replace(/[,]/g, "")
    streak += str
    laststreakchange = Date.now()
    streakingkills += str
    if (parseFloat(xp) != NaN && parseFloat(xp)) currentstreak.killxp += parseFloat(xp)
    if (parseFloat(gold) != NaN && parseFloat(gold)) currentstreak.killgold += parseFloat(gold), goldrequire += parseFloat(gold)
}).setChatCriteria("MULTI KILL! (${mult}) on ${player} +${xp} +$${gold}")

register("chat", (xp, event) => {
    if (!onSandbox() || !streaking) return
    if (!Settings.toggleSandboxHUD) return
    cancel(event)
    if (Date.now() - lendstreak < 2000) return
    xp = xp.replace(/[,]/g, "")
    if (parseFloat(xp) != NaN && parseFloat(xp)) currentstreak.otherxp += parseFloat(xp)
}).setChatCriteria("PLETHORA! +${xp}XP")

register("chat", (event) => {
    cancel(event)
}).setChatCriteria("PLETHORA! +0XP (maxed!)")

register("chat", (xp, event) => {
    if (!onSandbox() || !streaking) return
    if (!Settings.toggleSandboxHUD) return
    if (Date.now() - lendstreak < 2000) return
    xp = xp.replace(/[,]/g, "")
    if (parseFloat(xp) != NaN && parseFloat(xp)) currentstreak.otherxp += parseFloat(xp)
}).setChatCriteria("SHARING IS CARING! +${xp}XP!")

register("chat", (xp, event) => {
    if (!onSandbox() || !streaking) return
    if (!Settings.toggleSandboxHUD) return
    if (Date.now() - lendstreak < 2000) return
    xp = xp.replace(/[,]/g, "")
    if (parseFloat(xp) != NaN && parseFloat(xp)) currentstreak.otherxp += parseFloat(xp)
}).setChatCriteria("TO THE MOON! Earned +${xp}XP from megastreak (${*}x multiplier)")

register("chat", (gold, event) => {
    if (!onSandbox() || !streaking) return
    if (!Settings.toggleSandboxHUD) return
    cancel(event)
    if (Date.now() - lendstreak < 2000) return
    gold = gold.replace(/[,]/g, "")
    if (parseFloat(gold) != NaN && parseFloat(gold)) currentstreak.othergold += parseFloat(gold), goldrequire += parseFloat(gold)
}).setChatCriteria("➜ +$${gold}")

register("chat", (xp, event) => {
    if (!onSandbox() || !streaking) return
    if (!Settings.toggleSandboxHUD) return
    cancel(event)
    if (Date.now() - lendstreak < 2000) return
    xp = xp.replace(/[,]/g, "")
    if (parseFloat(xp) != NaN && parseFloat(xp)) currentstreak.otherxp += parseFloat(xp)
}).setChatCriteria("➜ ${xp} XP")

register("chat", event => {
    if (!onSandbox()) return;
    let umsg = ChatLib.removeFormatting(ChatLib.getChatMessage(event));
    if (umsg.startsWith("[Server:")) return cancel(event);
    if (Settings.toggleSandboxHUD) {
        if (umsg == "STREAK! reset as you're in spawn!" || umsg == "STREAK! reset as you're in the mine!") {
            endStreak();
            return;
        } else if (umsg.startsWith("DEATH!")) return endStreak();
        if (streaking) {
            if (Date.now() - lastendstreak > 2000) {
                switch (umsg) {
                    case "➜ +1 Renown":
                        if (currentstreak.other.find(o => o.id == "R")) currentstreak.other[currentstreak.other.indexOf(currentstreak.other.find(o => o.id == "R"))].amount += 1;
                        else currentstreak.other.push({
                            color: "&e",
                            id: "R",
                            amount: 1
                        });
                        break;
                    case "➜ +1 Ring Maker":
                        if (currentstreak.other.find(o => o.id == "RM")) currentstreak.other[currentstreak.other.indexOf(currentstreak.other.find(o => o.id == "RM"))].amount += 1;
                        else currentstreak.other.push({
                            color: "&a",
                            id: "RM",
                            amount: 1
                        });
                        break;
                    case "➜ +10 emeralds":
                        if (currentstreak.other.find(o => o.id == "E")) currentstreak.other[currentstreak.other.indexOf(currentstreak.other.find(o => o.id == "E"))].amount += 10;
                        else currentstreak.other.push({
                            color: "&a",
                            id: "E",
                            amount: 10
                        });
                        break;
                    case "➜ +1 Moon Stone":
                        if (currentstreak.other.find(o => o.id == "MS")) currentstreak.other[currentstreak.other.indexOf(currentstreak.other.find(o => o.id == "MS"))].amount += 1;
                        else currentstreak.other.push({
                            color: "&9",
                            id: "MS",
                            amount: 1
                        });
                        break;
                    case "➜ +25% damage (0:30)":
                        rngdamage = Date.now() + 30000;
                        break;
                    case "➜ +2 Night Shards":
                        if (currentstreak.other.find(o => o.id == "NS")) currentstreak.other[currentstreak.other.indexOf(currentstreak.other.find(o => o.id == "NS"))].amount += 2;
                        else currentstreak.other.push({
                            color: "&1",
                            id: "NS",
                            amount: 2
                        });
                        break;
                    default:
                        break;
                }
            }
        }
    }
    if (umsg.toLowerCase().includes("queue blitz") && Settings.toggleBlitzQueue) {
        cancel(event);
        blitzmsg = Date.now();
    }
    if (umsg.toLowerCase().includes("blitz") && Settings.eradicateBlitz) {
        cancel(event);
        blitzmsg = Date.now();
    }
    if (umsg.includes("/cf") && Settings.antiCF) cancel(event);
    if (umsg.startsWith("There's an active Blitz tournament")) cancel(event);
    if (umsg.startsWith("BOUNTY! of") || umsg.startsWith("BOUNTY! bump")) {
        if (!Settings.toggleBountyBumps) cancel(event);
    }
    if (Settings.eggEffectDisplay) {
        switch (umsg) {
            case "SUPEREGG! +2.5x coins and XP (00:10)":
                if (Date.now() > sixtimescoins) sixtimescoins = Date.now() + 10000;
                else sixtimescoins += 10000;
                break;
            case "SUPEREGG! One tap bots (00:10)":
                if (Date.now() > onetapbots) onetapbots = Date.now() + 10000;
                else onetapbots += 10000;
                break;
            case "SUPEREGG! Half the hit delay on bots (00:10)":
                if (Date.now() > halfhitdelay) halfhitdelay = Date.now() + 10000;
                else halfhitdelay += 10000;
                break;
            default:
                break;
        }
    } if (!Settings.toggleRNGesus) {
        if (umsg.startsWith("RNGESUS! Rolled a ") || umsg.startsWith("➜ ")) return cancel(event);
    }
})

register("tick", () => {
    if (Settings.toggleSandboxHUD) {
        storeSidebar();
        let scoreboard = getSidebar().map(l => ChatLib.removeFormatting(l));
        if (streak != 0 && !streaking && Date.now() - lastendstreak > 2000) {
            streaking = true;
            startstreaktime = Date.now();
        } else if (scoreboard.find(l => l.startsWith("Streak: ")) && Date.now() - lastendstreak > 2000) {
            rawstreak = parseFloat(scoreboard.find(l => l.startsWith("Streak: ")).replace("Streak: ", ""));
        }
    }
})

register("tick", () => {
    let scoreboard = getSidebar().map(l => ChatLib.removeFormatting(l))
    if (!streaking || !inMid(Player.asPlayerMP())) streakinglines = [`${Settings.hudGroupColor}&nStreaking Info`]
    else {
        let streakinfo = ["Streak: &cUnknown", "Duration: &cUnknown", Settings.hudTextColor + `Coins K/A/O: &6${currentstreak.killgold ? formatNumber(Math.floor(currentstreak.killgold)) : "?"}&r/&6${currentstreak.assgold ? formatNumber(Math.floor(currentstreak.assgold)) : "?"}&r/&6${currentstreak.othergold ? formatNumber(Math.floor(currentstreak.othergold)) : "?"}`, Settings.hudTextColor + `XP K/A/O: &b${currentstreak.killxp ? formatNumber(Math.floor(currentstreak.killxp)) : "?"}&r/&b${currentstreak.assxp ? formatNumber(Math.floor(currentstreak.assxp)) : "?"}&r/&b${currentstreak.otherxp ? formatNumber(Math.floor(currentstreak.otherxp)) : "?"}`]

        streakinfo[0] = Settings.hudTextColor + `Streak: &c${streak != 0 ? Math.floor(streak * 100) / 100 : "?"}&7 (${rawstreak ? rawstreak : "?"})`

        if (startstreaktime) {
            let dif = Date.now() - startstreaktime
            dif = msToTime(dif, true);
            streakinfo[1] = Settings.hudTextColor + `Duration: &c${dif}`;
        } if (startstreaktime && streakkills) {
            let kps = Math.floor(streakkills / ((Date.now() - startstreaktime) / 1000) * 10) / 10;
            let kpm = formatNumber(Math.floor(streakkills / ((Date.now() - startstreaktime) / 1000 / 60)));
            let kph = formatNumber(Math.floor(streakkills / ((Date.now() - startstreaktime) / 1000 / 60 / 60)));
            streakinfo.push(Settings.hudTextColor + "Kills Per S/M/H: &c" + kps + "&r/&c" + kpm + "&r/&c" + kph);
        } if (scoreboard.find(l => l.startsWith("Stored XP: ")) && getMega(Player.getName()) == "moon") {
            const storedXP = (scoreboard.find(l => l.startsWith("Stored XP: ")).split("Stored XP: "))[1]
            streakinfo.push(Settings.hudTextColor + "Stored XP: &b" + storedXP)
        } if (currentstreak.assgold || currentstreak.killgold || currentstreak.othergold) {
            let gold = 0;
            if (currentstreak.killgold) gold += currentstreak.killgold;
            if (currentstreak.assgold) gold += currentstreak.assgold;
            if (currentstreak.othergold) gold += currentstreak.othergold;
            let gps = formatNumber(Math.floor(gold / ((Date.now() - startstreaktime) / 1000)));
            let gpm = formatNumber(Math.floor(gold / ((Date.now() - startstreaktime) / 1000 / 60)));
            let gph = formatNumber(Math.floor(gold / ((Date.now() - startstreaktime) / 1000 / 60 / 60)));
            if (Player.armor.getLeggings() && hasEnchant("moctezuma", Player.armor.getLeggings().getNBT()) && hasEnchant("moctezuma", Player.armor.getLeggings().getNBT()) != NaN) streakinfo.push(Settings.hudTextColor + "Coins Per S/M/H: &6" + gps + "&r/&6" + gpm + "&r/&6" + gph);
        } if (currentstreak.assxp || currentstreak.killxp || currentstreak.otherxp) {
            let xp = 0;
            if (currentstreak.killxp) xp += currentstreak.killxp;
            if (currentstreak.assxp) xp += currentstreak.assxp;
            if (currentstreak.otherxp) xp += currentstreak.otherxp;
            let xps = formatNumber(Math.floor(xp / ((Date.now() - startstreaktime) / 1000)));
            let xpm = formatNumber(Math.floor(xp / ((Date.now() - startstreaktime) / 1000 / 60)));
            let xph = formatNumber(Math.floor(xp / ((Date.now() - startstreaktime) / 1000 / 60 / 60)));
            if (Player.armor.getLeggings() && hasEnchant("sweaty", Player.armor.getLeggings().getNBT()) && hasEnchant("sweaty", Player.armor.getLeggings().getNBT()) != NaN) streakinfo.push(Settings.hudTextColor + "XP Per S/M/H: &b" + xps + "&r/&b" + xpm + "&r/&b" + xph);
        } if (scoreboard.find(l => l.startsWith("Status: ") && !l.startsWith("Status: Fighting") && !l.startsWith("Status: Idling") && !l.startsWith("Status: Bountied") && !l.startsWith("Status: Strength"))) {
            let megastreak = scoreboard.find(l => l.startsWith("Status: ")).split("Status: ")[1];
            if (megastreak == "Overdrive") megastreak = "&c" + megastreak;
            if (megastreak == "Highlander") megastreak = "&6" + megastreak;
            if (megastreak == "To the Moon") megastreak = "&b" + megastreak;
            if (megastreak == "Uberstreak") megastreak = "&d" + megastreak;
            if (megastreak == "Grand Finale") megastreak = "&e" + megastreak;
            if (megastreak == "Nightmare") megastreak = "&1" + megastreak;
            if (megastreak == "Hermit") megastreak = "&9" + megastreak;
            streakinfo.push(Settings.hudTextColor + "Megastreak: " + megastreak);
        } if (currentstreak.other.length > 0) {
            let other = currentstreak.other.map(o => o.color + o.amount + " " + o.id).join(" ");
            streakinfo.push(Settings.hudTextColor + "Other: " + other);
        } if (Date.now() < rngdamage) {
            streakinfo.push(Settings.hudTextColor + "RNGesus DMG: &c" + msToTime(rngdamage - Date.now(), true));
        }
        streakinfo.splice(0, 0, [Settings.hudGroupColor + "&nStreaking Info"])
        streakinglines = streakinfo
    }
})

register("renderOverlay", () => {
    if (streakinglines.length > 0) {
        y = streakInfoHud.textY
        let streakinfo = streakinglines
        streakinfo.forEach(line => {
            const text = new Text(line, 0, y)
            text.setX(streakInfoHud.textX + (Renderer.screen.getWidth() / 10) - Renderer.getStringWidth(text.getString()) * generalInfoHud.textScale).setScale(generalInfoHud.textScale).setShadow(true)
            if (streakinglines.length > 1 || Settings.generalInfoHud.isOpen()) text.draw()
            y += 12 * generalInfoHud.textScale
        })
    }
})