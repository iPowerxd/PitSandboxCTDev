/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { onSandbox } from "./onSandbox";

export const getEnchants = (nbt) => {
    if (!onSandbox()) return
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

export const hasEnchant = (enchant, nbt) => {
    if (getEnchants(nbt)) {
        if (getEnchants(nbt).find(e => enchant == e.substring(0, e.length - 1))) {
            return parseInt(getEnchants(nbt).find(e => enchant == e.substring(0, e.length - 1)).substring(getEnchants(nbt).find(e => enchant == e.substring(0, e.length - 1)).length - 1, getEnchants(nbt).find(e => enchant == e.substring(0, e.length - 1)).length));
        }
    }
};
