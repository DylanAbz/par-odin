export enum DiceType {
    HERO,
    CAPTAIN,
    SOLDIER,
    TRAITOR,
    MAGE,
    CURSED,
}

export class Dice {
    value: number;
    isTraitor: boolean;
    isMage: boolean;
    type: DiceType;
    constructor(public type: DiceType) {
        switch (type) {
            case DiceType.HERO:
                this.value = 3;
                this.isTraitor = false;
                this.isMage = false;
                break;
            case DiceType.CAPTAIN:
                this.value = 2;
                this.isTraitor = false;
                this.isMage = false;
                break;
            case DiceType.SOLDIER:
                this.value = 1;
                this.isTraitor = false;
                this.isMage = false;
                break;
            case DiceType.TRAITOR:
                this.value = 1;
                this.isTraitor = true;
                this.isMage = false;
                break;
            case DiceType.MAGE:
                this.value = 0;
                this.isTraitor = false;
                this.isMage = true;
                break;
            case DiceType.CURSED:
                this.value = -1;
                this.isTraitor = false;
                this.isMage = false;
                break;
            default:
                throw new Error("Invalid DiceType");
        }
    }

}

Dice.prototype.toString = function () {
    switch (this.value) {
        case 3:
            return 'HERO (3)';
        case 2:
            return 'CAPTAIN (2)';
        case 1:
            if (this.isTraitor) {
                return 'TRAITOR (1)';
            } else {
                return 'SOLDIER (1)';
            }
        case 0:
            return 'MAGE';
        case -1:
            return 'CURSED';
        default:
            return '?';
    }
}


export function getHero() {
    return new Dice(DiceType.HERO);
}

export function getCaptain() {
    return new Dice(DiceType.CAPTAIN);
}

export function getSoldier() {
    return new Dice(DiceType.SOLDIER);
}

export function getTraitor() {
    return new Dice(DiceType.TRAITOR);
}

export function getMage() {
    return new Dice(DiceType.MAGE);
}

export function getCursed() {
    return new Dice(DiceType.CURSED);
}