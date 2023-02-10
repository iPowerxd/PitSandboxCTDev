/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { onKingsMap } from "./onSandbox";

const BlockPos1 = Java.type("net.minecraft.util.BlockPos")

export const inSpawn = entity => {
    if (!onKingsMap()) {
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