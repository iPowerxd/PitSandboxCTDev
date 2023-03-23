import { onSandbox } from "./onSandbox"

export const worldotherplayers = () => {
    return worlplayers
}

export const worldentities = () => {
    return worldent
}

let worlplayers = World.getAllEntitiesOfType(Java.type("net.minecraft.client.entity.EntityOtherPlayerMP")).map(e => new EntityLivingBase(e.entity))
let worldent = World.getAllEntities().map(e => e.entity instanceof Java.type("net.minecraft.entity.EntityLivingBase") ? new EntityLivingBase(e.entity) : e)

register('tick', () => {
    if (!onSandbox()) return worldent = [], worlplayers = []
    worldent = World.getAllEntities().map(e => e.entity instanceof Java.type("net.minecraft.entity.EntityLivingBase") ? new EntityLivingBase(e.entity) : e)
    worlplayers = World.getAllEntitiesOfType(Java.type("net.minecraft.client.entity.EntityOtherPlayerMP")).map(e => new EntityLivingBase(e.entity))
})