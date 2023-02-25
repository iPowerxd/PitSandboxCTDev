/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />
import Settings from '../config'

let nopemvp = false

register("chat", () => {
    ChatLib.chat("§cNo MVP, disabled auto /event.")
    nopemvp = true
}).setChatCriteria("HEY THERE! See the latest events with MVP!")

export const nomvp = () => {
    return nopemvp
} // import { nomvp } from "../functions/nomvp"
