# AL-NEBRAS OFFICE - مكتب النبراس الهندسي

A fully professional bilingual (Arabic + English) website for AL-NEBRAS OFFICE, an engineering and architecture firm. Built with React + Vite, featuring a modern design inspired by geo-co.net, complete with a password-protected admin dashboard for content management.

## Features

- 🌐 **Bilingual Support**: Full Arabic (RTL) and English (LTR) support with i18next
- 🎨 **Modern Design**: Professional theme matching geo-co.net with smooth animations
- 📱 **Responsive**: Fully responsive design for all devices
- 🎭 **Dark Mode**: Optional dark mode toggle
- 🔐 **Admin Dashboard**: Password-protected admin panel for content management
- 📸 **Image Management**: Upload, preview, and manage multiple images per project
- 💾 **LocalStorage**: Instant site updates with LocalStorage persistence
- 📦 **Export Assets**: Export uploaded images as ZIP for GitHub persistence
- ✉️ **Contact Form**: EmailJS integration for contact form submissions
- 🚀 **GitHub Pages Ready**: Fully configured for GitHub Pages deployment

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **React Router DOM** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **i18next** - Internationalization
- **EmailJS** - Contact form
- **JSZip** - Asset export
- **React Hot Toast** - Notifications

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_ADMIN_EMAIL=admin@example.com
VITE_ADMIN_PASSWORD=admin123
```

**EmailJS Setup:**
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Add them to your `.env` file

### 3. Create Asset Directories

Create the following directories:

```bash
mkdir -p src/assets/default
mkdir -p src/assets/uploads
```

### 4. Run Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## Admin Dashboard

### Accessing the Dashboard

1. Navigate to `/login`
2. Enter your admin credentials (from `.env` file)
3. Default credentials:
   - Email: `admin@example.com` (or your `VITE_ADMIN_EMAIL`)
   - Password: `admin123` (or your `VITE_ADMIN_PASSWORD`)

### Changing Admin Credentials

Update the following in your `.env` file:

```env
VITE_ADMIN_EMAIL=your_new_email@example.com
VITE_ADMIN_PASSWORD=your_new_password
```

**Note:** After changing credentials, you'll need to rebuild the application for changes to take effect.

### Managing Content

The dashboard allows you to:

- **Add/Edit/Delete Projects**: Manage project portfolio with multiple images
- **Add/Edit/Delete News**: Manage news and updates
- **Upload Images**: Upload multiple images per project with preview
- **Export Assets**: Download uploaded images as ZIP for GitHub persistence

### Auto-Logout

The dashboard automatically logs out after 12 hours of inactivity for security.

## Image Export/Import Workflow

### Exporting Assets

1. Log in to the dashboard
2. Click "Export Assets" button
3. A ZIP file will be downloaded containing all uploaded images
4. Extract the ZIP file

### Importing Assets to GitHub

1. Extract the downloaded ZIP file
2. Copy all images from the `uploads` folder
3. Paste them into `src/assets/uploads/` in your project
4. Commit and push to GitHub:

```bash
git add src/assets/uploads/
git commit -m "Add uploaded images"
git push
```

This ensures your uploaded images persist across deployments.

## Deployment to GitHub Pages

### 1. Install gh-pages (if not already installed)

```bash
npm install --save-dev gh-pages
```

### 2. Update package.json

The `package.json` already includes the necessary scripts:

```json
{
  "homepage": ".",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### 3. Deploy

```bash
npm run deploy
```

This will:
1. Build the production version
2. Deploy to the `gh-pages` branch
3. Make your site available at `https://yourusername.github.io/repository-name`

### 4. Configure GitHub Pages

1. Go to your repository settings on GitHub
2. Navigate to "Pages" section
3. Select `gh-pages` branch as the source
4. Save

## Project Structure

```
al-nebras-office/
├── public/
│   ├── favicon.svg
│   └── manifest.json
├── src/
│   ├── assets/
│   │   ├── default/          # Default images
│   │   └── uploads/          # User-uploaded images
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── LanguageToggle.jsx
│   │   ├── ImageUploader.jsx
│   │   ├── PrivateRoute.jsx
│   │   └── Toast.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── ProjectDetail.jsx
│   │   ├── Services.jsx
│   │   ├── BIM.jsx
│   │   ├── News.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   └── Dashboard.jsx
│   ├── data/
│   │   ├── projects.json
│   │   ├── news.json
│   │   └── home.json
│   ├── hooks/
│   │   └── useData.js
│   ├── i18n/
│   │   ├── index.js
│   │   ├── en.json
│   │   └── ar.json
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Pages

- **Home** (`/`): Hero section, featured services, and projects
- **About** (`/about`): Company information
- **Projects** (`/projects`): Project portfolio grid
- **Project Detail** (`/projects/:id`): Individual project details
- **Services** (`/services`): Service offerings
- **BIM Services** (`/bim`): BIM workflow and services
- **News** (`/news`): News and updates
- **Contact** (`/contact`): Contact form with EmailJS
- **Login** (`/login`): Admin login page
- **Dashboard** (`/dashboard`): Admin content management (protected)

## Customization

### Changing Site Name

The site name switches between "AL-NEBRAS OFFICE" (English) and "مكتب النبراس الهندسي" (Arabic) automatically based on language selection. To change:

1. Edit `src/i18n/en.json` - Update `siteName`
2. Edit `src/i18n/ar.json` - Update `siteName`

### Changing Colors

The primary color is `#1a73e8` (blue). To change:

1. Edit `tailwind.config.js` - Update the `primary` color
2. Update CSS variables if needed

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link in `src/components/Navbar.jsx`
4. Add translations in `src/i18n/en.json` and `src/i18n/ar.json`

## SEO & Accessibility

- Meta tags for SEO
- Open Graph tags for social sharing
- ARIA labels for accessibility
- Keyboard navigation support
- Semantic HTML structure

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is proprietary and confidential.

## Support

For issues or questions, please contact the development team.

---

**Built with ❤️ for AL-NEBRAS OFFICE - مكتب النبراس الهندسي**

