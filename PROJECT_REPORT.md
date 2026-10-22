# 🌸 BÁO CÁO DỰ ÁN V4 — HOA'S SECRET GARDEN (12A1)
*Khu Vườn Của Những Lời Chưa Nói — Món quà 20/10 gửi tặng các bạn nữ 12A1*

---

## 1. THÔNG TIN DỰ ÁN & ĐƯỜNG DẪN THƯ MỤC
- **Tên dự án**: Hoa's Secret Garden — 12A1 (The Butterfly's Secret Garden)
- **Đường dẫn thư mục dự án**: `c:\Users\huong\Documents\antigravity\calm-bose\butterfly-garden`
- **Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS v4, GSAP, Canvas-Confetti, Lucide-React, Web Audio API, SVG Hand-Crafted Illustration.
- **Môi trường đã kiểm thử**:
  - Desktop Chrome (1280x800)
  - Mobile Safari/Chrome (390x844 - iPhone 14/15)
  - Small Mobile Viewport (375x667 - iPhone SE)
  - Automated Playwright E2E Test Suite (`scripts/verify-garden.cjs`).

---

## 2. DANH SÁCH TÍNH NĂNG ĐÃ HOÀN THÀNH (100% MASTER PROMPT V4)

### ✅ 1. Nhân Vật Hoa — Bó Hoa Biết Nói (Mascot Trung Tâm Dẫn Chuyện)
- Mascot là một **bó hoa neon pastel dễ thương** (SVG đa tầng tinh xảo):
  - Thân giấy gói bouquet màu hồng pastel mềm mại với viền phát sáng neon aura (`#FF70A6`).
  - Đôi mắt hình vuông bo tròn (`rx="9"`) sáng rõ, long lanh theo phong cách neon illustration.
  - Bộ biểu cảm sinh động theo từng phần lời thoại (13 mood): `welcome`, `intro`, `sparkle`, `gentle`, `wink`, `happy-cake`, `shy`, `suspense`, `smile-letter`, `joy`, `tender`, `sincere`, `celebrate`.
  - Vương miện hoa rực rỡ bên trên với hoa hồng xoắn ốc, cúc trắng nhụy vàng, cosmos tím và lá xanh mint.
  - Nơ bướm hồng xinh xắn bên dưới cuống bó hoa.
- **Hệ thống chuyển động quán tính đa tầng (Layered Inertia System)**:
  - Lắc nghiêng trái/phải 3°–6° mượt mà theo nhịp beat (`var(--hoa-tilt)`).
  - Nhún nảy nhẹ nhàng ±4px (`var(--hoa-bob)`).
  - Các bông hoa vương miện trên đầu lắc ngược pha nhẹ (counter-lag) tạo độ nẩy tự nhiên của cánh hoa.
  - Nơ và lá cây chuyển động đung đưa độc lập.
  - Chu kỳ chớp mắt tự nhiên (nhấp nháy sau mỗi 3.5s - 5s).
- **Tương tác chạm**: Khi nhấp/chạm vào Hoa, Hoa sẽ nở nụ cười nhắm mắt, lắc đầu đáng yêu và bung tỏa các hạt tim màu hồng lấp lánh (`♡`).
- **Lời dẫn thoại trực tiếp**: Hoa nói chuyện bằng khung bong bóng hội thoại (`StoryText`) có đuôi chỉ thẳng lên người Hoa, tag tên `🌸 Hoa ♡`, không dùng các thẻ tiêu đề/badge thô cứng.

### ✅ 2. Cấu Trúc Kể Chuyện Chuẩn 13 Phần (Manual Interactive Mode)
- **Tuyệt đối KHÔNG Auto-Play & KHÔNG Timer Skip**: Website không tự động đổi cảnh hay tự tua lời chúc. 1 lần click nút "Tiếp tục" = chuyển đúng 1 phần lời thoại tiếp theo.
- **Khóa chống spam click**: Khóa debounce 950ms trong lúc Hoa chuyển trạng thái để chống spam gây lỗi nhịp.
- **Thanh tiến trình 13 bước**: Dạng capsule tinh tế hiển thị tiến trình từ `1/13` đến `13/13` với chấm sáng và hiệu ứng phát sáng neon.
- **Chi tiết 13 phần lời thoại chuẩn Master Prompt V4**:
  1. **Phần 1**: *"Này cậu ơi!"* — Nút: *"Dạ? Có chuyện gì thế Hoa? ♡"*
  2. **Phần 2**: *"Tớ là Hoa – nàng tiên nhỏ của khu vườn hoa này! 🌸"* — Nút: *"Chào nàng tiên nhỏ dễ thương! ♡"*
  3. **Phần 3**: *"Hôm nay tớ được giao một nhiệm vụ đặc biệt lắm đó, hihi..."* — Nút: *"Nhiệm vụ gì thế kể tớ nghe với ♡"*
  4. **Phần 4**: *"Là gửi những lời tâm tư, tình cảm còn dang dở của các bạn nam dành cho các nàng nhân ngày 20/10 nè."* — Nút: *"Thật á? Tụi mình muốn nghe! ♡"*
  5. **Phần 5**: *"Và các cậu biết gì hông?..."* — Nút: *"Biết gì thế Hoa ơi? ♡"*
  6. **Phần 6**: *"Hôm thứ 3 chỉ là tráng miệng thôi, hôm nay mới là bữa chính nè! 🎂"* — Bánh kem mini 2 tầng cắm nến lung linh nhấp nháy. Nút: *"Oa bất ngờ quá! Bữa chính là gì ta? ♡"*
  7. **Phần 7**: *"Có lẽ thời điểm này hơi trễ để gửi những lời chúc "chính thức" đến những bông hoa ở đây..."* — Nút: *"Không sao đâu, tụi mình vẫn đang lắng nghe nè ♡"*
  8. **Phần 8**: *"Nhưng mà để mọi thứ có thể hoàn hảo và trọn vẹn nhất nên là..."* — Nút: *"Nên là sao ta? Hồi hộp quá... ♡"*
  9. **Phần 9**: *"Sự chậm trễ của các chàng đây, hy vọng các bông hoa của 12A1 sẽ hoan hỉ và dùng bữa thật ngon nhé! 💗"* — Phong bì sáp tim cổ điển mở ra tấm thiệp viết tay chân thành từ các bạn nam 12A1. Nút: *"Cảm ơn các chàng trai nha! Còn gì nữa hông? ♡"*
  10. **Phần 10**: *"Tiếp nối những lời còn chưa nói, nhân dịp 20/10, cánh đàn ông chúc các nàng một ngày 20/10 thật nhiều niềm vui và hạnh phúc."* — Vườn hoa bừng nở 100% rực rỡ. Nút: *"Ngọt ngào quá, tiếp tục đi nào ♡"*
  11. **Phần 11**: *"Mong các nàng luôn được yêu thương theo cách mình xứng đáng, và mỗi ngày đều có một điều nhỏ bé để mỉm cười."* — Nút: *"Cảm ơn lời chúc ấm áp này nhé ♡"*
  12. **Phần 12**: *"Cuối cùng, chúc các nàng luôn xinh đẹp, tự tin, rạng rỡ và gặp thật nhiều may mắn trên hành trình phía trước."* — Nút: *"Điều tuyệt vời nhất cuối cùng là gì nào? ♡"*
  13. **Phần 13**: *"Happy Vietnamese Women's Day! 💐 Gửi đến những bông hoa xinh đẹp của 12A1. Made with love, from the boys of 12A1 ♡"* — Pháo hoa confetti rực rỡ, hiệu ứng bừng sáng bầu trời. 2 nút tương tác:
      - **Xem lại từ đầu ↻**: Đưa về Phần 1 một cách mượt mà.
      - **Gửi một lời nhắn 💌**: Mở popup modal cho các bạn nữ viết lời cảm ơn/nhắn nhủ và sao chép nhanh vào clipboard để gửi vào nhóm lớp.

### ✅ 3. Xử Lý Triệt Để Lỗi Tràn Viền / Cắt Đỉnh Nhân Vật (Zero-Clipping)
- **Tách biệt Wrapper Định Vị và Wrapper Animation**:
  - Wrapper ngoài: Chịu trách nhiệm căn tọa độ trung tâm tuyệt đối (`left: 50%`, `top: max(145px, 18vh)`, `transform: translate(-50%, -50%)`).
  - Wrapper trong: Độc lập áp dụng animation dao động (`transform: translateY(var(--hoa-bob)) rotate(calc(var(--hoa-tilt) * 1deg)) scale(...)`).
  - Loại bỏ hoàn toàn xung đột ghi đè giữa `translate(-50%, -50%)` và CSS transforms nhịp điệu.
- **Độ hở đỉnh an toàn (Top Clearance)**:
  - Đã kiểm tra thực nghiệm trên màn hình ngắn (iPhone SE 375x667), đỉnh vương miện hoa của Hoa luôn cách mép trên màn hình `>= 22.3px` (vượt ngưỡng yêu cầu tối thiểu 15px).
- **Khoảng cách phân bố nội dung (Vertical Spacing)**:
  - Khung bong bóng thoại và các thành phần đặc biệt (bánh kem, phong thư, khung kết thúc) sử dụng lề trên hợp lý (`mt-52` đến `mt-76`), không bao giờ đè lên mascot Hoa hay bị che bởi vườn hoa.

### ✅ 4. Hệ Thống Âm Thanh & Vườn Hoa Lắc Lư Theo Nhịp (Web Audio API)
- **Bài hát chính thức**: *Từng Ngày Yêu Em* của Bùi Trường Linh (định dạng mp3 3.65 MB tại `public/audio/tung-ngay-yeu-em.mp3` và `dist/audio/tung-ngay-yeu-em.mp3`).
- **Phân tích âm thanh thời gian thực (Web Audio API AnalyserNode)**:
  - `AudioContext`, `AnalyserNode` (`fftSize = 256`, `smoothingTimeConstant = 0.82`) và `GainNode`.
  - Trích xuất dải tần số bass (kicks, bassline) và mid (tiếng đàn guitar acoustic, giọng ca).
  - Điều khiển các biến CSS Custom Properties thời gian thực (`--sway-phase-0` .. `--sway-phase-4`, `--beat-bounce`, `--hoa-bob`, `--hoa-tilt`, `--grass-sway`) ở 60 FPS mượt mà.
- **5 luồng pha dao động lệch pha (0.0 rad, 1.25 rad, 2.5 rad, 3.75 rad, 5.0 rad)**: Giúp hơn 46 bông hoa không chuyển động đồng loạt như robot mà tạo thành làn sóng hoa uốn lượn nhịp nhàng.
- **Phân tầng biên độ nhún**:
  - Foreground: Factor 1.0 (dao động ±4° đến ±9° theo tiếng trống).
  - Midground: Factor 0.72 (dao động ±3° đến ±6°).
  - Background: Factor 0.45 (dao động ±2° đến ±3.5°).
- **Chơi nhạc liền mạch**: Nhạc không bị khởi động lại hay gián đoạn khi chuyển qua 13 phần lời thoại. Bật/tắt êm ái với hiệu ứng âm lượng mượt mà.

---

## 3. KẾT QUẢ KIỂM TRA (TESTING SUMMARY)
- **TypeScript Typecheck**: 0 lỗi (`tsc -b` pass 100%).
- **Production Build**: Thành công trong 1.06s (`dist/` dung lượng tối ưu, CSS 36KB, JS 284KB gzipped 89KB).
- **Playwright Automated E2E Test (`scripts/verify-garden.cjs`)**:
  - Desktop Chrome (1280x800): Chạy qua trọn vẹn 13/13 phần, test mở modal, test xem lại từ đầu: **PASS**.
  - Mobile (390x844 - iPhone 14/15): Chạy qua trọn vẹn 13/13 phần, giao diện dọc cân đối, nút bấm dễ chạm: **PASS**.
  - Small Mobile Viewport (375x667 - iPhone SE): Kiểm tra tọa độ Hoa đỉnh đầu: **top = 22.3px >= 15px** (Zero-Clipping: **PASS**).
  - Test No-Autoplay: Chờ 4s không thao tác, Phần 1 vẫn giữ nguyên 100%: **PASS**.
- Toàn bộ ảnh chụp màn hình kiểm chứng đã được lưu trữ tại `butterfly-garden/screenshots/`.

---

## 4. HƯỚNG DẪN CHẠY LOCAL & DEPLOY GITHUB PAGES

### 1. Chạy Local trên máy
```bash
# 1. Di chuyển vào thư mục dự án
cd c:\Users\huong\Documents\antigravity\calm-bose\butterfly-garden

# 2. Cài đặt thư viện (nếu chưa cài)
npm install

# 3. Khởi động server
npm run dev
```
Mở trình duyệt truy cập: `http://localhost:5173/`

### 2. Xuất bản lên GitHub Pages (Miễn phí)
1. Khởi tạo Git và đẩy mã nguồn lên repository GitHub của bạn:
   ```bash
   cd c:\Users\huong\Documents\antigravity\calm-bose\butterfly-garden
   git init
   git add .
   git commit -m "feat: Hoa Secret Garden 20/10 12A1 - 13 Parts Complete"
   git branch -M main
   git remote add origin https://github.com/<tai-khoan>/<ten-repo>.git
   git push -u origin main
   ```
2. Trên GitHub, vào tab **Settings** -> **Pages**.
3. Tại phần **Build and deployment** -> **Source**, chọn **GitHub Actions**.
4. File `.github/workflows/deploy.yml` đã được cấu hình sẵn sẽ tự động build và xuất bản website sau 1 phút.
Website sẽ có địa chỉ: `https://<tai-khoan>.github.io/<ten-repo>/`
