export function pingColour(ping) {
    if (ping < 40) return ("§a")
    else if (ping < 80) return ("§2")
    else if (ping < 100) return ("§e")
    else if (ping < 120) return ("§6")
    else if (ping < 150) return ("§c")
    else if (ping >= 150) return ("§4")
    else return ("§f")
}