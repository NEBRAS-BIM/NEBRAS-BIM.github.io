# Quick Setup Guide

## 1. Install Dependencies

```bash
npm install
```

## 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_ADMIN_EMAIL=admin@example.com
VITE_ADMIN_PASSWORD=admin123
```

## 3. Run Development Server

```bash
npm run dev
```

## 4. Build for Production

```bash
npm run build
```

## 5. Deploy to GitHub Pages

```bash
npm run deploy
```

## Admin Dashboard Access

1. Navigate to `/login`
2. Use credentials from `.env` file:
   - Email: `VITE_ADMIN_EMAIL`
   - Password: `VITE_ADMIN_PASSWORD`

## Image Export/Import

1. **Export**: Click "Export Assets" in dashboard to download ZIP
2. **Import**: Extract ZIP and copy images to `src/assets/uploads/`
3. **Commit**: Add images to Git and push to GitHub

## Notes

- All content is stored in LocalStorage for instant updates
- Images uploaded via dashboard need to be exported and committed to Git
- Admin password can be changed in `.env` file (requires rebuild)
- Auto-logout after 12 hours of inactivity

