/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from '../config'
import { onSandbox } from '../functions/onSandbox';

register("renderFood", event => {
    if (onSandbox() && !Settings.toggleHungerBar) cancel(event);
})

register("renderArmor", event => {
    if (onSandbox() && !Settings.toggleArmorBar) cancel(event);
})

register("renderExperience", event => {
    if (onSandbox() && !Settings.toggleXPBar) cancel(event);
})

register("renderBossHealth", event => {
    if (onSandbox() && !Settings.toggleBossBar) cancel(event);
})