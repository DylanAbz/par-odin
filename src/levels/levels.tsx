import {getCaptain, getCursed, getHero, getMage, getSoldier, getTraitor} from "../dices/dice.tsx";

export function getLevels() {
    return {
        1: [
            getSoldier(),
            getSoldier(),
            getSoldier(),
            getCaptain(),
            getHero(),
            getHero(),
            getHero(),
        ],
        2: [
            getTraitor(),
            getCaptain(),
            getCaptain(),
            getCaptain(),
            getCaptain(),
            getHero(),
            getHero(),
        ],
        3: [
            getTraitor(),
            getSoldier(),
            getCursed(),
            getHero(),
            getHero(),
            getHero(),
            getHero(),
        ],
        4: [
            getSoldier(),
            getSoldier(),
            getSoldier(),
            getSoldier(),
            getSoldier(),
            getSoldier(),
            getMage()
        ],
        5: [
            getHero(),
            getHero(),
            getCaptain(),
            getSoldier(),
            getSoldier(),
            getSoldier(),
            getMage()
        ],
        6: [
            getHero(),
            getHero(),
            getCaptain(),
            getSoldier(),
            getSoldier(),
            getCursed(),
            getMage()
        ],
        7: [
            getHero(),
            getHero(),
            getCaptain(),
            getCaptain(),
            getTraitor(),
            getCursed(),
            getMage(),
        ],
    }
}