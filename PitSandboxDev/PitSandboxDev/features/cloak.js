register("chat", (event) => {
    let umsg = ChatLib.removeFormatting(ChatLib.getChatMessage(event))
    if (umsg.startsWith("CLOAK!")) return cancel(event)
})