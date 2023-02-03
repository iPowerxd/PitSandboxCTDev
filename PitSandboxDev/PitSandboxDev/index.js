/// <reference types="../CTAutocomplete" />sandbox
/// <reference lib="es2015" />
import PogObject from "../PogData"
import Changelog from "../ChangelogLib"
import Settings from './config'
register("command", Settings.openGUI).setName("pitsandbox").setAliases(["ps"]);

const isInMainServer = () => {
    let name = ChatLib.removeFormatting(Player.getDisplayName().getText())
    if (name.split(" ").length < 2) return false
    name = name.split(" ")[0]
    if (name.includes("[")) {
        if (/^\[[0-9]{1,3}\]$/g.test(name.split(" ")[0])) return true;
        else return false
    } else {
        if (World.getBlockAt(-14, 96, 0).toString().includes("enchanting_table")) onKingsMap = true
        else onKingsMap = false
        return true
    }
}
const playerAutocomplete = args =>
    TabList.getUnformattedNames()
        .filter(n =>
            n.toLowerCase().startsWith(args.length ? args[args.length - 1].toLowerCase() : "") && !n.includes("§") && !n.startsWith("CIT-")
        ).sort();

const huntCmdAutocomplete = args =>
    args.length && args.length > 1 ?
        TabList.getUnformattedNames()
            .filter(n =>
                n.toLowerCase().startsWith(args.length ? args[args.length - 1].toLowerCase() : "") && !n.includes("§") && !n.startsWith("CIT-")
            ).sort() : ["add", "remove", "list", "clear"].filter(n => n.toLowerCase().startsWith(args.length ? args[args.length - 1].toLowerCase() : "")).sort();

const msToTime = (s, showms = false) => {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    if (!ms || !showms) return (hrs != 0 ? hrs + 'h ' : "") + (mins != 0 ? mins + 'm ' : "") + secs.toFixed(0) + "s";
    else if (showms) return (hrs != 0 ? hrs + 'h ' : "") + (mins != 0 ? mins + 'm ' : "") + secs.toFixed(0) + '.' + Math.floor(ms / 10) + "s";
};

const formatNumber = (number) => {
    number = number + '';
    x = number.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
};

const romanToInt = (str) => {
    const roman = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    };
    let num = 0;
    if (str.includes('CM')) num -= 200;
    if (str.includes('CD')) num -= 200;
    if (str.includes('XC')) num -= 20;
    if (str.includes('XL')) num -= 20;
    if (str.includes('IX')) num -= 2;
    if (str.includes('IV')) num -= 2;
    for (var i = 0; i < str.length; i++) {
        num += roman[str[i]];
    }
    return num;
};

const getRoman = (num) => {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
            "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
            "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"
        ],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
};
let pitsandbox = (Server.getIP().toLowerCase().includes("harrys.network") || Server.getIP().toLowerCase().includes("pitsandbox.io") || Server.getIP().toLowerCase().includes("harrys.gg")) && isInMainServer()
const prestigeinfo = ["§7", "§9", "§9", "§9", "§9", "§e", "§e", "§e", "§e", "§e", "§6", "§6", "§6", "§6", "§6", "§c", "§c", "§c", "§c", "§c", "§5", "§5", "§5", "§5", "§5", "§d", "§d", "§d", "§d", "§d", "§f", "§f", "§f", "§f", "§f", "§b", "§b", "§b", "§b", "§b", "§a", "§a", "§a", "§a", "§a", "§4", "§4", "§4", "§4", "§4", "§3", "§3", "§3", "§3", "§3", "§2", "§2", "§2", "§2", "§2", "§1"];
const prestigexp = [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.75, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 45, 50, 75, 100, 101, 202, 303, 404, 505, 606, 707, 808, 909, 1010, 1111, 1212, 1313, 1414, 1515, 3030, 4545, 6060, 7575, 9090, 18180, 27270, 36360, 45450, 54540, 109080, 218160, 436320, 872640, 1745280]
let sidebar = [];
let gems = undefined;
let megacoins = undefined;
let streak = 0;
let streakkills = 0;
let autoSuperegg = false
let autoStackBread = false
const xpneeded = [15, 30, 50, 75, 125, 300, 600, 800, 900, 1000, 1200, 1500];
const totalxpnopres = 65950;
let rngdamage = Date.now();
let hunting = undefined;
let rawstreak = undefined;
let blitzmsg = Date.now();
let shark = 0;
let lastendstreak = 0;
let nextmajor = Date.now();
let nextminor = Date.now();
let majorname = undefined;
let laststreakchange = Date.now();
let lastslot = undefined;
/* let autogg = true; */
let rightclicking = false;
let nols = false;
let lasteggslot = 0;
let generallines = [];
let streakinglines = [];
let huntinglines = [];
let sixtimescoins = 0;
let lastrenderdistance = Client.settings.getSettings().field_151451_c;
let worldentities = World.getAllEntities().map(e => e.entity instanceof Java.type("net.minecraft.entity.EntityLivingBase") ? new EntityLivingBase(e.entity) : e);
let worldotherplayers = World.getAllEntitiesOfType(Java.type("net.minecraft.client.entity.EntityOtherPlayerMP")).map(e => new EntityLivingBase(e.entity));
let onetapbots = 0;
let halfhitdelay = 0;
let goldreq = undefined;
let goldreqmax = undefined;
let nomvp = false;
let lastunscramble = 0;
let lastquickmath = 0;
let greqrefresh = 5;
let extradamage = Date.now();
let startstreaktime = undefined;
let lastbubble = 0;
let lastsplashsound = 0;
let lasthookmotion = 0;
let lastalert = 0;
let streaking = false;
let namecache = {}
let useEggs = new KeyBind("Use All Eggs", "", "!PitSandbox")
let toggleSuperegg = new KeyBind("Toggle Auto SuperEgg", "", "!PitSandbox")
let toggleStackBread = new KeyBind("Toggle Auto Bread", "", "!PitSandbox")
let target = undefined;
let targetexpire = undefined;
let lsticks = 0;
let allticks = 0;
let swordenchants = "";
let pantenchants = "";
let pdamage = [];
let tdamage = [];
let lasthealth = Player.getHP() || 0;
let airblockcd = 0;
let currentstreak = {
    killgold: 0,
    assgold: 0,
    othergold: 0,
    killxp: 0,
    assxp: 0,
    otherxp: 0,
    other: []
};
let huntingKey = new KeyBind("Toggle Hunting", "", "!PitSandbox");
let toggleBots = new KeyBind("Toggle Bots", "", "!PitSandbox");
let airBlock = new KeyBind("Create Ghost Air", "", "!PitSandbox");
let huntedPlayers = JSON.parse(FileLib.read("PitSandboxDev", "huntedPlayers.json"));
let huntedGuilds = JSON.parse(FileLib.read("PitSandboxDev", "huntedGuilds.json"));
let ignoredPlayers = [];
if (!FileLib.exists("PitSandboxDev", "ignoredPlayers.json")) FileLib.write("PitSandboxDev", "ignoredPlayers.json", "[]");
else ignoredPlayers = JSON.parse(FileLib.read("PitSandboxDev", "ignoredPlayers.json"));
let onlinePlayers = TabList.getUnformattedNames().filter(n => !n.includes("§") && !n.startsWith("CIT-"));
let onlinePlayersFormatted = TabList.getNames().filter(n => n.split(" ").length > 1);
let onlineHunt = huntedPlayers.filter(n => onlinePlayers.includes(n));
let onlineHuntGuild = onlinePlayersFormatted.filter(n => n.split(" ")[2] && huntedGuilds.includes(ChatLib.removeFormatting(n.split(" ")[2].replace(/[\[\]]/g, "")).toUpperCase())).map(n => ChatLib.removeFormatting(n.split(" ")[1]));
const BlockPos1 = Java.type("net.minecraft.util.BlockPos");
const C08 = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement");
const S01 = Java.type("net.minecraft.network.play.server.S01PacketJoinGame");
const S47 = Java.type("net.minecraft.network.play.server.S47PacketPlayerListHeaderFooter");
const C17 = Java.type("net.minecraft.network.play.client.C17PacketCustomPayload");
const PacketBuffer = Java.type("net.minecraft.network.PacketBuffer");
let Unpooled = Java.type("io.netty.buffer.Unpooled");
let onKingsMap
let solisBroken
let soliLevel


const NBTTagString = Java.type("net.minecraft.nbt.NBTTagString");
let KeyBinding = Java.type("net.minecraft.client.settings.KeyBinding");



let syncperks
let autoSyncCooldown
let spawn
let autoSyncperks = false
let perks = JSON.parse(FileLib.read("PitSandboxDev", "perks.json")).sort()


const getMegaColor = (mega) => {
    if (mega == "Overdrive") return "&c"
    else if (mega == "Highlander") return "&6"
    else if (mega == "To the Moon") return "&b"
    else if (mega == "Uberstreak") return "&d"
    else if (mega == "Grand Finale") return "&e"
    else if (mega == "Nightmare") return "&1"
    else if (mega == "Hermit") return "&9"
    else return "&7"
}

const getPerk = (NBT) => {
    if (ChatLib.removeFormatting(NBT.split("Selected: ")[1])) {
        if (ChatLib.removeFormatting(NBT.split("Selected: ")[1].split('"]'))) {
            let perk = ChatLib.removeFormatting(NBT.split("Selected: ")[1].split('"]')[0]).split(" I")
            if (perk == "Nothing") return ["Nothing", 0]
            switch (perk[1]) {
                case "":
                    perk[1] = 1
                    return perk
                case "I":
                    perk[1] = 2
                    return perk
                case "II":
                    perk[1] = 3
                    return perk
            }
        }
    } else return false
}

const getKillStreaks = () => {
    let NBT = Player.getContainer().getStackInSlot(23).getNBT().toString()
    let killstreak1
    let killstreak2
    let killstreak3
    if (ChatLib.removeFormatting(NBT.split("Killstreak #1:")[1])) {
        if (ChatLib.removeFormatting(NBT.split("Killstreak #1: ")[1].split('",2:'))) {
            killstreak1 = ChatLib.removeFormatting(NBT.split("Killstreak #1: ")[1].split('",2:"')[0])
        }
    } if (ChatLib.removeFormatting(NBT.split("Killstreak #2:")[1])) {
        if (ChatLib.removeFormatting(NBT.split("Killstreak #2: ")[1].split('",3:'))) {
            killstreak2 = ChatLib.removeFormatting(NBT.split("Killstreak #2: ")[1].split('",3:"')[0])
        }
    } if (ChatLib.removeFormatting(NBT.split("Killstreak #3:")[1])) {
        if (ChatLib.removeFormatting(NBT.split("Killstreak #3: ")[1].split('",2:'))) {
            killstreak3 = ChatLib.removeFormatting(NBT.split("Killstreak #3: ")[1].split('"],')[0])
            return ([killstreak1, killstreak2, killstreak3])
        }
    }
    return undefined
}

const getMegastreak = () => {
    let NBT = Player.getContainer().getStackInSlot(23).getNBT().toString()
    if (ChatLib.removeFormatting(NBT.split("Megastreak: ")[1])) {
        if (ChatLib.removeFormatting(NBT.split("Megastreak: ")[1]).split('",1:"')) {
            return ChatLib.removeFormatting(NBT.split("Megastreak: ")[1]).split('",1:"')[0]
        }
    }
}

/* const getBlessing = () => {
    let NBT = Player.getContainer().getStackInSlot(22).getNBT().toString()
    let blessing
    let level
    if (Player.getContainer().getStackInSlot(22).getNBT().toString() == null) return "None"
    if (ChatLib.removeFormatting(NBT.split("Selected Blessing: ")[1])) {
        if (ChatLib.removeFormatting(NBT.split("Selected Blessing: ")[1]).split('"}},')) {
            blessing = ChatLib.removeFormatting(NBT.split("Selected Blessing: ")[1]).split('"}},')[0]
        } if (ChatLib.removeFormatting(NBT.split("Level: ")[1])) {
            if (ChatLib.removeFormatting(NBT.split("Level: ")[1]).split('"],Name')) {
                level = ChatLib.removeFormatting(NBT.split("Level: ")[1]).split('"],Name')[0]
            }
        }
    } else blessing = "None", level = "None"
    return [blessing, level]
} */

const hasPerk = (perk) => {
    for (let i = 0; i < 3; i++) {
        if (perks[0][i].includes(perk)) return perks[0][i][1]
    } return 0
}

function playerInfo(player) {
    for (let i = 0; i < onlinePlayers.length; i++) {
        if (player == onlinePlayers[i]) {
            if (onlinePlayersFormatted[i] == undefined) return ["§7" + onlinePlayers[i]];
            else return onlinePlayersFormatted[i].split(" ");
        }
    }
}

function getMega(player) {
    let info = playerInfo(player);
    if (info[0].includes("OVRDRV")) return "overdrive";
    else if (info[0].includes("HIGH")) return "highlander";
    else if (info[0].includes("MOON")) return "moon";
    else if (info[0].includes("UBER100")) return "uberstreak100";
    else if (info[0].includes("UBER200")) return "uberstreak200";
    else if (info[0].includes("UBER300")) return "uberstreak300";
    else if (info[0].includes("UBER400")) return "uberstreak400";
    else if (info[0].includes("NGHTMRE")) return "nightmare";
    else if (info[0].includes("HERMIT")) return "hermit";
    else return "premega";
}

function getMegaFormatted(player) {
    let mega = getMega(player);
    if (mega == "overdrive") return ("&cOverdrive");
    else if (mega == "highlander") return ("&6Highlander");
    else if (mega == "moon") return ("&bTo the Moon");
    else if (mega == "uberstreak100") return ("&dUberstreak100");
    else if (mega == "uberstreak200") return ("&dUberstreak200");
    else if (mega == "uberstreak300") return ("&dUberstreak300");
    else if (mega == "uberstreak400") return ("&dUberstreak400");
    else if (mega == "nightmare") return ("&1Nightmare");
    else if (mega == "hermit") return ("&9Hermit");
    else return "&cPremega";
}

let firstSync = false

register("command", () => {
    if (!pitsandbox) return
    ChatLib.command("view " + Player.getName())
    syncperks = true
}).setName("syncperks")

register("command", () => {
    ChatLib.command("syncperks", true)
    setTimeout(() => {
        ChatLib.chat("\n&c&lMegastreak: &b" + perks[2][0] + "\n\n&cPerks: &b" + perks[0][0][0] + " " + perks[0][0][1] + ", " + perks[0][1][0] + " " + perks[0][1][1] + ", " + perks[0][2][0] + " " + perks[0][2][1] + "\n\n&cKillstreaks:&b" + perks[1][0] + ", " + perks[1][1] + ", " + perks[1][2] + "\n")
    }, 400)
}).setName("perks")

register("worldLoad", () => {
    welcome()
})

register("guiOpened", event => {
    if (!pitsandbox || !syncperks) return
    setTimeout(() => {
        if (ChatLib.removeFormatting(Player.getContainer().getName()).startsWith("Viewing " + Player.getName())) {
            let perk1 = getPerk(Player.getContainer().getStackInSlot(13).getNBT().toString())
            let perk2 = getPerk(Player.getContainer().getStackInSlot(14).getNBT().toString())
            let perk3 = getPerk(Player.getContainer().getStackInSlot(15).getNBT().toString())
            let killstreaks = getKillStreaks()
            let megastreak = getMegastreak()
            /* let blessing = getBlessing() */
            perks = [[perk1, perk2, perk3], killstreaks, [megastreak]]//, blessing
            FileLib.write("PitSandboxDev", "perks.json", JSON.stringify(perks))
            Client.scheduleTask(0, () => {
                Client.getCurrentGui().close()
            })
            ChatLib.chat("&aPerks synced.")
            syncperks = undefined
            firstSync = true
        }
    }, 100)
})


register("guiOpened", event => {
    if (!pitsandbox) return
    setTimeout(() => {
        if (ChatLib.removeFormatting(Player.getContainer().getName()).startsWith("Upgrades")) {
            if (!autoSyncperks) autoSyncperks = true
        }
    }, 100)
})

register("tick", () => {
    if (!pitsandbox) return
    if (inSpawn(Player.asPlayerMP()) && !spawn) {
        spawn = true
    } else if (!inSpawn(Player.asPlayerMP()) && spawn) {
        spawn = undefined
        if ((!autoSyncCooldown || Date.now() - autoSyncCooldown > 3000) && autoSyncperks) {
            autoSyncCooldown = Date.now()
            ChatLib.command("view " + Player.getName())
            syncperks = true
            autoSyncperks = false
        }
    }
})

register("renderOverlay", () => {
    if (!pitsandbox) return
    let info = [`${Settings.hudGroupColor}&nUpgrades`]
    if (!firstSync || perks[2][0] == 'DO /SYNCPERKS') {
        info.splice(1, 0, `&7DO /SYNCPERKS`)
    } else if (perks[2][0] != 'DO /SYNCPERKS') {
        if (perks[0][0][0] != "Nothing") info.splice(2, 0, "&c" + (perks[0][0][0] == "Nothing" ? "" : perks[0][0][0] + "&7 " + perks[0][0][1]))
        if (perks[0][1][0] != "Nothing") info.splice(3, 0, "&c" + (perks[0][1][0] == "Nothing" ? "" : perks[0][1][0] + "&7 " + perks[0][1][1]))
        if (perks[0][1][0] != "Nothing") info.splice(4, 0, "&c" + (perks[0][2][0] == "Nothing" ? "" : perks[0][2][0] + "&7 " + perks[0][2][1]))
        if (perks[1][0] != "Nothing") info.splice(5, 0, "&6" + (perks[1][0] == "Nothing" ? "" : perks[1][0]))
        if (perks[1][1] != "Nothing") info.splice(6, 0, "&6" + (perks[1][1] == "Nothing" ? "" : perks[1][1]))
        if (perks[1][2] != "Nothing") info.splice(7, 0, "&6" + (perks[1][2] == "Nothing" ? "" : perks[1][2]))
        //if (perks[3][0] != "Nothing") info.splice(8, 0, "&a" + perks[3][0] + (perks[3][1] == "None" ? "" : "&7 " + perks[3][1]))
    }
    let y = upgradesInfoHud.textY
    info.forEach(line => {
        const text = new Text(line, upgradesInfoHud.textX, y)
        text.setShadow(true)
        text.setScale(generalInfoHud.textScale)
        y += 11.5 * generalInfoHud.textScale
        if (info.length > 1 || Settings.generalInfoHud.isOpen()) text.draw()
    })
})


register("worldLoad", () => {
    inMenu = true
})

register("worldUnload", () => {
    inMenu = undefined
    autoSyncperks = true
})
let inMenu = undefined
const isPre = () => {
    let nametag = ChatLib.removeFormatting(Player.getDisplayName().getText().split(" ")[0]);
    if (nametag.includes("[")) return true;
    else if (nametag.startsWith("UBER") && !nametag.endsWith("400")) return true;
    else return false;
};

const getEnchants = (nbt) => {
    if (!pitsandbox) return
    if (nbt) {
        if (nbt.toString().split("enchants:")[1]) {
            if (nbt.toString().split("enchants:")[1].split("}\"")[0] || nbt.toString().split("enchants:")[1].split("}")[0]) {
                let enchants = nbt.toString().split("enchants:")[1].split("}\"")[0].split("}")[0].replace(/[{}"\\:]/g, "").replace(/(1b)/g, "");
                if (!enchants.includes(",")) {
                    return [enchants];
                } else {
                    return enchants.split(",");
                }
            }
        }
    }
};

const hasEnchant = (enchant, nbt) => {
    if (getEnchants(nbt)) {
        if (getEnchants(nbt).find(e => enchant == e.substring(0, e.length - 1))) {
            return parseInt(getEnchants(nbt).find(e => enchant == e.substring(0, e.length - 1)).substring(getEnchants(nbt).find(e => enchant == e.substring(0, e.length - 1)).length - 1, getEnchants(nbt).find(e => enchant == e.substring(0, e.length - 1)).length));
        }
    }
};

const inMid = entity => {
    if (entity && Math.sqrt(entity.getEntity().func_174831_c(new BlockPos1(0.5, entity.getY(), 0.5))) < Settings.midRadius) {
        if (entity.getY() > 70 && entity.getY() < 95) {
            return true;
        }
    }
    return false;
};

const inSpawn = entity => {
    if (!onKingsMap) {
        if (Math.sqrt(entity.getEntity().func_174831_c(new BlockPos1(0.5, entity.getY(), 0.5))) < 33) {
            if (entity.getY() > 94 && entity.getY() < 140) {
                return true;
            }
        }
        return false;
    } else {
        if (Math.sqrt(entity.getEntity().func_174831_c(new BlockPos1(0.5, entity.getY(), 0.5))) < 33) {
            if (entity.getY() > 90 && entity.getY() < 130) {
                return true
            }
        }
        return false
    }
}

const storeSidebar = () => {
    if (Scoreboard.getLines(false).length > 0) {
        sidebar = Scoreboard.getLines(false).map(l => l.getName());
    }
};

const getSidebar = () => {
    if (Scoreboard.getLines(false).length > 0) {
        return Scoreboard.getLines(false).map(l => l.getName());
    } else {
        return sidebar;
    }
};

const getBrackets = (lvl, pres, full = false) => {
    let lvlc = "";
    if (lvl == 120) {
        lvlc = "&b&l";
    } else if (lvl > 109) {
        lvlc = "&f&l";
    } else if (lvl > 99) {
        lvlc = "&d&l";
    } else if (lvl > 89) {
        lvlc = "&5&l";
    } else if (lvl > 79) {
        lvlc = "&4&l";
    } else if (lvl > 69) {
        lvlc = "&c&l";
    } else if (lvl > 59) {
        lvlc = "&6&l";
    } else if (lvl > 49) {
        lvlc = "&e";
    } else if (lvl > 39) {
        lvlc = "&a";
    } else if (lvl > 29) {
        lvlc = "&2";
    } else if (lvl > 19) {
        lvlc = "&3";
    } else if (lvl > 9) {
        lvlc = "&9";
    } else {
        lvlc = "&7";
    }
    const presc = prestigeinfo[pres];
    if (full) {
        if (pres != 0) {
            return `${presc}[&e${getRoman(pres)}${presc}-${lvlc}${lvl}${presc}]`;
        } else {
            return getBrackets(lvl, pres, false);
        }
    } else {
        return `${presc}[${lvlc}${lvl}${presc}]`;
    }
};

function strToUtf8Bytes(str) {
    const utf8 = [];
    for (let ii = 0; ii < str.length; ii++) {
        let charCode = str.charCodeAt(ii);
        if (charCode < 0x80) utf8.push(charCode);
        else if (charCode < 0x800) {
            utf8.push(0xc0 | (charCode >> 6), 0x80 | (charCode & 0x3f));
        } else if (charCode < 0xd800 || charCode >= 0xe000) {
            utf8.push(0xe0 | (charCode >> 12), 0x80 | ((charCode >> 6) & 0x3f), 0x80 | (charCode & 0x3f));
        } else {
            ii++;



            charCode = 0x10000 + (((charCode & 0x3ff) << 10) | (str.charCodeAt(ii) & 0x3ff));
            utf8.push(
                0xf0 | (charCode >> 18),
                0x80 | ((charCode >> 12) & 0x3f),
                0x80 | ((charCode >> 6) & 0x3f),
                0x80 | (charCode & 0x3f),
            );
        }
    }
    return utf8;
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

    if (startstreaktime && streakkills) {
        let kps = Math.floor(streakkills / ((Date.now() - startstreaktime) / 1000) * 10) / 10;
        let kpm = formatNumber(Math.floor(streakkills / ((Date.now() - startstreaktime) / 1000 / 60)));
        let kph = formatNumber(Math.floor(streakkills / ((Date.now() - startstreaktime) / 1000 / 60 / 60)));
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
    streakkills = 0;
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
    lastendstreak = Date.now()
    streaking = false
    strengthCount = 0
    strengthTimer = 0
    bodybuilderDamage = 0
    recapStreak()
}


let sent = false;


/* register("packetSent", (packet, event) => {
    if (!pitsandbox) return
    if (packet instanceof C17 && !sent) {w

        cancel(event);
        sent = true;
        let message = Unpooled.buffer();
        var b = new (Java.type("java.io.ByteArrayOutputStream"))();
        var bytes = strToUtf8Bytes(Settings.clientBrand.length ? Settings.clientBrand : "Feather Forge");
        b.write(9);
        bytes.map(byte => b.write(byte));
        message.writeBytes(b.toByteArray());

        Client.sendPacket(new C17("MC|Brand", new PacketBuffer(message)));

        ChatLib.chat("Sent C17 " + new PacketBuffer(message));
    }
});
 */
register("packetReceived", (packet, event) => {
    if (!pitsandbox) return;
    if (packet instanceof S47) {
        cancel(event);
        TabList.setFooter(packet.func_179701_b().func_150260_c().split("\n").map(line => ChatLib.removeFormatting(line).includes("Online Players") ? "§eOnline Players: §6§l§o" + onlinePlayers.length : line).join("\n"));
        TabList.setHeader(packet.func_179700_a().func_150260_c());
    }
});



register("chat", event => {
    if (!pitsandbox) return;
    let umsg = ChatLib.removeFormatting(ChatLib.getChatMessage(event));
    if (umsg.startsWith("[Server:")) return cancel(event);
    if (Settings.toggleSandboxHUD) {
        if (umsg == "STREAK! reset as you're in spawn!" || umsg == "STREAK! reset as you're in the mine!") {
            endStreak();
            cancel(event);
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
    }
    if (umsg == "HEY THERE! See the latest events with MVP!") nomvp = true, ChatLib.chat("§cNo MVP, disabled auto /event.");
    if (umsg.startsWith("UNSCRAMBLE OVER!")) {
        lastunscramble = 0;
    } else if (umsg.startsWith("QUICK MATHS OVER!")) {
        lastquickmath = 0;
    } else if (umsg.startsWith("QUICK MATHS! Solve: ")) {
        lastquickmath = Date.now();
    } else if (umsg.startsWith("UNSCRAMBLE! First 5 players to answer gain")) {
        lastunscramble = Date.now();
    }

    if (!Settings.toggleRNGesus) {
        if (umsg.startsWith("RNGESUS! Rolled a ") || umsg.startsWith("➜ ")) return cancel(event);
    }
});

register("chat", (claimer, claimed, amount, event) => {
    if (!pitsandbox || !Settings.personalClaims) return;
    let nocancel = false;
    if (claimer.startsWith("[")) {
        if (claimer.split(" ")[1] == Player.getName()) {
            nocancel = true;
        }
    }
    if (claimed.startsWith("[")) {
        if (claimed.split(" ")[1] == Player.getName()) {
            nocancel = true;
        }
    }
    if (!nocancel) cancel(event);
}).setChatCriteria("BOUNTY CLAIMED! ${claimer} killed ${claimed} for $${amount}");

register("chat", (percent, player, xp, gold, event) => {
    if (!pitsandbox) return;
    if (!Settings.toggleSandboxHUD) return;
    cancel(event);
    if (Date.now() - lastendstreak < 2000) return;
    xp = xp.replace(/[,]/g, "");
    gold = gold.replace(/[,]/g, "");
    if (parseInt(percent) != NaN) streak += parseInt(percent) / 100, laststreakchange = Date.now();
    if (parseFloat(xp) != NaN && parseFloat(xp)) currentstreak.assxp += parseFloat(xp);
    if (parseFloat(gold) != NaN && parseFloat(gold)) currentstreak.assgold += parseFloat(gold), goldreq += parseFloat(gold);
}).setChatCriteria("ASSIST! of ${percent}% on ${player} +${xp} +$${gold}");

register("chat", (player, xp, gold, event) => {
    if (!pitsandbox) return;
    if (!Settings.toggleSandboxHUD) return;
    cancel(event);
    strength()
    if (Date.now() - lastendstreak < 2000) return;
    xp = xp.replace(/[,]/g, "");
    let str = 1;
    if (gold.split(" ").length > 1) str = parseFloat(gold.split(" ")[1]), gold = gold.split(" ")[0];
    gold = gold.replace(/[,]/g, "");
    streak += str;
    laststreakchange = Date.now();
    streakkills += str;
    if (parseFloat(xp) != NaN && parseFloat(xp)) currentstreak.killxp += parseFloat(xp);
    if (parseFloat(gold) != NaN && parseFloat(gold)) currentstreak.killgold += parseFloat(gold), goldreq += parseFloat(gold);
}).setChatCriteria("KILL! on ${player} +${xp} +$${gold}");

register("chat", (event) => {
    if (!pitsandbox) return;
    if (!Settings.customGuildChat) return
    let regex = /Guild > \[([A-Z]*)\] ([A-z0-9]{3,16}): (.*)/g;
    if (regex.test(ChatLib.removeFormatting(ChatLib.getChatMessage(event)))) {
        let args = regex.exec(ChatLib.removeFormatting(ChatLib.getChatMessage(event)));
        args = regex.exec(ChatLib.removeFormatting(ChatLib.getChatMessage(event)));
        let rank = args[1];
        let player = args[2];
        let message = args[3];
        cancel(event);
        ChatLib.chat("&aG > &e[" + (rank == "MEMBER" ? "M" : (rank == "OFFICER" ? "O" : "L")) + "] " + (onlinePlayersFormatted.find(p => ChatLib.removeFormatting(p.split(" ")[1]) == player) ? onlinePlayersFormatted.find(p => ChatLib.removeFormatting(p.split(" ")[1]) == player).split(" ")[1] : "&7" + player) + "&r: " + message);
    }
});

register("chat", (player, message, event) => {
    if (!pitsandbox) return;
    if (!Settings.customGuildChat) return
    cancel(event);
    if (player.split(" ").length > 1 && player.startsWith("(â ")) {
        player = "&8" + player.split(" ")[0] + " " + player.split(" ")[1] + " &e" + player.split(" ").splice(2).join(" ");
    }
    ChatLib.chat("&aG&9D&a > &e" + player + "&r: " + message);
}).setChatCriteria("Guild > Discord ${player}: ${message}");
register("chat", (mult, player, xp, gold, event) => {
    if (!pitsandbox) return;
    if (!Settings.toggleSandboxHUD) return;
    if (mult.split(" ").length > 1) return;
    cancel(event);
    strength()
    if (Date.now() - lastendstreak < 2000) return;
    xp = xp.replace(/[,]/g, "");
    let str = 1;
    if (gold.split(" ").length > 1) str = parseFloat(gold.split(" ")[1]), gold = gold.split(" ")[0];
    gold = gold.replace(/[,]/g, "");
    streak += str;
    laststreakchange = Date.now();
    streakkills += str;
    if (parseFloat(xp) != NaN && parseFloat(xp)) currentstreak.killxp += parseFloat(xp);
    if (parseFloat(gold) != NaN && parseFloat(gold)) currentstreak.killgold += parseFloat(gold), goldreq += parseFloat(gold);
}).setChatCriteria("${mult} KILL! on ${player} +${xp} +$${gold}");

register("chat", (mult, player, xp, gold, event) => {
    if (!pitsandbox) return;
    if (!Settings.toggleSandboxHUD) return;
    cancel(event);
    strength()
    if (Date.now() - lastendstreak < 2000) return;
    xp = xp.replace(/[,]/g, "");
    let str = 1;
    if (gold.split(" ").length > 1) str = parseFloat(gold.split(" ")[1]), gold = gold.split(" ")[0];
    gold = gold.replace(/[,]/g, "");
    streak += str;
    laststreakchange = Date.now();
    streakkills += str;
    if (parseFloat(xp) != NaN && parseFloat(xp)) currentstreak.killxp += parseFloat(xp);
    if (parseFloat(gold) != NaN && parseFloat(gold)) currentstreak.killgold += parseFloat(gold), goldreq += parseFloat(gold);
}).setChatCriteria("MULTI KILL! (${mult}) on ${player} +${xp} +$${gold}");

register("chat", (xp, event) => {
    if (!pitsandbox || !streaking) return;
    if (!Settings.toggleSandboxHUD) return;
    cancel(event);
    if (Date.now() - lastendstreak < 2000) return;
    xp = xp.replace(/[,]/g, "");
    if (parseFloat(xp) != NaN && parseFloat(xp)) currentstreak.otherxp += parseFloat(xp);
}).setChatCriteria("PLETHORA! +${xp}XP");

register("chat", (event) => {
    cancel(event)

}).setChatCriteria("PLETHORA! +0XP (maxed!)")

register("chat", (xp, event) => {
    if (!pitsandbox || !streaking) return;
    if (!Settings.toggleSandboxHUD) return;
    if (Date.now() - lastendstreak < 2000) return;
    xp = xp.replace(/[,]/g, "");
    if (parseFloat(xp) != NaN && parseFloat(xp)) currentstreak.otherxp += parseFloat(xp);
}).setChatCriteria("SHARING IS CARING! +${xp}XP!");

register("chat", (xp, event) => {
    if (!pitsandbox || !streaking) return;
    if (!Settings.toggleSandboxHUD) return;
    if (Date.now() - lastendstreak < 2000) return;
    xp = xp.replace(/[,]/g, "");
    if (parseFloat(xp) != NaN && parseFloat(xp)) currentstreak.otherxp += parseFloat(xp);
}).setChatCriteria("TO THE MOON! Earned +${xp}XP from megastreak (${*}x multiplier)");

register("chat", (gold, event) => {
    if (!pitsandbox || !streaking) return;
    if (!Settings.toggleSandboxHUD) return;
    cancel(event);
    if (Date.now() - lastendstreak < 2000) return;
    gold = gold.replace(/[,]/g, "");
    if (parseFloat(gold) != NaN && parseFloat(gold)) currentstreak.othergold += parseFloat(gold), goldreq += parseFloat(gold);
}).setChatCriteria("➜ +$${gold}");

register("chat", (xp, event) => {
    if (!pitsandbox || !streaking) return;
    if (!Settings.toggleSandboxHUD) return;
    cancel(event);
    if (Date.now() - lastendstreak < 2000) return;
    xp = xp.replace(/[,]/g, "");
    if (parseFloat(xp) != NaN && parseFloat(xp)) currentstreak.otherxp += parseFloat(xp);
}).setChatCriteria("➜ ${xp} XP");

register("chat", (grinded, required, event) => {
    if (!Settings.toggleSandboxHUD) return;
    grinded = parseInt(parseFloat(grinded.replace(/[,]/g, "")).toFixed(0));
    required = parseInt(parseFloat(required.replace(/[,]/g, "")).toFixed(0));
    goldreq = grinded;
    goldreqmax = required;
    cancel(event);
}).setChatCriteria("GOLDREQ! Gold requirement: $${grinded}/$${required}");

register("chat", (seconds, event) => {
    seconds = parseInt(seconds);
    extradamage = Date.now() + (seconds * 1000);
    cancel(event);
}).setChatCriteria("You now have ${seconds} seconds of extra damage!");

register("chat", (amount, player, event) => {
    if (!pitsandbox || !Settings.hideLowPay) return;
    amount = amount.replace(/[,]/g, "");
    amount = parseFloat(amount);
    if (amount == undefined || amount == NaN) return;
    if (amount < Settings.minPay) cancel(event), ChatLib.actionBar("&8&oReceived $" + amount + " from " + player);
}).setChatCriteria("$${amount} has been received from ${player}");

register("chat", (name, time, event) => {
    if (!pitsandbox || !Settings.toggleMajorandMinorEventHUD || !Settings.toggleSandboxHUD) return;
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

register("chat", (time, event) => {
    if (!pitsandbox || !Settings.toggleMajorandMinorEventHUD || !Settings.toggleSandboxHUD) return;
    if (time.includes("m")) {
        const seconds = parseInt(time.split("m")[1].replace("s", "")) + (parseInt(time.split("m")[0]) * 60);
        nextminor = Date.now() + (seconds * 1000);
    } else {
        const seconds = parseInt(time.replace("s", ""));
        nextminor = Date.now() + (seconds * 1000);
    }
    cancel(event);
}).setChatCriteria("EVENTS! The next Minor Event is in ${time}");

const huntCommand = register("command", (arg1, arg2) => {
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
}).setName("hunt");
/* addCustomCompletion(huntCommand, huntCmdAutocomplete); */

register("command", () => {
    const NetHandlerPlayClient = Client.getConnection();
    let PlayerMap = NetHandlerPlayClient.func_175106_d();
    PlayerMap = PlayerMap.filter(p => !p.func_178845_a().name.includes("§") && !p.func_178845_a().name.includes("CIT-") && (p.func_178853_c() || p.func_178853_c() == 0));
    PlayerMap = PlayerMap.sort((a, b) => a.func_178853_c() - b.func_178853_c());
    PlayerMap.forEach((p, i) => {
        ChatLib.chat("&c#" + (i + 1) + " &e" + p.func_178845_a().name + ": " + (p.func_178853_c() < 50 ? "&2" : (p.func_178853_c() < 100 ? "&a" : (p.func_178853_c() < 200 ? "&6" : (p.func_178853_c() < 350 ? "&c" : "&4")))) + p.func_178853_c() + "ms");
    });
}).setName("pinglb");

register("command", () => {
    if (!pitsandbox) return;
    TabList.getUnformattedNames().filter(n => !n.startsWith("CIT-") && !n.includes("§") && balances[n] && balances[n].bal != undefined).sort((a, b) => balances[b].bal - balances[a].bal).forEach((n, i) => {
        ChatLib.chat("&e#" + (i + 1) + " &6" + n + "&e: &a$" + formatNumber(balances[n].bal) + " &8(" + msToTime(Date.now() - balances[n].lastfetch, false) + " ago)");
    });
}).setName("onlinebalance").setAliases(["obal", "onlinebal"]);

let setBalCMD = register("command", (p, bal) => {
    if (!pitsandbox) return;
    if (!p || !bal) return ChatLib.chat("&cUsage: /setbal <player> <amount>");
    ChatLib.command("bal " + p);
    let event = register("chat", (player, balance, event) => {
        if (player == p || player.startsWith("~")) {
            cancel(event);
            balance = parseFloat(balance.replace(/,/g, ""));
            if (balance != undefined && balance != NaN && bal - balance > 0) {
                ChatLib.command("pay " + p + " " + (bal - balance));
            }
        }
    }).setChatCriteria("Balance of ${player}: $${balance}");
    setTimeout(() => {
        event.unregister();
    }, 500);

}).setName("setbal")

/* addCustomCompletion(setBalCMD, playerAutocomplete); */

new Thread(() => {
    register("tick", () => {
        if (airBlock.isKeyDown()) {
            if (Date.now() - airblockcd > 50) {
                try {
                    World.getWorld().func_175698_g(new BlockPos1(Player.lookingAt().x, Player.lookingAt().y, Player.lookingAt().z));
                } catch (err) {

                }
                airblockcd = Date.now();
            }
        } else {
            airblockcd = 0;
        }
        if (!pitsandbox) return worldentities = [], worldotherplayers = [];
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
        worldentities = World.getAllEntities().map(e => e.entity instanceof Java.type("net.minecraft.entity.EntityLivingBase") ? new EntityLivingBase(e.entity) : e);
        worldotherplayers = World.getAllEntitiesOfType(Java.type("net.minecraft.client.entity.EntityOtherPlayerMP")).map(e => new EntityLivingBase(e.entity));
        if (Settings.fishAlert) {
            if (Player.getPlayer().field_71104_cf instanceof Java.type("net.minecraft.entity.projectile.EntityFishHook")) {
                if (
                    Player.getPlayer().field_71104_cf.field_70159_w == 0 &&
                    Player.getPlayer().field_71104_cf.field_70179_y == 0 &&
                    Player.getPlayer().field_71104_cf.field_70181_x < -0.05
                ) {

                    lasthookmotion = Date.now();
                }
            }

            if (Date.now() - lastbubble < 300 && Date.now() - lastsplashsound < 300 && Date.now() - lasthookmotion < 300 && Date.now() - lastalert > 1000) {
                for (let i = 0; i < 5; i++) World.playSound("note.pling", 1, 1);
                lastalert = Date.now();
            }
        }
        if (Settings.lowerRenderDistanceInMid) {
            if (inMid(Player.asPlayerMP()) && Client.settings.getSettings().field_151451_c != 2) {
                lastrenderdistance = Client.settings.getSettings().field_151451_c;
                Client.settings.getSettings().field_151451_c = 2;
            } else if (!inMid(Player.asPlayerMP())) {
                if (lastrenderdistance != undefined && Client.settings.getSettings().field_151451_c == 2) {
                    Client.settings.getSettings().field_151451_c = lastrenderdistance;
                } else {
                    lastrenderdistance = Client.settings.getSettings().field_151451_c;
                }
            }
        }
        if (Settings.toggleAutoLS && inMid(Player.asPlayerMP())) {
            let lsslot = undefined;
            for (let i = 0; i < 9; i++) {
                let slot = undefined;
                if (Player.getInventory()) slot = Player.getInventory().getStackInSlot(i);
                if (slot && slot.getID() != 1 && slot.getNBT() && hasEnchant("billionaire", slot.getNBT()) && hasEnchant("lifesteal", slot.getNBT())) {
                    lsslot = i;
                    break;
                }
            }
            if (lsslot != undefined) {
                nols = false;
                if (Player.getHP() < Settings.autoLSHealth * 2 && Player.getHeldItemIndex() != lsslot) {
                    lastslot = Player.getHeldItemIndex();
                    Player.setHeldItemIndex(lsslot);
                } else if (Player.getHP() >= Settings.autoLSHealth * 2 && lastslot != undefined) {
                    Player.setHeldItemIndex(lastslot);
                    lastslot = undefined;
                }
            } else nols = true;
        } else nols = false;
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
        onlinePlayers = TabList.getUnformattedNames().filter(n => !n.includes("§") && !n.startsWith("CIT-"));
        onlinePlayersFormatted = TabList.getNames().filter(n => n.split(" ").length > 1);

        onlineHunt = huntedPlayers.filter(n => onlinePlayers.includes(n));
        onlineHuntGuild = onlinePlayersFormatted.filter(n => n.split(" ")[2] && huntedGuilds.includes(ChatLib.removeFormatting(n.split(" ")[2].replace(/[\[\]]/g, "")).toUpperCase())).map(n => ChatLib.removeFormatting(n.split(" ")[1])).filter(n => !ignoredPlayers.includes(n));
        if (huntingKey.isPressed()) {
            if (onlineHunt.length < 1 && onlineHuntGuild.length < 1) {
                hunting = false, ChatLib.chat("§7Hunting: §cNo players online!");
            } else {
                hunting = !hunting;
                ChatLib.chat("§7Hunting: " + (hunting ? "§aEnabled" : "§cDisabled"));
            }
        }
        if (toggleBots.isPressed()) {
            ChatLib.command("togglebots");
        }
        setTimeout(() => {
            if (!Settings.toggleSandboxHUD) return
            let general = ["Level: &cUnknown", "Coins: &cUnknown", Settings.hudTextColor + "Megacoins: &cUnknown", Settings.hudTextColor + "Gems: &cUnknown", "GoldReq: &cUnknown &7(" + greqrefresh + ")"]
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
                const xp = scoreboard.find(l => l.startsWith("XP: ")).split("XP: ")[1]
                general[0] = `${Settings.hudTextColor} Skill: ` + (ChatLib.removeFormatting(skill).toString() == "Mining" ? `&8&l${skill}` : `&d&l${skill}`)
                general.splice(1, 0, `${Settings.hudTextColor}Level: &e${getRoman(level)}`)
                //general.splice(2, 0, xp)
            } else if (scoreboard.find(l => l.startsWith("WATER: "))) {
                const water = scoreboard.find(l => l.startsWith("WATER: ")).split("WATER: ")[1]
                const fire = scoreboard.find(l => l.startsWith("FIRE: ")).split("FIRE: ")[1]
                const nature = scoreboard.find(l => l.startsWith("NATURE: ")).split("NATURE: ")[1]
                const elemental = scoreboard.find(l => l.startsWith("ELEM: ")).split("ELEM: ")[1]
                general[0] = `&eTeam Destroy`
                general.splice(1, 0, `&bWater: &7${water}`)
                general.splice(2, 0, `&cFire: &7${fire}`)
                general.splice(3, 0, `&aNature: &7${nature}`)
                general.splice(4, 0, `&2Elemental: &7${elemental}`)
            } if (scoreboard.find(l => l.startsWith("Coins: "))) {
                const coins = scoreboard.find(l => l.startsWith("Coins: ")).split("Coins: ")[1];
                general[general.indexOf("Coins: &cUnknown")] = Settings.hudTextColor + "Coins: &6" + coins;
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
            } if (scoreboard.find(l => l.startsWith("Bounty: "))) {
                const bounty = scoreboard.find(l => l.startsWith("Bounty: ")).split("Bounty: ")[1]
                general.push(Settings.hudTextColor + "Bounty: &6" + bounty)
            } if (goldreq) {
                if (Settings.toggleSimpleHUD) {
                    general[general.indexOf("GoldReq: &cUnknown &7(" + greqrefresh + ")")] = Settings.hudTextColor + "GoldReq: &6" + formatNumber(Math.floor(goldreq)) + "&r/&6" + formatNumber(Math.floor(goldreqmax))
                } else {
                    general[general.indexOf("GoldReq: &cUnknown &7(" + greqrefresh + ")")] = Settings.hudTextColor + "GoldReq: &6" + formatNumber(Math.floor(goldreq)) + "&r/&6" + formatNumber(Math.floor(goldreqmax)) + (goldreqmax == 0 ? "" : " &7(" + (goldreq / goldreqmax * 100).toFixed(1) + "%)") + " &7(" + greqrefresh + ")"
                }
            } if (megacoins) {
                general[general.indexOf(Settings.hudTextColor + "Megacoins: &cUnknown")] = Settings.hudTextColor + "Megacoins: &6" + formatNumber(megacoins);
            } if (gems) {
                general[general.indexOf(Settings.hudTextColor + "Gems: &cUnknown")] = Settings.hudTextColor + "Gems: &a" + formatNumber(gems);
            }
            if (extradamage > Date.now()) {
                general.push(Settings.hudTextColor + "Megastar: &c" + msToTime(extradamage - Date.now()));
            } if (Settings.toggleSimpleHUD) {
                if (nextmajor > Date.now() && majorname) general.push(`${Settings.hudTextColor}Next Major: &e${msToTime(nextmajor - Date.now())}, ${majorname}`)
            } else {
                if (nextmajor > Date.now()) {
                    general.push(Settings.hudTextColor + "Next Major: &e" + msToTime(nextmajor - Date.now()));
                } if (nextminor > Date.now()) {
                    general.push(Settings.hudTextColor + "Next Minor: &e" + msToTime(nextminor - Date.now()));
                } if (majorname) {
                    general.push(Settings.hudTextColor + "Major Name: &e" + majorname);
                }
            }/* if (promotionUses != 0) {
                general.push(Settings.hudTextColor + "Promotion Uses: &e" + promotionUses)
            }
 */
            let streakers = worldotherplayers.filter(e => inMid(e) && (!e.getName().startsWith("§7") && !e.getName().startsWith("CIT-"))).length;
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
            if (!streaking || !inMid(Player.asPlayerMP())) streakinglines = [`${Settings.hudGroupColor}&nStreaking Info`]
            else {
                let streakinfo = ["Streak: &cUnknown", "Duration: &cUnknown", Settings.hudTextColor + `Coins K/A/O: &6${currentstreak.killgold ? formatNumber(Math.floor(currentstreak.killgold)) : "?"}&r/&6${currentstreak.assgold ? formatNumber(Math.floor(currentstreak.assgold)) : "?"}&r/&6${currentstreak.othergold ? formatNumber(Math.floor(currentstreak.othergold)) : "?"}`, Settings.hudTextColor + `XP K/A/O: &b${currentstreak.killxp ? formatNumber(Math.floor(currentstreak.killxp)) : "?"}&r/&b${currentstreak.assxp ? formatNumber(Math.floor(currentstreak.assxp)) : "?"}&r/&b${currentstreak.otherxp ? formatNumber(Math.floor(currentstreak.otherxp)) : "?"}`];

                streakinfo[0] = Settings.hudTextColor + `Streak: &c${streak != 0 ? Math.floor(streak * 100) / 100 : "?"}&7 (${rawstreak ? rawstreak : "?"})`;

                if (startstreaktime) {
                    let dif = Date.now() - startstreaktime;
                    dif = msToTime(dif, true);
                    streakinfo[1] = Settings.hudTextColor + `Duration: &c${dif}`;
                }

                if (startstreaktime && streakkills) {
                    let kps = Math.floor(streakkills / ((Date.now() - startstreaktime) / 1000) * 10) / 10;
                    let kpm = formatNumber(Math.floor(streakkills / ((Date.now() - startstreaktime) / 1000 / 60)));
                    let kph = formatNumber(Math.floor(streakkills / ((Date.now() - startstreaktime) / 1000 / 60 / 60)));
                    streakinfo.push(Settings.hudTextColor + "Kills Per S/M/H: &c" + kps + "&r/&c" + kpm + "&r/&c" + kph);
                }
                if (scoreboard.find(l => l.startsWith("Stored XP: ")) && getMega(Player.getName()) == "moon") {
                    const storedXP = (scoreboard.find(l => l.startsWith("Stored XP: ")).split("Stored XP: "))[1]
                    streakinfo.push(Settings.hudTextColor + "Stored XP: &b" + storedXP)
                }

                if (currentstreak.assgold || currentstreak.killgold || currentstreak.othergold) {
                    let gold = 0;
                    if (currentstreak.killgold) gold += currentstreak.killgold;
                    if (currentstreak.assgold) gold += currentstreak.assgold;
                    if (currentstreak.othergold) gold += currentstreak.othergold;
                    let gps = formatNumber(Math.floor(gold / ((Date.now() - startstreaktime) / 1000)));
                    let gpm = formatNumber(Math.floor(gold / ((Date.now() - startstreaktime) / 1000 / 60)));
                    let gph = formatNumber(Math.floor(gold / ((Date.now() - startstreaktime) / 1000 / 60 / 60)));
                    if (Player.armor.getLeggings() && hasEnchant("moctezuma", Player.armor.getLeggings().getNBT()) && hasEnchant("moctezuma", Player.armor.getLeggings().getNBT()) != NaN) streakinfo.push(Settings.hudTextColor + "Coins Per S/M/H: &6" + gps + "&r/&6" + gpm + "&r/&6" + gph);
                }

                if (currentstreak.assxp || currentstreak.killxp || currentstreak.otherxp) {
                    let xp = 0;
                    if (currentstreak.killxp) xp += currentstreak.killxp;
                    if (currentstreak.assxp) xp += currentstreak.assxp;
                    if (currentstreak.otherxp) xp += currentstreak.otherxp;
                    let xps = formatNumber(Math.floor(xp / ((Date.now() - startstreaktime) / 1000)));
                    let xpm = formatNumber(Math.floor(xp / ((Date.now() - startstreaktime) / 1000 / 60)));
                    let xph = formatNumber(Math.floor(xp / ((Date.now() - startstreaktime) / 1000 / 60 / 60)));
                    if (Player.armor.getLeggings() && hasEnchant("sweaty", Player.armor.getLeggings().getNBT()) && hasEnchant("sweaty", Player.armor.getLeggings().getNBT()) != NaN) streakinfo.push(Settings.hudTextColor + "XP Per S/M/H: &b" + xps + "&r/&b" + xpm + "&r/&b" + xph);
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
                    streakinfo.push(Settings.hudTextColor + "Megastreak: " + megastreak);
                }

                if (currentstreak.other.length > 0) {
                    let other = currentstreak.other.map(o => o.color + o.amount + " " + o.id).join(" ");
                    streakinfo.push(Settings.hudTextColor + "Other: " + other);
                }
                if (Date.now() < rngdamage) {
                    streakinfo.push(Settings.hudTextColor + "RNGesus DMG: &c" + msToTime(rngdamage - Date.now(), true));
                }
                streakinfo.splice(0, 0, [Settings.hudGroupColor + "&nStreaking Info"])
                streakinglines = streakinfo
            }
            let huntinfo = [`${Settings.hudGroupColor}&nHunted Players`]
            if (onlineHunt.length > 0) {
                //huntinfo.push(Settings.hudGroupColor + "&nHunted Players");
                onlineHunt.forEach(p => {
                    let suffix = "";
                    let prefix = "";
                    let entity = worldotherplayers.filter(e => !e.getName().startsWith("§") && !e.getName().startsWith("CIT-")).find(e => e.getName() == p);
                    let tabp = onlinePlayersFormatted.find(t => ChatLib.removeFormatting(t.split(" ")[1]) == p);
                    if (!entity) suffix = " &cUnknown";
                    else if (inMid(entity)) suffix = " &4MID";
                    else if (inSpawn(entity)) suffix = " &aSpawn";
                    else suffix = " &6Outskirts";
                    if (!tabp) prefix += "&cNotInTab &c";
                    else if (tabp.split(" ")[0].includes("[")) prefix += "&4&nPRE&r &c";
                    else prefix += tabp.split(" ")[0].replace(/§l/g, "") + " &c";
                    if (entity && entity.getItemInSlot(2) && entity.getItemInSlot(2).getNBT() && !hasEnchant("mirror", entity.getItemInSlot(2).getNBT())) suffix += " &cNoMirrors";
                    huntinfo.push(prefix + (tabp ? tabp.split(" ")[1] : p) + suffix);
                });
            }
            if (onlineHuntGuild.filter(h => !onlineHunt.includes(h)).length > 0) {
                huntinfo.push(Settings.hudGroupColor + "&nHunted Tags");
                onlineHuntGuild.filter(h => !onlineHunt.includes(h)).forEach(p => {
                    let suffix = "";
                    let prefix = "";
                    let entity = worldotherplayers.filter(e => !e.getName().startsWith("§") && !e.getName().startsWith("CIT-")).find(e => e.getName() == p);
                    let tabp = onlinePlayersFormatted.find(t => ChatLib.removeFormatting(t.split(" ")[1]) == p);
                    if (tabp && tabp.split(" ")[2].includes("[")) suffix = " " + tabp.split(" ")[2];
                    if (!entity) suffix += " &cUnknown";
                    else if (inMid(entity)) suffix += " &4MID";
                    else if (inSpawn(entity)) suffix += " &aSpawn";
                    else suffix += " &6Outskirts";
                    if (!tabp) prefix += "&cNotInTab &c";
                    else if (tabp.split(" ")[0].includes("[")) prefix += "&4&nPRE&r &c";
                    else prefix += tabp.split(" ")[0].replace(/§l/g, "") + " &c";
                    if (entity && entity.getItemInSlot(2) && entity.getItemInSlot(2).getNBT() && !hasEnchant("mirror", entity.getItemInSlot(2).getNBT())) suffix += " &cNoMirrors";
                    huntinfo.push(prefix + (tabp ? tabp.split(" ")[1] : p) + suffix);
                });
            }
            huntinglines = huntinfo;
        }, 0);
        setTimeout(() => {
            if (target && targetexpire && Date.now() >= targetexpire) return target = undefined, targetexpire = undefined, allticks = 0, lsticks = 0, swordenchants = "", pantenchants = "", tdamage = [], pdamage = [];
            if (!worldotherplayers.find(p => p.getName() == target)) return target = undefined, targetexpire = undefined, allticks = 0, lsticks = 0, swordenchants = "", pantenchants = "", tdamage = [], pdamage = [];
            let player = new EntityLivingBase(worldentities.find(e => e.getName() == target).entity);
            if (player.getItemInSlot(2) && player.getItemInSlot(2).getNBT() && player.getItemInSlot(2).getID() == 300 && getEnchants(player.getItemInSlot(2).getNBT())) {
                pantenchants = "§9" + getEnchants(player.getItemInSlot(2).getNBT()).join(" ");
            } else {
                pantenchants = "§cNoMysticPants";
            }
            if (player.getItemInSlot(0) && player.getItemInSlot(0).getNBT() && (player.getItemInSlot(0).getID() == 283 || player.getItemInSlot(0).getID() == 261) && getEnchants(player.getItemInSlot(0).getNBT())) {
                swordenchants = "§9" + getEnchants(player.getItemInSlot(0).getNBT()).join(" ");
                if (player.getItemInSlot(0).getID() == 283) {
                    if (hasEnchant("lifesteal", player.getItemInSlot(0).getNBT()) && hasEnchant("billionaire", player.getItemInSlot(0).getNBT())) {
                        lsticks++;
                        allticks++;
                    } else {
                        allticks++;
                    }
                }
            } else {
                swordenchants = "§cNoSwordOrBow";
            }
        }, 0);
    });
}).start();


register("step", () => {
    if (rightclicking) {
        KeyBinding.func_74510_a(Client.settings.getSettings().field_74313_G.func_151463_i(), true);
        KeyBinding.func_74510_a(Client.settings.getSettings().field_74313_G.func_151463_i(), false);
        KeyBinding.func_74507_a(Client.settings.getSettings().field_74313_G.func_151463_i());
    }
}).setFps(30);

register("step", () => {
    if (!pitsandbox) return;
    if (Settings.showPingInXP) {
        Player.asPlayerMP().getPlayer().func_71013_b(Player.asPlayerMP().getPlayer().field_71068_ca);
        Player.asPlayerMP().getPlayer().func_82242_a(Player.asPlayerMP().getPing());
    }
    if (!Settings.toggleSandboxHUD) return;
    if (streaking && Date.now() - laststreakchange > 5000 && rawstreak && streak != rawstreak) {
        streak = rawstreak;
        ChatLib.chat("&c&l!&7 Streak resynced with server scoreboard.");
    }
    greqrefresh--;
    if (greqrefresh < 1) ChatLib.command("goldreq"), greqrefresh = (inMid(Player.asPlayerMP()) ? 15 : 30);
    if (Player.getHeldItem() && hasEnchant("shark", Player.getHeldItem().getNBT()) && hasEnchant("shark", Player.getHeldItem().getNBT()) != NaN) {
        let sharkmult = 0;
        let sharkpeople = 0;
        switch (hasEnchant("shark", Player.getHeldItem().getNBT())) {
            case 1:
                sharkmult = 2;
                break;
            case 2:
                sharkmult = 4;
                break;
            case 3:
                sharkmult = 7;
                break;
            default:
                break;
        }
        worldotherplayers.forEach(e => {
            if (e.getUUID() != Player.getUUID() && e.distanceTo(Player.asPlayerMP()) < 7 && e.getHP() < 12) sharkpeople++;
        });
        shark = (sharkpeople * sharkmult > 56 ? 56 : sharkpeople * sharkmult);
    } else shark = 0;
}).setFps(1);

register("step", () => {
    if (!pitsandbox || !Settings.toggleSandboxHUD || !Settings.toggleMajorandMinorEventHUD || nomvp) return;
    if (nextmajor - Date.now() < 180000) ChatLib.command("event");
}).setDelay(5);

register("step", () => {
    if (!pitsandbox || !Settings.toggleMajorandMinorEventHUD || nomvp) return;
    if (Settings.toggleSandboxHUD) ChatLib.command("event");
}).setDelay(180);

register("step", () => {
    if (pitsandbox && Settings.toggleAutoOOF) {
        let megastreak = ChatLib.removeFormatting(Player.getDisplayName().getText().split(" ")[0]);
        if (megastreak && !megastreak.includes("[")) {
            if (megastreak == "HIGH" && Settings.autoOOFHighlander) ChatLib.command("oof")
            if (megastreak == "MOON" && Settings.autoOOFMoon) ChatLib.command("oof")
            if (megastreak == "NGHTMRE" && Settings.autoOOFNightmare) ChatLib.command("oof")
            if (megastreak == "HERMIT" && Settings.autoOOFHermit) ChatLib.command("oof")
            if (megastreak == "OVRDRV" && Settings.autoOOFOverdrive) ChatLib.command("oof")
            if (megastreak == "UBER400" && Settings.autoOOFUber) ChatLib.command("oof")
            if (megastreak == "UBER400" && Settings.autoOOFRNGESUS && streak >= 500) ChatLib.command("oof")
        }
    }
    if (Settings.hideBotNametags) {
        worldotherplayers.forEach(e => {
            if (inMid(e) && (e.getName().startsWith("§7") || e.getName().startsWith("CIT-")) && World.getAllPlayers().find(p => p.getUUID() == e.getUUID())) World.getAllPlayers().find(p => p.getUUID() == e.getUUID()).setNametagName(new TextComponent(""));
        });
    }
}).setFps(2);

register("step", () => {
    if (pitsandbox && Settings.toggleSandboxHUD) Scoreboard.setShouldRender(false);
    else Scoreboard.setShouldRender(true);
});

register("itemTooltip", (lore, item, event) => {
    if (!pitsandbox) return;
    if (lore.find(l => ChatLib.removeFormatting(l).startsWith("Player: ")) && !lore.find(l => ChatLib.removeFormatting(l).startsWith("Player: OFFLINE (DO NOT CLICK)"))) {
        let player = ChatLib.removeFormatting(lore.find(l => ChatLib.removeFormatting(l).startsWith("Player: ")).split(" ")[1]);
        if (player && !onlinePlayers.includes(player)) {
            let list = new NBTTagList(item.getNBT().getCompoundTag("tag").getCompoundTag("display").getTagMap().get("Lore"));
            let text = ChatLib.addColor("&2Player: &c&l&nOFFLINE&8 (DO NOT CLICK)");
            list.set(0, new NBTTagString(text));
        }
    }
});


register("renderFood", event => {
    if (pitsandbox && !Settings.toggleHungerBar) cancel(event);
});

register("renderArmor", event => {
    if (pitsandbox && !Settings.toggleArmorBar) cancel(event);
});

register("spawnParticle", (particle, type, event) => {
    if (!pitsandbox) return;
    if (Settings.fishAlert) {
        if (particle.underlyingEntity instanceof Java.type("net.minecraft.client.particle.EntityBubbleFX")) {
            if (Player.getPlayer().field_71104_cf instanceof Java.type("net.minecraft.entity.projectile.EntityFishHook")) {

                let hook = Player.getPlayer().field_71104_cf;
                let bubble = particle.underlyingEntity;
                let distance = Math.sqrt(Math.pow(hook.field_70165_t - bubble.field_70165_t, 2) + Math.pow(hook.field_70163_u - bubble.field_70163_u, 2) + Math.pow(hook.field_70161_v - bubble.field_70161_v, 2));
                if (distance < 0.6) {
                    lastbubble = Date.now();

                }
            }
        }
    }
    if (Settings.removeParticlesInMid && inMid(Player.asPlayerMP())) cancel(event);
});

register("renderExperience", event => {
    if (pitsandbox && !Settings.toggleXPBar) cancel(event);
});

register("renderBossHealth", event => {
    if (pitsandbox && !Settings.toggleBossBar) cancel(event);
});
register("soundPlay", (pos, name, vol, pitch, cat, event) => {
    if (!pitsandbox) return;
    if (Settings.fishAlert) {
        if (name.toLowerCase().includes("random.splash")) {
            if (Player.getPlayer().field_71104_cf instanceof Java.type("net.minecraft.entity.projectile.EntityFishHook")) {

                let hook = Player.getPlayer().field_71104_cf;
                let distance = Math.sqrt(Math.pow(hook.field_70165_t - pos.x, 2) + Math.pow(hook.field_70163_u - pos.y, 2) + Math.pow(hook.field_70161_v - pos.z, 2));
                if (distance < 0.6) {
                    lastsplashsound = Date.now();

                }
            }
        }
    }
    if (inMid(Player.asPlayerMP())) {
        if (name.toLowerCase().includes("game.player.hurt") && inMid(Player.asPlayerMP()) && Settings.removeMidHit) cancel(event)
        if (name.toLowerCase().includes("random.orb") && pitch.toFixed(2) == "0.71" && inMid(Player.asPlayerMP()) && Settings.removeMidBill) cancel(event)
        if (name.toLowerCase().includes("note.pling") && pitch.toFixed(1) == "1.0" && Date.now() - blitzmsg < 500) cancel(event)
        if (name.toLowerCase().includes("mob.guardian.curse") && pitch.toFixed(2) == "1.05" && !Settings.toggleMegastreakSounds) cancel(event)
        if ((name.toLowerCase().includes("random.bow") || name.toLowerCase().includes("random.bowhit") || name.toLowerCase().includes("random.successful_hit")) && Settings.removeMidBow) cancel(event)
        if (Settings.removeExeSounds && name.toLowerCase().includes("mob.villager.death")) return cancel(event)
        if (Settings.removeGambleSounds && name.toLowerCase().includes("note.pling")) return cancel(event)
        if (Settings.removePerunSounds && name.toLowerCase().includes("random.explode")) return cancel(event)
        if (Settings.removeStunSounds && name.toLowerCase().includes("random.anvil_land")) return cancel(event)
    }
    if (name.toLowerCase().includes("mob.wither.spawn") && pitch.toFixed(1) == "1.8" && !Settings.toggleBountyBumps) cancel(event)
    if (name.toLowerCase().includes("mob.wither.spawn") && pitch.toFixed(1) == "1.6" && !Settings.toggleMegastreakSounds) cancel(event)
})

new Thread(() => {
    register("renderOverlay", () => {
        if (!pitsandbox) return; {
            if (Settings.targetInfo && target) {
                let lines = [];
                const NetHandlerPlayClient = Client.getConnection();
                const PlayerMap = NetHandlerPlayClient.func_175106_d();
                const ping = (PlayerMap.find(p => p.func_178845_a().name == target) ? PlayerMap.find(p => p.func_178845_a().name == target).func_178853_c() : "?");
                lines.push("&7Name: &c" + target + " &7Ping: &c" + ping + "ms");
                lines.push("&7HeldItem: " + swordenchants);
                lines.push("&7Pants: " + pantenchants);
                lines.push("&7Maining LS: " + (allticks < 60 ? "&cWaiting..." : (lsticks / allticks > 0.8 ? "&2A lot" : (lsticks / allticks > 0.6 ? "&aMost of the time" : (lsticks / allticks > 0.4 ? "&6Less than half the time" : "&4No")))));
                let y = targetInfoHud.textY //Renderer.screen.getHeight() - 12 * lines.length - 4
                let x = targetInfoHud.textX
                lines.forEach(line => {
                    const text = new Text(line, x, y);
                    text.setShadow(true)
                    text.draw();
                    y += 12;
                });
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
                y = Renderer.screen.getHeight() - 12 * pdamage.length - 1;
                x = Renderer.screen.getWidth() / 4 * 2.40;
                lines.forEach(line => {
                    const text = new Text(line, x, y);
                    text.setShadow(true);
                    text.draw();
                    y += 12;
                });
            } else if (!target && Settings.generalInfoHud.isOpen()) {
                new Text(`${Settings.hudGroupColor}&nTarget Info`, targetInfoHud.textX, targetInfoHud.textY).setScale(generalInfoHud.textScale).setShadow(true).draw()
            }
        } {
            if (!pitsandbox || !Settings.toggleSandboxHUD) return
            let str = []
            if (Settings.togglePreAlert && isPre() && !inSpawn(Player.asPlayerMP())) {
                str.push("&c&nYou are premega")
            }
            if (nols) str.push("&cNo LS in hotbar")
            if (Player.getInventory().indexOf(138) == -1) str.push("&bNo Beacon")
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
        } {
            if (Settings.eggEffectDisplay) {
                let lines = [];
                if (Date.now() < sixtimescoins) {
                    lines.push("&6+2.5x coins &b2.5x XP &7" + msToTime(sixtimescoins - Date.now()));
                }
                if (Date.now() < onetapbots) {
                    lines.push("&cOne tap bots &7" + msToTime(onetapbots - Date.now()));
                }
                if (Date.now() < halfhitdelay) {
                    lines.push("&eHalf hit delay &7" + msToTime(halfhitdelay - Date.now()));
                }
                let y = Renderer.screen.getHeight() / 2.2;
                lines.forEach(line => {
                    let text = new Text(line, 0, y);
                    text.setX(Renderer.screen.getWidth() / 2 - Renderer.getStringWidth(text.getString()) / 2);
                    text.setShadow(true);
                    text.draw();
                    y -= 12;
                });
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

                if (streakinglines.length > 0) {
                    y = streakInfoHud.textY
                    let streakinfo = streakinglines;

                    streakinfo.forEach(line => {
                        const text = new Text(line, 0, y)
                        text.setX(streakInfoHud.textX + (Renderer.screen.getWidth() / 10) - Renderer.getStringWidth(text.getString()) * generalInfoHud.textScale)
                        text.setScale(generalInfoHud.textScale)
                        text.setShadow(true)
                        if (streakinglines.length > 1 || Settings.generalInfoHud.isOpen()) text.draw()
                        y += 12 * generalInfoHud.textScale
                    })
                }

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
            }
        };
    });
}).start();

register("messageSent", (message, event) => {
    if (message.startsWith("@")) {
        return (
            cancel(event),
            ChatLib.chat(!message.includes("getColourOfName") ? "\n" + eval(message.substring(1)) + "\n" : "\n" + eval(message.substring(1)) + "Colour \n"),
            Client.getChatGUI().func_146239_a(message)
        )
    }
});

register("messageSent", (message, event) => {
    if (!pitsandbox) return
    if (nomvp) return
    if (message.startsWith("!") || message.startsWith("@")) return
    if (!message.startsWith("/")) {

        if (Settings.chatColor != "" && /^&.$/g.test(Settings.chatColor)) {
            if (message.startsWith("\\")) return cancel(event), ChatLib.say(message.substring(1)), Client.getChatGUI().func_146239_a(message)
            if (Date.now() - lastunscramble > 35000 && Date.now() - lastquickmath > 35000) {
                cancel(event)
                ChatLib.say(Settings.chatColor + message)
                Client.getChatGUI().func_146239_a(message)
            }
        }
    }
    if (pitsandbox && message == "/oof" && isPre() && Settings.togglePreOOF) return cancel(event), ChatLib.chat("&c&lOOF!&7 You are premega!"), Client.getChatGUI().func_146239_a("/oof");
})

register("renderEntity", (entity, pos, ticks, event) => {
    if (!pitsandbox) return;
    if (Settings.stopRenderSpawn && inSpawn(entity) && !inSpawn(Player.asPlayerMP())) return cancel(event);
    if (Settings.hideBotNametags && entity.getName().includes("'s Apprentice") && inMid(entity)) return cancel(event);
    if (hunting && entity.getEntity().class.toString().includes("EntityOtherPlayerMP") && inMid(entity) && !onlineHunt.includes(entity.getName()) && !onlineHuntGuild.includes(entity.getName())) return cancel(event);
});

register("worldUnload", () => {
    pitsandbox = false;
    endStreak();
});
//checkChangelog();
register("worldLoad", () => {
    if (!Settings.toggleSandboxHUD) return Scoreboard.setShouldRender(true);
    setTimeout(() => {
        nomvp = false;
        pitsandbox = (Server.getIP().toLocaleLowerCase().includes("harrys.network") || Server.getIP().toLocaleLowerCase().includes("pitsandbox.io") || Server.getIP().toLocaleLowerCase().includes("harrys.gg")) && isInMainServer();
        if (pitsandbox) Scoreboard.setShouldRender(false);
        else Scoreboard.setShouldRender(true);
        //checkChangelog();
    }, 1500);
});

register("actionBar", event => {
    let msg = ChatLib.removeFormatting(ChatLib.getChatMessage(event));
    if (!pitsandbox) return
    if (msg.includes("❤❤❤❤❤❤❤❤❤❤❤❤")) {
        let player = msg.split(" ")[0];
        if (player.startsWith("~")) return;
        targetexpire = Date.now() + 30000;
        if (target != player) target = player, allticks = 0, lsticks = 0, swordenchants = "", pantenchants = "", tdamage = [], pdamage = [];
        let health = parseFloat(msg.split(" ").find(m => m.endsWith("HP") && !m.includes("LS")).replace("HP", ""));
        tdamage.push(health);
        if (tdamage.length > 5) tdamage.shift();
    }
    if (!Settings.toggleGPassiveSound) return;
    if (ChatLib.removeFormatting(ChatLib.getChatMessage(event)).includes("Couldn't hit") && parseFloat(Settings.guildPassivePitch) && parseFloat(Settings.guildPassivePitch) != NaN ? World.playSound(Settings.guildPassiveSound, 1, parseFloat(Settings.guildPassivePitch)) : undefined);
});



/* register("command", () => {
    if (!autogg) autogg = true, ChatLib.chat("&aEnabled AutoGG.")
    else autogg = undefined, ChatLib.chat("&cDisabled AutoGG.")
}).setName("autogg")
 */
register("chat", (player, event) => {
    if (!pitsandbox) return
    if (!Settings.prestigeAutoGG) return
    if (player == Player.getName()) return
    ChatLib.say(Settings.chatColor + player + ", gg on Prestige!")
}).setChatCriteria("PRESTIGE! ${player} unlocked prestige ${*}, gg!")

/* register("chat", (player, event) => {
    if(!pitsandbox) return
    let message = ChatLib.removeFormatting(ChatLib.getChatMessage(event))
    cancel(event)
}) */


/* register("chat", (player, event, equation) => {
    if (!pitsandbox) return
    if (!Settings.autoQuickMaths) return
    let answer = eval(equation)
    ChatLib.chat(answer)
}).setChatCriteria("QUICK MATHS! Solve:${equation}")
 */

register("command", () => {
    if (!pitsandbox) return
    ChatLib.command("usefulbox")
}).setName("box")

register("chat", event => {
    if (!pitsandbox) return
    if (!Settings.toggleGNotification) return
    let umsg = ChatLib.removeFormatting(ChatLib.getChatMessage(event))
    if (umsg.startsWith("Guild > ")) return World.playSound("random.orb", 2, 1)
})

/* register("chat", event => {
    let umsg = ChatLib.getChatMessage(event)
    if (umsg.startsWith("PIT LEVEL UP")) return console.log(umsg)
}) */
register("chat", (event) => {
    let umsg = ChatLib.removeFormatting(ChatLib.getChatMessage(event))
    if (umsg.startsWith("CLOAK!")) return cancel(event)
})
register("command", () => {
    ChatLib.chat(inSpawn(Player.asPlayerMP()))
    ChatLib.chat(inMid(Player.asPlayerMP()))
}).setName("location")

register("tick", () => {
    if (pitsandbox && useEggs.isPressed()) {
        let slots = [];
        for (let i = 0; i < 9; i++) {
            if (Player.getInventory().getStackInSlot(i) && Player.getInventory().getStackInSlot(i).getID() == 383) {
                if (Player.getInventory().getStackInSlot(i).getNBT() && Player.getInventory().getStackInSlot(i).getNBT().getCompoundTag("tag")) {
                    if (Player.getInventory().getStackInSlot(i).getNBT().getCompoundTag("tag").get("superegg") && Player.getInventory().getStackInSlot(i).getDamage() != 0) {
                        slots.push(i);
                    }
                }
            }
        }
        if (slots.length > 0) {
            lasteggslot = Player.getHeldItemIndex();
            rightclicking = true;
            slots.forEach((slot, i) => {
                setTimeout(() => {
                    if (Player.getHeldItemIndex() != slot) {
                        Player.setHeldItemIndex(slot);
                    }
                    if (i == slots.length - 1) {
                        setTimeout(() => {
                            rightclicking = false;
                            if (Player.getHeldItemIndex() != lasteggslot) Player.setHeldItemIndex(lasteggslot);
                        }, 100);
                    }
                }, i * 50);
            });
        }
    }
})
register("step", () => {
    if (pitsandbox && autoSuperegg) {
        let slots = [];
        for (let i = 0; i < 9; i++) {
            if (Player.getInventory().getStackInSlot(i) && Player.getInventory().getStackInSlot(i).getID() == 383) {
                if (Player.getInventory().getStackInSlot(i).getNBT() && Player.getInventory().getStackInSlot(i).getNBT().getCompoundTag("tag")) {
                    if (Player.getInventory().getStackInSlot(i).getNBT().getCompoundTag("tag").get("superegg") && Player.getInventory().getStackInSlot(i).getDamage() != 0) {
                        slots.push(i);
                    }
                }
            }
        }
        if (slots.length > 0) {
            lasteggslot = Player.getHeldItemIndex();
            rightclicking = true;
            slots.forEach((slot, i) => {
                setTimeout(() => {
                    if (Player.getHeldItemIndex() != slot) {
                        Player.setHeldItemIndex(slot);
                    }
                    if (i == slots.length - 1) {
                        setTimeout(() => {
                            rightclicking = false;
                            if (Player.getHeldItemIndex() != lasteggslot) Player.setHeldItemIndex(lasteggslot);
                        }, 100);
                    }
                }, i * 50);
            });
        }
    }
}).setFps(3)


register("step", () => {
    if (pitsandbox && autoStackBread && !Client.isInGui()) {
        let slots = [];
        for (let i = 0; i < 9; i++) {
            if (Player.getInventory().getStackInSlot(i) && Player.getInventory().getStackInSlot(i).getID() == 296) {
                if (Player.getInventory().getStackInSlot(i).getStackSize() == 64) {
                    slots.push(i);
                }
            }
        }
        if (slots.length > 0) {
            lastBreadslot = Player.getHeldItemIndex();
            rightclicking = true;
            slots.forEach((slot, i) => {
                setTimeout(() => {
                    if (Player.getHeldItemIndex() != slot) {
                        Player.setHeldItemIndex(slot);
                    }
                    if (i == slots.length - 1) {
                        setTimeout(() => {
                            rightclicking = false;
                            if (Player.getHeldItemIndex() != lastBreadslot) Player.setHeldItemIndex(lastBreadslot);
                        }, 100);
                    }
                }, i * 50);
            });
        }
    }
}).setFps(3)


register("tick", () => {
    if (toggleSuperegg.isPressed()) {
        if (autoSuperegg) {
            autoSuperegg = false
            ChatLib.chat("&cDisabled auto SuperEgg!")
        } else {
            autoSuperegg = true
            ChatLib.chat("&aEnabled auto SuperEgg!")
        }
    }
})
register("tick", () => {
    if (toggleStackBread.isPressed()) {
        if (autoStackBread) {
            autoStackBread = false
            ChatLib.chat("&cDisabled auto Stack Bread!")
        } else {
            autoStackBread = true
            ChatLib.chat("&aEnabled auto Stack Bread")
        }
    }
})

let coinBooster
let xpBooster
let botsBooster
let overflowBooster
let fishingBooster
let miningBooster

register("chat", (booster, event) => {
    if (booster == "coin") coinBooster = 1800
    else if (booster == "XP") xpBooster = 1800
    else if (booster == "bots") botsBooster = 1800
    else if (booster == "Overflow") overflowBooster = 1800
    else if (booster == "fishing xp") fishingBooster = 1800
    else if (booster == "Mining xp") miningBooster = 1800
}).setChatCriteria("WOAH! ${*} just activated a ${booster} booster! GG!")

register("step", () => {
    if (coinBooster != undefined) coinBooster--
    if (coinBooster == 0) coinBooster = undefined
    if (xpBooster != undefined) xpBooster--
    if (xpBooster == 0) xpBooster = undefined
    if (botsBooster != undefined) botsBooster--
    if (botsBooster == 0) botsBooster = undefined
    if (overflowBooster != undefined) overflowBooster--
    if (overflowBooster == 0) overflowBooster = undefined
    if (fishingBooster != undefined) fishingBooster--
    if (fishingBooster == 0) fishingBooster = undefined
    if (miningBooster != undefined) miningBooster--
    if (miningBooster == 0) miningBooster = undefined
}).setFps(1)

register("renderOverlay", () => {
    if (!pitsandbox || Client.isInTab() || !Settings.toggleSandboxHUD) return
    let info = [`${Settings.hudGroupColor}&nBoosters`]
    if (coinBooster != undefined) {
        info.splice(1, 0, "&6Coin Booster&7: " + msToTime(coinBooster * 1000))
    } if (xpBooster != undefined) {
        info.splice(2, 0, "&bXP Booster&7: " + msToTime(xpBooster * 1000))
    } if (botsBooster != undefined) {
        info.splice(3, 0, "&3Bots Booster&7: " + msToTime(botsBooster * 1000))
    } if (overflowBooster != undefined) {
        info.splice(4, 0, "&cOverflow Booster&7: " + msToTime(overflowBooster * 1000))
    } if (fishingBooster != undefined) {
        info.splice(5, 0, "&dFishing Booster&7: " + msToTime(fishingBooster * 1000))
    } if (miningBooster != undefined) {
        info.splice(6, 0, "&8Mining Booster&7: " + msToTime(miningBooster * 1000))
    }
    let y = boosterInfoHud.textY
    info.forEach(line => {
        const text = new Text(line, boosterInfoHud.textX, y)
        text.setShadow(true)
        text.setScale(generalInfoHud.textScale)
        if ((info.length > 1 && Settings.boostersInfo) || Settings.generalInfoHud.isOpen()) text.draw()
        y += 12
    })
})

let notglad
let strengthCount = 0
let strengthTimer = 0
let bodybuilderDamage = 0

register("renderOverlay", () => {
    let info = [`${Settings.hudGroupColor}&nPlayer Info`]
    let scoreboard = getSidebar().map(l => ChatLib.removeFormatting(l))
    let megastreak
    if (pitsandbox) megastreak = scoreboard.find(l => l.startsWith("Status: ")).split("Status: ")[1]
    let ubermilestone = ChatLib.removeFormatting(Player.getDisplayName().getText().split(" ")[0])
    let teamdestroyteam = ChatLib.removeFormatting(Player.getDisplayName().getText().split(" ")[0])
    let strength = strengthCount * 8
    if (!inSpawn(Player.asPlayerMP()) && pitsandbox) {
        if (getMega(Player.getName()) != "premega" && !inMid(Player.asPlayerMP()) && inMenu) {
            info.push(`&c&lMegastreak: ${getMegaFormatted(Player.getName())}`)
        } if (strengthCount != 0) {
            info.push("&c&lStrength&c: +" + strength + "%" + " &7(" + strengthTimer + "s)")
        } if (hasPerk("Bodybuilder") != 0 && strengthCount == 5) {
            info.push("&4&lBody Builder&4: &c+" + bodybuilderDamage + "%")
        } if (getMega(Player.getName()) == "overdrive") {
            info.push(`&c&lOverdrive True Damage: &e+${Math.round(0.2 * (streak - 50) / 5 * 10) / 10}&c❤`)
        } if (getMega(Player.getName()) == "highlander") {
            info.push(`&6&lHighlander Damage: &b+${Math.floor(3 * (streak - 50) / 5)}%`)
        } if (getMega(Player.getName()) == "moon") {
            info.push(`&b&lTo The Moon Damage: &b+${Math.floor(3 * (streak - 100) / 5)}%`)
            if (streak >= 200) info.push(`&b&lTo The Moon True Damage: &e+${Math.round(0.1 * (streak - 200) / 20 * 10) / 10}&c❤`)
        } if (getMega(Player.getName()) == "nightmare") {
            info.push(`&9&lNightmare Damage: &b+${Math.floor(5 * (streak - 40) / 15)}%`)
        } if (getMega(Player.getName()) == "hermit") {
            info.push(`&9&lHermit Damage: &b+${Math.floor(10 * (streak - 100) / 15)}%`)
        } if (hasPerk("Berserker Brew") != 0 && scoreboard.find(l => l.startsWith("Bers Brew: "))) {
            const bersLevel = scoreboard.find(l => l.startsWith("Bers Brew: ")).split("Bers Brew: ")[1]
            info.push("&f&lBers Brew&r: &c" + bersLevel)
        } /* if (megastreak == "Nightmare") {
            info.push("&1&lNGHTMRE Bot Damage&1: &c+10%")
        } */ if (perks[2][0] == 'Uberstreak') {
            if (streak >= 100) info.push("&d&lUBER100 Bot Damage&d: &c-30%")
            if (streak >= 200) info.push("&d&lUBER200 Healing&d: &c-40%")
            if (streak >= 300) info.push("&d&lUBER300 Dirty Duration & Spongesteve&d: &c-50%")
            if (streak >= 400) info.push("&d&lUBER400: No Longer Gain Health")
        } if (megastreak == "Hermit") {
            info.push("&9&lHERMIT Block Duration&9: &a+100%")
            if (Player.armor.getLeggings() && hasEnchant("mirror", Player.armor.getLeggings().getNBT()) && hasEnchant("mirror", Player.armor.getLeggings().getNBT()) != NaN) info.push("&9&lHERMIT: &cMirrors Disabled")
        } if (Player.armor.getLeggings() && hasEnchant("solitude", Player.armor.getLeggings().getNBT()) && hasEnchant("solitude", Player.armor.getLeggings().getNBT()) != NaN) {
            if (solisBroken) {
                info.push("&a&lSolitude: &cBroken")
            } else {
                info.push(`&a&lSolitude: &b-${soliLevel}%`)
            }
        } if (notglad != 0) {
            info.push('&b&l"Not" Glad&b: -' + notglad + "%")
        } if (Player.armor.getLeggings() && hasEnchant("frac", Player.armor.getLeggings().getNBT()) && hasEnchant("frac", Player.armor.getLeggings().getNBT()) != NaN && currentCoins != undefined) {
            switch (hasEnchant("frac", Player.armor.getLeggings().getNBT())) {
                case 1:
                    frac = 1.5 * currentCoins.length
                    break
                case 2:
                    frac = 2 * currentCoins.length
                    break
                case 3:
                    frac = 3 * currentCoins.length
                    break
                default:
                    break
            }
            info.push(`&9&lFractional Reserve: &b-${frac}%`)
        } if (shark) {
            info.push("&c&lShark: &c+" + shark + "%")
        } if (inEvent() == "bloodbath") {
            info.push("&4&lBlood Bath: &c+30% Damage")
            info.push("&4&lBlood Bath: &d+20% Healing")

        } if (inEvent() == "rewards") {
            info.push("&2&l2x Rewards: &6Gold &7& &bXP &a+100%")
        } if (inEvent() == "teamdestroy") {
            if (teamdestroyteam == "WATER") {
                info.push("&e&lTEAM DESTROY: &c+30% Damage &bTo &cFire")
                info.push("&e&lTEAM DESTROY: &b+30% Damage &bFrom &aNature")
            } if (teamdestroyteam == "FIRE") {
                info.push("&e&lTEAM DESTROY: &c+30% Damage &cTo &aNature")
                info.push("&e&lTEAM DESTROY: &b+30% Damage &cFrom &bWater")
            } if (teamdestroyteam == "NATURE") {
                info.push("&e&lTEAM DESTROY: &c+30% Damage &aTo &bWater")
                info.push("&e&lTEAM DESTROY: &b+30% Damage &aFrom &cFire")
            } if (teamdestroyteam == "ELEMENTAL") {
                info.push("&e&lTEAM DESTROY: &c10% Damage &bTo &eEveryone")
            }
        }
        //if (info.length > 0 || Settings.generalInfoHud.isOpen()) info.splice(0, 0, `${Settings.hudGroupColor}&nPlayer Info`)
        //else if (Settings.generalInfoHud.isOpen()) new Text(`${Settings.hudGroupColor}&nPlayer Info`, playerInfoHud.textX, playerInfoHud.textY).setScale(playerInfoHud.textScale).setShadow(true).draw()
    }
    let y = playerInfoHud.textY
    info.forEach(line => {
        const text = new Text(line, playerInfoHud.textX, y)
        text.setScale(generalInfoHud.textScale)
        text.setShadow(true)
        y += 11.5 * generalInfoHud.textScale
        if ((info.length > 1 && Settings.playerInfo && pitsandbox) || Settings.generalInfoHud.isOpen()) text.draw()
    })
})

register("step", () => {
    if (!pitsandbox) return
    if (strengthTimer != 0) strengthTimer--
    if (strengthTimer == 0) {
        strengthCount = 0
        bodybuilderDamage = 0
    }
}).setFps(1)

register("step", () => {
    if (!pitsandbox) return
    if (strengthTimer != 0) strengthTimer--
    if (strengthTimer == 0) {
        strengthCount = 0
        bodybuilderDamage = 0
    }
}).setFps(1)

function strength() {
    if (strengthCount < 5) strengthCount++
    if (hasPerk("Bodybuilder") != 0) {
        strengthTimer = 3
        if (strengthCount == 5 && bodybuilderDamage < 16) bodybuilderDamage += hasPerk("Bodybuilder") * 0.5
        if (bodybuilderDamage > 16) bodybuilderDamage = 16
    } else {
        strengthTimer = 7
    }
}

register("tick", () => {
    if (!pitsandbox) return
    if (Player.armor.getLeggings() && hasEnchant("notgladiator", Player.armor.getLeggings().getNBT()) && hasEnchant("notgladiator", Player.armor.getLeggings().getNBT()) != NaN) {
        let ngMult = 0
        let ngPeople = 0
        switch (hasEnchant("notgladiator", Player.armor.getLeggings().getNBT())) {
            case 1:
                ngMult = 2
                break
            case 2:
                ngMult = 4
                break
            case 3:
                ngMult = 6
                break
            default:
                break
        }
        World.getAllEntities().forEach((e) => {
            if (e.getEntity().class.toString().includes("Player") && e.getUUID() != Player.getUUID() && e.distanceTo(World.getPlayerByName(Player.getName())) < 7) ngPeople++
        })
        notglad = (ngPeople > 5 ? ngMult * 5 : ngMult * ngPeople)
    } else notglad = 0
})

register("step", () => {
    if (Player.armor.getLeggings() && hasEnchant("solitude", Player.armor.getLeggings().getNBT()) && hasEnchant("solitude", Player.armor.getLeggings().getNBT()) != NaN) {
        let soliPeople = 0
        World.getAllEntities().forEach((e) => {
            if (e.getEntity().class.toString().includes("Player") && e.getUUID() != Player.getUUID() && e.distanceTo(World.getPlayerByName(Player.getName())) < 7) soliPeople++
        })
        switch (hasEnchant("solitude", Player.armor.getLeggings().getNBT())) {
            case 1:
                soliLevel = 40
                if (soliPeople < 2) solisBroken = false
                else solisBroken = true
                break
            case 2:
                soliLevel = 50
                if (soliPeople < 3) solisBroken = false
                else solisBroken = true
                break
            case 3:
                soliLevel = 60
                if (soliPeople < 3) solisBroken = false
                else solisBroken = true
                break
            default:
                break
        }
    } else solisBroken = undefined
})

let serverNumber

register("chat", server => {
    serverNumber = server
}).setChatCriteria("MOVING! Sending you to PITSANDBOX-${server}")

const BossStatus = Java.type("net.minecraft.entity.boss.BossStatus")

function getBossName() {
    return BossStatus.field_82827_c
}

const inEvent = () => {
    if (ChatLib.removeFormatting(getBossName()).toString().includes(`Starting in`)) return false
    if (ChatLib.removeFormatting(getBossName()).toString().includes(`BLOOD BATH!`)) return "bloodbath"
    else if (ChatLib.removeFormatting(getBossName()).toString().includes(`GAMBLE!`)) return "gamble"
    else if (ChatLib.removeFormatting(getBossName()).toString().includes(`2X REWARDS!`)) return "rewards"
    else if (ChatLib.removeFormatting(getBossName()).toString().startsWith(`W: `)) return "teamdestroy"
    else return false
}

/* register("renderBossHealth", event => {
    if (!inEvent()) cancel(event)
}) */

/* register("renderOverlay", () => {
    if (!inEvent()) {
        const text = new Text(getBossName(), Renderer.screen.getWidth() / 2, 4)
        text.setShadow(true)
        text.draw()
    }
}) */

const activeRunes = () => {
    const helmet = () => {
        if (Player.armor.getHelmet() == null) return "none"
        const NBT = ChatLib.removeFormatting(Player.armor.getHelmet().getNBT())
        if (ChatLib.removeFormatting(NBT.split(`rtype:"`)[1])) {
            if (ChatLib.removeFormatting(NBT.split(`rtype:"`)[1].split('"'))) {
                if (ChatLib.removeFormatting(NBT.split(`rrarity"`)[1])) {
                    if (ChatLib.removeFormatting(NBT.split(`rrarity:"`)[1].split('"'))) {
                        return [ChatLib.removeFormatting(NBT.split(`rtype:"`)[1].split('"')[0]), ChatLib.removeFormatting(NBT.split(`rrarity:"`)[1].split('"')[0])]
                    }
                }
            }
        }
    }
    const chestplate = () => {
        if (Player.armor.getChestplate() == null) return "none"
        const NBT = ChatLib.removeFormatting(Player.armor.getChestplate().getNBT())
        if (ChatLib.removeFormatting(NBT.split(`rtype:"`)[1])) {
            if (ChatLib.removeFormatting(NBT.split(`rtype:"`)[1].split('"'))) {
                if (ChatLib.removeFormatting(NBT.split(`rrarity"`)[1])) {
                    if (ChatLib.removeFormatting(NBT.split(`rrarity:"`)[1].split('"'))) {
                        return [ChatLib.removeFormatting(NBT.split(`rtype:"`)[1].split('"')[0]), ChatLib.removeFormatting(NBT.split(`rrarity:"`)[1].split('"')[0])]
                    }
                }
            }
        }
    }
    const boots = () => {
        if (Player.armor.getBoots() == null) return "none"
        const NBT = ChatLib.removeFormatting(Player.armor.getBoots().getNBT())
        if (ChatLib.removeFormatting(NBT.split(`rtype:"`)[1])) {
            if (ChatLib.removeFormatting(NBT.split(`rtype:"`)[1].split('"'))) {
                if (ChatLib.removeFormatting(NBT.split(`rrarity"`)[1])) {
                    if (ChatLib.removeFormatting(NBT.split(`rrarity:"`)[1].split('"'))) {
                        return [ChatLib.removeFormatting(NBT.split(`rtype:"`)[1].split('"')[0]), ChatLib.removeFormatting(NBT.split(`rrarity:"`)[1].split('"')[0])]
                    }
                }
            }
        }
    }
    return [helmet, chestplate, boots]
}

register("command", () => {
    const helmet = () => {
        if (Player.armor.getHelmet() == null) return "none"
        const NBT = ChatLib.removeFormatting(Player.armor.getHelmet().getNBT())
        if (ChatLib.removeFormatting(NBT.split(`rtype:"`)[1])) {
            if (ChatLib.removeFormatting(NBT.split(`rtype:"`)[1].split('"'))) {
                if (ChatLib.removeFormatting(NBT.split(`rrarity"`)[1])) {
                    if (ChatLib.removeFormatting(NBT.split(`rrarity:"`)[1].split('"'))) {
                        return [ChatLib.removeFormatting(NBT.split(`rtype:"`)[1].split('"')[0]), ChatLib.removeFormatting(NBT.split(`rrarity:"`)[1].split('"')[0])]
                    }
                }
            }
        }
    }
    const chestplate = () => {
        if (Player.armor.getChestplate() == null) return "none"
        const NBT = ChatLib.removeFormatting(Player.armor.getChestplate().getNBT())
        if (ChatLib.removeFormatting(NBT.split(`rtype:"`)[1])) {
            if (ChatLib.removeFormatting(NBT.split(`rtype:"`)[1].split('"'))) {
                if (ChatLib.removeFormatting(NBT.split(`rrarity"`)[1])) {
                    if (ChatLib.removeFormatting(NBT.split(`rrarity:"`)[1].split('"'))) {
                        return [ChatLib.removeFormatting(NBT.split(`rtype:"`)[1].split('"')[0]), ChatLib.removeFormatting(NBT.split(`rrarity:"`)[1].split('"')[0])]
                    }
                }
            }
        }
    }
    const boots = () => {
        if (Player.armor.getBoots() == null) return "none"
        const NBT = ChatLib.removeFormatting(Player.armor.getBoots().getNBT())
        if (ChatLib.removeFormatting(NBT.split(`rtype:"`)[1])) {
            if (ChatLib.removeFormatting(NBT.split(`rtype:"`)[1].split('"'))) {
                if (ChatLib.removeFormatting(NBT.split(`rrarity"`)[1])) {
                    if (ChatLib.removeFormatting(NBT.split(`rrarity:"`)[1].split('"'))) {
                        return [ChatLib.removeFormatting(NBT.split(`rtype:"`)[1].split('"')[0]), ChatLib.removeFormatting(NBT.split(`rrarity:"`)[1].split('"')[0])]
                    }
                }
            }
        }
    }
    ChatLib.chat(helmet() + chestplate() + boots())
}).setName("none")

const runes = {
    unholy: {
        uncommon: 0.01,
        rare: 0.02,
        epic: 0.05,
        legendary: 0.1
    },
    haymaker: {
        uncommon: 1,
        rare: 1.5,
        epic: 2,
        legendary: 2.5
    },
    archer: {
        uncommon: 1,
        rare: 3,
        epic: 5,
        legendary: 10
    },
    warrior: {
        uncommon: 1,
        rare: 3,
        epic: 5,
        legendary: 10
    },
    crossbow: {
        legendary: 2.5
    },
    piercing: {
        uncommon: 1,
        rare: 2.5,
        epic: 5,
        legendary: 10
    },
    justice: {
        uncommon: 1,
        rare: 2,
        epic: 3,
        legendary: 5
    }

}
register("chat", () => {
    Client.showTitle("&eSaving Grace", "&7saved you from death!", 0, 35, 0)
}).setChatCriteria("SAVING GRACE! saved you from death!")

register("command", () => {
    ChatLib.chat(ChatLib.removeFormatting(Player.getHeldItem().getNBT()))
}).setName("nbtlol")

register("command", (arg1, arg2) => {
    if (arg1 < 0 && arg1 > 60) return ChatLib.chat("&cInvalid Prestige! Must be between 0-60")
    if (arg2 < 1 && arg2 > 120) return ChatLib.chat("&cInvalid Level! Must be between 1-120")
    ChatLib.chat(`&b${formatNumber((xpneeded[arg2] / 12) * prestigexp[arg1])} XP`)
}).setName("prestigexp")

register("command", (arg1) => {
    if (arg1 < 0 && arg1 > 60) return ChatLib.chat("&cInvalid Prestige! Must be between 0-60")
    ChatLib.chat(`&b${formatNumber((prestigexp[arg1]) * totalxpnopres)} XP`)
}).setName("prestigetotalxp")

register("chat", event => {
    if (!Settings.toggleBDAlert) return
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            World.playSound("note.pling", 1, 1);
        }, i * 130);
    }
    Client.showTitle("&b&lDIVINE!", "&7Lives kept!", 0, 45, 0);
}).setChatCriteria("DIVINE INTERVENTION! Lives kept!")

register("chat", event => {
    if (!Settings.toggleBDAlert) return
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            World.playSound("note.pling", 1, 0.5);
        }, i * 130);
    }
}).setChatCriteria("INVENTORY BEACON! Lives kept!")

let generalInfoHud = new PogObject("PitSandboxDev", {
    "firstTime": true,
    "textX": Renderer.screen.getWidth() * 0.895,
    "textY": 4,
    "textScale": 1
}, "guiLocations/generalInfo.json")

let streakInfoHud = new PogObject("PitSandboxDev", {
    "textX": Renderer.screen.getWidth() * 0.895,
    "textY": Renderer.screen.getHeight() * 2 / 5,
    "textScale": 1
}, "guiLocations/streakInfo.json")

let huntInfoHud = new PogObject("PitSandboxDev", {
    "firstTime": true,
    "textX": Renderer.screen.getWidth() * 0.895,
    "textY": Renderer.screen.getHeight() * 3 / 5,
    "textScale": 1
}, "guiLocations/huntInfo.json")

let upgradesInfoHud = new PogObject("PitSandboxDev", {
    "textX": 4,
    "textY": Renderer.screen.getHeight() / 9,
    "textScale": 1
}, "guiLocations/upgradesInfo.json")

let playerInfoHud = new PogObject("PitSandboxDev", {
    "textX": Renderer.screen.getWidth() / 5,
    "textY": 4,
    "textScale": 1
}, "guiLocations/playerInfo.json")

let boosterInfoHud = new PogObject("PitSandboxDev", {
    "textX": Renderer.screen.getWidth() * 2 / 3,
    "textY": 4,
    "textScale": 1
}, "guiLocations/boosterInfo.json")

let cooldownInfoHud = new PogObject("PitSandboxDev", {
    "textX": 4,
    "textY": Renderer.screen.getHeight() / 3
}, "guiLocations/cooldownInfo.json")

let preInfoHud = new PogObject("PitSandboxDev", {
    "textX": Renderer.screen.getWidth() / 2,
    "textY": Renderer.screen.getHeight() * 8 / 10,
    "textScale": 1
}, "guiLocations/preInfo.json")

let targetInfoHud = new PogObject("PitSandboxDev", {
    "textX": Renderer.screen.getWidth() * 2 / 3,
    "textY": Renderer.screen.getHeight() * 9 / 10,
    "textScale": 1
}, "guiLocations/targetInfo.json")

register("dragged", (mouseDeltaX, mouseDeltaY, mouseX, mouseY, button) => {
    if (Settings.generalInfoHud.isOpen()) {
        if (((mouseX + 70 >= generalInfoHud.textX) && (mouseX - 70 <= generalInfoHud.textX)) && ((mouseY + 70 >= generalInfoHud.textY) && (mouseY - 70 <= generalInfoHud.textY))) {
            generalInfoHud.textX = mouseX
            generalInfoHud.textY = mouseY
        } else if (((mouseX + 70 >= streakInfoHud.textX) && (mouseX - 70 <= streakInfoHud.textX)) && ((mouseY + 70 >= streakInfoHud.textY) && (mouseY - 70 <= streakInfoHud.textY))) {
            streakInfoHud.textX = mouseX
            streakInfoHud.textY = mouseY
        } else if (((mouseX + 70 >= huntInfoHud.textX) && (mouseX - 70 <= huntInfoHud.textX)) && ((mouseY + 70 >= huntInfoHud.textY) && (mouseY - 70 <= huntInfoHud.textY))) {
            huntInfoHud.textX = mouseX
            huntInfoHud.textY = mouseY
        } else if (((mouseX + 70 >= upgradesInfoHud.textX) && (mouseX - 70 <= upgradesInfoHud.textX)) && ((mouseY + 70 >= upgradesInfoHud.textY) && (mouseY - 70 <= upgradesInfoHud.textY))) {
            upgradesInfoHud.textX = mouseX
            upgradesInfoHud.textY = mouseY
        } else if (((mouseX + 70 >= playerInfoHud.textX) && (mouseX - 70 <= playerInfoHud.textX)) && ((mouseY + 70 >= playerInfoHud.textY) && (mouseY - 70 <= playerInfoHud.textY))) {
            playerInfoHud.textX = mouseX
            playerInfoHud.textY = mouseY
        } else if (((mouseX + 70 >= boosterInfoHud.textX) && (mouseX - 70 <= boosterInfoHud.textX)) && ((mouseY + 70 >= boosterInfoHud.textY) && (mouseY - 70 <= boosterInfoHud.textY))) {
            boosterInfoHud.textX = mouseX
            boosterInfoHud.textY = mouseY
        } else if (((mouseX + 70 >= cooldownInfoHud.textX) && (mouseX - 70 <= cooldownInfoHud.textX)) && ((mouseY + 70 >= cooldownInfoHud.textY) && (mouseY - 70 <= cooldownInfoHud.textY))) {
            cooldownInfoHud.textX = mouseX
            cooldownInfoHud.textY = mouseY
        } else if (((mouseX + 70 >= preInfoHud.textX) && (mouseX - 70 <= preInfoHud.textX)) && ((mouseY + 70 >= preInfoHud.textY) && (mouseY - 70 <= preInfoHud.textY))) {
            preInfoHud.textX = mouseX
            preInfoHud.textY = mouseY
        } else if (((mouseX + 70 >= targetInfoHud.textX) && (mouseX - 70 <= targetInfoHud.textX)) && ((mouseY + 70 >= targetInfoHud.textY) && (mouseY - 70 <= targetInfoHud.textY))) {
            targetInfoHud.textX = mouseX
            targetInfoHud.textY = mouseY
        }
        generalInfoHud.save()
        streakInfoHud.save()
        huntInfoHud.save()
        upgradesInfoHud.save()
        playerInfoHud.save()
        boosterInfoHud.save()
        cooldownInfoHud.save()
        preInfoHud.save()
        targetInfoHud.save()
    }
})

register("guiKey", (char, keyCode, gui, event) => {
    if (Settings.generalInfoHud.isOpen()) {
        if (keyCode == 200) {
            generalInfoHud.textScale += generalInfoHud.textScale < 10 ? 0.1 : 0
            streakInfoHud.textScale += streakInfoHud.textScale < 10 ? 0.1 : 0
            huntInfoHud.textScale += huntInfoHud.textScale < 10 ? 0.1 : 0
            upgradesInfoHud.textScale += upgradesInfoHud.textScale < 10 ? 0.1 : 0
            playerInfoHud.textScale += playerInfoHud.textScale < 10 ? 0.1 : 0
            boosterInfoHud.textScale += boosterInfoHud.textScale < 10 ? 0.1 : 0
        } else if (keyCode == 208) {
            generalInfoHud.textScale -= generalInfoHud.textScale > 0.1 ? 0.1 : 0
            streakInfoHud.textScale -= streakInfoHud.textScale > 0.1 ? 0.1 : 0
            huntInfoHud.textScale -= huntInfoHud.textScale > 0.1 ? 0.1 : 0
            upgradesInfoHud.textScale -= upgradesInfoHud.textScale > 0.1 ? 0.1 : 0
            playerInfoHud.textScale -= playerInfoHud.textScale > 0.1 ? 0.1 : 0
            boosterInfoHud.textScale -= boosterInfoHud.textScale > 0.1 ? 0.1 : 0
        }
        generalInfoHud.save()
        streakInfoHud.save()
        huntInfoHud.save()
        upgradesInfoHud.save()
        playerInfoHud.save()
        boosterInfoHud.save()
    }
})

register("scrolled", (mouseX, mouseY, direction) => {
    if (Settings.generalInfoHud.isOpen()) {
        if (direction == 1) {
            generalInfoHud.textScale += generalInfoHud.textScale < 10 ? 0.1 : 0
            streakInfoHud.textScale += streakInfoHud.textScale < 10 ? 0.1 : 0
            huntInfoHud.textScale += huntInfoHud.textScale < 10 ? 0.1 : 0
            upgradesInfoHud.textScale += upgradesInfoHud.textScale < 10 ? 0.1 : 0
            playerInfoHud.textScale += playerInfoHud.textScale < 10 ? 0.1 : 0
            boosterInfoHud.textScale += boosterInfoHud.textScale < 10 ? 0.1 : 0
        } else if (direction == -1) {
            generalInfoHud.textScale -= generalInfoHud.textScale > 0 ? 0.1 : 0
            streakInfoHud.textScale -= streakInfoHud.textScale > 0 ? 0.1 : 0
            huntInfoHud.textScale -= huntInfoHud.textScale > 0 ? 0.1 : 0
            upgradesInfoHud.textScale -= upgradesInfoHud.textScale > 0 ? 0.1 : 0
            playerInfoHud.textScale -= playerInfoHud.textScale > 0 ? 0.1 : 0
            boosterInfoHud.textScale -= boosterInfoHud.textScale > 0 ? 0.1 : 0

        }
        generalInfoHud.save()
        streakInfoHud.save()
        huntInfoHud.save()
        upgradesInfoHud.save()
        playerInfoHud.save()
        boosterInfoHud.save()

    }
})

const firstMessage = [
    `&d&l&nPit Sandbox 2.0.0`,
    "",
    "&aThank you for using &dPitSandbox&a!",
    "&7Use &e/ps &7to open the settings GUI",
    "",
    "&6&lThis ChatTrigger has been verified by the &cO&lwner&6!",
    "",
    "&aIf you found a bug or have any suggestions,",
    "&aDM &dJMB#0001 &7& &biPower#4441",
    "&9&nhttps://discord.gg/XZcgpz6bFw",
    ""
]

function welcome() {
    if (!generalInfoHud.firstTime) return
    setTimeout(() => {
        World.playSound("random.levelup", 1, 1)
        ChatLib.chat(`&b&m${ChatLib.getChatBreak(" ")}`)
        firstMessage.forEach(message => {
            ChatLib.chat(ChatLib.getCenteredText(message))
        })
        ChatLib.chat(`&b&m${ChatLib.getChatBreak(" ")}`)
        generalInfoHud.firstTime = false;
        generalInfoHud.save()
    }, 1000)
}

const changelogMessage = [
    "&bRead the changelogs in #announcements",
]

const changelog = new Changelog("PitSandboxDEV", "2.0.0", changelogMessage.join('\n'))
changelog.writeChangelog({ name: "&d&l&n", version: "&e", changelog: "&a" })


register("command", () => {
    resetdisplay()
    ChatLib.chat("&aDisplay locations reset!")
    World.playSound("random.successful_hit", 1, 1.5)
}).setName("resetdisplay")

function resetdisplay() {
    generalInfoHud.textScale = 1
    generalInfoHud.textX = Renderer.screen.getWidth() * 0.895
    generalInfoHud.textY = 4
    streakInfoHud.textX = Renderer.screen.getWidth() * 0.895
    streakInfoHud.textY = Renderer.screen.getHeight() * 2 / 5
    huntInfoHud.textX = Renderer.screen.getWidth() * 0.895
    huntInfoHud.textY = Renderer.screen.getHeight() * 3 / 5
    upgradesInfoHud.textX = 4
    upgradesInfoHud.textY = Renderer.screen.getHeight() / 9
    playerInfoHud.textX = Renderer.screen.getWidth() / 5
    playerInfoHud.textY = 4
    boosterInfoHud.textX = Renderer.screen.getWidth() * 2
    boosterInfoHud.textY = Renderer.screen.getHeight() * 8 / 10
    cooldownInfoHud.textX = 4
    cooldownInfoHud.textY = Renderer.screen.getHeight() / 3
    preInfoHud.textX = Renderer.screen.getWidth() / 2
    preInfoHud.textY = Renderer.screen.getHeight() * 8 / 10
    targetInfoHud.textX = Renderer.screen.getWidth() * 2 / 3
    targetInfoHud.textY = Renderer.screen.getHeight() * 9 / 10
    generalInfoHud.save()
    streakInfoHud.save()
    huntInfoHud.save()
    upgradesInfoHud.save()
    playerInfoHud.save()
    boosterInfoHud.save()
    cooldownInfoHud.save()
    preInfoHud.save()
    targetInfoHud.save()
}

register("renderOverlay", () => {
    if (Settings.generalInfoHud.isOpen()) {
        new Text("&aUse ▲ arrow key UP to scale up", Renderer.screen.getWidth() / 2 - (Renderer.getStringWidth("&aUse ▲ arrow key UP to scale up") / 2), Renderer.screen.getHeight() / 2 - 5).setShadow(true).setScale(1).draw();
        new Text("&aUse ▼ arrow key DOWN to scale down", Renderer.screen.getWidth() / 2 - (Renderer.getStringWidth("&aUse ▼ arrow key DOWN to scale down") / 2), Renderer.screen.getHeight() / 2 + 5).setShadow(true).setScale(1).draw();
        new Text("&aYou can also use the scroll wheel", Renderer.screen.getWidth() / 2 - (Renderer.getStringWidth("&aYou can also use the scroll wheel") / 2), Renderer.screen.getHeight() / 2 + 15).setShadow(true).setScale(1).draw();
    }
})

const getMaxhealth = Java.type("net.minecraft.entity.SharedMonsterAttributes")

function maxHealth() {
    return getMaxhealth.field_111267_a(Player.getName())
}

let firstaideggCooldown = 0
let pullCooldown = 0
let leapCooldown = 0
let moonStickCooldown = 0

register("soundPlay", (pos, name, vol, pitch, cat, event) => {
    if (!pitsandbox) return
    if (name.toLocaleLowerCase().includes("mob.cat.hiss") && pitch.toFixed(1) == "2.0") firstaideggCooldown = 9.8 * 10
    if (name.toLocaleLowerCase().includes("mob.wither.idle") && pitch.toFixed(1) == "2.0") leapCooldown = (10.4 - (10 * hasPerk("Power Surge") * 10 / 100)) * 10
    if (name.toLocaleLowerCase().includes("mob.bat.takeoff") && pitch.toFixed(1) == "1.0") pullCooldown = (5.9 - (6 * hasPerk("Power Surge") * 10 / 100)) * 10
})

register("chat", event => {
    if (!pitsandbox) return
    moonStickCooldown = 19.9 * 10
}).setChatCriteria("WHOHOO! Launched ${*} player(s) into the sky!")

register("step", () => {
    firstaideggCooldown > 0 ? firstaideggCooldown-- : firstaideggCooldown = 0
    pullCooldown > 0 ? pullCooldown-- : pullCooldown = 0
    leapCooldown > 0 ? leapCooldown-- : leapCooldown = 0
    moonStickCooldown > 0 ? moonStickCooldown-- : moonStickCooldown = 0
}).setFps(10)

register("renderOverlay", () => {
    let info = [`${Settings.hudGroupColor}&nCooldowns`]
    if (firstaideggCooldown != 0) info.push(`&c&lFirst Aid Egg: &e${firstaideggCooldown / 10}s`)
    if (pullCooldown != 0) info.push(`&2&lPullbow: &e${pullCooldown / 10}s`)
    if (leapCooldown != 0) info.push(`&e&lLeap: &e${leapCooldown / 10}s`)
    if (moonStickCooldown != 0) info.push(`&9&lMoon Stick: &e${moonStickCooldown / 10}s`)
    let y = cooldownInfoHud.textY
    info.forEach(line => {
        const text = new Text(line, cooldownInfoHud.textX, y).setShadow(true).setScale(generalInfoHud.textScale)
        y += 11.5 * generalInfoHud.textScale
        if ((info.length > 1 && Settings.cooldownInfo) || Settings.generalInfoHud.isOpen()) text.draw()
    })
})