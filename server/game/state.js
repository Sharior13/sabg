const state = {
    player: {},
    bullets: [],
    weapons: {
        assault: {
            width: 100,
            height: 12,
            fireRate: 6,
            damage: 15,
            ammo: 30,
            speed: 30,
            reloadTime: 3000,
            spread: 25
        },
        pistol: {
            width: 75,
            height: 8,
            fireRate: 3,
            damage: 20,
            ammo: 12,
            speed: 25,
            reloadTime: 2000,
            spread: 10
        },
        sniper: {
            width: 120,
            height: 15,
            fireRate: 1,
            damage: 50,
            ammo: 8,
            speed: 60,
            reloadTime: 5000,
            spread: 5
        }
    }
}

module.exports = state;