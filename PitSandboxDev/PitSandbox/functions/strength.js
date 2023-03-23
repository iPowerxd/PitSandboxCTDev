/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import { onSandbox } from "./onSandbox"
import { hasPerk } from '../features/perks'

let strengthCount = 0
let strengthTimer = 0
let bodybuilderDamage = 0

register("step", () => {
    if (!onSandbox()) return
    if (strengthTimer != 0) strengthTimer--
    if (strengthTimer == 0) {
        strengthCount = 0
        bodybuilderDamage = 0
    }
}).setFps(1)

export function strength() {
    if (strengthCount < 5) strengthCount++
    if (hasPerk("Bodybuilder") != 0) {
        strengthTimer = 3
        if (strengthCount == 5 && bodybuilderDamage < 16) bodybuilderDamage += hasPerk("Bodybuilder") * 0.5
        if (bodybuilderDamage > 16) bodybuilderDamage = 16
    } else {
        strengthTimer = 7
    }
}

export const strengthTime = (reset) => {
    if (reset == 0) return strengthTimer = 0
    else return strengthTimer
}

export const strengthLevel = (reset) => {
    if (reset == 0) return strengthCount = 0
    else return strengthCount
}

export const bbDamage = (reset) => {
    if (reset == 0) return bodybuilderDamage = 0
    else return bodybuilderDamage
}