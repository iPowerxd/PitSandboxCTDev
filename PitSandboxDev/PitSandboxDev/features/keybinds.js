let toggleBots = new KeyBind("Toggle Bots", "", "!PitSandbox")

if (toggleBots.isPressed()) {
    ChatLib.command("togglebots");
}