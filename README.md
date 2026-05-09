# Yatra Documentation

Modern documentation website for Yatra WordPress travel booking plugin, built with VitePress.

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 18.0 or higher
- **npm**: 9.0 or higher
- **Git**: For version control

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mantrabrain/yatra.git
   cd yatra/app/public/yatra-docs
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open browser**:
   Navigate to `http://localhost:3000`

## 📝 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Serve production build
npm run serve
```

### Project Structure

```
yatra-docs/
├── docs/                          # Documentation source
│   ├── .vitepress/               # VitePress configuration
│   │   ├── config.ts             # Main configuration file
│   │   └── theme/                # Custom theme (optional)
│   ├── public/                   # Static assets
│   │   ├── robots.txt           # SEO robots file
│   │   └── site.webmanifest     # PWA manifest
│   ├── guide/                    # Documentation pages
│   │   ├── installation.md
│   │   ├── quick-start.md
│   │   ├── booking-settings.md
│   │   ├── payment-settings.md
│   │   ├── tour-booking.md
│   │   └── ...
│   └── index.md                  # Homepage
├── .github/                      # GitHub workflows
│   └── workflows/
│       └── deploy.yml           # Auto-deployment workflow
├── netlify.toml                 # Netlify configuration
├── package.json                  # Dependencies and scripts
└── README.md                    # This file
```

### Adding New Documentation

1. **Create new markdown file** in `docs/guide/`:
   ```bash
   touch docs/guide/your-new-page.md
   ```

2. **Add frontmatter** to the file:
   ```markdown
   ---
   title: Your New Page
   description: Page description for SEO
   prev: /guide/previous-page
   next: /guide/next-page
   ---
   ```

3. **Add to sidebar** in `docs/.vitepress/config.ts`:
   ```typescript
   {
     text: 'Your Section',
     items: [
       { text: 'Your New Page', link: '/guide/your-new-page' }
     ]
   }
   ```

### Custom Styling

Add custom CSS in `docs/.vitepress/theme/style.css`:

```css
/* Custom styles for Yatra documentation */
.custom-class {
  color: var(--vp-c-brand);
}
```

## 🚀 Deployment

### Netlify Deployment

#### Automatic Deployment

1. **Connect to Netlify**:
   - Push code to GitHub repository
   - Connect Netlify to your GitHub account
   - Select the `yatra-docs` folder

2. **Configure build settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `docs/.vitepress/dist`
   - **Node version**: 18

3. **Environment variables** (if needed):
   - Set any required environment variables in Netlify dashboard

#### Manual Deployment

1. **Build the site**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   ```bash
   npx netlify deploy --prod --dir=docs/.vitepress/dist
   ```

### GitHub Pages Deployment

#### Automatic Deployment

1. **Enable GitHub Pages**:
   - Go to repository settings
   - Enable GitHub Pages
   - Select source: `gh-pages` branch

2. **Configure workflow**:
   - The `.github/workflows/deploy.yml` file handles automatic deployment
   - Push to `main` branch to trigger deployment

#### Manual Deployment

1. **Build the site**:
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**:
   ```bash
   npm run build
   cd docs/.vitepress/dist
   git init
   git add .
   git commit -m "Deploy documentation"
   git branch -M gh-pages
   git push -f origin gh-pages
   ```

### Vercel Deployment

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel --prod docs/.vitepress/dist
   ```

## 🔧 Configuration

### VitePress Configuration

Main configuration is in `docs/.vitepress/config.ts`:

```typescript
export default defineConfig({
  title: 'Yatra Documentation',
  description: 'Complete documentation for Yatra WordPress travel booking plugin',
  
  theme: defaultTheme({
    // Theme configuration
  }),
  
  // SEO and optimization settings
})
```

### SEO Optimization

The documentation includes comprehensive SEO optimization:

- **Meta tags**: Automatic meta tag generation
- **Sitemap**: Auto-generated sitemap.xml
- **Robots.txt**: Search engine instructions
- **Schema markup**: Structured data for search engines
- **Open Graph**: Social media sharing optimization

### Performance Optimization

Built-in performance features:

- **Static Site Generation**: Fast loading times
- **Image Optimization**: Lazy loading and optimization
- **Code Splitting**: Minimal JavaScript bundle
- **Caching**: Optimized cache headers
- **CDN Ready**: Optimized for CDN deployment

## 🛠️ Customization

### Theme Customization

1. **Create custom theme**:
   ```bash
   mkdir docs/.vitepress/theme
   touch docs/.vitepress/theme/index.ts
   ```

2. **Extend default theme**:
   ```typescript
   import DefaultTheme from 'vitepress/theme'
   
   export default {
     extends: DefaultTheme,
     // Custom theme configuration
   }
   ```

### Adding Components

Create reusable Vue components:

```vue
<!-- docs/.vitepress/theme/components/CustomComponent.vue -->
<template>
  <div class="custom-component">
    <!-- Component content -->
  </div>
</template>

<script setup>
// Component logic
</script>
```

### Custom Plugins

Add VitePress plugins in `config.ts`:

```typescript
export default defineConfig({
  // ... other config
  markdown: {
    config: (md) => {
      // Add custom markdown-it plugins
      md.use(customPlugin)
    }
  }
})
```

## 📊 Analytics

### Google Analytics

Add Google Analytics to the site:

1. **Update config.ts**:
   ```typescript
   export default defineConfig({
     // ... other config
     head: [
       ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID' }],
       ['script', {}, `
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
         gtag('config', 'GA_MEASUREMENT_ID');
       `]
     ]
   })
   ```

### Netlify Analytics

Enable Netlify Analytics in Netlify dashboard:

1. Go to Site settings → Analytics
2. Enable Netlify Analytics
3. Add tracking script if needed

## 🔍 Search

### Local Search

The documentation includes built-in local search:

- **Automatic indexing**: All pages are indexed
- **Fast search**: Client-side search
- **No dependencies**: No external services needed

### Algolia Search (Optional)

Replace local search with Algolia:

1. **Install Algolia search**:
   ```bash
   npm install docsearch-js
   ```

2. **Configure in config.ts**:
   ```typescript
   export default defineConfig({
     theme: defaultTheme({
       search: {
         provider: 'algolia',
         options: {
           appId: 'YOUR_APP_ID',
           apiKey: 'YOUR_SEARCH_API_KEY',
           indexName: 'YOUR_INDEX_NAME'
         }
       }
     })
   })
   ```

## 🌐 Internationalization

### Adding Languages

1. **Create language directories**:
   ```bash
   mkdir docs/guide/fr
   mkdir docs/guide/es
   ```

2. **Add language configuration**:
   ```typescript
   export default defineConfig({
     locales: {
       root: {
         label: 'English',
         lang: 'en-US'
       },
       fr: {
         label: 'Français',
         lang: 'fr-FR'
       }
     }
   })
   ```

## 🧪 Testing

### Local Testing

Test the documentation locally:

```bash
# Start development server
npm run dev

# Build and test production build
npm run build
npm run preview
```

### Link Testing

Check all internal links:

```bash
# Install link checker
npm install -g markdown-link-check

# Check all markdown files
find docs -name "*.md" -exec markdown-link-check {} \;
```

## 📝 Content Guidelines

### Writing Documentation

Follow these guidelines for consistent documentation:

1. **Use clear headings**: Proper H1, H2, H3 hierarchy
2. **Write descriptive titles**: SEO-friendly and clear
3. **Add frontmatter**: Include title, description, navigation
4. **Use code blocks**: Proper syntax highlighting
5. **Add examples**: Practical code examples
6. **Include images**: High-quality screenshots and diagrams

### Markdown Best Practices

```markdown
# Use # for main title (H1)
## Use ## for sections (H2)
### Use ### for subsections (H3)

# Use code blocks with language specification
```javascript
const example = 'code';
```

# Use inline code for variables and functions
Use `variableName` for inline code

# Use tables for structured data
| Column 1 | Column 2 |
|----------|----------|
| Value 1  | Value 2  |

# Use lists for steps
1. First step
2. Second step
3. Third step

# Use blockquotes for important information
> This is an important note
```

## 🐛 Troubleshooting

### Common Issues

#### Build Errors

**Error: Module not found**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Error: Permission denied**
```bash
# Fix permissions
chmod +x docs/.vitepress/dist
```

#### Development Issues

**Hot reload not working**
```bash
# Restart development server
npm run dev
```

**Styles not loading**
```bash
# Clear VitePress cache
rm -rf docs/.vitepress/cache
```

### Getting Help

1. **Check VitePress documentation**: https://vitepress.dev
2. **Review configuration files**: Check for syntax errors
3. **Test with minimal config**: Start with basic configuration
4. **Check Node.js version**: Ensure compatibility

## 📈 Performance Monitoring

### Core Web Vitals

Monitor site performance:

1. **Google PageSpeed Insights**: https://pagespeed.web.dev
2. **Lighthouse**: Built-in Chrome DevTools
3. **Web Vitals Extension**: Chrome extension for monitoring

### Optimization Tips

- **Optimize images**: Use WebP format, proper sizing
- **Minimize CSS**: Remove unused styles
- **Lazy load content**: Load content as needed
- **Use CDN**: Deploy to CDN for global performance

## 🔄 Maintenance

### Regular Updates

Keep dependencies updated:

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update VitePress
npm install vitepress@latest
```

### Content Updates

Regular maintenance tasks:

1. **Review documentation**: Update outdated information
2. **Check links**: Fix broken internal and external links
3. **Update examples**: Ensure code examples work
4. **Optimize images**: Compress and optimize images

## 📞 Support

### Getting Help

1. **Documentation**: Review existing documentation
2. **Community**: Join VitePress community
3. **Issues**: Report bugs on GitHub
4. **Discussions**: Start a discussion for questions

### Contributing

Contribute to the documentation:

1. **Fork repository**: Create your own copy
2. **Create branch**: Work on your changes
3. **Submit PR**: Propose your changes
4. **Review process**: Wait for review and merge

---

**Happy documenting!** 🚀

For more information about Yatra, visit [wpyatra.com](https://wpyatra.com).
