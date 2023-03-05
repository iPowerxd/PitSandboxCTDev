/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

export const msToTime = (s, showms = false) => {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    if (!ms || !showms) return (hrs != 0 ? hrs + 'h ' : "") + (mins != 0 ? mins + 'm ' : "") + secs.toFixed(0) + "s";
    else if (showms) return (hrs != 0 ? hrs + 'h ' : "") + (mins != 0 ? mins + 'm ' : "") + secs.toFixed(0) + '.' + Math.floor(ms / 10) + "s";
}