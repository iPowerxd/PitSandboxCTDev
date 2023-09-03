/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from '../config'
import { onSandbox } from "../functions/onSandbox"
import { activeStreak } from '../functions/streak';

register("step", () => {
    if (onSandbox() && Settings.toggleAutoOOF) {
        let megastreak = ChatLib.removeFormatting(Player.getDisplayName().getText().split(" ")[0]);
        if (megastreak && !megastreak.includes("[")) {
            if (megastreak == "NGHTMRE" && activeStreak() >= 200 && Settings.autoOOFNightmare) ChatLib.command("oof")
            if (megastreak == "UBER800" && Settings.autoOOFUber) ChatLib.command("oof")
            if (megastreak == "UBER400" && Settings.autoOOFRNGESUS && streak >= 500) ChatLib.command("oof")
        }
    }
}).setFps(1)