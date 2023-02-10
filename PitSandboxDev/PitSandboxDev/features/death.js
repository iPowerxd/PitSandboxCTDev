import { onSandbox } from "../functions/onSandbox";

register("chat", () => {
    if (!onSandbox()) return
    Client.showTitle("&eSaving Grace", "&7saved you from death!", 0, 35, 0)
}).setChatCriteria("SAVING GRACE! saved you from death!")

register("chat", event => {
    if (!onSandbox() && !Settings.toggleBDAlert) return
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            World.playSound("note.pling", 1, 1);
        }, i * 130);
    }
    Client.showTitle("&b&lDIVINE!", "&7Lives kept!", 0, 45, 0);
}).setChatCriteria("DIVINE INTERVENTION! Lives kept!")

register("chat", event => {
    if (!onSandbox() && !Settings.toggleBDAlert) return
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            World.playSound("note.pling", 1, 0.5);
        }, i * 130);
    }
}).setChatCriteria("INVENTORY BEACON! Lives kept!")