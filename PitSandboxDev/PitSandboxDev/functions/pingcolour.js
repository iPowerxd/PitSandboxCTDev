export function pingColour(ping) {
    if (ping < 40) return (`§a${ping}`)
    else if (ping < 80) return (`§2${ping}`)
    else if (ping < 100) return (`§e${ping}`)
    else if (ping < 120) return (`§6${ping}`)
    else if (ping < 150) return (`§c${ping}`)
    else if (ping >= 150) return (`§4${ping}`)
    else return (`§f${ping}`)
}