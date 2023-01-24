/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import PogObject from "../PogData"

let generalInfoHud = new PogObject("PitSandboxDev", {
    "firstTime": true,
    "textX": 860,
    "textY": 4,
    "textScale": 1
}, "guiLocations/generalInfo.json")

let streakInfoHud = new PogObject("PitSandboxDev", {
    "firstTime": true,
    "textX": 860,
    "textY": 195,
    "textScale": 1
}, "guiLocations/streakInfo.json")

let huntInfoHud = new PogObject("PitSandboxDev", {
    "firstTime": true,
    "textX": 860,
    "textY": 265,
    "textScale": 1
}, "guiLocations/huntInfo.json")

let upgradesInfoHud = new PogObject("PitSandboxDev", {
    "firstTime": true,
    "textX": 4,
    "textY": 80,
    "textScale": 1
}, "guiLocations/upgradesInfo.json")

let playerInfoHud = new PogObject("PitSandboxDev", {
    "firstTime": true,
    "textX": 180,
    "textY": 4,
    "textScale": 1
}, "guiLocations/playerInfo.json")

let boosterInfoHud = new PogObject("PitSandboxDev", {
    "firstTime": true,
    "textX": 610,
    "textY": 4,
    "textScale": 1
}, "guiLocations/boosterInfo.json")

let preInfoHud = new PogObject("PitSandboxDev", {
    "firstTime": true,
    "textX": 480,
    "textY": 410,
    "textScale": 1
}, "guiLocations/preInfo.json")

let targetInfoHud = new PogObject("PitSandboxDev", {
    "firstTime": true,
    "textX": 620,
    "textY": 405,
    "textScale": 1
}, "guiLocations/targetInfo.json")

register("dragged", (mouseDeltaX, mouseDeltaY, mouseX, mouseY, button) => {
    if (Settings.generalInfoHud.isOpen()) {
        if (((mouseX + 70 >= generalInfoHud.textX) && (mouseX - 70 <= generalInfoHud.textX)) && ((mouseY + 70 >= generalInfoHud.textY) && (mouseY - 70 <= generalInfoHud.textY))) {
            generalInfoHud.textX = mouseX
            generalInfoHud.textY = mouseY
        } else if (((mouseX + 70 >= streakInfoHud.textX) && (mouseX - 70 <= streakInfoHud.textX)) && ((mouseY + 70 >= streakInfoHud.textY) && (mouseY - 70 <= streakInfoHud.textY))) {
            streakInfoHud.textX = mouseX
            streakInfoHud.textY = mouseY
        } else if (((mouseX + 70 >= huntInfoHud.textX) && (mouseX - 70 <= huntInfoHud.textX)) && ((mouseY + 70 >= huntInfoHud.textY) && (mouseY - 70 <= huntInfoHud.textY))) {
            huntInfoHud.textX = mouseX
            huntInfoHud.textY = mouseY
        } else if (((mouseX + 70 >= upgradesInfoHud.textX) && (mouseX - 70 <= upgradesInfoHud.textX)) && ((mouseY + 70 >= upgradesInfoHud.textY) && (mouseY - 70 <= upgradesInfoHud.textY))) {
            upgradesInfoHud.textX = mouseX
            upgradesInfoHud.textY = mouseY
        } else if (((mouseX + 70 >= playerInfoHud.textX) && (mouseX - 70 <= playerInfoHud.textX)) && ((mouseY + 70 >= playerInfoHud.textY) && (mouseY - 70 <= playerInfoHud.textY))) {
            playerInfoHud.textX = mouseX
            playerInfoHud.textY = mouseY
        } else if (((mouseX + 70 >= boosterInfoHud.textX) && (mouseX - 70 <= boosterInfoHud.textX)) && ((mouseY + 70 >= boosterInfoHud.textY) && (mouseY - 70 <= boosterInfoHud.textY))) {
            boosterInfoHud.textX = mouseX
            boosterInfoHud.textY = mouseY
        } else if (((mouseX + 70 >= preInfoHud.textX) && (mouseX - 70 <= preInfoHud.textX)) && ((mouseY + 70 >= preInfoHud.textY) && (mouseY - 70 <= preInfoHud.textY))) {
            preInfoHud.textX = mouseX
            preInfoHud.textY = mouseY
        } else if (((mouseX + 70 >= targetInfoHud.textX) && (mouseX - 70 <= targetInfoHud.textX)) && ((mouseY + 70 >= targetInfoHud.textY) && (mouseY - 70 <= targetInfoHud.textY))) {
            targetInfoHud.textX = mouseX
            targetInfoHud.textY = mouseY
        }
        generalInfoHud.save()
        streakInfoHud.save()
        huntInfoHud.save()
        upgradesInfoHud.save()
        playerInfoHud.save()
        boosterInfoHud.save()
        preInfoHud.save()
        targetInfoHud.save()
    }
})

register("guiKey", (char, keyCode, gui, event) => {
    if (Settings.generalInfoHud.isOpen()) {
        if (keyCode == 200) {
            generalInfoHud.textScale += generalInfoHud.textScale < 10 ? 0.1 : 0
            streakInfoHud.textScale += streakInfoHud.textScale < 10 ? 0.1 : 0
            huntInfoHud.textScale += huntInfoHud.textScale < 10 ? 0.1 : 0
            upgradesInfoHud.textScale += upgradesInfoHud.textScale < 10 ? 0.1 : 0
            playerInfoHud.textScale += playerInfoHud.textScale < 10 ? 0.1 : 0
            boosterInfoHud.textScale += boosterInfoHud.textScale < 10 ? 0.1 : 0
        } else if (keyCode == 208) {
            generalInfoHud.textScale -= generalInfoHud.textScale > 0.1 ? 0.1 : 0
            streakInfoHud.textScale -= streakInfoHud.textScale > 0.1 ? 0.1 : 0
            huntInfoHud.textScale -= huntInfoHud.textScale > 0.1 ? 0.1 : 0
            upgradesInfoHud.textScale -= upgradesInfoHud.textScale > 0.1 ? 0.1 : 0
            playerInfoHud.textScale -= playerInfoHud.textScale > 0.1 ? 0.1 : 0
            boosterInfoHud.textScale -= boosterInfoHud.textScale > 0.1 ? 0.1 : 0
        }
        generalInfoHud.save()
        streakInfoHud.save()
        huntInfoHud.save()
        upgradesInfoHud.save()
        playerInfoHud.save()
        boosterInfoHud.save()
    }
})

register("scrolled", (mouseX, mouseY, direction) => {
    if (Settings.generalInfoHud.isOpen()) {
        if (direction == 1) {
            generalInfoHud.textScale += generalInfoHud.textScale < 10 ? 0.1 : 0
            streakInfoHud.textScale += streakInfoHud.textScale < 10 ? 0.1 : 0
            huntInfoHud.textScale += huntInfoHud.textScale < 10 ? 0.1 : 0
            upgradesInfoHud.textScale += upgradesInfoHud.textScale < 10 ? 0.1 : 0
            playerInfoHud.textScale += playerInfoHud.textScale < 10 ? 0.1 : 0
            boosterInfoHud.textScale += boosterInfoHud.textScale < 10 ? 0.1 : 0
        } else if (direction == -1) {
            generalInfoHud.textScale -= generalInfoHud.textScale > 0 ? 0.1 : 0
            streakInfoHud.textScale -= streakInfoHud.textScale > 0 ? 0.1 : 0
            huntInfoHud.textScale -= huntInfoHud.textScale > 0 ? 0.1 : 0
            upgradesInfoHud.textScale -= upgradesInfoHud.textScale > 0 ? 0.1 : 0
            playerInfoHud.textScale -= playerInfoHud.textScale > 0 ? 0.1 : 0
            boosterInfoHud.textScale -= boosterInfoHud.textScale > 0 ? 0.1 : 0

        }
        generalInfoHud.save()
        streakInfoHud.save()
        huntInfoHud.save()
        upgradesInfoHud.save()
        playerInfoHud.save()
        boosterInfoHud.save()

    }
})