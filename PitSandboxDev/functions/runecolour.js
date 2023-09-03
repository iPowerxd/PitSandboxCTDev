export function runeColour(rariy) {
    if (rariy == 'uncommon') return '§a'
    else if (rariy == 'rare') return '§9'
    else if (rariy == 'epic') return '§5'
    else if (rariy == 'legendary') return '§6'
    else return '§c'
}