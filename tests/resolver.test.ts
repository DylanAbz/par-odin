import {describe, test, expect} from 'vitest';
import {getCombination, getTeamValue, resolveLevel} from "../src/algo/resolver";
import {Dice, getCaptain, getCursed, getHero, getMage, getSoldier, getTraitor} from "../src/dices/dice";
import {getLevels} from "../src/levels/levels";

describe('Test de la fonction getTeamValue', () => {
    describe('test de la valeur d’une équipe classique', () => {
        test('test de la valeur de l’équipe classique', () => {
            let team: Dice[] = [];
            team.push(getSoldier());
            team.push(getCaptain());
            team.push(getHero());
            expect(getTeamValue(team)).toBe(1 + 2 + 3);
        });

        test('test de la valeur d’une équipe vide', () => {
            expect(getTeamValue([])).toBe(0);
        });

        test('test de la valeur d’une équipe avec un seul joueur', () => {
            expect(getTeamValue([getHero()])).toBe(3);
        });
        test('test de la valeur d’une équipe avec plusieurs mages', () => {
            let team: Dice[] = [];
            team.push(getHero());
            team.push(getSoldier());
            team.push(getMage());
            team.push(getMage());
            expect(getTeamValue(team)).toBe(3 + 1 + 2 + 2);
        });
    })

    describe('test de la valeur d’une équipe avec un traitre', () => {
        test('test de la valeur d’une équipe avec autant de traître que de héro', () => {
            let team: Dice[] = [];
            team.push(getHero());
            team.push(getHero());
            team.push(getTraitor());
            team.push(getTraitor());
            expect(getTeamValue(team)).toBe(3+3+1+1-3-3);
        });
        test('test de la valeur d’une équipe avec un joueur traître et pas de héro', () => {
            let team: Dice[] = [];
            team.push(getTraitor());
            team.push(getSoldier());
            expect(getTeamValue(team)).toBe(1+1);
        });
        test('test de la valeur d’une équipe avec plus de héros que de traitres', () => {
            let team: Dice[] = [];
            team.push(getHero());
            team.push(getHero());
            team.push(getHero());
            team.push(getTraitor());
            team.push(getTraitor());
            expect(getTeamValue(team)).toBe(3+3+3+1+1-3-3);
        });
        test('test de la valeur d’une équipe avec plus de traitres que de héros', () => {
            let team: Dice[] = [];
            team.push(getHero());
            team.push(getHero());
            team.push(getTraitor());
            team.push(getTraitor());
            team.push(getTraitor());
            expect(getTeamValue(team)).toBe(3+3+1+1+1-3-3);
        });
    })
})

describe('Test de la fonction resolveLevel', () => {
    for (const level of Object.keys(getLevels())) {
        test(`test de la résolution du niveau ${level}`, () => {
            let solution = resolveLevel(getLevels()[level]);
            console.log(solution[0], solution[1]);
            expect(getTeamValue(solution[0])).toBe(getTeamValue(solution[1]));
        })
    }
})