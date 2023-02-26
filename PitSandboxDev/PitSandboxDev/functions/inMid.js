/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from '../config'

const BlockPos1 = Java.type("net.minecraft.util.BlockPos")

export const inMid = entity => {
    if (entity && Math.sqrt(entity.getEntity().func_174831_c(new BlockPos1(0.5, entity.getY(), 0.5))) < Settings.midRadius) {
        if (entity.getY() > 70 && entity.getY() < 95) {
            return true;
        }
    }
    return false;
}

export const actualMid = entity => {
    if (entity && Math.sqrt(entity.getEntity().func_174831_c(new BlockPos1(0.5, entity.getY(), 0.5))) < 19) {
        if (entity.getY() > 70 && entity.getY() < 95) {
            return true
        }
    } return false
}