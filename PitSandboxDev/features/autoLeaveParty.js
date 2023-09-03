import { onSandbox } from "../functions/onSandbox"
import Settings from '../config'


let currentParty = ''

register('chatComponentHovered', (component, event) => {
    if (component.getText().toLowerCase().includes('here')) {
        currentParty = component.getClickValue()
    }
})

register('chat', event => {
    if (onSandbox() && Settings.autoLeaveParty) {
        let msg = ChatLib.removeFormatting(ChatLib.getChatMessage(event))
        setTimeout(() => {
            if (msg.startsWith('You are already in a party! Leave it to join another one.')) {
                setTimeout(() => {
                    ChatLib.command('p leave')
                    ChatLib.command('p disband')
                }, 250);
                setTimeout(() => {
                    ChatLib.say(currentParty)
                }, 250);
                return
            }
        }, 125);
        if (msg.startsWith('You are the party leader!') || msg.startsWith('You are already in a party!')) {
            return cancel(event)
        }
    }
})

//You are the party leader! Transfer the party or use /party disband!
//You are already in a party! Leave it to join another one.