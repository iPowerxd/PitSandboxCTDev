register("command", (p, bal) => {
    if (!onSandbox()) return;
    if (!p || !bal) return ChatLib.chat("&cUsage: /setbal <player> <amount>");
    ChatLib.command("bal " + p);
    let event = register("chat", (player, balance, event) => {
        if (player == p || player.startsWith("~")) {
            cancel(event);
            balance = parseFloat(balance.replace(/,/g, ""));
            if (balance != undefined && balance != NaN && bal - balance > 0) {
                ChatLib.command("pay " + p + " " + (bal - balance));
            }
        }
    }).setChatCriteria("Balance of ${player}: $${balance}");
    setTimeout(() => {
        event.unregister();
    }, 500);

}).setName("setbal")