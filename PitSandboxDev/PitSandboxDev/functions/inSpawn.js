/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

const BlockPos1 = Java.type("net.minecraft.util.BlockPos")

export function currentMap() {
    if (World.getBlockAt(-13, 115, 0).toString().includes("enchanting_table")) return 'elemental'
    else if (World.getBlockAt(-15, 115, 0).toString().includes("enchanting_table")) return 'seasons'
    else if (World.getBlockAt(-14, 96, 0).toString().includes("enchanting_table")) return 'kings'
    else if (World.getBlockAt(-17, 87, 0).toString().includes("enchanting_table")) return 'genesis'
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

register('command', () => {
    ChatLib.chat(`&aYou are playing on &8${currentMap()}&a!`)
}).setName('map')