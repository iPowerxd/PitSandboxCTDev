/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from '../config'
import { onSandbox } from "../functions/onSandbox"

register("step", () => {
    if (onSandbox() && Settings.toggleAutoOOF) {
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
}).setFps(1)