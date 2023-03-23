/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from '../config'
import { onSandbox } from "../functions/onSandbox"

register("step", () => {
    if (!onSandbox() || !Settings.showPingInXP) return
    Player.asPlayerMP().getPlayer().func_71013_b(Player.asPlayerMP().getPlayer().field_71068_ca);
    Player.asPlayerMP().getPlayer().func_82242_a(Player.asPlayerMP().getPing());
}).setFps(1)