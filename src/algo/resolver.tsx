import {Dice} from "../dices/dice.tsx";

export function getCombination(nbDice: number) {
    if (nbDice < 0 || !Number.isInteger(nbDice)) {
        throw new Error("n must be a non‑negative integer");
    }

    const result: number[][][] = [];

    // Représentation par un masque binaire : bit 1 => joueur dans l'équipe A.
    // On ne parcourt que la moitié des masques (0 … 2^(n-1)-1)
    // pour éviter les doublons [A,B] / [B,A].
    const maxMask = 1 << nbDice;
    for (let mask = 0; mask < maxMask / 2; mask++) {
        const teamA: number[] = [];
        const teamB: number[] = [];
        for (let i = 0; i < nbDice; i++) {
            if (mask & (1 << i)) {
                teamA.push(i);
            } else {
                teamB.push(i);
            }
        }
        result.push([teamA, teamB]);
    }

    return result;
}

export function getTeamValue(team: Dice[]) {
    let value = 0;
    let nbTraitor = 0;
    let nbHero = 0;
    for (const dice of team) {
        if (dice.isMage) {
            value += team.length - 1;
        } else {
            if (dice.value === 3) {
                nbHero++;
            }
            if (dice.isTraitor) {
                nbTraitor++;
            }
            value += dice.value;
        }
    }
    value -= nbTraitor <= nbHero ? nbTraitor * 3 : nbHero * 3;
    return value;
}

export function resolveLevel(dices: Dice[]) {
    let combinations = getCombination(dices.length);
    for (const combi of combinations) { // Utilisation de for...of
        let teamA = [];
        let teamB = [];
        for (const index of combi[0]) {
            teamA.push(dices[index]);
        }
        for (const index of combi[1]) {
            teamB.push(dices[index]);
        }
        if (getTeamValue(teamA) == getTeamValue(teamB)) {
            return [teamA, teamB];
        }
    }
}