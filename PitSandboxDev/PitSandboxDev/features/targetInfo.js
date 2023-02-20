/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from '../config'

import { onSandbox } from '../functions/onSandbox'
import { getEnchants } from '../functions/enchant'
import { hasEnchant } from '../functions/enchant'
import { onlinePlayersFormatted } from "../functions/onlinePlayers"
import { getRoman } from "../functions/roman"
import { inMenu } from '../functions/inMenu'
import { pingColour } from '../functions/pingcolour'
import { runeColour } from '../functions/runecolour'

import { generalInfoHud } from './gui'
import { targetInfoHud } from "./gui"

let target = undefined
let targetexpire
let lsticks = 0
let allticks = 0
let swordenchants = ""
let pantenchants = ""
let pdamage = []
let tdamage = []

let lasthealth = Player.getHP() || 0

let worldotherplayers = World.getAllEntitiesOfType(Java.type("net.minecraft.client.entity.EntityOtherPlayerMP")).map(e => new EntityLivingBase(e.entity))
let worldentities = World.getAllEntities().map(e => e.entity instanceof Java.type("net.minecraft.entity.EntityLivingBase") ? new EntityLivingBase(e.entity) : e)

function sortEnchants(enchantment) {
    const enchant = formatEnchant(enchantment.replace(/[0-9]/g, ""))
    const level = getRoman(parseInt(enchantment.split("")[enchantment.length - 1]))
    return `&9${enchant} §9${level}`
}

const helmet = (info) => {
    if (!onSandbox() || !inMenu() || info == undefined) return ["None", "None"]
    let player = new EntityLivingBase(worldentities.find(e => e.getName() == info).entity)
    if (player.getItemInSlot(4) == null) return ["None", "None"]
    const NBT = ChatLib.removeFormatting(player.getItemInSlot(4).getNBT())
    if (!(ChatLib.removeFormatting(player.getItemInSlot(4).getNBT())).includes(':{rtype:"')) return ["None", "None"]
    if (ChatLib.removeFormatting(NBT.split(`rtype:"`)[1])) {
        if (ChatLib.removeFormatting(NBT.split(`rtype:"`)[1].split('"'))) {
            if (ChatLib.removeFormatting(NBT.split(`rrarity"`)[1])) {
                if (ChatLib.removeFormatting(NBT.split(`rrarity:"`)[1].split('"'))) {
                    const rune = ChatLib.removeFormatting(NBT.split(`rtype:"`)[1].split('"')[0])
                    const runeFormatted = rune.charAt(0).toUpperCase() + rune.slice(1)
                    return [runeFormatted, ChatLib.removeFormatting(NBT.split(`rrarity:"`)[1].split('"')[0])]
                } else return ["None", "None"]
            } else return ["None", "None"]
        } else return ["None", "None"]
    } else return ["None", "None"]
}

const chestplate = (info) => {
    if (!onSandbox() || !inMenu() || info == undefined) return ["None", "None"]
    let player = new EntityLivingBase(worldentities.find(e => e.getName() == info).entity)
    if (player.getItemInSlot(3) == null) return ["None", "None"]
    const NBT = ChatLib.removeFormatting(player.getItemInSlot(3).getNBT())
    if (!(ChatLib.removeFormatting(player.getItemInSlot(3).getNBT())).includes(':{rtype:"')) return ["None", "None"]
    if (ChatLib.removeFormatting(NBT.split(`rtype:"`)[1])) {
        if (ChatLib.removeFormatting(NBT.split(`rtype:"`)[1].split('"'))) {
            if (ChatLib.removeFormatting(NBT.split(`rrarity"`)[1])) {
                if (ChatLib.removeFormatting(NBT.split(`rrarity:"`)[1].split('"'))) {
                    const rune = ChatLib.removeFormatting(NBT.split(`rtype:"`)[1].split('"')[0])
                    const runeFormatted = rune.charAt(0).toUpperCase() + rune.slice(1)
                    return [runeFormatted, ChatLib.removeFormatting(NBT.split(`rrarity:"`)[1].split('"')[0])]
                } else return ["None", "None"]
            } else return ["None", "None"]
        } else return ["None", "None"]
    } else return ["None", "None"]
}

const boots = (info) => {
    if (!onSandbox() || !inMenu() || info == undefined) return ["None", "None"]
    let player = new EntityLivingBase(worldentities.find(e => e.getName() == info).entity)
    if (player.getItemInSlot(1) == null) return ["None", "None"]
    const NBT = ChatLib.removeFormatting(player.getItemInSlot(1).getNBT())
    if (!(ChatLib.removeFormatting(player.getItemInSlot(1).getNBT())).includes(':{rtype:"')) return ["None", "None"]
    if (ChatLib.removeFormatting(NBT.split(`rtype:"`)[1])) {
        if (ChatLib.removeFormatting(NBT.split(`rtype:"`)[1].split('"'))) {
            if (ChatLib.removeFormatting(NBT.split(`rrarity"`)[1])) {
                if (ChatLib.removeFormatting(NBT.split(`rrarity:"`)[1].split('"'))) {
                    const rune = ChatLib.removeFormatting(NBT.split(`rtype:"`)[1].split('"')[0])
                    const runeFormatted = rune.charAt(0).toUpperCase() + rune.slice(1)
                    return [runeFormatted, ChatLib.removeFormatting(NBT.split(`rrarity:"`)[1].split('"')[0])]
                } else return ["None", "None"]
            } else return ["None", "None"]
        } else return ["None", "None"]
    } else return ["None", "None"]
}

function formatEnchant(enchant) {
    // Pants
    // Rare
    if (enchant == 'assassin') return '&dAssassin'
    else if (enchant == 'attrative') return '&dAttractive'
    else if (enchant == 'comboladder') return '&dCombo: Ladder'
    else if (enchant == 'divine') return '&dDivine Miracle'
    else if (enchant == 'leap') return '&dLeap'
    else if (enchant == 'resistance') return '&dResistance'
    else if (enchant == 'rgm') return '&dRGM'
    else if (enchant == 'solitude') return '&dSolitude'
    // Regular
    else if (enchant == 'absorber') return 'Absorber'
    else if (enchant == 'booboo') return 'Boo-boo'
    else if (enchant == 'critfunky') return 'Crit Funky'
    else if (enchant == 'dag') return 'David and Goliath'
    else if (enchant == 'electrolytes') return 'Electrolytes'
    else if (enchant == 'frac') return 'Frac'
    else if (enchant == 'goldenheart') return 'Golden Heart'
    else if (enchant == 'laststand') return 'Last Stand'
    else if (enchant == 'mirror') return '&4Mirror'
    else if (enchant == 'notgladiator') return '"Not" Glad'
    else if (enchant == 'pebble') return 'Pebble'
    else if (enchant == 'peroxide') return 'Peroxide'
    else if (enchant == 'prick') return 'Prick'
    else if (enchant == 'protection') return 'Protection'
    else if (enchant == 'ringarmor') return 'Ring Armor'
    // Swords
    // Rare
    else if (enchant == 'billionaire') return '&dBillionaire'
    else if (enchant == 'comboperun') return "&dPerun's Wrath"
    else if (enchant == 'combostun') return '&dCombo: Stun'
    else if (enchant == 'executioner') return '&dExecutioner'
    else if (enchant == 'gamble') return '&dGamble'
    else if (enchant == 'healer') return '&dHealer'
    else if (enchant == 'hemorrage') return '&dHemorrage'
    // Regular
    else if (enchant == 'beatthespammers') return 'Beat the Spammers'
    else if (enchant == 'berserker') return 'Berserker'
    else if (enchant == 'bruiser') return 'Bruiser'
    else if (enchant == 'bullettime') return 'Bullet Time'
    else if (enchant == 'combodamage') return 'Combo: Damage'
    else if (enchant == 'comboheal') return 'Combo: Heal'
    else if (enchant == 'comboswift') return 'Combo: Swift'
    else if (enchant == 'diamondstomp') return 'Diamond Stomp'
    else if (enchant == 'fancyraider') return 'Fancy Raider'
    else if (enchant == 'goldandboosted') return 'Gold and Boosted'
    else if (enchant == 'huntthehunter') return 'Hunt the Hunter'
    else if (enchant == 'kingbuster') return 'King Buster'
    else if (enchant == 'knockback') return 'Knockback'
    else if (enchant == 'lifesteal') return 'Lifesteal'
    else if (enchant == 'painfocus') return 'Pain Focus'
    else if (enchant == 'punisher') return 'Punisher'
    else if (enchant == 'shark') return 'Shark'
    else if (enchant == 'sharp') return 'Sharp'
    // Bows
    // Rare
    else if (enchant == 'aimassist') return '&dAim Assist'
    else if (enchant == 'explosive') return '&dExplosive'
    else if (enchant == 'luckyshot') return '&dLucky Shot'
    else if (enchant == 'megalongbow') return '&dMega Longbow'
    else if (enchant == 'pullbow') return '&dPullbow'
    else if (enchant == 'robinhood') return '&8Robinhood'
    else if (enchant == 'telebow') return '&dTelebow'
    else if (enchant == 'trueshot') return '&dTrue Shot'
    else if (enchant == 'volley') return '&dVolley'
    // Regular
    else if (enchant == 'chipping') return 'Chipping'
    else if (enchant == 'fletching') return 'Fletching'
    else if (enchant == 'ftts') return 'Ftts'
    else if (enchant == 'pcts') return 'Pcts'
    else if (enchant == 'pindown') return 'Pin down'
    else if (enchant == 'sprintdrain') return 'Sprint Drain'
    else if (enchant == 'wasp') return 'Wasp'
    // Resource
    else if (enchant == 'sweaty') return '&bSweaty'
    else if (enchant == 'gboost') return '&6Gold Boost'
    else if (enchant == 'gbump') return '&6Gold Bump'
    else if (enchant == 'moctezuma') return '&6Moctezuma'
    else if (enchant == 'selfcheck') return '&6Self Checkout'
    else if (enchant == 'xpboost') return '&bXP Boost'
    else if (enchant == 'xpbump') return '&bXP Bump'
    // Failsafe
    else return '&cError'
}

register("actionBar", event => {
    let msg = ChatLib.removeFormatting(ChatLib.getChatMessage(event));
    if (!onSandbox()) return
    if (msg.includes("❤❤❤❤❤❤❤❤❤❤❤❤")) {
        let player = msg.split(" ")[0]
        if (player.startsWith("~")) return
        targetexpire = Date.now() + 30000
        if (target != player) target = player, allticks = 0, lsticks = 0, swordenchants = "", pantenchants = "", tdamage = [], pdamage = [];
        let health = parseFloat(msg.split(" ").find(m => m.endsWith("HP") && !m.includes("LS")).replace("HP", ""))
        tdamage.push(health)
        if (tdamage.length > 5) tdamage.shift()
    }
    if (!Settings.toggleGPassiveSound) return;
    if (ChatLib.removeFormatting(ChatLib.getChatMessage(event)).includes("Couldn't hit") && parseFloat(Settings.guildPassivePitch) && parseFloat(Settings.guildPassivePitch) != NaN ? World.playSound(Settings.guildPassiveSound, 1, parseFloat(Settings.guildPassivePitch)) : undefined);
})

new Thread(() => {
    register('tick', () => {
        if (!onSandbox()) return worldentities = [], worldotherplayers = []
        if (lasthealth > Player.getHP() && target) {
            pdamage.push((Player.getHP() - lasthealth));
            if (pdamage.length > 5) pdamage.shift();
            lasthealth = Player.getHP();
        } else if (!target) {
            lasthealth = Player.getHP();
            pdamage = [];
        } else {
            lasthealth = Player.getHP();
        }
    })
}).start()

new Thread(() => {
    setTimeout(() => {
        register('tick', () => {
            if (target && targetexpire && Date.now() >= targetexpire) return target = undefined, targetexpire = undefined, allticks = 0, lsticks = 0, swordenchants = "", pantenchants = "", tdamage = [], pdamage = [];
            if (!worldotherplayers.find(p => p.getName() == target)) return target = undefined, targetexpire = undefined, allticks = 0, lsticks = 0, swordenchants = "", pantenchants = "", tdamage = [], pdamage = [];
            let player = new EntityLivingBase(worldentities.find(e => e.getName() == target).entity);
            if (player.getItemInSlot(2) && player.getItemInSlot(2).getNBT() && player.getItemInSlot(2).getID() == 300 && getEnchants(player.getItemInSlot(2).getNBT())) {
                let pants = []
                for (let i = 0; i < getEnchants(player.getItemInSlot(2).getNBT()).length; i++) {
                    pants.push(sortEnchants(getEnchants(player.getItemInSlot(2).getNBT())[i]))
                }
                pantenchants = pants.join("&7, ")
            } else if (player.getItemInSlot(2) == null) {
                pantenchants = "&cNone"
            } else {
                pantenchants = player.getItemInSlot(2).getName()
            }
            if (player.getItemInSlot(0) && player.getItemInSlot(0).getNBT() && (player.getItemInSlot(0).getID() == 283 || player.getItemInSlot(0).getID() == 261) && getEnchants(player.getItemInSlot(0).getNBT())) {
                let held = []
                for (let i = 0; i < getEnchants(player.getItemInSlot(0).getNBT()).length; i++) {
                    held.push(sortEnchants(getEnchants(player.getItemInSlot(0).getNBT())[i]))
                }
                swordenchants = held.join("&7, ")
                if (player.getItemInSlot(0).getID() == 283) {
                    if (hasEnchant("lifesteal", player.getItemInSlot(0).getNBT()) /* && hasEnchant("billionaire", player.getItemInSlot(0).getNBT()) */) {
                        lsticks++;
                        allticks++;
                    } else {
                        allticks++;
                    }
                }
            } else if (player.getItemInSlot(0) == null) {
                swordenchants = "&cNone"
            } else {
                swordenchants = player.getItemInSlot(0).getName()
            }
        })
    }, 0)
}).start()

new Thread(() => {
    register("renderOverlay", () => {
        if (!onSandbox() && !inMenu()) return; {
            if (Settings.targetInfo && target) {
                let first = false
                let lines = []
                let runes = []
                let name
                //let tabp = onlinePlayersFormatted.find(t => ChatLib.removeFormatting(t.split(" ")[1]) == target)
                const NetHandlerPlayClient = Client.getConnection()
                const PlayerMap = NetHandlerPlayClient.func_175106_d()
                const ping = (PlayerMap.find(p => p.func_178845_a().name == target) ? PlayerMap.find(p => p.func_178845_a().name == target).func_178853_c() : "?");
                /* if (target && !first) {
                    name = tabp.split(" ")[1]
                    if (helmet(target)[0] != "None") {
                        runes.push(runeColour(helmet(target)[1]) + helmet(target)[0])
                    } if (chestplate(target)[0] != "None") {
                        runes.push(runeColour(chestplate(target)[1]) + chestplate(target)[0])
                    } if (boots(target)[0] != "None") {
                        runes.push(runeColour(boots(target)[1]) + boots(target)[0])
                    }
                    first = true
                } */
                lines.push(`${Settings.hudTextColor}Name: &b${target} &7Ping: ${pingColour(ping)}${ping}ms`)
                lines.push(`${Settings.hudTextColor}Held Item: ${swordenchants}`)
                lines.push(`${Settings.hudTextColor}Pants: ${pantenchants}`)
                //lines.push(`${Settings.hudTextColor}Runes: ${runes.length == 0 ? "&cNone" : runes.join("&7, ")}`)
                lines.push(`${Settings.hudTextColor}Maining LS: ${(allticks < 60 ? "&cWaiting..." : (lsticks / allticks > 0.8 ? "&2A lot" : (lsticks / allticks > 0.6 ? "&aMost of the time" : (lsticks / allticks > 0.4 ? "&6Less than half the time" : "&cNo"))))}`)
                let y = targetInfoHud.textY
                let x = targetInfoHud.textX
                lines.forEach(line => {
                    const text = new Text(line, x, y)
                    text.setShadow(true)
                    text.draw()
                    y += 12
                });
            } else if (!target && Settings.generalInfoHud.isOpen()) {
                new Text(`${Settings.hudGroupColor}&nTarget Info`, targetInfoHud.textX, targetInfoHud.textY).setScale(generalInfoHud.textScale).setShadow(true).draw()
            } if (Settings.combatLog) {
                lines = tdamage.map(d => "&c" + ((d.toString().split(".")[1] ? (d.toString().split(".")[1].length > 2 ? d.toFixed(2) : d) : d)) + "HP");
                y = Renderer.screen.getHeight() - 12 * tdamage.length - 1;
                x = Renderer.screen.getWidth() / 4 * 1.46;
                lines.forEach(line => {
                    const text = new Text(line, x, y);
                    text.setShadow(true);
                    text.draw();
                    y += 12;
                });
                lines = pdamage.map(d => "&c" + ((d.toString().split(".")[1] ? (d.toString().split(".")[1].length > 2 ? d.toFixed(2) : d) : d)) + "HP");
                y = Renderer.screen.getHeight() - 12 * pdamage.length - 1
                x = Renderer.screen.getWidth() / 4 * 2.40
                lines.forEach(line => {
                    const text = new Text(line, x, y)
                    text.setShadow(true)
                    text.draw()
                    y += 12
                })
            }
        } {

        } {

        }
    })
}).start()