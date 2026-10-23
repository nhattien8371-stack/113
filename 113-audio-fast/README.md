# 🌸 The Butterfly's Secret Garden — 12A1
> **Khu Vườn Của Những Lời Chưa Nói**  
> Món quà 20/10 tinh tế, nhẹ nhàng và đầy ắp tình cảm từ các bạn nam gửi tặng các bạn nữ lớp 12A1.

---

## ✨ Điểm Nổi Bật & Tính Năng
- **Storybook Animation & Manual Mode**: Câu chuyện tương tác 7 cảnh hoàn toàn do người xem làm chủ (Manual Interactive Mode). Không tự động chuyển cảnh, cho phép các bạn nữ đọc và cảm nhận từng câu chúc trọn vẹn.
- **Nhân Vật Bướm Sứ Giả (SVG Animation)**: Chú bướm hoạt hình dễ thương với cánh chuyển sắc hồng pastel (#F6B8CF) & tím lavender (#C9B6F2), biểu cảm đôi mắt anime long lanh (chớp mắt, cười, tò mò, chỉ dẫn), vẫy cánh và để lại vệt bụi sao stardust lấp lánh khi bay.
- **Khu Vườn Hoa Đầy Đủ Chi Tiết**: Gồm 5 loài hoa thật (Cúc trắng nhụy vàng, Tulip hồng pastel, Cosmos tím nhạt, Hoa Baby trắng, Hoa Buttercup vàng) với cành, lá, nhụy, hiệu ứng bung nở (blooming) và tương tác chạm phát sáng.
- **Scene 03 Bất Ngờ Ngọt Ngào**: Bánh kem mini chúc mừng sinh nhật / 20/10 hoạt hình ngộ nghĩnh ("Hôm thứ 3 chỉ là tráng miệng thôi, hôm nay mới là bữa chính nè!").
- **Scene 04 Lá Thư Sâu Lắng**: Phong bì giấy kem với dấu sáp tim tự mở ra lá thư chân thành từ các bạn nam.
- **Scene 07 Pháo Hoa & Bụi Sao (Finale)**: Hiệu ứng pháo hoa pastel, confetti chúc mừng Ngày Phụ Nữ Việt Nam 20/10, cùng nút "Gửi một lời nhắn" cho phép sao chép lời cảm ơn để dán vào nhóm chat lớp.
- **Trình Phát Nhạc Dịu Dàng**: Tích hợp nhạc bài hát *Thanh Xuân*, hỗ trợ Web Audio API Chime Synth êm dịu, fade in / fade out mượt mà, không bao giờ gây lỗi âm thanh.
- **100% Responsive & Mobile-First**: Tối ưu chuẩn từng pixel trên iPhone Safari, Android Chrome và máy tính Desktop.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Local

### 1. Yêu cầu hệ thống
- Đã cài đặt **Node.js** (khuyến nghị phiên bản 18, 20 hoặc 22+).

### 2. Cài đặt dependencies
Mở terminal tại thư mục `butterfly-garden`:
```bash
cd butterfly-garden
npm install
```

### 3. Chạy môi trường phát triển (Dev)
```bash
npm run dev
```
Trình duyệt sẽ mở tại địa chỉ: `http://localhost:5173/`

### 4. Build sản phẩm (Production)
```bash
npm run build
```
Thư mục `dist/` sẽ được tạo ra chứa toàn bộ mã nguồn tĩnh sẵn sàng triển khai.

---

## 🌐 Hướng Dẫn Triển Khai Lên GitHub Pages Miễn Phí

Dự án đã được cấu hình đường dẫn tương đối (`base: './'`), sẵn sàng cho GitHub Pages mà không cần mua domain hay hosting.

### Cách 1: Tự động với GitHub Actions (Khuyên Dùng)
1. Tạo một repository mới trên GitHub (ví dụ: `butterfly-secret-garden-12a1`).
2. Đẩy toàn bộ mã nguồn trong thư mục `butterfly-garden` lên GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit 20/10 butterfly garden"
   git branch -M main
   git remote add origin https://github.com/<tai-khoan-cua-ban>/<ten-repo>.git
   git push -u origin main
   ```
3. Trên GitHub, vào mục **Settings** -> **Pages**:
   - Ở mục **Build and deployment** -> **Source**, chọn **GitHub Actions**.
4. GitHub Actions sẽ tự động kích hoạt file `.github/workflows/deploy.yml` và xuất bản website sau khoảng 1-2 phút!

---

### Cách 2: Triển khai nhanh bằng lệnh `gh-pages`
1. Đảm bảo đã thiết lập git remote origin.
2. Chạy lệnh:
   ```bash
   npm run deploy
   ```
3. Vào **Settings** -> **Pages** trên GitHub, chọn Branch `gh-pages` -> Save.

---

## 🎵 Hướng Dẫn Tùy Chỉnh

### 1. Thay Đổi Nhạc Nền
- Đặt file nhạc `.mp3` mới vào thư mục:
  `butterfly-garden/public/audio/` (ví dụ: `my-song.mp3`).
- Mở file `src/data/storyContent.ts`, cập nhật đường dẫn:
  ```ts
  musicTrack: './audio/my-song.mp3',
  musicTitle: 'Tên bài hát mới',
  ```

### 2. Thay Đổi Lời Chúc & Câu Chữ 7 Cảnh
Toàn bộ kịch bản, lời dẫn, các đoạn tâm sự đều được quản lý tập trung tại file duy nhất:
👉 **`src/data/storyContent.ts`**
Bạn có thể sửa lời thoại, tên lớp hoặc thứ tự hiển thị mà không làm ảnh hưởng đến hiệu ứng chuyển động.

---

## 📁 Cấu Trúc Thư Mục Dự Án
```text
butterfly-garden/
├── .github/workflows/deploy.yml   # Workflow tự động deploy GitHub Pages
├── public/
│   ├── audio/                     # Thư mục chứa nhạc nền (.mp3)
│   └── favicon.svg                # Favicon cánh hoa
├── src/
│   ├── components/
│   │   ├── BloomingFlower.tsx     # 5 loài hoa SVG chi tiết & bloom animation
│   │   ├── ButterflyCharacter.tsx # Nhân vật Bướm SVG nhiều lớp, mắt biểu cảm
│   │   ├── Envelope.tsx           # Phong bì sáp tim & lá thư giấu kín
│   │   ├── Finale.tsx             # Banner chúc mừng & confetti pháo hoa
│   │   ├── FlowerGarden.tsx       # Bố cục khu vườn đa tầng (Parallax)
│   │   ├── MagicParticles.tsx     # Cánh hoa rơi & đốm sáng lấp lánh
│   │   ├── MessageModal.tsx       # Hộp thoại gửi & sao chép lời nhắn
│   │   ├── MusicController.tsx    # Nút bật/tắt nhạc & synth fallback
│   │   ├── SceneNavigation.tsx    # Điều khiển Tiếp tục / Quay lại / Tiến trình
│   │   ├── StoryText.tsx          # Khung kính mờ hiển thị lời thoại nổi bật
│   │   └── SurpriseGift.tsx       # Chiếc bánh kem mini bất ngờ Scene 3
│   ├── data/
│   │   └── storyContent.ts        # Toàn bộ nội dung lời chúc 7 cảnh
│   ├── hooks/
│   │   └── useWindowSize.ts       # Hook tự động nhận diện thiết bị & màn hình
│   ├── scenes/                    # 7 cảnh hoạt hình nối tiếp
│   ├── types/
│   │   └── story.ts               # Định nghĩa kiểu dữ liệu TypeScript
│   ├── App.tsx
│   ├── index.css                  # Tailwind styles & hiệu ứng cánh bướm
│   └── main.tsx
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---
*Made with love, from the boys of 12A1 ♡*
