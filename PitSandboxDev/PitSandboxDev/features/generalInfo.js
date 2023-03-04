/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from '../config'

import { onSandbox } from '../functions/onSandbox'
import { inSpawn } from '../functions/inSpawn'
import { inMid } from '../functions/inMid'

import { goldreq } from '../functions/streak'
import { goldreqmax } from '../functions/streak'
import { greqrefresh } from '../functions/streak'
import { isPre } from './antioof'
import { msToTime } from '../functions/msToTime'
import { nomvp } from '../functions/nomvp'
import { romanToInt } from "../functions/roman"
import { getRoman } from "../functions/roman"
import { formatNumber } from '../functions/formatNumber'
import { getSidebar } from "../functions/sidebar"

import { isPre } from './antioof'

import { worldotherplayers } from '../functions/world'

import { generalInfoHud } from "./gui"
import { preInfoHud } from "./gui"

let majorname = undefined
let nextmajor = Date.now()
let nextminor = Date.now()

let gems = undefined
let megacoins = undefined

let extradamage = Date.now()

let generallines = []

export const prestigeinfo = ["§7", "§9", "§9", "§9", "§9", "§e", "§e", "§e", "§e", "§e", "§6", "§6", "§6", "§6", "§6", "§c", "§c", "§c", "§c", "§c", "§5", "§5", "§5", "§5", "§5", "§d", "§d", "§d", "§d", "§d", "§f", "§f", "§f", "§f", "§f", "§b", "§b", "§b", "§b", "§b", "§a", "§a", "§a", "§a", "§a", "§4", "§4", "§4", "§4", "§4", "§3", "§3", "§3", "§3", "§3", "§2", "§2", "§2", "§2", "§2", "§1"]

export const prestigexp = [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.75, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 45, 50, 75, 100, 101, 202, 303, 404, 505, 606, 707, 808, 909, 1010, 1111, 1212, 1313, 1414, 1515, 3030, 4545, 6060, 7575, 9090, 18180, 27270, 36360, 45450, 54540, 109080, 218160, 436320, 872640, 1745280]

const getBrackets = (lvl, pres, full = false) => {
    let lvlc = "";
    if (lvl == 120) {
        lvlc = "&b&l";
    } else if (lvl > 109) {
        lvlc = "&f&l"
    } else if (lvl > 99) {
        lvlc = "&d&l"
    } else if (lvl > 89) {
        lvlc = "&5&l"
    } else if (lvl > 79) {
        lvlc = "&4&l"
    } else if (lvl > 69) {
        lvlc = "&c&l"
    } else if (lvl > 59) {
        lvlc = "&6&l"
    } else if (lvl > 49) {
        lvlc = "&e"
    } else if (lvl > 39) {
        lvlc = "&a"
    } else if (lvl > 29) {
        lvlc = "&2"
    } else if (lvl > 19) {
        lvlc = "&3"
    } else if (lvl > 9) {
        lvlc = "&9"
    } else {
        lvlc = "&7"
    }
    const presc = prestigeinfo[pres]
    if (full) {
        if (pres != 0) {
            return `${presc}[&e${getRoman(pres)}${presc}-${lvlc}${lvl}${presc}]`
        } else {
            return getBrackets(lvl, pres, false)
        }
    } else {
        return `${presc}[${lvlc}${lvl}${presc}]`
    }
}

const xpneeded = [15, 30, 50, 75, 125, 300, 600, 800, 900, 1000, 1200, 1500]
const totalxpnopres = 65950

const yummyTime = () => {
    if (!onSandbox()) return
    const tab = TabList.getHeader().split('\n')
    for (let i = 0; i < tab.length; i++) {
        if (tab[i].includes('YUMMY BISCUIT:')) return tab[i].split('YUMMY BISCUIT: ')[1].split(' left')[0]
    } return false
}

register("step", () => {
    if (onSandbox() && Settings.toggleSandboxHUD) Scoreboard.setShouldRender(false);
    else Scoreboard.setShouldRender(true);
})

register("command", (arg1, arg2) => {
    if (arg1 < 0 && arg1 > 60) return ChatLib.chat("&cInvalid Prestige! Must be between 0-60")
    if (arg2 < 1 && arg2 > 120) return ChatLib.chat("&cInvalid Level! Must be between 1-120")
    ChatLib.chat(`&b${formatNumber((xpneeded[arg2] / 12) * prestigexp[arg1])} XP`)
}).setName("prestigexp")

register("command", (arg1) => {
    if (arg1 < 0 && arg1 > 60) return ChatLib.chat("&cInvalid Prestige! Must be between 0-60")
    ChatLib.chat(`&b${formatNumber((prestigexp[arg1]) * totalxpnopres)} XP`)
}).setName("prestigetotalxp")

register("step", () => {
    if (!onSandbox() || !Settings.toggleSandboxHUD || !Settings.toggleMajorandMinorEventHUD || nomvp()) return;
    if (nextmajor - Date.now() < 180000) ChatLib.command("event");
}).setDelay(5);

register("step", () => {
    if (!onSandbox() || !Settings.toggleMajorandMinorEventHUD || nomvp()) return;
    if (Settings.toggleSandboxHUD) ChatLib.command("event");
}).setDelay(180);

register("chat", (time, event) => {
    if (!onSandbox() || !Settings.toggleMajorandMinorEventHUD || !Settings.toggleSandboxHUD) return;
    if (time.includes("m")) {
        const seconds = parseInt(time.split("m")[1].replace("s", "")) + (parseInt(time.split("m")[0]) * 60);
        nextminor = Date.now() + (seconds * 1000);
    } else {
        const seconds = parseInt(time.replace("s", ""));
        nextminor = Date.now() + (seconds * 1000);
    }
    cancel(event);
}).setChatCriteria("EVENTS! The next Minor Event is in ${time}");

register("chat", (name, time, event) => {
    if (!onSandbox() || !Settings.toggleMajorandMinorEventHUD || !Settings.toggleSandboxHUD) return;
    majorname = name;
    if (time.includes("m")) {
        let seconds = parseInt(time.split("m")[1].replace("s", "")) + (parseInt(time.split("m")[0]) * 60);
        seconds += 180;
        nextmajor = Date.now() + (seconds * 1000);
    } else {
        let seconds = parseInt(time.replace("s", ""));
        seconds += 180;
        nextmajor = Date.now() + (seconds * 1000);
    }
    cancel(event);
}).setChatCriteria("EVENTS! Next Major Event: ${name} in ${time}");

register("chat", (seconds, event) => {
    seconds = parseInt(seconds)
    extradamage = Date.now() + (seconds * 1000)
    cancel(event)
}).setChatCriteria("You now have ${seconds} seconds of extra damage!")

new Thread(() => {
    register("tick", () => {
        setTimeout(() => {
            if (!onSandbox() || !Settings.toggleSandboxHUD) return
            let general = ["Level: &cUnknown", "Coins: &cUnknown", Settings.hudTextColor + "Megacoins: &cUnknown", Settings.hudTextColor + "Gems: &cUnknown", "GoldReq: &cUnknown &7(" + greqrefresh() + ")"]
            let scoreboard = getSidebar().map(l => ChatLib.removeFormatting(l))
            if (scoreboard.find(l => l.startsWith("Needed XP: "))) {
                const neededxpn = scoreboard.find(l => l.startsWith("Needed XP: ")).split("Needed XP: ")[1]
                general.splice(1, 0, [Settings.hudTextColor + "Needed XP: &b" + neededxpn])
            }
            if (scoreboard.find(l => l.startsWith("Prestige: ")) && scoreboard.find(l => l.startsWith("Level: "))) {
                const pres = romanToInt(scoreboard.find(l => l.startsWith("Prestige: ")).split("Prestige: ")[1])
                const lvl = parseInt(scoreboard.find(l => l.startsWith("Level: ")).split("Level: ")[1].replace(/[\[\]]/g, ""))
                const sbneededxp = (scoreboard.find(l => l.startsWith("Needed XP: ")) ? parseInt(scoreboard.find(l => l.startsWith("Needed XP: ")).split("Needed XP: ")[1].replace(/,/g, "")) : undefined)
                if (lvl != 120) {
                    if (sbneededxp) {
                        let totalxp = 0
                        for (let i = 1; i < 120; i++) totalxp += xpneeded[Math.floor(i / 10)] * prestigexp[pres]
                        let levelxp = 0
                        for (let i = 1; i < lvl + 1; i++) levelxp += xpneeded[Math.floor(i / 10)] * prestigexp[pres]
                        levelxp -= sbneededxp;
                        const percent = Math.floor(levelxp / totalxp * 100 * 1000) / 1000
                        if (!Settings.toggleSimpleHUD) general.splice((general.findIndex(l => l.includes("Needed XP:")) != -1 ? general.findIndex(l => l.includes("Needed XP:")) : 1), 0, [Settings.hudTextColor + "Prestige XP Progress: &b" + percent + "%"])
                        let neededxp = 0
                        for (let i = 1; i < lvl + 1; i++) neededxp += xpneeded[Math.floor(i / 10)] * prestigexp[pres]
                        neededxp = totalxp - neededxp + sbneededxp
                        general.splice((general.findIndex(l => l.includes("Needed XP:")) != -1 ? general.findIndex(l => l.includes("Needed XP:")) : 1), 0, [Settings.hudTextColor + "Total XP Needed: &b" + formatNumber(neededxp)])
                    }
                }
                const brackets = getBrackets(lvl, pres, true);
                general[0] = Settings.hudTextColor + "Level: " + brackets
            } else if (scoreboard.find(l => l.startsWith("Skill: "))) {
                const skill = scoreboard.find(l => l.startsWith("Skill: ")).split("Skill: ")[1]
                const level = scoreboard.find(l => l.startsWith("Level: ")).split("Level: ")[1]
                const xp = getSidebar().find(l => l.startsWith("§fXP: ")).split("XP: ")[1]
                general[0] = `${Settings.hudTextColor} Skill: ` + (ChatLib.removeFormatting(skill).toString() == "Mining" ? `&8&l${skill}` : `&d&l${skill}`)
                general.splice(1, 0, `${Settings.hudTextColor}Level: &e${getRoman(level)}`)
                general.splice(2, 0, `${Settings.hudTextColor}XP: ${xp}`)
            } else if (scoreboard.find(l => l.startsWith("WATER: "))) {
                const water = getSidebar().find(l => l.startsWith("§b§lWATER: ")).split("§b§lWATER: ")[1]
                const fire = getSidebar().find(l => l.startsWith("§c§lFIRE: ")).split("§c§lFIRE: ")[1]
                const nature = getSidebar().find(l => l.startsWith("§a§lNATURE: ")).split("§a§lNATURE: ")[1]
                const elemental = getSidebar().find(l => l.startsWith("§2§lELEM: ")).split("§2§lELEM: ")[1]
                general[0] = `&eTeam Destroy`
                general.splice(1, 0, `&bWater: &7${water}`)
                general.splice(2, 0, `&cFire: &7${fire}`)
                general.splice(3, 0, `&aNature: &7${nature}`)
                general.splice(4, 0, `&2Elemental: &7${elemental}`)
            } if (scoreboard.find(l => l.startsWith("Coins: "))) {
                const coins = scoreboard.find(l => l.startsWith("Coins: ")).split("Coins: ")[1]
                general[general.indexOf("Coins: &cUnknown")] = Settings.hudTextColor + "Coins: &6" + coins
            } if (scoreboard.find(l => l.startsWith("Megacoins: "))) {
                const mgcoins = parseInt(scoreboard.find(l => l.startsWith("Megacoins: ")).split("Megacoins: ")[1].replace(/[,]/g, ""));
                if (isNaN(mgcoins)) megacoins = undefined
                else megacoins = mgcoins
            } if (scoreboard.find(l => l.startsWith("Gems: "))) {
                const ggems = parseInt(scoreboard.find(l => l.startsWith("Gems: ")).split("Gems: ")[1].replace(/[,]/g, ""))
                if (isNaN(ggems)) gems = undefined
                else gems = ggems
            } if (scoreboard.find(l => l.startsWith("MVP+: "))) {
                const mvpplus = scoreboard.find(l => l.startsWith("MVP+: ")).split("MVP+: ")[1]
                general.push(Settings.hudTextColor + "MVP+: &6" + mvpplus)
            } if (yummyTime()) {
                general.push(`${Settings.hudTextColor}Yummy Cookie: ${yummyTime()}`)
            } if (scoreboard.find(l => l.startsWith("Bounty: "))) {
                const bounty = scoreboard.find(l => l.startsWith("Bounty: ")).split("Bounty: ")[1]
                general.push(Settings.hudTextColor + "Bounty: &6" + bounty)
            } if (goldreq()) {
                if (Settings.toggleSimpleHUD) {
                    general[general.indexOf("GoldReq: &cUnknown &7(" + greqrefresh() + ")")] = Settings.hudTextColor + "GoldReq: &6" + formatNumber(Math.floor(goldreq())) + Settings.hudTextColor + "/&6" + formatNumber(Math.floor(goldreqmax()))
                } else {
                    general[general.indexOf("GoldReq: &cUnknown &7(" + greqrefresh() + ")")] = Settings.hudTextColor + "GoldReq: &6" + formatNumber(Math.floor(goldreq())) + "&r/&6" + formatNumber(Math.floor(goldreqmax())) + (goldreqmax() == 0 ? "" : " &7(" + (goldreq() / goldreqmax() * 100).toFixed(1) + "%)") + " &7(" + greqrefresh() + ")"
                }
            } if (megacoins) {
                general[general.indexOf(Settings.hudTextColor + "Megacoins: &cUnknown")] = Settings.hudTextColor + "Megacoins: &6" + formatNumber(megacoins);
            } if (gems) {
                general[general.indexOf(Settings.hudTextColor + "Gems: &cUnknown")] = Settings.hudTextColor + "Gems: &a" + formatNumber(gems);
            } if (extradamage > Date.now()) {
                general.push(Settings.hudTextColor + "Megastar: &c" + msToTime(extradamage - Date.now()));
            } if (Settings.toggleMajorandMinorEventHUD) {
                if (Settings.toggleSimpleHUD) {
                    if (nextmajor > Date.now() && majorname) general.push(`${Settings.hudTextColor}Next Major: &e${msToTime(nextmajor - Date.now())}, ${majorname}`)
                } else {
                    if (nextmajor > Date.now()) {
                        general.push(Settings.hudTextColor + "Next Major: &e" + msToTime(nextmajor - Date.now()));
                    } if (nextminor > Date.now()) {
                        general.push(Settings.hudTextColor + "Next Minor: &e" + msToTime(nextminor - Date.now()));
                    } if (majorname) {
                        general.push(Settings.hudTextColor + "Major Name: &e" + majorname);
                    }
                }
            }
            let streakers = worldotherplayers().filter(e => inMid(e) && (!e.getName().startsWith("§7") && !e.getName().startsWith("CIT-"))).length;
            if (streakers != 0) {
                general.push(Settings.hudTextColor + "Streakers: &c" + streakers);
            }

            if (Player.getHeldItem() && Player.getHeldItem().getNBT() && Player.getHeldItem().getNBT().toString().includes("kills:")) {
                let kills = Player.getHeldItem().getNBT().toString().split("kills:")[1].split(",")[0];
                general.push("Jewel Sword Kills: &3" + kills);
            }

            if (Player.asPlayerMP() && Player.asPlayerMP().getItemInSlot(2) && Player.asPlayerMP().getItemInSlot(2).getNBT() && Player.asPlayerMP().getItemInSlot(2).getNBT().toString().includes("kills:")) {
                let kills = Player.asPlayerMP().getItemInSlot(2).getNBT().toString().split("kills:")[1].split(",")[0];
                general.push("Jewel Pants Kills: &3" + kills);
            }
            general.splice(0, 0, [Settings.hudGroupColor + "&nGeneral Info"]);
            generallines = general;
        }, 0);
    });
}).start()

new Thread(() => {
    register("renderOverlay", () => {
        {
            if (!onSandbox() || !Settings.toggleSandboxHUD) return
            let str = []
            if (Settings.togglePreAlert && isPre() && !inSpawn(Player.asPlayerMP())) {
                str.push("&c&nYou are premega")
            }
            if (Settings.togglePreAlert && Player.getInventory().indexOf(138) == -1) str.push("&bNo Beacon")
            if (str.length > 0) {
                let text = new Text(str.join("&r   "))
                text.setX(preInfoHud.textX - (Renderer.getStringWidth(text.getString()) * 1.4 / 2))
                text.setY(preInfoHud.textY)
                text.setShadow(true)
                text.setScale(generalInfoHud.textScale * 1.4)
                text.draw()
            } else if (str.length == 0 && Settings.generalInfoHud.isOpen()) {
                new Text(`${Settings.hudGroupColor}&nPre Info`, preInfoHud.textX, preInfoHud.textY).setScale(generalInfoHud.textScale).setShadow(true).draw()
            }
        }; {
            if (Player.getHP() < 12 && Settings.toggleLowHealthHUD) Renderer.drawRect(Renderer.color(255, 0, 0, 30), 0, 0, Renderer.screen.getWidth(), Renderer.screen.getHeight());
            if (Settings.toggleSandboxHUD) {
                let general = generallines;
                let y = generalInfoHud.textY
                general.forEach(line => {
                    const text = new Text(line, 0, y);
                    text.setX(generalInfoHud.textX + (Renderer.screen.getWidth() / 10) - Renderer.getStringWidth(text.getString()) * generalInfoHud.textScale)
                    text.setScale(generalInfoHud.textScale)
                    text.setShadow(true)
                    text.draw()
                    y += 12 * generalInfoHud.textScale
                })
            }
        };
    });
}).start()