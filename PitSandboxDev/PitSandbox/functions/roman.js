/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

export const romanToInt = (str) => {
    const roman = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    }
    let num = 0;
    if (str.includes('CM')) num -= 200
    if (str.includes('CD')) num -= 200
    if (str.includes('XC')) num -= 20
    if (str.includes('XL')) num -= 20
    if (str.includes('IX')) num -= 2
    if (str.includes('IV')) num -= 2
    for (var i = 0; i < str.length; i++) {
        num += roman[str[i]]
    }
    return num
}

export const getRoman = (num) => {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
            "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
            "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"
        ],
        roman = "",
        i = 3
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman
    return Array(+digits.join("") + 1).join("M") + roman
}