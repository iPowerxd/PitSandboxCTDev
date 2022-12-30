import Settings from './Config';
/* import {
    request
} from "RequestV2"; */

/* 
let version = "b43"; */


register("command", Settings.openGUI).setName("pitsandbox").setAliases(["ps"]);

const isInMainServer = () => {
    let name = ChatLib.removeFormatting(Player.getDisplayName().getText());
    if (name.split(" ").length < 2) return false;
    name = name.split(" ")[0];
    if (name.includes("[")) {
        if (/^\[[0-9]{1,3}\]$/g.test(name.split(" ")[0])) return true;
        else return false;
    } else return true;
};


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
            ).sort() : ["add", "remove", "addguild", "removeguild", "ignore", "list", "clear"].filter(n => n.toLowerCase().startsWith(args.length ? args[args.length - 1].toLowerCase() : "")).sort();

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
let pitsandbox = (Server.getIP().includes("harrys.network") || Server.getIP().includes("pitsandbox.io")) && isInMainServer();
const prestigeinfo = ["§7", "§9", "§9", "§9", "§9", "§e", "§e", "§e", "§e", "§e", "§6", "§6", "§6", "§6", "§6", "§c", "§c", "§c", "§c", "§c", "§5", "§5", "§5", "§5", "§5", "§d", "§d", "§d", "§d", "§d", "§f", "§f", "§f", "§f", "§f", "§b", "§b", "§b", "§b", "§b", "§a", "§a", "§a", "§a", "§a", "§4", "§4", "§4", "§4", "§4", "§3", "§3", "§3", "§3", "§3", "§2", "§2", "§2", "§2", "§2", "§1"];
const prestigexp = [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.75, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 45, 50, 75, 100, 101, 202, 303, 404, 505, 606, 707, 808, 909, 1010, 1111, 1212, 1313, 1414, 1515, 3030, 4545, 6060, 7575, 9090, 18180, 27270, 36360, 45450, 54540, 109079]
let sidebar = [];
let gems = undefined;
let megacoins = undefined;
let streak = 0;
let streakkills = 0;
let autoSuperegg = false
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
let syncedKOS = [];
let syncedTruce = [];
let namecache = {}
let toggleSuperegg = new KeyBind("Toggle Auto SuperEgg", "", "!PitSandbox")
/* request({
    url: "http://152.228.218.17:5001/syncedKOS.json",
    ssl: false
}).then(res => {
    syncedKOS = JSON.parse(res);
    FileLib.write("Pitsandbox", "syncedKOS.json", JSON.stringify(syncedKOS));
}).catch(err => ChatLib.chat("&cAn error occured while downloading syncedKOS.json: " + err));
request({
    url: "http://152.228.218.17:5001/namecache.json",
    ssl: false
}).then(res => {
    namecache = JSON.parse(res);
    FileLib.write("Pitsandbox", "namecache.json", JSON.stringify(namecache));
}).catch(err => ChatLib.chat("&cAn error occured while downloading namecache.json: " + err));
request({
    url: "http://152.228.218.17:5001/syncedTruce.json",
    ssl: false
}).then(res => {
    syncedTruce = JSON.parse(res);
    FileLib.write("Pitsandbox", "syncedTruce.json", JSON.stringify(syncedTruce));
}).catch(err => ChatLib.chat("&cAn error occured while downloading syncedTruce.json: " + err)); */
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
let huntedPlayers = JSON.parse(FileLib.read("Pitsandbox", "huntedPlayers.json"));
let huntedGuilds = JSON.parse(FileLib.read("Pitsandbox", "huntedGuilds.json"));
let ignoredPlayers = [];
if (!FileLib.exists("Pitsandbox", "ignoredPlayers.json")) FileLib.write("Pitsandbox", "ignoredPlayers.json", "[]");
else ignoredPlayers = JSON.parse(FileLib.read("Pitsandbox", "ignoredPlayers.json"));
let balances = {};
let balqueue = [];
if (!FileLib.exists("Pitsandbox", "balances.json")) FileLib.write("Pitsandbox", "balances.json", "{}"), balances = JSON.parse(FileLib.read("Pitsandbox", "balances.json"));
else balances = JSON.parse(FileLib.read("Pitsandbox", "balances.json"));
let onlinePlayers = TabList.getUnformattedNames().filter(n => !n.includes("§") && !n.startsWith("CIT-"));
let onlinePlayersFormatted = TabList.getNames().filter(n => n.split(" ").length > 1);
let onlineHunt = huntedPlayers.filter(n => onlinePlayers.includes(n));
let onlineHuntGuild = onlinePlayersFormatted.filter(n => n.split(" ")[2] && huntedGuilds.includes(ChatLib.removeFormatting(n.split(" ")[2].replace(/[\[\]]/g, "")).toUpperCase())).map(n => ChatLib.removeFormatting(n.split(" ")[1]));
let onlineHuntKOS = syncedKOS.filter(k => k.uuid ? (namecache[k.uuid] ? (onlinePlayers.includes(namecache[k.uuid].name)) : false) : (onlinePlayers.includes(k)));
const BlockPos1 = Java.type("net.minecraft.util.BlockPos");
const C08 = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement");
const S01 = Java.type("net.minecraft.network.play.server.S01PacketJoinGame");
const S47 = Java.type("net.minecraft.network.play.server.S47PacketPlayerListHeaderFooter");
const C17 = Java.type("net.minecraft.network.play.client.C17PacketCustomPayload");
const PacketBuffer = Java.type("net.minecraft.network.PacketBuffer");
let Unpooled = Java.type("io.netty.buffer.Unpooled");

/* import {
    request
} from "RequestV2"; */

const NBTTagString = Java.type("net.minecraft.nbt.NBTTagString");
let KeyBinding = Java.type("net.minecraft.client.settings.KeyBinding");

/* if (/^function injectMain\(inject\) {/gm.test(FileLib.read("Pitsandbox", "index.js"))) {
    ChatLib.chat("&aUpdating loader...");
    request({
        url: "http://152.228.218.17:5001/loader",
        ssl: false
    }).then(res => {
        ChatLib.chat("&aUpdated loader"), FileLib.write("Pitsandbox", "index.js", decodeURIComponent(res));
    }).catch(err => ChatLib.chat("&cAn error occured while updating loader: " + err));
} */

register("worldLoad", () => {
    inMenu = true
})

register("worldUnload", () => {
    inMenu = undefined
})

/* register("postGuiRender", (screen, mouseY, mouseX) => {
    if (!inMenu) return;
    if (!Client.isInChat()) {
        if (Client.isInGui()) {
            let Y = Renderer.screen.getHeight();
            let ver = new Text(Settings.inventoryText, 0, 0);
            ver.setY(Y - (ver.getHeight() * 1.2) - 4);
            ver.setX(Renderer.screen.getWidth() - (Renderer.getStringWidth(ver.getString()) * 1.4) - 4);
            ver.setScale(1.35);
            ver.setShadow(true);
            ver.setColor(Renderer.color(255, 255, 255));``
            ver.draw();
        }
        
    } 
}) */
/* ver.setColor(Renderer.color(255, 255, 255)); */
/* let ver = new Text("Pitsandbox " + version, 0, 0); *
/* const printChangelog = () => {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            World.playSound("note.pling", 1, 2);
            World.playSound("random.orb", 1, 2);
        }, i * 100);
    }
    Client.showTitle("&e&l&nNEW&r &e&l&nPITSANDBOX&r &e&l&nMODULE&r &e&l&nVERSION!", "&6Check your chat!", 0, 60, 0);
    ChatLib.chat("&r &r &r &r");
    ChatLib.chat("&6&m-----------------------------------------------");
    ChatLib.chat("&6&m-&r &6&lPitsandbox " + version + " Module Changelogs &r&6&m-\n&r");
    ChatLib.chat("&6&m-&r&e longer waiting when joining pitsandbox so that it actually detects correctly");
    ChatLib.chat("&6&m-----------------------------------------------");
    ChatLib.chat("&r &r &r &r");
};

const checkChangelog = () => {
    if (pitsandbox) {
        if (!FileLib.exists("Pitsandbox", "version")) FileLib.write("Pitsandbox", "version", version), printChangelog();
        else if (FileLib.read("Pitsandbox", "version") != version) FileLib.write("Pitsandbox", "version", version), printChangelog();
    }
}; */
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
    if (/* Settings.swapMid */  entity && Math.sqrt(entity.getEntity().func_174831_c(new BlockPos1(0.5, entity.getY(), 0.5))) < Settings.midRadius) {
        if (entity.getY() > 70 && entity.getY() < 95) {
            return true;
        } /* else if (!Settings.swapMid && entity && Math.sqrt(entity.getEntity().func_174831_c(new BlockPos1(0.5, entity.getY(), 0.5))) < Settings.midRadius) {
            if (entity.getY() > 70 && entity.getY() < 95) {
                return true;
            }
        } */
    }
    return false;
};

const inSpawn = entity => {
    if (/* !Settings.swapMid && */ Math.sqrt(entity.getEntity().func_174831_c(new BlockPos1(0.5, entity.getY(), 0.5))) < 33) {
        if (entity.getY() > 90 && entity.getY() < 140) {
            return true;
        } /* else if (Settings.swapMid && Math.sqrt(entity.getEntity().func_174831_c(new BlockPos1(0.5, entity.getY(), 0.5))) < 33) {
            if (entity.getY() > 90 && entity.getY() < 100) {
                return true;
            }
        } */
    }
    return false;
};

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
    if (!streaking) return;
    lastendstreak = Date.now();
    streaking = false;
    recapStreak();
};


let sent = false;

/* const hasFirstaidegg = (NBT) => {
    if (NBT.toString().split("firstaidegg:")[1]) {
        if (NBT.toString().split("firstaidegg:")[1].split(",display:")) {
            if (NBT.toString().split("firstaidegg:")[1].split(",display:")[0] == "1b") return true
        }
    } else return false
}

const whereFirstaidegg = () => {
    for (let i = 0; i < 9; i++) {
        if (Player.getInventory()) slot = Player.getInventory().getStackInSlot(i)
        if (slot && slot.getID() != 1 && slot.getNBT() && hasFirstaidegg(slot.getNBT())) return i
    } return false
}

const isFirstaideggUsed = () => {
    if (whereFirstaidegg()) {
        let item = Player.getInventory().getStackInSlot(whereFirstaidegg()).toString().split("@")
        if (item[1] == 60) return true
        else if (item[1] == 96) return false
        else return undefined
    }
}

 */
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
    if (Settings.toggleBDAlert && isPre()) {
        if (umsg == "DIVINE INTERVENTION! Lives kept!") {

            (() => {
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => {
                        World.playSound("note.pling", 1, 1);
                    }, i * 130);
                }
                Client.showTitle("&b&lDIVINE!", "&7Lives kept!", 0, 45, 0);
            }, 200);
        } else if (umsg == "INVENTORY BEACON! Lives kept!") {
            setTimeout(() => {
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => {
                        World.playSound("note.pling", 1, 0.5);
                    }, i * 130);
                }
                Client.showTitle("&b&lBEACON!", "&7YOU GOT PRED EL BOZO!", 0, 45, 0);
            }, 200);
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
            FileLib.write("Pitsandbox", "huntedPlayers.json", JSON.stringify(huntedPlayers));
            break;
        case "remove":
            if (!arg2 || arg2.length < 3 || arg2.length > 16) return ChatLib.chat("&cInvalid name.");
            if (!huntedPlayers.find(p => ChatLib.removeFormatting(p.toLowerCase()) == ChatLib.removeFormatting(arg2.toLowerCase()))) return ChatLib.chat("&cPlayer not hunted.");
            huntedPlayers.splice(huntedPlayers.findIndex(p => ChatLib.removeFormatting(p.toLowerCase()) == ChatLib.removeFormatting(arg2.toLowerCase())), 1);
            ChatLib.chat("&aRemoved " + ChatLib.removeFormatting(arg2) + " from hunted list.");
            FileLib.write("Pitsandbox", "huntedPlayers.json", JSON.stringify(huntedPlayers));
            break;
        case "addguild":
            if (!arg2 || arg2.length > 4) return ChatLib.chat("&cInvalid name.");
            if (huntedGuilds.find(g => g.toLowerCase() == arg2.toLowerCase())) return ChatLib.chat("&cGuild already hunted.");
            huntedGuilds.push(arg2.toUpperCase());
            ChatLib.chat("&aAdded " + arg2.toUpperCase() + " to hunted guild list.");
            FileLib.write("Pitsandbox", "huntedGuilds.json", JSON.stringify(huntedGuilds));
            break;
        case "removeguild":
            if (!arg2 || arg2.length > 4) return ChatLib.chat("&cInvalid name.");
            if (!huntedGuilds.find(g => g.toLowerCase() == arg2.toLowerCase())) return ChatLib.chat("&cGuild not hunted.");
            huntedGuilds.splice(huntedGuilds.findIndex(g => g.toLowerCase() == arg2.toLowerCase()), 1);
            ChatLib.chat("&aRemoved " + arg2.toUpperCase() + " from hunted guild list.");
            FileLib.write("Pitsandbox", "huntedGuilds.json", JSON.stringify(huntedGuilds));
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
            FileLib.write("Pitsandbox", "ignoredPlayers.json", JSON.stringify(ignoredPlayers));
            break;
        case "clear":
            huntedPlayers = [];
            ChatLib.chat("&aCleared hunted list.");
            FileLib.write("Pitsandbox", "huntedPlayers.json", JSON.stringify(huntedPlayers));
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
        onlineHuntKOS = syncedKOS.filter(k => k.uuid ? (namecache[k.uuid] ? (onlinePlayers.includes(namecache[k.uuid].name)) : false) : (onlinePlayers.includes(k))).map(o => (o.uuid ? namecache[o.uuid].name : o));
        if (huntingKey.isPressed()) {
            if (onlineHunt.length < 1 && onlineHuntGuild.length < 1 && onlineHuntKOS.length < 1) {
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
            if (!Settings.toggleSandboxHUD) return;
            let general = ["Level: &cUnknown", "Coins: &cUnknown", Settings.hudTextColor + "Megacoins: &cUnknown", Settings.hudTextColor + "Gems: &cUnknown", "GoldReq: &cUnknown &7(" + greqrefresh + ")"];
            let scoreboard = getSidebar().map(l => ChatLib.removeFormatting(l));
            if (scoreboard.find(l => l.startsWith("Needed XP: "))) {
                const neededxpn = scoreboard.find(l => l.startsWith("Needed XP: ")).split("Needed XP: ")[1];
                general.splice(1, 0, [Settings.hudTextColor + "Needed XP: &b" + neededxpn]);
            }
            if (scoreboard.find(l => l.startsWith("Prestige: ")) && scoreboard.find(l => l.startsWith("Level: "))) {
                const pres = romanToInt(scoreboard.find(l => l.startsWith("Prestige: ")).split("Prestige: ")[1]);
                const lvl = parseInt(scoreboard.find(l => l.startsWith("Level: ")).split("Level: ")[1].replace(/[\[\]]/g, ""));
                const sbneededxp = (scoreboard.find(l => l.startsWith("Needed XP: ")) ? parseInt(scoreboard.find(l => l.startsWith("Needed XP: ")).split("Needed XP: ")[1].replace(/,/g, "")) : undefined);
                if (lvl != 120) {
                    if (sbneededxp) {
                        let totalxp = 0;
                        for (let i = 1; i < 120; i++) totalxp += xpneeded[Math.floor(i / 10)] * prestigexp[pres];
                        let levelxp = 0;
                        for (let i = 1; i < lvl + 1; i++) levelxp += xpneeded[Math.floor(i / 10)] * prestigexp[pres];
                        levelxp -= sbneededxp;
                        const percent = Math.floor(levelxp / totalxp * 100 * 1000) / 1000;
                        general.splice((general.findIndex(l => l.includes("Needed XP:")) != -1 ? general.findIndex(l => l.includes("Needed XP:")) : 1), 0, [Settings.hudTextColor + "Prestige XP Progress: &b" + percent + "%"]);
                        let neededxp = 0;
                        for (let i = 1; i < lvl + 1; i++) neededxp += xpneeded[Math.floor(i / 10)] * prestigexp[pres];
                        neededxp = totalxp - neededxp + sbneededxp;
                        general.splice((general.findIndex(l => l.includes("Needed XP:")) != -1 ? general.findIndex(l => l.includes("Needed XP:")) : 1), 0, [Settings.hudTextColor + "Total XP Needed: &b" + formatNumber(neededxp)]);
                    }
                }
                const brackets = getBrackets(lvl, pres, true);
                general[0] = Settings.hudTextColor + "Level: " + brackets;
            }
            if (scoreboard.find(l => l.startsWith("Coins: "))) {
                const coins = scoreboard.find(l => l.startsWith("Coins: ")).split("Coins: ")[1];
                general[general.indexOf("Coins: &cUnknown")] = Settings.hudTextColor + "Coins: &6" + coins;
            }
            if (scoreboard.find(l => l.startsWith("Megacoins: "))) {
                const mgcoins = parseInt(scoreboard.find(l => l.startsWith("Megacoins: ")).split("Megacoins: ")[1].replace(/[,]/g, ""));
                if (isNaN(mgcoins)) megacoins = undefined;
                else megacoins = mgcoins;
            }
            if (scoreboard.find(l => l.startsWith("Gems: "))) {
                const ggems = parseInt(scoreboard.find(l => l.startsWith("Gems: ")).split("Gems: ")[1].replace(/[,]/g, ""));
                if (isNaN(ggems)) gems = undefined;
                else gems = ggems;
            }
            if (scoreboard.find(l => l.startsWith("Bounty: "))) {
                const bounty = scoreboard.find(l => l.startsWith("Bounty: ")).split("Bounty: ")[1];
                general.push(Settings.hudTextColor + "Bounty: &6" + bounty);
            }
            if (goldreq) {
                general[general.indexOf("GoldReq: &cUnknown &7(" + greqrefresh + ")")] = Settings.hudTextColor + "GoldReq: &6" + formatNumber(Math.floor(goldreq)) + "&r/&6" + formatNumber(Math.floor(goldreqmax)) + (goldreqmax == 0 ? "" : " &7(" + (goldreq / goldreqmax * 100).toFixed(1) + "%)") + " &7(" + greqrefresh + ")";
            }
            if (megacoins) {
                general[general.indexOf(Settings.hudTextColor + "Megacoins: &cUnknown")] = Settings.hudTextColor + "Megacoins: &6" + formatNumber(megacoins);
            }
            if (gems) {
                general[general.indexOf(Settings.hudTextColor + "Gems: &cUnknown")] = Settings.hudTextColor + "Gems: &a" + formatNumber(gems);
            }
            if (extradamage > Date.now()) {
                general.push(Settings.hudTextColor + "Megastar: &c" + msToTime(extradamage - Date.now()));
            }
            if (nextmajor > Date.now()) {
                general.push(Settings.hudTextColor + "Next Major: &e" + msToTime(nextmajor - Date.now()));
            }
            if (nextminor > Date.now()) {
                general.push(Settings.hudTextColor + "Next Minor: &e" + msToTime(nextminor - Date.now()));
            }
            if (majorname) {
                general.push(Settings.hudTextColor + "Major Name: &e" + majorname);
            }

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
            if (!streaking) streakinglines = [];
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

                if (currentstreak.assgold || currentstreak.killgold || currentstreak.othergold) {
                    let gold = 0;
                    if (currentstreak.killgold) gold += currentstreak.killgold;
                    if (currentstreak.assgold) gold += currentstreak.assgold;
                    if (currentstreak.othergold) gold += currentstreak.othergold;
                    let gps = formatNumber(Math.floor(gold / ((Date.now() - startstreaktime) / 1000)));
                    let gpm = formatNumber(Math.floor(gold / ((Date.now() - startstreaktime) / 1000 / 60)));
                    let gph = formatNumber(Math.floor(gold / ((Date.now() - startstreaktime) / 1000 / 60 / 60)));
                    streakinfo.push(Settings.hudTextColor + "Coins Per S/M/H: &6" + gps + "&r/&6" + gpm + "&r/&6" + gph);
                }

                if (currentstreak.assxp || currentstreak.killxp || currentstreak.otherxp) {
                    let xp = 0;
                    if (currentstreak.killxp) xp += currentstreak.killxp;
                    if (currentstreak.assxp) xp += currentstreak.assxp;
                    if (currentstreak.otherxp) xp += currentstreak.otherxp;
                    let xps = formatNumber(Math.floor(xp / ((Date.now() - startstreaktime) / 1000)));
                    let xpm = formatNumber(Math.floor(xp / ((Date.now() - startstreaktime) / 1000 / 60)));
                    let xph = formatNumber(Math.floor(xp / ((Date.now() - startstreaktime) / 1000 / 60 / 60)));
                    streakinfo.push(Settings.hudTextColor + "XP Per S/M/H: &b" + xps + "&r/&b" + xpm + "&r/&b" + xph);
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

                if (shark) {
                    streakinfo.push(Settings.hudTextColor + "Shark: &c+" + shark + "%");
                }

                if (Date.now() < rngdamage) {
                    streakinfo.push(Settings.hudTextColor + "RNGesus DMG: &c" + msToTime(rngdamage - Date.now(), true));
                }
                streakinfo.splice(0, 0, [Settings.hudGroupColor + "&nStreaking Info"]);
                streakinglines = streakinfo;
            }
            if (onlineHunt.length < 1 && onlineHuntGuild.length < 1 && syncedKOS.filter(k => k.uuid ? (namecache[k.uuid] ? (onlinePlayers.includes(namecache[k.uuid].name) && !onlineHunt.includes(namecache[k.uuid].name) && !onlineHuntGuild.includes(namecache[k.uuid].name)) : false) : (onlinePlayers.includes(k) && !onlineHunt.includes(k) && !onlineHuntGuild.includes(k))).length < 1) huntinglines = [];
            else {
                let huntinfo = [];
                if (onlineHunt.length > 0) {
                    huntinfo.push(Settings.hudGroupColor + "&nHunted Players");
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
                if (syncedKOS.filter(k => k.uuid ? (namecache[k.uuid] ? (onlinePlayers.includes(namecache[k.uuid].name) && !onlineHunt.includes(namecache[k.uuid].name) && !onlineHuntGuild.includes(namecache[k.uuid].name)) : false) : (onlinePlayers.includes(k) && !onlineHunt.includes(k) && !onlineHuntGuild.includes(k))).length > 0) {
                    huntinfo.push("&c&nSynced KOS");
                    syncedKOS.filter(k => k.uuid ? (namecache[k.uuid] ? (onlinePlayers.includes(namecache[k.uuid].name) && !onlineHunt.includes(namecache[k.uuid].name) && !onlineHuntGuild.includes(namecache[k.uuid].name)) : false) : (onlinePlayers.includes(k) && !onlineHunt.includes(k) && !onlineHuntGuild.includes(k))).forEach(p => {
                        let name = p;
                        if (p.uuid) name = namecache[p.uuid].name;
                        let suffix = "";
                        let prefix = "";
                        let entity = worldotherplayers.filter(e => !e.getName().startsWith("§") && !e.getName().startsWith("CIT-")).find(e => e.getName() == name);
                        let tabp = onlinePlayersFormatted.find(t => ChatLib.removeFormatting(t.split(" ")[1]) == name);
                        if (!entity) suffix = " &cUnknown";
                        else if (inMid(entity)) suffix = " &4MID";
                        else if (inSpawn(entity)) suffix = " &aSpawn";
                        else suffix = " &6Outskirts";
                        if (!tabp) prefix += "&cNotInTab &c";
                        else if (tabp.split(" ")[0].includes("[")) prefix += "&4&nPRE&r &c";
                        else prefix += tabp.split(" ")[0].replace(/§l/g, "") + " &c";
                        if (entity && entity.getItemInSlot(2) && entity.getItemInSlot(2).getNBT() && !hasEnchant("mirror", entity.getItemInSlot(2).getNBT())) suffix += " &cNoMirrors";
                        huntinfo.push(prefix + (tabp ? tabp.split(" ")[1] : name) + suffix);
                    });
                }
                huntinglines = huntinfo;
            }
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
                    if (hasEnchant("lifesteal", player.getItemInSlot(0).getNBT()) /* && hasEnchant("billionaire", player.getItemInSlot(0).getNBT()) */) {
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
    /* if (syncedTruce.filter(t => onlinePlayers.includes(t)).length > 0) {
        let allplayers = World.getAllPlayers();
        syncedTruce.filter(t => onlinePlayers.includes(t)).forEach(p => {
            if (allplayers.find(ap => ap.getName() == p)) allplayers.filter(ap => ap.getName() == p).map(ap => ap.setNametagName(new TextComponent("§a§l" + p)));
        });
    } */
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
            if (megastreak == "HIGH" && Settings.autoOOFHighlander) ChatLib.command("oof");
            if (megastreak == "MOON" && Settings.autoOOFMoon) ChatLib.command("oof");
            if (megastreak == "NGHTMRE" && Settings.autoOOFNightmare) ChatLib.command("oof");
            if (megastreak == "HERMIT" && Settings.autoOOFHermit) ChatLib.command("oof");
            if (megastreak == "OVRDRV" && Settings.autoOOFOverdrive) ChatLib.command("oof");
            if (megastreak == "UBER400" && Settings.autoOOFUber) ChatLib.command("oof");
        }
    }
    if (Settings.hideBotNametags) {
        worldotherplayers.forEach(e => {
            if (inMid(e) && (e.getName().startsWith("§7") || e.getName().startsWith("CIT-")) && World.getAllPlayers().find(p => p.getUUID() == e.getUUID())) World.getAllPlayers().find(p => p.getUUID() == e.getUUID()).setNametagName(new TextComponent(""));
        });
    }
}).setFps(2);

/* register("step", () => {
    if (!pitsandbox || !Settings.autoBal) return;
    TabList.getUnformattedNames().filter(n => !n.startsWith("CIT-") && !n.includes("§")).forEach(n => {
        if (!balances[n] || balances[n].bal == undefined) balances[n] = {
            bal: 0,
            lastfetch: Date.now() - 600000
        };
        if (Date.now() - balances[n].lastfetch >= 600000) {
            if (balqueue.includes(n)) return;
            console.log("Pushed " + n + " to fetch queue, last fetch was " + msToTime(Date.now() - balances[n].lastfetch, false) + " ago");
            balqueue.push(n);
        }
    });
}).setDelay(10);

register("step", () => {
    if (!pitsandbox) return;
    if (balqueue.length > 0) {
        console.log("Fetching bal of " + balqueue[0] + ", " + (balqueue.length - 1) + " left");
        console.log("Last fetch " + msToTime(Date.now() - balances[balqueue[0]].lastfetch, false) + " ago");
        let p = balqueue.shift();
        ChatLib.command("bal " + p);
        let event = register("chat", (player, balance, event) => {
            if (player == p || player.startsWith("~")) {
                cancel(event);
                balance = parseFloat(balance.replace(/,/g, ""));
                if (balance != undefined && balance != NaN) {
                    balances[p].bal = balance;
                    balances[p].lastfetch = Date.now();
                    console.log("Fetched balance of " + p + ": " + formatNumber(balance));
                    FileLib.write("Pitsandbox", "balances.json", JSON.stringify(balances));
                }
            }
        }).Criteria("Balance of ${player}: $${balance}");
        setTimeout(() => {
            event.unregister();
        }, 1000);
    }
}).setDelay(2); */

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
    if (name.toLowerCase().includes("game.player.hurt") && inMid(Player.asPlayerMP()) && Settings.removeMidHit) cancel(event);
    if (name.toLowerCase().includes("random.orb") && pitch.toFixed(2) == "0.71" && inMid(Player.asPlayerMP()) && Settings.removeMidBill) cancel(event);
    if (name.toLowerCase().includes("note.pling") && pitch.toFixed(1) == "1.0" && Date.now() - blitzmsg < 500) cancel(event);
    if (name.toLowerCase().includes("mob.wither.spawn") && pitch.toFixed(1) == "1.8" && !Settings.toggleBountyBumps) cancel(event);
    if (name.toLowerCase().includes("mob.wither.spawn") && pitch.toFixed(1) == "1.6" && !Settings.toggleMegastreakSounds) cancel(event);
    if (name.toLowerCase().includes("mob.guardian.curse") && pitch.toFixed(2) == "1.05" && !Settings.toggleMegastreakSounds) cancel(event);
});

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
                let y = Renderer.screen.getHeight() - 12 * lines.length - 4;
                let x = Renderer.screen.getWidth() / 4 * 2.59;
                lines.forEach(line => {
                    const text = new Text(line, x, y);
                    text.setShadow(true);
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
            }
        }; {
            if (balqueue.length > 0 && !Client.isInTab()) {
                let text = new Text(`&eFetching balances of &6${balqueue.length} &eplayers...`);
                let x = Renderer.screen.getWidth() / 2 - (Renderer.getStringWidth(text.getString()) * 1.1 / 2);
                let y = 4;
                let prevheight = text.getHeight() * 1.1;
                text.setShadow(true);
                text.setScale(1.1);
                text.setX(x);
                text.setY(y);
                text.draw();
                text = new Text(`&cDo not spam commands/chat during this operation.`);
                x = Renderer.screen.getWidth() / 2 - (Renderer.getStringWidth(text.getString()) / 2);
                y = 6 + prevheight;
                text.setX(x);
                text.setY(y);
                text.setShadow(true);
                text.draw();
            }
        }; {
            if (!Client.isInTab()) {
                let str = [];
                if (Settings.togglePreAlert && isPre() && !inSpawn(Player.asPlayerMP())) {
                    str.push("&c&nYou are premega");
                }
                if (nols) str.push("&cNo LS in hotbar");
                if (Player.getInventory().indexOf(138) == -1) str.push("&bNo beacon");
                if (str.length > 0) {
                    let text = new Text(str.join("&r   "));
                    let x = Renderer.screen.getWidth() / 2 - (Renderer.getStringWidth(text.getString()) * 1.4 / 2);
                    let y = Renderer.screen.getHeight() / 4 * 3.3;
                    text.setX(x);
                    text.setY(y);
                    text.setShadow(true);
                    text.setScale(1.4);
                    text.draw();
                }
            }
        }; {
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

                let y = 4;
                general.forEach(line => {
                    const text = new Text(line, 0, y);
                    text.setX(Renderer.screen.getWidth() - Renderer.getStringWidth(text.getString()) - 4);
                    text.setShadow(true);
                    text.draw();
                    y += 12;
                });

                if (streakinglines.length > 0) {
                    y += 24;
                    let streakinfo = streakinglines;

                    streakinfo.forEach(line => {
                        const text = new Text(line, 0, y);
                        text.setX(Renderer.screen.getWidth() - Renderer.getStringWidth(text.getString()) - 4);
                        text.setShadow(true);
                        text.draw();
                        y += 12;
                    });
                }

                if (huntinglines.length > 0) {
                    y += 24;
                    let huntinfo = huntinglines;
                    huntinfo.forEach(line => {
                        const text = new Text(line, 0, y);
                        text.setX(Renderer.screen.getWidth() - Renderer.getStringWidth(text.getString()) - 4);
                        text.setShadow(true);
                        text.draw();
                        y += 12;
                    });
                }
            }
        };
    });
}).start();

register("messageSent", (message, event) => {
    if (!pitsandbox) return
    if (nomvp) return
    if (!message.startsWith("/")) {

        if (Settings.chatColor != "" && /^&.$/g.test(Settings.chatColor)) {
            if (message.startsWith("\\")) return cancel(event), ChatLib.say(message.substring(1)), Client.getChatGUI().func_146239_a(message);
            if (Date.now() - lastunscramble > 35000 && Date.now() - lastquickmath > 35000) {
                cancel(event);
                ChatLib.say(Settings.chatColor + message);
                Client.getChatGUI().func_146239_a(message);
            }
        }
    }
    if (pitsandbox && message == "/oof" && isPre() && Settings.togglePreOOF) return cancel(event), ChatLib.chat("&c&lOOF!&7 You are premega!"), Client.getChatGUI().func_146239_a("/oof");
});


register("renderEntity", (entity, pos, ticks, event) => {
    if (!pitsandbox) return;
    if (Settings.stopRenderSpawn && inSpawn(entity) && !inSpawn(Player.asPlayerMP())) return cancel(event);
    if (Settings.hideBotNametags && entity.getName().includes("'s Apprentice") && inMid(entity)) return cancel(event);
    if (hunting && entity.getEntity().class.toString().includes("EntityOtherPlayerMP") && inMid(entity) && !onlineHuntKOS.includes(entity.getName()) && !onlineHuntGuild.includes(entity.getName()) && !onlineHunt.includes(entity.getName()) && !syncedKOS.filter(k => onlinePlayers.includes(k)).includes(entity.getName())) return cancel(event);
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
        pitsandbox = (Server.getIP().includes("harrys.network") || Server.getIP().includes("pitsandbox.io") || Server.getIP().includes("harrys.gg")) && isInMainServer();
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
    console.log(msg)
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
/* 
register("step", () => {
    if (!pitsandbox() || isFirstaideggUsed() == undefined || !autoFirstaidegg) return
    let lastSlot = Player.getHeldItemIndex()
    if (!isFirstaideggUsed() && Player.getHP() < 28) {
        Player.setHeldItemIndex(whereFirstaidegg())
        KeyBinding.func_74507_a(Client.settings.getSettings().field_74313_G.func_151463_i())
        setTimeout(() => {
            Player.setHeldItemIndex(lastSlot)
        }, 2)
    }
}).setFps(10) */
/* if (useEggs.isPressed()) {
    let slots = [];
    for (let i = 0; i < 9; i++) {
        if (Player.getInventory().getStackInSlot(i) && Player.getInventory().getStackInSlot(i).getID() == 383) {
            if (Player.getInventory().getStackInSlot(i).getNBT() && Player.getInventory().getStackInSlot(i).getNBT().getCompoundTag("tag")) {
                if (Player.getInventory().getStackInSlot(i).getNBT().getCompoundTag("tag").get("superegg") && Player.getInventory().getStackInSlot(i).getDamage() != 0) {
                    slots.push(i);
                }
            }
        }
    } */
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