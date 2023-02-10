/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

export let onlinePlayers = TabList.getUnformattedNames().filter(n => !n.includes("§") && !n.startsWith("CIT-"));
export let onlinePlayersFormatted = TabList.getNames().filter(n => n.split(" ").length > 1);