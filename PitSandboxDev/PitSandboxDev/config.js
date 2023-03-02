import {
    @ButtonProperty,
@CheckboxProperty,
Color,
    @ColorProperty,
@PercentSliderProperty,
@SliderProperty,
@SelectorProperty,
@NumberProperty,
@SwitchProperty,
@TextProperty,
@Vigilant,
    } from 'Vigilance';
@Vigilant('PitSandboxDev', '§dPitSandbox Dev', {
    getCategoryComparator: () => (a, b) => {
        const categories = ['General', 'Customization', 'Auto OOF', 'Vanilla HUD Hiding', 'DEV']
        return categories.indexOf(a.name) - categories.indexOf(b.name)
    },
})
class Settings {

    generalInfoHud = new Gui()
    @ButtonProperty({
        name: "§6Move GUIs",
        description: "Moves the locations of the displays\n&e/resetdisplay resets the displays to default\n&cThe default depends on the size of your window",
        placeholder: "Move",
        category: "General",
        subcategory: "Display"
    })
    nameTagMove() {
        this.generalInfoHud.open()
    }

    @TextProperty({
        name: "§eHUD §cC§6o§el§9o§5r",
        description: "Change the color of the HUD.\n&3Also Accepts chat formatting color codes.",
        category: "Customization",
        subcategory: "Hud",
        placeholder: "§8Example: &f"
    })
    hudTextColor = "";

    @TextProperty({
        name: "§eHUD Group §cC§6o§el§9o§5r",
        description: "Change the colors of the Group Titles in the HUD.\n&3Also Accepts chat formatting color codes.",
        category: "Customization",
        subcategory: "Hud",
        placeholder: "§8Example: &e"
    })
    hudGroupColor = "&e";

    @SwitchProperty({
        name: "§2Custom Guild Messages",
        description: "Enables/Disables the Customly Shortened Guild Messages",
        category: "Customization",
        subcategory: "Chat"
    })
    customGuildChat = true;


    @SwitchProperty({
        name: "§eGeneral Info",
        description: "Toggle the HUD at the right side of the screen and streak recap (relog to see changes)",
        category: "General",
        subcategory: "!General Info",
    })
    toggleSandboxHUD = true;

    @SwitchProperty({
        name: "§eEnable Simple HUD",
        description: "Makes general info show less information",
        category: "General",
        subcategory: "!General Info",
    })
    toggleSimpleHUD = false;

    @SwitchProperty({
        name: "§eShow Major and Minor Events",
        description: "Toggle Major and Minor Event's from showing in \nthe HUD at the right side of the screen",
        category: "General",
        subcategory: "!General Info",
    })
    toggleMajorandMinorEventHUD = true;

    @SwitchProperty({
        name: "§bPlayer Info",
        description: "See a HUD that shows your positive or negative buffs.\n&eThis shows some mystics, megastreaks, and events.",
        category: "General",
        subcategory: 'Display'
    })
    playerInfo = true;

    @SwitchProperty({
        name: "§bUpgrades Info",
        description: "See a HUD that shows your equiped megastreak, killstreaks, and perks.",
        category: "General",
        subcategory: 'Display'
    })
    upgradeInfo = true;

    @SwitchProperty({
        name: "§bCooldown Info",
        description: "See a HUD that shows your cooldowns.",
        category: "General",
        subcategory: 'Display'
    })
    cooldownInfo = true;

    @SwitchProperty({
        name: "§bBooster Info",
        description: "See a HUD that shows active boosters.",
        category: "General",
        subcategory: 'Display'
    })
    boostersInfo = true;

    @SwitchProperty({
        name: "§bPre Alert",
        description: "Alerts you when you are not on a megastreak",
        category: "General",
        subcategory: 'Display'
    })
    togglePreAlert = true;

    @SwitchProperty({
        name: "§bTarget Info",
        description: "See a HUD that shows the mystics of the player you're fighting.",
        category: "General",
        subcategory: 'Display'
    })
    targetInfo = true;

    @SwitchProperty({
        name: "§bCombat Log",
        description: "See a HUD that shows damage you have taken and healed.",
        category: "General",
        subcategory: 'Display'
    })
    combatLog = false;

    @SwitchProperty({
        name: "§bEgg Effect Display",
        description: "Display the active egg effects and how long until they expire.",
        category: "General",
        subcategory: 'Display'
    })
    eggEffectDisplay = true;

    @SwitchProperty({
        name: "§6Hide Bot Nametags",
        description: "Hide bot nametags for clearer visibility.\n§eCan positively impact performance.",
        category: "General",
        subcategory: 'Quality of Life'
    })
    hideBotNametags = true;

    @SwitchProperty({
        name: "§6Remove Particles In Middle",
        description: "Disable rendering particles when in middle.\n&eCan positively impact performance.",
        category: "General",
        subcategory: 'Quality of Life'
    })
    removeParticlesInMid = true;

    @SwitchProperty({
        name: "§6Lower Render Distance In Middle",
        description: "Lower the render distance when in middle.\n&eCan positively impact performance.",
        category: "General",
        subcategory: 'Quality of Life'
    })
    lowerRenderDistanceInMid = true;

    @SwitchProperty({
        name: "§6Stop rendering entities in spawn when outside",
        description: "Stop rendering all the entities in spawn if you're not in spawn.\n&eCan positively impact performance.",
        category: "General",
        subcategory: 'Quality of Life'
    })
    stopRenderSpawn = true;

    @SwitchProperty({
        name: "§bBeacon & Divine Alert",
        description: "Get a title and sound when losing a beacon or getting divine intervention",
        category: "General",
        subcategory: 'Quality of Life'
    })
    toggleBDAlert = true;

    @SwitchProperty({
        name: "§bPing in Experience Bar",
        description: "Set your experience level to your ping",
        category: "General",
        subcategory: 'Quality of Life'
    })
    showPingInXP = true;

    @SwitchProperty({
        name: "§8Anti CF",
        description: "Remove every message with /cf.",
        category: "General",
        subcategory: 'Quality of Life'
    })
    antiCF = true;

    @SwitchProperty({
        name: "§eHide Stash Messages",
        description: "Hide all stash messages",
        category: "General",
        subcategory: "Messages"
    })
    hideStash = false;

    @SwitchProperty({
        name: "§dRNGesus Messages",
        description: "Toggle seeing RNGesus messages",
        category: "General",
        subcategory: 'Messages'
    })
    toggleRNGesus = false;

    @SwitchProperty({
        name: "§6Only personal bounty claims",
        description: "Only show the bounty claim messages that are related to you (you claiming or you getting claimed).",
        category: "General",
        subcategory: 'Messages'
    })
    personalClaims = true;

    @SwitchProperty({
        name: "§6Hide Bounty Bumps",
        description: "Hide bounty bump messages and sounds",
        category: "General",
        subcategory: "Messages"
    })
    toggleBountyBumps = true

    @SwitchProperty({
        name: "§aRemove player damage sounds in middle",
        description: "Remove the sounds of people getting hit while you're in middle.",
        category: "General",
        subcategory: "Sounds"
    })
    removeMidHit = true;

    @SwitchProperty({
        name: "§aRemove billionaire sounds in middle",
        description: "Remove the sounds of billionaire while you're in middle.",
        category: "General",
        subcategory: "Sounds"
    })
    removeMidBill = true;

    @SwitchProperty({
        name: "§aRemove bow sounds in middle",
        description: "Remove the sounds of bow shot and land while you're in middle.",
        category: "General",
        subcategory: "Sounds"
    })
    removeMidBow = true

    @SwitchProperty({
        name: "§aRemove Executioner Sounds in Middle",
        description: "Removes executioner sounds when you are in middle",
        category: "General",
        subcategory: 'Sounds'
    })
    removeExeSounds = true

    @SwitchProperty({
        name: "§aRemove Gamble Sounds in Middle",
        description: "Removes gamble sounds when you are in middle",
        category: "General",
        subcategory: 'Sounds'
    })
    removeGambleSounds = true

    @SwitchProperty({
        name: "§aRemove Perun Sounds in Middle",
        description: "Removes perun  sounds when you are in middle",
        category: "General",
        subcategory: 'Sounds'
    })
    removePerunSounds = true

    @SwitchProperty({
        name: "§aRemove Stun Sounds in Middle",
        description: "Removes stun sounds when you are in middle",
        category: "General",
        subcategory: 'Sounds'
    })
    removeStunSounds = true


    @TextProperty({
        name: "§eAuto chat §cc§6o§el§9o§5r",
        description: "Automatically apply a color to your chat messages.\n§eTemporarily disables when unscramble or quick maths is active.\n§cMVP rank is required for this to work, leave blank to disable.\n§cStart a message with \\ to not apply the color.",
        category: "Customization",
        subcategory: "Chat",
        placeholder: "Example: &e"
    })
    chatColor = "";

    @SwitchProperty({
        name: "§eRandom chat §cc§6o§el§9o§5r",
        description: "Gives you a random chat color every message\n&eBypasses auto chat color",
        category: "Customization",
        subcategory: "Chat"
    })
    randomChatColour = false

    @SwitchProperty({
        name: "§2Guild Passive Sound",
        description: "Play a sound when trying to hit someone in /g passive",
        category: "General",
        subcategory: "Sounds"
    })
    toggleGPassiveSound = true;

    @TextProperty({
        name: "§2Custom Passive Sound",
        description: "The sound to play when hitting someone in /g passive",
        category: "General",
        subcategory: "Sounds"
    })
    guildPassiveSound = "mob.endermen.hit";

    @TextProperty({
        name: "§2Custom Passive Pitch",
        description: "The pitch of the sound to play when hitting someone in /g passive",
        category: "General",
        subcategory: "Sounds"
    })
    guildPassivePitch = "1.5";

    @SwitchProperty({
        name: "§2Guild Message Sound",
        description: "Play a sound when someone types in guild chat.",
        category: "General",
        subcategory: "Sounds"
    })
    toggleGNotification = true;

    @SwitchProperty({
        name: "§cLow Health Indicator",
        description: "Makes your screen red when you are low on health",
        category: "General",
        subcategory: 'Quality of Life'
    })
    toggleLowHealthHUD = true;

    @SwitchProperty({
        name: "§cPre OOF",
        description: "Prevent /oofing when you are premega",
        category: "General",
        subcategory: 'Quality of Life'
    })
    togglePreOOF = true;


    @SwitchProperty({
        name: "§aMegastreak Sounds",
        description: "Hear the wither sound when someone activates a megastreak",
        category: "General",
        subcategory: "Sounds"
    })
    toggleMegastreakSounds = false;

    @SwitchProperty({
        name: "§8Hide Low /pays",
        description: "Hide received money below a set amount",
        category: "General",
        subcategory: 'Quality of Life'
    })
    hideLowPay = true;

    @SliderProperty({
        name: "§8Minimum /pay amount",
        description: "Set the minimum amount of money you want to see",
        category: "General",
        subcategory: 'Quality of Life',
        min: 1,
        max: 100000
    })
    minPay = 5000;


    @SliderProperty({
        name: "§cMid Radius Amount",
        description: "The radius (in blocks) around 0 0 that counts as mid\n9 is the lantern circle, 20 is the whole middle (hardened clay)\n§cNote: this affects the MID indicator for other features",
        category: "General",
        subcategory: 'Quality of Life',
        min: 9,
        max: 20
    })
    midRadius = parseInt("10");


    @SwitchProperty({
        name: "§aFish Alert",
        description: "Play a pling sound when a fish bites your hook.",
        category: "General",
        subcategory: "Sounds"
    })
    fishAlert = true;

    @SwitchProperty({
        name: "§bHide Hunger Bar Display",
        description: "Toggle seeing the hunger bar",
        category: "Vanilla HUD Hiding",
        subcategory: "Render"
    })
    toggleHungerBar = false;

    @SwitchProperty({
        name: "§bHide Armor Bar Display",
        description: "Toggle seeing the armor bar",
        category: "Vanilla HUD Hiding",
        subcategory: "Render"
    })
    toggleArmorBar = false;

    @SwitchProperty({
        name: "§bHide XP Bar Display",
        description: "Toggle seeing the xp bar",
        category: "Vanilla HUD Hiding",
        subcategory: "Render"
    })
    toggleXPBar = true;

    @SwitchProperty({
        name: "§bHide Boss Bar Display",
        description: "Toggle seeing the Boss bar",
        category: "Vanilla HUD Hiding",
        subcategory: "Render"
    })
    toggleBossBar = false;

    @SwitchProperty({
        name: "§cCustom Auto OOF",
        description: "Customizable auto oof for every megastreak.",
        category: "Auto OOF",
        subcategory: "Auto OOF"
    })
    toggleAutoOOF = false;

    @SwitchProperty({
        name: "§6Auto OOF On Highlander",
        description: "Automatically /oof on Highlander, if Custom Auto OOF is enabled.",
        category: "Auto OOF",
        subcategory: "Auto OOF"
    })
    autoOOFHighlander = false;

    @SwitchProperty({
        name: "§cAuto OOF On Overdrive",
        description: "Automatically /oof on Overdrive, if Custom Auto OOF is enabled.",
        category: "Auto OOF",
        subcategory: "Auto OOF"
    })
    autoOOFOverdrive = false;

    @SwitchProperty({
        name: "§dAuto OOF On 400 Uberstreak",
        description: "Automatically /oof on 400 Uberstreak, if Custom Auto OOF is enabled.",
        category: "Auto OOF",
        subcategory: "Auto OOF"
    })
    autoOOFUber = false;

    @SwitchProperty({
        name: "§dAuto OOF On 500 Uberstreak",
        description: "Automatically /oof on 500 Uberstreak, if Custom Auto OOF is enabled.\n Mainly used for RNGESUS Begone",
        category: "Auto OOF",
        subcategory: "Auto OOF"
    })
    autoOOFRNGESUS = false;

    @SwitchProperty({
        name: "§bAuto OOF On Moon",
        description: "Automatically /oof on Moon, if Custom Auto OOF is enabled.",
        category: "Auto OOF",
        subcategory: "Auto OOF"
    })
    autoOOFMoon = false;

    @SwitchProperty({
        name: "§1Auto OOF On Nightmare",
        description: "Automatically /oof on Nightmare, if Custom Auto OOF is enabled.",
        category: "Auto OOF",
        subcategory: "Auto OOF"
    })
    autoOOFNightmare = true;

    @SwitchProperty({
        name: "§9Auto OOF On Hermit",
        description: "Automatically /oof on Hermit, if Custom Auto OOF is enabled.",
        category: "Auto OOF",
        subcategory: "Auto OOF"
    })
    autoOOFHermit = false;


    // DEV


    @SwitchProperty({
        name: "§cAuto LS Swap",
        description: "Swap to bill lifesteal when low health if you have one in your hotbar",
        category: "DEV",
        subcategory: 'Auto LS'
    })
    toggleAutoLS = true;

    @SliderProperty({
        name: "§cLow Health Threshold",
        description: "Set the health you want to be at before swapping to bill lifesteal",
        category: "DEV",
        subcategory: 'Auto LS',
        min: 1,
        max: 12
    })
    autoLSHealth = 8;

    @SwitchProperty({
        name: "§dAuto Quick Maths",
        description: "Tells you the answer of quick maths in chat.\n&eCopies answer to your clipboard",
        category: "DEV",
        subcategory: 'Quick Maths / Unscramble'
    })
    autoquickmaths = true

    @SwitchProperty({
        name: "§eAuto Unscramble",
        description: "Tells you the answer of unscramble in chat.\n&eCopies answer to your clipboard",
        category: "DEV",
        subcategory: 'Quick Maths / Unscramble'
    })
    autounscramble = true

    @SwitchProperty({
        name: "§aSay Answer in Guild Chat",
        description: "Says the answer of quick maths & unscramble in guild chat",
        category: "DEV",
        subcategory: 'Quick Maths / Unscramble'
    })
    aqmGuild = true

    @SwitchProperty({
        name: "§aSay Answer if AFK",
        description: "You will automatticaly say the asnwer of quick maths & unscramble in a random time.\n&e5.55 - 11.1 seconds",
        category: "DEV",
        subcategory: 'Quick Maths / Unscramble'
    })
    aqmAFK = true

    constructor() {
        this.initialize(this);
    }
}

export default new Settings();