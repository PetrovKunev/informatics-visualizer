import { test, expect } from '@playwright/test';

test.describe('Sorting Visualizer', () => {
  test('стартира визуализацията и отчита стъпка', async ({ page }) => {
    await page.goto('/algorithms');
    await expect(page.getByRole('heading', { name: 'Алгоритми за сортиране' })).toBeVisible();
    const startButton = page.getByRole('button', { name: 'Старт' });
    await startButton.click();
    await page.waitForTimeout(1500);
    const stepInfo = page.getByText('Стъпка:');
    await expect(stepInfo).toContainText('Стъпка:');
    await expect(stepInfo).not.toContainText('Очаква старт');
  });
});
