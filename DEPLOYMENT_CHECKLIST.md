# 🚀 Deployment Checklist - Monlam Font Viewer

## Pre-Deployment Setup

### ✅ Environment Configuration

- [ ] Create `.env.local` with production credentials:
  ```bash
  ADMIN_USERNAME=your_secure_username
  ADMIN_PASSWORD=your_secure_password
  NEXT_PUBLIC_APP_NAME="Monlam Font Viewer"
  NEXT_PUBLIC_APP_VERSION="1.0.0"
  NEXT_PUBLIC_APP_URL="https://your-domain.com"
  NEXT_PUBLIC_DEBUG=false
  ```

### ✅ Security Checklist

- [ ] Change default admin credentials
- [ ] Use strong passwords (12+ characters)
- [ ] Enable HTTPS in production
- [ ] Set secure cookie settings
- [ ] Review file upload restrictions

### ✅ Build Optimization

- [ ] Run `npm run build` successfully
- [ ] Check for TypeScript errors: `npm run type-check`
- [ ] Run linting: `npm run lint`
- [ ] Test production build locally: `npm start`

## Deployment Options

### 🐳 Docker Deployment

```bash
# Build Docker image
docker build -t monlam-font-viewer .

# Run container
docker run -p 3000:3000 \
  -e ADMIN_USERNAME=your_username \
  -e ADMIN_PASSWORD=your_password \
  monlam-font-viewer

# Or use docker-compose
docker-compose up -d
```

### ☁️ Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
```

### 🐧 Traditional Server

```bash
# Build the application
npm run build

# Start production server
npm start

# Or use PM2 for process management
npm install -g pm2
pm2 start npm --name "monlam-font-viewer" -- start
```

### 🌐 Nginx Deployment

```bash
# Automated setup with nginx
sudo ./deploy-nginx.sh

# Manual nginx setup
sudo cp nginx.conf /etc/nginx/sites-available/monlam-font-viewer
sudo ln -s /etc/nginx/sites-available/monlam-font-viewer /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Docker with nginx
docker-compose -f docker-compose-nginx.yml up -d
```

## Post-Deployment Verification

### ✅ Functionality Tests

- [ ] Main page loads correctly
- [ ] All fonts display properly
- [ ] Search and filter work
- [ ] Font preview modal works
- [ ] Download functionality works
- [ ] Admin login works
- [ ] Font upload works
- [ ] Font deletion works
- [ ] Mobile responsiveness works

### ✅ Performance Tests

- [ ] Page load speed < 3 seconds
- [ ] Font loading works properly
- [ ] No console errors
- [ ] Mobile performance good

### ✅ Security Tests

- [ ] Admin routes are protected
- [ ] File upload restrictions work
- [ ] No sensitive data exposed
- [ ] HTTPS redirects work

## Production Monitoring

### 📊 Health Checks

- [ ] Health endpoint: `/api/health`
- [ ] Monitor server logs
- [ ] Set up error tracking (Sentry)
- [ ] Monitor performance metrics

### 🔧 Maintenance

- [ ] Regular backups of uploaded fonts
- [ ] Monitor disk space usage
- [ ] Update dependencies regularly
- [ ] Review security logs

## Troubleshooting

### Common Issues

1. **Fonts not loading**: Check file permissions in `/public/fonts/`
2. **Admin login fails**: Verify environment variables
3. **Upload fails**: Check disk space and permissions
4. **Build errors**: Run `npm run type-check` and `npm run lint`

### Support Files

- `ADMIN.md` - Admin panel documentation
- `DEPLOYMENT.md` - Detailed deployment guide
- `PRODUCTION.md` - Production features overview

## Environment Variables Reference

| Variable                  | Required | Description                       |
| ------------------------- | -------- | --------------------------------- |
| `ADMIN_USERNAME`          | Yes      | Admin login username              |
| `ADMIN_PASSWORD`          | Yes      | Admin login password              |
| `NEXT_PUBLIC_APP_NAME`    | No       | Application name                  |
| `NEXT_PUBLIC_APP_VERSION` | No       | Application version               |
| `NEXT_PUBLIC_APP_URL`     | No       | Application URL                   |
| `NEXT_PUBLIC_DEBUG`       | No       | Debug mode (false for production) |

---

**Ready for Production!** 🚀
