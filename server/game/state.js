const state = {
    player: {},
    bullets: [],
    weapons: {
        assault: {
            width: 100,
            height: 12,
            fireRate: 9,
            ammo: 30,
            speed: 30,
            reloadTime: 3000,
            spread: 15
        },
        pistol: {
            width: 75,
            height: 8,
            fireRate: 2,
            ammo: 12,
            speed: 25,
            reloadTime: 2000,
            spread: 10
        }
    }
}

module.exports = state;