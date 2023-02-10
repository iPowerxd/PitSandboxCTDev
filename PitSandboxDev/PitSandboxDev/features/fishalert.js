import { onSandbox } from "../functions/onSandbox";
import Settings from '../config'

let lastbubble = 0
let lastsplashsound = 0
let lasthookmotion = 0
let lastalert = 0

let worldotherplayers = World.getAllEntitiesOfType(Java.type("net.minecraft.client.entity.EntityOtherPlayerMP")).map(e => new EntityLivingBase(e.entity))
let worldentities = World.getAllEntities().map(e => e.entity instanceof Java.type("net.minecraft.entity.EntityLivingBase") ? new EntityLivingBase(e.entity) : e)

register("spawnParticle", (particle, type, event) => {
    if (!onSandbox() || !Settings.fishAlert) return
    if (particle.underlyingEntity instanceof Java.type("net.minecraft.client.particle.EntityBubbleFX")) {
        if (Player.getPlayer().field_71104_cf instanceof Java.type("net.minecraft.entity.projectile.EntityFishHook")) {

            let hook = Player.getPlayer().field_71104_cf;
            let bubble = particle.underlyingEntity;
            let distance = Math.sqrt(Math.pow(hook.field_70165_t - bubble.field_70165_t, 2) + Math.pow(hook.field_70163_u - bubble.field_70163_u, 2) + Math.pow(hook.field_70161_v - bubble.field_70161_v, 2));
            if (distance < 0.6) {
                lastbubble = Date.now();

            }
        }
    }
})

register("tick", () => {
    if (!onSandbox()) return worldentities = [], worldotherplayers = [];
    worldentities = World.getAllEntities().map(e => e.entity instanceof Java.type("net.minecraft.entity.EntityLivingBase") ? new EntityLivingBase(e.entity) : e);
    worldotherplayers = World.getAllEntitiesOfType(Java.type("net.minecraft.client.entity.EntityOtherPlayerMP")).map(e => new EntityLivingBase(e.entity));
    if (Settings.fishAlert) {
        if (Player.getPlayer().field_71104_cf instanceof Java.type("net.minecraft.entity.projectile.EntityFishHook")) {
            if (
                Player.getPlayer().field_71104_cf.field_70159_w == 0 &&
                Player.getPlayer().field_71104_cf.field_70179_y == 0 &&
                Player.getPlayer().field_71104_cf.field_70181_x < -0.05
            ) {

                lasthookmotion = Date.now();
            }
        }

        if (Date.now() - lastbubble < 300 && Date.now() - lastsplashsound < 300 && Date.now() - lasthookmotion < 300 && Date.now() - lastalert > 1000) {
            for (let i = 0; i < 5; i++) World.playSound("note.pling", 1, 1);
            lastalert = Date.now();
        }
    }
})