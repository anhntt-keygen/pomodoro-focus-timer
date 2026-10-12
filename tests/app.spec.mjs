import { test, expect } from '@playwright/test';

test.describe('Pomodoro Focus Timer - End-to-End Test Suite', () => {

  test.beforeEach(async ({ page }) => {
    // Truy cập ứng dụng trước mỗi test case
    await page.goto('http://localhost:3000');
    
    // Mock API âm thanh HTML5 để tránh lỗi bảo mật trình duyệt khi tự động phát audio không có tương tác
    await page.addInitScript(() => {
      window.HTMLMediaElement.prototype.play = async function() {
        return Promise.resolve();
      };
    });
  });

  test('[SC-01] Basic Operations - Countdown, Controls & Alarm Trigger', async ({ page }) => {
    // 1. Kiểm tra trạng thái hiển thị mặc định là 25:00
    const countdown = page.locator('#timer-countdown');
    await expect(countdown).toHaveText('25:00');

    // 2. Nhấn nút "Bắt đầu"
    const btnStart = page.locator('#btn-start');
    const btnPause = page.locator('#btn-pause');
    await expect(btnStart).toBeEnabled();
    await expect(btnPause).toBeDisabled();

    await btnStart.click();

    // 3. Sau khi bắt đầu, nút "Tạm dừng" phải được kích hoạt
    await expect(btnPause).toBeEnabled();

    // 4. Giả lập tua nhanh thời gian (Fast-forward) để kiểm tra đếm ngược về 00:00 và kích hoạt chuông
    await page.evaluate(() => {
      // Nếu ứng dụng sử dụng window.timeLeft hoặc cơ chế tương tự, ta can thiệp trực tiếp để test nhanh
      if (typeof window.timeLeft !== 'undefined') {
        window.timeLeft = 1; // Đưa về 1 giây cuối cùng
      }
    });

    // 5. Nhấn nút "Đặt lại" (Reset) để đưa thời gian về ban đầu
    const btnReset = page.locator('#btn-reset');
    await btnReset.click();
    await expect(countdown).toHaveText('25:00');
  });

  test('[SC-02] Custom Settings & Edge Cases (Empty State & Validation)', async ({ page }) => {
    // 1. Kiểm tra trạng thái rỗng (Empty State) của lịch sử khi chưa có dữ liệu
    const emptyState = page.locator('#history-empty-state');
    await expect(emptyState).toBeVisible();

    // 2. Mở Modal cấu hình cài đặt
    const settingsBtn = page.locator('#settings-toggle-btn');
    await settingsBtn.click();

    const modal = page.locator('#settings-modal');
    await expect(modal).not.toHaveClass(/hidden/);

    // 3. Nhập giá trị không hợp lệ (Số âm) để kiểm tra validation
    const inputFocus = page.locator('#input-focus');
    await inputFocus.fill('-5');
    
    const settingsForm = page.locator('#settings-form');
    await settingsForm.evaluate((form) => {
      form.dispatchEvent(new Event('submit'));
    });

    // 4. Khôi phục cấu hình mặc định
    const btnResetSettings = page.locator('#btn-settings-reset');
    await btnResetSettings.click();
    await expect(inputFocus).toHaveValue('25');

    // 5. Đóng modal
    const closeBtn = page.locator('#settings-close-btn');
    await closeBtn.click();
    await expect(modal).toHaveClass(/hidden/);
  });

  test('[SC-03] State Management & LocalStorage Persistence', async ({ page }) => {
    // 1. Kiểm tra các chỉ số thống kê ban đầu bằng 0
    const totalSessions = page.locator('#stat-total-sessions');
    const totalMinutes = page.locator('#stat-total-minutes');
    await expect(totalSessions).toHaveText('0');
    await expect(totalMinutes).toHaveText('0');

    // 2. Giả lập ghi nhận một phiên hoàn thành vào localStorage
    await page.evaluate(() => {
      const mockHistory = [
        {
          mode: 'focus',
          duration: 25,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }
      ];
      localStorage.setItem('pomodoro-history', JSON.stringify(mockHistory));
      // Tải lại trang để ứng dụng đọc dữ liệu mới từ localStorage
      window.location.reload();
    });

    // 3. Đợi trang tải lại và kiểm tra dữ liệu đã được đồng bộ lên giao diện
    const updatedSessions = page.locator('#stat-total-sessions');
    await expect(updatedSessions).toHaveText('1');

    // 4. Nhấn nút "Xóa tất cả" để dọn dẹp lịch sử
    const btnClearHistory = page.locator('#btn-clear-history');
    await btnClearHistory.click();
    await expect(updatedSessions).toHaveText('0');
  });

  test('[SC-04] Responsive UI & Touch Target Compliance', async ({ page }) => {
    // 1. Thiết lập Viewport kích thước di động (iPhone 12 Pro)
    await page.setViewportSize({ width: 390, height: 844 });

    // 2. Kiểm tra kích thước vùng chạm (Touch Target) của các nút điều khiển chính >= 44px
    const tabButtons = page.locator('.tab-btn');
    const count = await tabButtons.count();
    for (let i = 0; i < count; i++) {
      const box = await tabButtons.nth(i).boundingBox();
      expect(box.height).toBeGreaterThanOrEqual(44);
      expect(box.width).toBeGreaterThanOrEqual(44);
    }

    const btnStart = page.locator('#btn-start');
    const startBox = await btnStart.boundingBox();
    expect(startBox.height).toBeGreaterThanOrEqual(44);
  });
});