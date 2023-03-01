import Settings from '../config'
import { onSandbox } from "../functions/onSandbox"

const dicwords = JSON.parse(FileLib.read('words', 'dicwords.json')).sort()
let unscrambleList = JSON.parse(FileLib.read("words", "unscramble.json")).sort()

function sayMultUnscrambled(list) {
    let i = 0
    register('step', () => {
        if (i < list.length) ChatLib.say(list[i]), i++
    }).setFps(2)
}

function unscrambleWord(word) {
    let list
    if (pesronalList) list = unscrambleList
    else list = dicwords
    return (
        list.filter(item => {
            const reOccurrence1 = {}
            const reOccurrence2 = {}
            if (item.length === word.length) {
                item.split('').forEach(letter => {
                    reOccurrence1[letter] = reOccurrence1[letter] + 1 || 1
                })
                word.split('').forEach(letter => {
                    reOccurrence2[letter] = reOccurrence2[letter] + 1 || 1
                })
                let match = 0;
                for (let key in reOccurrence1) {
                    if (reOccurrence1[key] === reOccurrence2[key]) {
                        match++
                    }
                }
                return ((Object.keys(reOccurrence1).length === match) ? item : false)
            }
            return
        })
    )
}

register("chat", (word, event) => {
    if (!onSandbox()) return
    if (unscrambleList.find((p) => ChatLib.removeFormatting(p.toLowerCase()) == ChatLib.removeFormatting(word.toLowerCase()))) return ChatLib.chat("&cWord already in list.")
    unscrambleList.push(ChatLib.removeFormatting(word))
    FileLib.write("words", "unscramble.json", JSON.stringify(unscrambleList))
    ChatLib.chat("&aWord added to list.")
}).setChatCriteria("UNSCRAMBLE OVER! ${*} -> ${word}")

register('chat', (word, event) => {
    if (!onSandbox() || !Settings.autounscramble) return
    cancel(event)
    let unscrambledWord = unscrambleWord(word)
    if (unscrambledWord.length === 0) {
        pesronalList = false
        unscrambledWord = unscrambleWord(word)
        pesronalList = true
    }

    ChatLib.chat(`&e&lUNSCRAMBLE! &7Unscramble: &e${word} &7-> &a${unscrambledWord.length !== 0 ? unscrambledWord : '&4&lUNKNOWN'}`)

    if (unscrambledWord.length > 0) {
        ChatLib.chat("&aAnswer copied to clipboard.")
        net.minecraft.client.gui.GuiScreen.func_146275_d(unscrambledWord)
        if (Settings.aqmGuild) command(`gc Answer is: ${unscrambledWord}`)
    } else if (unscrambledWord.length <= 0 && Settings.aqmGuild) ChatLib.command(`gc I don't know the fucking answer!`)

    setTimeout(() => {
        if (isAFK(Player.getName()) && Settings.aqmAFK) {
            if (unscrambledWord.length > 1) sayMultUnscrambled(unscrambledWord)
            else ChatLib.say(unscrambledWord)
        }
    }, Math.floor(Math.random() * 5555) + 5555)

}).setChatCriteria('UNSCRAMBLE! Unscramble: ${word}')

register('command', (arg1) => {
    switch (arg1) {
        case 'list':
            ChatLib.chat(`&7${unscrambleList.join(', ')}`)
            break

        case 'length':
            ChatLib.chat(`&a${Math.floor(unscrambleList.length)}`)
            break

        default:
            break
    }
}).setName('unscramble')