import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:5173/');
})

test.describe('E2E tests', () => {
    test.describe('états de départ', () => {
        test('start at level 1', async ({page}) => {
            await expect(page.locator('.levelTitle')).toContainText('Niveau 1');
        });
        test('validate is disabled', async ({page}) => {
            await expect(page.locator(".validateBtn")).toBeDisabled();
        });
    })

    test.describe('enable validate', () => {
        test('drag and drop all then validate', async ({page}) => {
            await page.getByTitle('Hero (+3)').first().dragTo(page.locator('div').filter({hasText: 'Équipe A'}).nth(3));
            await page.getByTitle('Hero (+3)').first().dragTo(page.locator('div').filter({hasText: 'Équipe A'}).nth(3));
            await page.getByTitle('Hero (+3)').first().dragTo(page.locator('div').filter({hasText: 'Équipe A'}).nth(3));
            await page.getByTitle('Captain (+2)').dragTo(page.locator('div').filter({hasText: 'Équipe A'}).nth(3));
            await page.getByTitle('Soldier (+1)').first().dragTo(page.locator('div').filter({hasText: 'Équipe A'}).nth(3));
            await page.getByTitle('Soldier (+1)').first().dragTo(page.locator('div').filter({hasText: 'Équipe A'}).nth(3));
            await page.getByTitle('Soldier (+1)').first().dragTo(page.locator('div').filter({hasText: 'Équipe A'}).nth(3));
            await expect(page.locator(".validateBtn")).not.toBeDisabled();
        })
    })

    test.describe('success in level 1', () => {
        test('drag and drop then success', async ({page}) => {
            await page.getByTitle('Hero (+3)').first().dragTo(page.locator('div').filter({hasText: 'Équipe A'}).nth(3));
            await page.getByTitle('Hero (+3)').first().dragTo(page.locator('div').filter({hasText: 'Équipe A'}).nth(3));
            await page.getByTitle('Hero (+3)').first().dragTo(page.locator('div').filter({hasText: 'Équipe B'}).nth(3));
            await page.getByTitle('Captain (+2)').dragTo(page.locator('div').filter({hasText: 'Équipe B'}).nth(3));
            await page.getByTitle('Soldier (+1)').first().dragTo(page.locator('div').filter({hasText: 'Équipe B'}).nth(3));
            await page.getByTitle('Soldier (+1)').first().dragTo(page.locator('div').filter({hasText: 'Équipe B'}).nth(3));
            await page.getByTitle('Soldier (+1)').first().dragTo(page.locator('div').filter({hasText: 'Équipe A'}).nth(3));
            await expect(page.getByRole('button', {name: 'Valider'})).not.toBeDisabled();
            await page.locator(".validateBtn").click();
            await expect(page.locator('.winTitle')).toContainText("OUI OUI OUI OUI C'EST GAGNÉ");
            await expect(page.locator('.levelTitle')).toContainText('Niveau 2');
        })
    })
})