# Portfolio Website - Setup & Deployment Guide

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Customization](#customization)
- [Deployment](#deployment)
- [Browser Support](#browser-support)
- [Performance](#performance)
- [Accessibility](#accessibility)

---

## 🎯 Overview

This is a modern, responsive portfolio website built with pure HTML5, CSS3, and vanilla JavaScript. No frameworks or build tools required - just open and run!

**Live Features:**
- 🌗 Dark/Light theme toggle
- 🌐 Multi-language support (English/Spanish)
- 📱 Fully responsive design
- ♿ WCAG accessibility compliant
- ⚡ Optimized performance
- 🎨 Smooth animations
- 📧 Contact form

---

## ✨ Features

### Theme System
- Persistent theme selection (saved in localStorage)
- Smooth transitions between light and dark modes
- System preference detection

### Language Support
- English and Spanish translations
- Instant language switching
- Persistent language preference

### Responsive Design
- Mobile-first approach
- Breakpoints: 480px, 768px, 968px
- Touch-friendly navigation
- Optimized for all screen sizes

### Interactive Elements
- Sticky navigation with scroll effects
- Active link highlighting
- Smooth scroll behavior
- Form validation and feedback
- Animated timeline and project cards

---

## 📁 Project Structure

```
CJD-portfolio/
├── index.html                 # Main HTML file
├── app.js                     # JavaScript functionality
├── Christian_Delgado_Resume.pdf  # CV file for download
├── styles/
│   └── style.css             # Main stylesheet
├── assets/
│   └── images/               # Image assets (optional)
├── components/               # Future components (optional)
├── README.md                 # Project description
└── SETUP.md                  # This file
```

---

## 🚀 Local Development

### Option 1: Direct File Access
Simply open `index.html` in your web browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

### Option 2: Local Server (Recommended)

Using Python 3:
```bash
python -m http.server 8000
# Visit http://localhost:8000
```

Using Python 2:
```bash
python -m SimpleHTTPServer 8000
# Visit http://localhost:8000
```

Using Node.js (http-server):
```bash
npx http-server -p 8000
# Visit http://localhost:8000
```

Using PHP:
```bash
php -S localhost:8000
# Visit http://localhost:8000
```

Using VS Code:
- Install "Live Server" extension
- Right-click on `index.html`
- Select "Open with Live Server"

---

## 🎨 Customization

### 1. Update Personal Information

Edit `index.html` to update:
- Name and title in the hero section
- Professional summary
- Skills and technologies
- Work experience
- Projects
- Contact information

### 2. Replace CV File

Replace `Christian_Delgado_Resume.pdf` with your own CV file and update the link in `index.html`:
```html
<a href="your-cv-filename.pdf" download>Download CV</a>
```

### 3. Customize Colors

Edit CSS variables in `styles/style.css`:
```css
:root {
    --accent-primary: #2563eb;    /* Primary accent color */
    --accent-secondary: #3b82f6;  /* Secondary accent color */
    /* Add your custom colors */
}
```

### 4. Add Your Photo (Optional)

1. Add your photo to `assets/images/`
2. Update the About section in `index.html`
3. Adjust the CSS grid layout as needed

### 5. Modify Projects

Edit the projects section in `index.html`:
- Update project titles and descriptions
- Add GitHub/demo links
- Change technology tags

### 6. Update Social Links

Update social media links in the HTML:
```html
<a href="https://linkedin.com/in/your-profile">LinkedIn</a>
<a href="https://github.com/your-username">GitHub</a>
<a href="mailto:your-email@example.com">Email</a>
```

### 7. Contact Form Integration

The contact form is currently set up with a simulation. To connect to a real backend:

**Option A: Formspree**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option B: Custom Backend**
Edit the `contactForm.simulateSubmit()` function in `app.js` to call your API:
```javascript
async simulateSubmit(data) {
    const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
}
```

---

## 🌐 Deployment

### GitHub Pages

1. **Create a GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to "Pages" section
   - Select source branch (main)
   - Select root folder (/)
   - Click Save

3. **Access your site**
   - Visit: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

### Netlify

1. **Via Git**
   - Connect your GitHub repository
   - Build command: (leave empty)
   - Publish directory: `/`
   - Deploy!

2. **Via Drag & Drop**
   - Visit [Netlify Drop](https://app.netlify.com/drop)
   - Drag your project folder
   - Done!

3. **Custom Domain (Optional)**
   - Go to Domain settings
   - Add custom domain
   - Configure DNS records

### Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts**
   - Link to existing project or create new
   - Confirm settings
   - Deploy!

### Traditional Web Hosting

1. **Upload via FTP/SFTP**
   - Use FileZilla, Cyberduck, or similar
   - Upload all files to `public_html` or `www` directory

2. **Via cPanel File Manager**
   - Log into cPanel
   - Open File Manager
   - Upload and extract files

---

## 🌍 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | Last 2 versions |
| Firefox | Last 2 versions |
| Safari | Last 2 versions |
| Edge | Last 2 versions |
| Opera | Last 2 versions |

**Mobile Browsers:**
- iOS Safari 12+
- Chrome for Android
- Samsung Internet

---

## ⚡ Performance

### Current Optimizations
- ✅ Minimal external dependencies
- ✅ Optimized CSS (no unused styles)
- ✅ Efficient JavaScript (vanilla, no frameworks)
- ✅ Lazy loading support
- ✅ Debounced scroll events
- ✅ CSS Grid & Flexbox for layout

### Further Optimization Tips

1. **Optimize Images**
   ```bash
   # Using ImageOptim (macOS)
   # Or TinyPNG, Squoosh, or similar tools
   ```

2. **Minify CSS & JS**
   ```bash
   # Using clean-css
   npx clean-css-cli -o style.min.css styles/style.css

   # Using terser
   npx terser app.js -o app.min.js
   ```

3. **Enable Gzip Compression**
   Add to `.htaccess` (Apache):
   ```apache
   <IfModule mod_deflate.c>
       AddOutputFilterByType DEFLATE text/html text/css application/javascript
   </IfModule>
   ```

4. **Add Caching Headers**
   ```apache
   <IfModule mod_expires.c>
       ExpiresActive On
       ExpiresByType text/css "access plus 1 year"
       ExpiresByType application/javascript "access plus 1 year"
   </IfModule>
   ```

---

## ♿ Accessibility

### Built-in Features
- ✅ Semantic HTML5 elements
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Focus visible states
- ✅ Skip to content link
- ✅ Alt text for images
- ✅ Color contrast compliance
- ✅ Reduced motion support

### Testing
```bash
# Using axe-core
npx @axe-core/cli index.html

# Using Lighthouse
lighthouse http://localhost:8000 --view
```

### WCAG Compliance
- Level AA compliant
- Color contrast ratio > 4.5:1
- All interactive elements keyboard accessible
- Screen reader friendly

---

## 🔧 Troubleshooting

### Issue: Theme not persisting
**Solution:** Check if localStorage is enabled in your browser

### Issue: Smooth scroll not working
**Solution:** Check browser compatibility or use the polyfill in app.js

### Issue: Contact form not working
**Solution:** Integrate with a backend service (see Customization section)

### Issue: Mobile menu not closing
**Solution:** Clear browser cache and ensure JavaScript is enabled

---

## 📝 Maintenance

### Regular Updates
1. Keep content current (experience, projects, skills)
2. Update CV file regularly
3. Test on latest browser versions
4. Monitor contact form submissions
5. Check for broken links

### Content Updates
- Experience: Update quarterly
- Projects: Add as completed
- Skills: Review monthly
- CV: Update with each significant change

---

## 🤝 Contributing

While this is a personal portfolio, feel free to:
- Report bugs via GitHub Issues
- Suggest improvements
- Fork for your own use
- Share feedback

---

## 📄 License

This project is open source and available for personal and commercial use.

---

## 📞 Support

For questions or issues:
- Email: cdelgado84@gmail.com
- LinkedIn: [linkedin.com/in/delgadochristian](https://linkedin.com/in/delgadochristian)

---

## 🎉 Credits

**Built by:** Christian Delgado
**Year:** 2024
**Tech Stack:** HTML5, CSS3, JavaScript (ES6+)
**Fonts:** Inter (Google Fonts)
**Icons:** SVG inline icons

---

## 📚 Additional Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [Web.dev](https://web.dev/)
- [CSS-Tricks](https://css-tricks.com/)
- [A11Y Project](https://www.a11yproject.com/)

---

**Last Updated:** November 2024

**Version:** 1.0.0

---

Happy coding! 🚀
