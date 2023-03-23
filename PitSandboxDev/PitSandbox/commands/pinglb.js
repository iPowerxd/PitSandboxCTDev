register("command", () => {
    const NetHandlerPlayClient = Client.getConnection();
    let PlayerMap = NetHandlerPlayClient.func_175106_d();
    PlayerMap = PlayerMap.filter(p => !p.func_178845_a().name.includes("§") && !p.func_178845_a().name.includes("CIT-") && (p.func_178853_c() || p.func_178853_c() == 0));
    PlayerMap = PlayerMap.sort((a, b) => a.func_178853_c() - b.func_178853_c());
    PlayerMap.forEach((p, i) => {
        ChatLib.chat("&c#" + (i + 1) + " &e" + p.func_178845_a().name + ": " + (p.func_178853_c() < 50 ? "&2" : (p.func_178853_c() < 100 ? "&a" : (p.func_178853_c() < 200 ? "&6" : (p.func_178853_c() < 350 ? "&c" : "&4")))) + p.func_178853_c() + "ms");
    });
}).setName("pinglb")