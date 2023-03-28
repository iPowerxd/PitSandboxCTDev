/// <reference types='../../CTAutocomplete' />
/// <reference lib='es2015' />

import PogObject from '../../PogData'
import Settings from '../config'

export let generalInfoHud = new PogObject('PitSandbox', {
    'firstTime': true,
    'textX': Renderer.screen.getWidth() * 0.895,
    'textY': 4,
    'textScale': 1
}, 'guiLocations/generalInfo.json')

export let streakInfoHud = new PogObject('PitSandbox', {
    'textX': Renderer.screen.getWidth() * 0.895,
    'textY': Renderer.screen.getHeight() * 2 / 5,
    'textScale': 1
}, 'guiLocations/streakInfo.json')

export let huntInfoHud = new PogObject('PitSandbox', {
    'firstTime': true,
    'textX': Renderer.screen.getWidth() * 0.895,
    'textY': Renderer.screen.getHeight() * 3 / 5,
    'textScale': 1
}, 'guiLocations/huntInfo.json')

export let upgradesInfoHud = new PogObject('PitSandbox', {
    'textX': 4,
    'textY': Renderer.screen.getHeight() / 9,
    'textScale': 1
}, 'guiLocations/upgradesInfo.json')

export let playerInfoHud = new PogObject('PitSandbox', {
    'textX': Renderer.screen.getWidth() / 5,
    'textY': 4,
    'textScale': 1
}, 'guiLocations/playerInfo.json')

export let boosterInfoHud = new PogObject('PitSandbox', {
    'textX': Renderer.screen.getWidth() * 2 / 3,
    'textY': 4,
    'textScale': 1
}, 'guiLocations/boosterInfo.json')

export let cooldownInfoHud = new PogObject('PitSandbox', {
    'textX': 4,
    'textY': Renderer.screen.getHeight() / 3
}, 'guiLocations/cooldownInfo.json')

export let preInfoHud = new PogObject('PitSandbox', {
    'textX': Renderer.screen.getWidth() / 2,
    'textY': Renderer.screen.getHeight() * 8 / 10,
    'textScale': 1
}, 'guiLocations/preInfo.json')

export let targetInfoHud = new PogObject('PitSandbox', {
    'textX': Renderer.screen.getWidth() * 2 / 3,
    'textY': Renderer.screen.getHeight() * 8.8 / 10,
    'textScale': 1
}, 'guiLocations/targetInfo.json')

function resetdisplay() {
    generalInfoHud.textScale = 1
    generalInfoHud.textX = Renderer.screen.getWidth() * 0.895
    generalInfoHud.textY = 4
    streakInfoHud.textX = Renderer.screen.getWidth() * 0.895
    streakInfoHud.textY = Renderer.screen.getHeight() * 2 / 5
    huntInfoHud.textX = Renderer.screen.getWidth() * 0.895
    huntInfoHud.textY = Renderer.screen.getHeight() * 3 / 5
    upgradesInfoHud.textX = 4
    upgradesInfoHud.textY = Renderer.screen.getHeight() / 9
    playerInfoHud.textX = Renderer.screen.getWidth() / 5
    playerInfoHud.textY = 4
    boosterInfoHud.textX = Renderer.screen.getWidth() * 2 / 3
    boosterInfoHud.textY = 4
    cooldownInfoHud.textX = 4
    cooldownInfoHud.textY = Renderer.screen.getHeight() / 3
    preInfoHud.textX = Renderer.screen.getWidth() / 2
    preInfoHud.textY = Renderer.screen.getHeight() * 8 / 10
    targetInfoHud.textX = Renderer.screen.getWidth() * 2 / 3
    targetInfoHud.textY = Renderer.screen.getHeight() * 8.8 / 10
    generalInfoHud.save()
    streakInfoHud.save()
    huntInfoHud.save()
    upgradesInfoHud.save()
    playerInfoHud.save()
    boosterInfoHud.save()
    cooldownInfoHud.save()
    preInfoHud.save()
    targetInfoHud.save()
}

register('dragged', (mouseDeltaX, mouseDeltaY, mouseX, mouseY, button) => {
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
        } else if (((mouseX + 70 >= cooldownInfoHud.textX) && (mouseX - 70 <= cooldownInfoHud.textX)) && ((mouseY + 70 >= cooldownInfoHud.textY) && (mouseY - 70 <= cooldownInfoHud.textY))) {
            cooldownInfoHud.textX = mouseX
            cooldownInfoHud.textY = mouseY
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
        cooldownInfoHud.save()
        preInfoHud.save()
        targetInfoHud.save()
    }
})

register('guiKey', (char, keyCode, gui, event) => {
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

register('scrolled', (mouseX, mouseY, direction) => {
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

register('renderOverlay', () => {
    if (Settings.generalInfoHud.isOpen()) {
        new Text('&aUse ▲ arrow key UP to scale up', Renderer.screen.getWidth() / 2 - (Renderer.getStringWidth('&aUse ▲ arrow key UP to scale up') / 2), Renderer.screen.getHeight() / 2 - 5).setShadow(true).setScale(1).draw();
        new Text('&aUse ▼ arrow key DOWN to scale down', Renderer.screen.getWidth() / 2 - (Renderer.getStringWidth('&aUse ▼ arrow key DOWN to scale down') / 2), Renderer.screen.getHeight() / 2 + 5).setShadow(true).setScale(1).draw();
        new Text('&aYou can also use the scroll wheel', Renderer.screen.getWidth() / 2 - (Renderer.getStringWidth('&aYou can also use the scroll wheel') / 2), Renderer.screen.getHeight() / 2 + 15).setShadow(true).setScale(1).draw();
    }
})

register('command', () => {
    resetdisplay()
    ChatLib.chat('&aDisplay locations reset!')
    World.playSound('random.successful_hit', 1, 1.5)
}).setName('resetdisplay')