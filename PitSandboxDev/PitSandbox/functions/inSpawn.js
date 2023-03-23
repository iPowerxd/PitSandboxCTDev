/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { onSandbox } from "./onSandbox"
import { inMid } from "./inMid"
import { actualMid } from "./inMid"

const BlockPos1 = Java.type("net.minecraft.util.BlockPos")

export const currentMap = () => {
    if (World.getBlockAt(-13, 115, 0).toString().includes("enchanting_table")) return 'elemental'
    else if (World.getBlockAt(-15, 115, 0).toString().includes("enchanting_table")) return 'seasons'
    else if (World.getBlockAt(-14, 96, 0).toString().includes("enchanting_table")) return 'kings'
    //else if (World.getBlockAt(-17, 87, 0).toString().includes("enchanting_table")) return 'genesis'
    else return false
}

export const inSpawn = entity => {
    if (currentMap() === 'elemental' || currentMap() === 'seasons') {
        if (Math.sqrt(entity.getEntity().func_174831_c(new BlockPos1(0.5, entity.getY(), 0.5))) < 33) {
            if (entity.getY() > 112 && entity.getY() < 140) {
                return true
            }
        }
        return false;
    } else if (currentMap() === 'kings') {
        if (Math.sqrt(entity.getEntity().func_174831_c(new BlockPos1(0.5, entity.getY(), 0.5))) < 33) {
            if (entity.getY() > 93 && entity.getY() < 120) {
                return true
            }
        }
        return false
    } else if (currentMap() === 'genesis') {
        if (Math.sqrt(entity.getEntity().func_174831_c(new BlockPos1(0.5, entity.getY(), 0.5))) < 33) {
            if (entity.getY() > 84 && entity.getY() < 120) {
                return true
            }
        }
        return false
    } else return false
}

export const aboveSpawn = entity => {
    if (currentMap() === 'elemental' || currentMap() === 'seasons') {
        if (Math.sqrt(entity.getEntity().func_174831_c(new BlockPos1(0.5, entity.getY(), 0.5))) < 33) {
            if (entity.getY() > 140) {
                return true
            }
        }
        return false;
    } else if (currentMap() === 'kings' || currentMap() === 'genesis') {
        if (Math.sqrt(entity.getEntity().func_174831_c(new BlockPos1(0.5, entity.getY(), 0.5))) < 33) {
            if (entity.getY() > 120) {
                return true
            }
        }
        return false
    } else return false
}

export const mapLocation = entity => {
    // 0, 0 | -200, -200
    // 0, 0 | 200, 200
    // 0, 0 | -200, 200
    // 0, 0 | 200, -200
    if (currentMap() === 'elemental') {
        // -151, 73, 132 | -136, 79, 117
        if ((entity.getX() <= 0 && entity.getX() >= -200) && entity.getZ() <= 0 && entity.getZ() >= -200) return '&bWater'
        else if ((entity.getX() >= 0 && entity.getX() <= 200) && entity.getZ() >= 0 && entity.getZ() <= 200) return '&cLava'
        else if ((entity.getX() <= 0 && entity.getX() >= -200) && entity.getZ() >= 0 && entity.getZ() <= 200) {
            if ((entity.getX() <= -130 && entity.getX() >= -151) && (entity.getY() >= 79 && entity.getY() <= 83) && (entity.getZ() >= 117 && entity.getZ() <= 132)) return '&fSky Fish'
            else return '&fSky'
        }
        else if ((entity.getX() >= 0 && entity.getX() <= 200) && entity.getZ() <= 0 && entity.getZ() >= -200) return '&2Mountain'
        else return '&6Outskirts'
    } else if (currentMap() === 'seasons') {
        if ((entity.getX() <= 0 && entity.getX() >= -200) && (entity.getZ() <= 0 && entity.getZ() >= -200)) return '&eSummer'
        else if ((entity.getX() >= 0 && entity.getX() <= 200) && (entity.getZ() >= 0 && entity.getZ() <= 200)) return '&fWinter'
        else if ((entity.getX() <= 0 && entity.getX() >= -200) && (entity.getZ() >= 0 && entity.getZ() <= 200)) return '&dSpring'
        else if ((entity.getX() >= 0 && entity.getX() <= 200) && (entity.getZ() <= 0 && entity.getZ() >= -200)) return '&6Autumn'
        else return '&6Outskirts'
    } else if (currentMap() === 'kings') {
        if ((entity.getX() <= 0 && entity.getX() >= -200) && entity.getZ() <= 0 && entity.getZ() >= -200) return '&2Jungle'
        else if ((entity.getX() >= 0 && entity.getX() <= 200) && entity.getZ() >= 0 && entity.getZ() <= 200) {
            if ((entity.getX() >= 2 && entity.getX() <= 119) && (entity.getRenderY() <= 54 && entity.getRenderY() <= 62) && (entity.getZ() <= 84 && entity.getZ() >= 11)) return '&3Sewers'
            else return '&bCity'
        }
        else if ((entity.getX() <= 0 && entity.getX() >= -200) && entity.getZ() >= 0 && entity.getZ() <= 200) return '&cPort'
        else if ((entity.getX() >= 0 && entity.getX() <= 200) && entity.getZ() <= 0 && entity.getZ() >= -200) return '&6Farms'
        else return '&6Outskirts'
    } else return false
}

export const location = entity => {
    if (inSpawn(entity)) return '&aSpawn'
    if (aboveSpawn(entity)) {
        switch (currentMap()) {
            case 'elemental':
                return ('&aTree Top')

            case 'seasons':
                return ('&aTree Top')

            case 'kings':

                return ('&6Castle Roof')

            default:
                return
        }
    }
    else if (actualMid(entity)) return '&4Middle'
    else if (mapLocation(entity)) return mapLocation(entity)
    else return '&6Outskirts'
}

register('command', () => {
    ChatLib.chat(`&aYou are playing on &8${currentMap()}&a!`)
}).setName('map')