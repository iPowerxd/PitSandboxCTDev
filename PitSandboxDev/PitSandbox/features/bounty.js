import Settings from '../config'
import { onSandbox } from "../functions/onSandbox"

register("chat", (claimer, claimed, amount, event) => {
    if (!onSandbox() || !Settings.personalClaims) return
    let nocancel = false
    if (claimer.startsWith("[")) {
        if (claimer.split(" ")[1] == Player.getName()) {
            nocancel = true
        }
    } if (claimed.startsWith("[")) {
        if (claimed.split(" ")[1] == Player.getName()) {
            nocancel = true
        }
    }
    if (!nocancel) cancel(event)
}).setChatCriteria("BOUNTY CLAIMED! ${claimer} killed ${claimed} for $${amount}")